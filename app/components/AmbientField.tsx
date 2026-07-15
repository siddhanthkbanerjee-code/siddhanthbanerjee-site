'use client'

import { useEffect, useRef } from 'react'

// A quiet, continuous undercurrent of the hero's fluid motif, for use behind any section
// or page so the whole site feels like one holistic experience. Transparent (overlays the
// section's own background), dim, and cursor-reactive: dots near the pointer are pulled toward
// it and branch to it, echoing the hero constellation while staying a background whisper.
// Canvas2D only, so it is cheap; paused when offscreen or when the tab is hidden, and a single
// static frame under prefers-reduced-motion (no pointer reactivity then). On touch devices
// there is no hover pointer to react to, so the pointer listeners are skipped entirely and
// the particle count and DPR both drop, since touch is also the more battery-constrained case.
export function AmbientField({ opacity = 0.5 }: { opacity?: number }) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const c = canvasRef.current
    if (!wrap || !c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.2 : 1.5)
    let W = 1
    let H = 1

    // Pointer in canvas device px. on=0 until the pointer is over this field's box, so the
    // branch effect only fires where the field actually sits.
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: 0 }

    const size = () => {
      const r = wrap.getBoundingClientRect()
      W = Math.max(1, Math.floor(r.width))
      H = Math.max(1, Math.floor(r.height))
      c.width = Math.floor(W * dpr)
      c.height = Math.floor(H * dpr)
      init()
    }

    type P = { x: number; y: number; vx: number; vy: number }
    let parts: P[] = []
    type G = { x: number; y: number; vx: number; vy: number; r: number; col: number[] }
    let glows: G[] = []

    function init() {
      const cap = isTouch ? 40 : 70
      const divisor = isTouch ? 34000 : 26000
      const n = Math.round(Math.min(cap, (c!.width * c!.height) / (divisor * dpr)))
      parts = []
      for (let i = 0; i < n; i++) {
        parts.push({
          x: Math.random() * c!.width, y: Math.random() * c!.height,
          vx: (Math.random() - 0.5) * 0.22 * dpr, vy: (Math.random() - 0.5) * 0.22 * dpr,
        })
      }
      const base = Math.min(c!.width, c!.height)
      glows = [
        { x: c!.width * 0.2, y: c!.height * 0.3, vx: 0.12 * dpr, vy: 0.08 * dpr, r: base * 0.7, col: [255, 107, 53] },
        { x: c!.width * 0.8, y: c!.height * 0.7, vx: -0.1 * dpr, vy: -0.09 * dpr, r: base * 0.75, col: [123, 58, 180] },
      ]
    }
    size()

    // Listen on window (works despite pointer-events:none) and map into this field's local
    // space. Outside the box, on=0 so the field just drifts. Skipped entirely on touch,
    // where there is no hover pointer to track.
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      if (!inside) { mouse.on = 0; return }
      mouse.tx = (e.clientX - r.left) * dpr
      mouse.ty = (e.clientY - r.top) * dpr
      if (!mouse.on) { mouse.x = mouse.tx; mouse.y = mouse.ty } // avoid a sweep on first entry
      mouse.on = 1
    }
    const onLeaveWin = () => { mouse.on = 0 }

    const draw = () => {
      const w = c.width, h = c.height
      // ease the pointer for a fluid feel
      mouse.x += (mouse.tx - mouse.x) * 0.12
      mouse.y += (mouse.ty - mouse.y) * 0.12
      ctx.clearRect(0, 0, w, h)
      // faint drifting color glows -- the "liquid" undercurrent
      ctx.globalCompositeOperation = 'lighter'
      for (const g of glows) {
        g.x += g.vx; g.y += g.vy
        if (g.x < 0 || g.x > w) g.vx *= -1
        if (g.y < 0 || g.y > h) g.vy *= -1
        const rgb = g.col[0] + ',' + g.col[1] + ',' + g.col[2]
        const rg = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r)
        rg.addColorStop(0, 'rgba(' + rgb + ',0.10)')
        rg.addColorStop(0.5, 'rgba(' + rgb + ',0.035)')
        rg.addColorStop(1, 'rgba(' + rgb + ',0)')
        ctx.fillStyle = rg
        ctx.beginPath(); ctx.arc(g.x, g.y, g.r, 0, 6.29); ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      // dim drifting constellation, with a gentle pull toward the pointer
      const D = 130 * dpr
      const R = 150 * dpr // pointer influence radius
      for (const a of parts) {
        a.x += a.vx; a.y += a.vy
        if (a.x < 0) a.x += w; if (a.x > w) a.x -= w
        if (a.y < 0) a.y += h; if (a.y > h) a.y -= h
        if (mouse.on) {
          const dx = mouse.x - a.x, dy = mouse.y - a.y, d = Math.hypot(dx, dy)
          if (d < R && d > 0) { a.x += (dx / d) * 0.25; a.y += (dy / d) * 0.25 }
        }
      }
      // links between nearby dots
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j]
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy)
          if (d < D) {
            ctx.strokeStyle = 'rgba(230,226,244,' + (0.16 * (1 - d / D)) + ')'
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      // dots, plus faint branches from the pointer to nearby dots
      for (const a of parts) {
        let near = false
        if (mouse.on) {
          const d = Math.hypot(mouse.x - a.x, mouse.y - a.y)
          if (d < R) {
            near = true
            ctx.strokeStyle = 'rgba(255,140,70,' + (0.38 * (1 - d / R)) + ')'
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
          }
        }
        ctx.fillStyle = near ? 'rgba(255,150,90,0.85)' : 'rgba(244,239,230,0.42)'
        ctx.beginPath(); ctx.arc(a.x, a.y, near ? 1.7 * dpr : 1.3 * dpr, 0, 6.29); ctx.fill()
      }
    }

    let raf = 0
    let visible = true
    const frame = () => { draw(); raf = requestAnimationFrame(frame) }
    const start = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame) }
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0 } }

    window.addEventListener('resize', size)

    if (reduced) {
      draw()
      return () => window.removeEventListener('resize', size)
    }

    if (!isTouch) {
      window.addEventListener('pointermove', onMove)
      window.addEventListener('blur', onLeaveWin)
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
      if (!isTouch) {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('blur', onLeaveWin)
      }
      window.removeEventListener('resize', size)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity, overflow: 'hidden' }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
