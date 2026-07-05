'use client'

import { useEffect, useRef } from 'react'

export type HeroVariant = 'molten' | 'aurora' | 'constellation' | 'nebula' | 'aurora-constellation'

// Real-time fluid-light hero background. WebGL shader for the aurora/molten field,
// canvas2D for the constellation/nebula. 'aurora-constellation' is constellation-forward:
// a fine cursor-reactive network over a heavily dimmed, slow aurora that reads as a quiet
// tonal wash, not a loud gradient. Perf-guarded: DPR capped, paused offscreen or when the
// tab is hidden, single static frame under prefers-reduced-motion.
export function HeroFluidCanvas({ variant = 'aurora-constellation' }: { variant?: HeroVariant }) {
  const glRef = useRef<HTMLCanvasElement | null>(null)
  const c2Ref = useRef<HTMLCanvasElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const glc = glRef.current
    const c2 = c2Ref.current
    if (!wrap || !glc || !c2) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
    const mouse = { x: 0.5, y: 0.5, on: 0, tx: 0.5, ty: 0.5 }
    let W = 1
    let H = 1

    const combined = variant === 'aurora-constellation'
    const useGL = variant === 'molten' || variant === 'aurora' || combined
    const useConst = variant === 'constellation' || combined
    const useNebula = variant === 'nebula'
    const use2D = useConst || useNebula

    const size = () => {
      const r = wrap.getBoundingClientRect()
      W = Math.max(1, Math.floor(r.width))
      H = Math.max(1, Math.floor(r.height))
      glc.width = Math.floor(W * dpr)
      glc.height = Math.floor(H * dpr)
      c2.width = glc.width
      c2.height = glc.height
    }
    size()

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      mouse.tx = (e.clientX - r.left) / r.width
      mouse.ty = (e.clientY - r.top) / r.height
      mouse.on = 1
    }
    const onLeave = () => { mouse.on = 0 }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)

    glc.style.opacity = useGL ? '1' : '0'
    c2.style.opacity = use2D ? '1' : '0'

    const draws: Array<(tm: number) => void> = []

    // ---------------- WebGL molten / aurora (dimmed backdrop when combined) ----------------
    if (useGL) {
      const gl = (glc.getContext('webgl', { antialias: true, alpha: false }) ||
        glc.getContext('experimental-webgl')) as WebGLRenderingContext | null
      let ok = false
      if (gl) {
        const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
        const fs = `precision highp float;uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uMouseOn;uniform int uMode;uniform float uDim;
        float hash(vec2 p){p=fract(p*vec2(123.34,345.45));p+=dot(p,p+34.345);return fract(p.x*p.y);}
        float vn(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
        float fbm(vec2 p){float s=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){s+=a*vn(p);p=m*p;a*=.5;}return s;}
        vec3 rmp(float t,vec3 c0,vec3 c1,vec3 c2,vec3 c3,vec3 c4,vec3 c5){t=clamp(t,0.,1.);
          if(t<.2)return mix(c0,c1,smoothstep(0.,.2,t));if(t<.4)return mix(c1,c2,smoothstep(.2,.4,t));
          if(t<.6)return mix(c2,c3,smoothstep(.4,.6,t));if(t<.8)return mix(c3,c4,smoothstep(.6,.8,t));
          return mix(c4,c5,smoothstep(.8,1.,t));}
        void main(){vec2 uv=gl_FragCoord.xy/uRes.xy;float ar=uRes.x/uRes.y;vec2 p=uv*vec2(ar,1.)*3.;float t=uTime*.06;
          vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
          vec2 r=vec2(fbm(p+4.*q+vec2(1.7,9.2)+t*.5),fbm(p+4.*q+vec2(8.3,2.8)-t*.5));
          float v=fbm(p+4.*r);float warp=length(q);
          vec2 mp=uMouse*vec2(ar,1.);float md=distance(uv*vec2(ar,1.),mp);float mInf=uMouseOn*exp(-md*3.2);
          v+=mInf*.35;v=v*.9+warp*.25;vec3 col;
          if(uMode==0)col=rmp(v,vec3(.055,.043,.071),vec3(.14,.06,.20),vec3(.48,.16,.07),vec3(1.,.42,.21),vec3(.79,.66,.38),vec3(.96,.94,.90));
          else col=rmp(v,vec3(.05,.06,.11),vec3(.05,.10,.16),vec3(.36,.16,.62),vec3(.71,.20,.48),vec3(1.,.42,.21),vec3(.96,.94,.90));
          col+=mInf*vec3(1.,.5,.25)*.45;
          vec2 vc=uv-vec2(.5,.45);float vig=smoothstep(1.1,.2,length(vc*vec2(1.1,1.3)));col*=mix(.5,1.08,vig);
          col+=hash(uv*uRes.xy*.5+uTime)*.05-.025;col*=uDim;gl_FragColor=vec4(col,1.);}`
        const compile = (type: number, src: string): WebGLShader | null => {
          const s = gl.createShader(type)
          if (!s) return null
          gl.shaderSource(s, src)
          gl.compileShader(s)
          return s
        }
        const prog = gl.createProgram()
        const v = compile(gl.VERTEX_SHADER, vs)
        const f = compile(gl.FRAGMENT_SHADER, fs)
        if (prog && v && f) {
          gl.attachShader(prog, v)
          gl.attachShader(prog, f)
          gl.linkProgram(prog)
          if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            gl.useProgram(prog)
            const buf = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, buf)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
            const loc = gl.getAttribLocation(prog, 'p')
            gl.enableVertexAttribArray(loc)
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
            const uRes = gl.getUniformLocation(prog, 'uRes')
            const uTime = gl.getUniformLocation(prog, 'uTime')
            const uMouse = gl.getUniformLocation(prog, 'uMouse')
            const uMouseOn = gl.getUniformLocation(prog, 'uMouseOn')
            const uMode = gl.getUniformLocation(prog, 'uMode')
            const uDim = gl.getUniformLocation(prog, 'uDim')
            const modeVal = variant === 'molten' ? 0 : 1
            // Combined mode: dim, slow, and calm the field so the constellation leads.
            const dimVal = combined ? 0.34 : 1.0
            const timeScale = combined ? 0.00065 : 0.001
            const mouseGain = combined ? 0.4 : 1.0
            ok = true
            draws.push((tm: number) => {
              gl.viewport(0, 0, glc.width, glc.height)
              gl.uniform2f(uRes, glc.width, glc.height)
              gl.uniform1f(uTime, tm * timeScale)
              gl.uniform2f(uMouse, mouse.x, 1 - mouse.y)
              gl.uniform1f(uMouseOn, mouse.on * mouseGain)
              gl.uniform1i(uMode, modeVal)
              gl.uniform1f(uDim, dimVal)
              gl.drawArrays(gl.TRIANGLES, 0, 3)
            })
          }
        }
      }
      if (!ok) {
        glc.style.opacity = '0'
        wrap.style.background = variant === 'molten'
          ? 'linear-gradient(135deg,#0E0B12,#241033,#7A2A12,#FF6B35,#C9A961)'
          : combined
            ? 'radial-gradient(120% 90% at 70% 20%, #1a1030 0%, #0E0B12 60%)'
            : 'linear-gradient(135deg,#0E0B12,#0D1929,#5B2A9E,#B4327A,#FF6B35)'
      }
    }

    // ---------------- constellation (opaque, or transparent overlay when combined) ----------------
    if (useConst) {
      const ctx = c2.getContext('2d')
      if (ctx) {
        type P = { x: number; y: number; vx: number; vy: number }
        let parts: P[] = []
        const initParts = () => {
          const n = Math.round(Math.min(130, (c2.width * c2.height) / (14000 * dpr)))
          parts = []
          for (let i = 0; i < n; i++) {
            parts.push({ x: Math.random() * c2.width, y: Math.random() * c2.height, vx: (Math.random() - 0.5) * 0.35 * dpr, vy: (Math.random() - 0.5) * 0.35 * dpr })
          }
        }
        initParts()
        const lineRGB = combined ? '228,224,244' : '244,239,230'
        const lineMax = combined ? 0.36 : 0.42
        draws.push(() => {
          const w = c2.width, h = c2.height, mx = mouse.x * w, my = mouse.y * h
          if (combined) {
            ctx.clearRect(0, 0, w, h)
          } else {
            ctx.fillStyle = '#0E0B12'
            ctx.fillRect(0, 0, w, h)
            if (mouse.on) {
              const g = ctx.createRadialGradient(mx, my, 0, mx, my, 240 * dpr)
              g.addColorStop(0, 'rgba(255,107,53,0.16)')
              g.addColorStop(1, 'rgba(255,107,53,0)')
              ctx.fillStyle = g
              ctx.fillRect(0, 0, w, h)
            }
          }
          const D = 132 * dpr
          for (let i = 0; i < parts.length; i++) {
            const a = parts[i]
            a.x += a.vx; a.y += a.vy
            if (a.x < 0) a.x += w; if (a.x > w) a.x -= w
            if (a.y < 0) a.y += h; if (a.y > h) a.y -= h
            if (mouse.on) {
              const dx = mx - a.x, dy = my - a.y, d = Math.hypot(dx, dy)
              if (d < 170 * dpr && d > 0) { a.x += (dx / d) * 0.4; a.y += (dy / d) * 0.4 }
            }
          }
          for (let i = 0; i < parts.length; i++) {
            for (let j = i + 1; j < parts.length; j++) {
              const a = parts[i], b = parts[j]
              const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy)
              if (d < D) {
                ctx.strokeStyle = 'rgba(' + lineRGB + ',' + (lineMax * (1 - d / D)) + ')'
                ctx.lineWidth = 1
                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
              }
            }
          }
          for (const a of parts) {
            let near = false
            if (mouse.on && Math.hypot(mx - a.x, my - a.y) < 170 * dpr) {
              near = true
              ctx.strokeStyle = 'rgba(255,140,70,0.6)'
              ctx.lineWidth = 1
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke()
            }
            ctx.fillStyle = near ? '#FF6B35' : 'rgba(248,244,236,0.95)'
            ctx.beginPath(); ctx.arc(a.x, a.y, near ? 2.5 * dpr : 1.6 * dpr, 0, 6.29); ctx.fill()
          }
        })
      }
    }

    // ---------------- nebula ----------------
    if (useNebula) {
      const ctx = c2.getContext('2d')
      if (ctx) {
        type B = { x: number; y: number; vx: number; vy: number; r: number; c: number[] }
        const cols = [[255, 107, 53], [123, 58, 180], [201, 169, 97], [180, 50, 122], [40, 20, 90]]
        const base = Math.min(c2.width, c2.height)
        const blobs: B[] = cols.map((c) => ({
          x: Math.random() * c2.width, y: Math.random() * c2.height,
          vx: (Math.random() - 0.5) * 0.25 * dpr, vy: (Math.random() - 0.5) * 0.25 * dpr,
          r: base * (0.55 + Math.random() * 0.35), c,
        }))
        draws.push(() => {
          const w = c2.width, h = c2.height, mx = mouse.x * w, my = mouse.y * h
          ctx.globalCompositeOperation = 'source-over'
          ctx.fillStyle = '#0B0810'
          ctx.fillRect(0, 0, w, h)
          ctx.globalCompositeOperation = 'lighter'
          for (const b of blobs) {
            b.x += b.vx; b.y += b.vy
            if (b.x < 0 || b.x > w) b.vx *= -1
            if (b.y < 0 || b.y > h) b.vy *= -1
            if (mouse.on) {
              const dx = b.x - mx, dy = b.y - my, d = Math.hypot(dx, dy)
              if (d < b.r) { b.x += (dx / (d + 1)) * 1.2; b.y += (dy / (d + 1)) * 1.2 }
            }
            const rgb = b.c[0] + ',' + b.c[1] + ',' + b.c[2]
            const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
            g.addColorStop(0, 'rgba(' + rgb + ',0.42)')
            g.addColorStop(0.5, 'rgba(' + rgb + ',0.12)')
            g.addColorStop(1, 'rgba(' + rgb + ',0)')
            ctx.fillStyle = g
            ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.29); ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'
          const vg = ctx.createRadialGradient(w * 0.5, h * 0.45, h * 0.2, w * 0.5, h * 0.5, h * 0.95)
          vg.addColorStop(0, 'rgba(11,8,16,0)')
          vg.addColorStop(1, 'rgba(11,8,16,0.6)')
          ctx.fillStyle = vg
          ctx.fillRect(0, 0, w, h)
        })
      }
    }

    // ---------------- loop + guards ----------------
    let raf = 0
    let visible = true
    const render = (tm: number) => { for (const d of draws) d(tm) }
    const frame = (tm: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08
      render(tm)
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame) }
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0 } }

    window.addEventListener('resize', size)

    if (reduced) {
      render(0)
      return () => {
        wrap.removeEventListener('pointermove', onMove)
        wrap.removeEventListener('pointerleave', onLeave)
        window.removeEventListener('resize', size)
      }
    }

    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting
      if (visible) start(); else stop()
    }, { threshold: 0.01 })
    io.observe(wrap)
    const onVis = () => { if (document.hidden) stop(); else start() }
    document.addEventListener('visibilitychange', onVis)
    start()

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', size)
    }
  }, [variant])

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <canvas ref={glRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', transition: 'opacity 400ms ease' }} />
      <canvas ref={c2Ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', transition: 'opacity 400ms ease' }} />
    </div>
  )
}
