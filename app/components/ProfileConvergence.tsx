'use client'

import { useEffect, useRef } from 'react'
import { HeroFluidCanvas } from './HeroFluidCanvas'

// Profile "convergence": five proven capabilities fly in and coalesce on a gold-ringed AI GTM hub.
// Ported from the reviewed alt-preview (validated across viewports). Replays on each scroll-in, then
// drifts gently; reduced-motion and returning visitors get the settled map instantly. Labels are DOM
// (crisp, selectable, readable by crawlers); the canvas draws only the particle field, connectors and hub.
// Every claim below sits inside the verified fact base. Copy is Siddhanth's to adjust.
type NodeCopy = { cap: string; prov: string }
const NODES: NodeCopy[] = [
  { cap: 'Consumer insight', prov: 'Slurrp Farm · Epigamia' },
  { cap: 'Pitching and sales', prov: 'Schbang · ~50% win rate' },
  { cap: 'Brand and 0-to-1 GTM', prov: "Zomato · Founder's Award AI campaign" },
  { cap: 'Shipping AI', prov: 'Four AI products built' },
  { cap: 'Strategy', prov: 'Schbang · Oxford MBA' },
]
const ANGLES = [-90, -18, 54, 126, 198]

type LNode = { angle: number; x: number; y: number }
type LLabel = { x: number; y: number; w: number; h: number; align: 'left' | 'right' | 'center' }
type Layout = { cx: number; cy: number; rx: number; ry: number; nodes: LNode[]; labels: LLabel[]; ringR: number }
type Dot = {
  kind: 'core' | 'sat' | 'dust'; node: number; hx: number; hy: number; from: { x: number; y: number }
  r: number; a: number; delay: number; dur: number; dAmp: number; dW: number; dP: number; tW: number; tP: number
}

export function ProfileConvergence() {
  const fieldRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const centerLabelRef = useRef<HTMLDivElement | null>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const field = fieldRef.current
    const canvas = canvasRef.current
    const centerLabel = centerLabelRef.current
    if (!field || !canvas || !centerLabel) return
    const ctxMaybe = canvas.getContext('2d')
    if (!ctxMaybe) return
    const ctx = ctxMaybe
    const labelEls = labelRefs.current

    const cream = (a: number) => `rgba(244,239,230,${a})`
    const gold = (a: number) => `rgba(201,169,97,${a})`
    const tang = (a: number) => `rgba(255,107,53,${a})`

    // pure layout: node ellipse + non-overlapping label boxes. Mirrors the reviewed preview.
    function layoutConvergence(w: number, h: number, boxHs?: number[]): Layout {
      const stack = w < 960
      const bw = w < 640 ? 150 : w < 960 ? 170 : 205
      const pad = 10
      const nodeR = 9
      const gap = 14
      const cx = w / 2
      const cy = h * 0.52
      const ringR = w < 640 ? 30 : 36
      const sideNeed = nodeR + gap + bw + pad
      const rx = stack
        ? Math.max(118, Math.min(w * 0.335, 400))
        : Math.max(150, Math.min(w * 0.335, 400, (w / 2 - sideNeed) / 0.951))
      const ry = Math.max(150, Math.min(h * 0.315, 285))
      const nodes: LNode[] = ANGLES.map((a) => {
        const r = (a * Math.PI) / 180
        return { angle: a, x: cx + rx * Math.cos(r), y: cy + ry * Math.sin(r) }
      })
      const hs = boxHs || nodes.map(() => (w < 640 ? 74 : w < 960 ? 66 : 56))
      const labels: LLabel[] = nodes.map((n, i) => {
        const bh = hs[i]
        let x: number, y: number
        let align: 'left' | 'right' | 'center'
        if (n.angle === -90) {
          x = n.x - bw / 2; y = n.y - nodeR - gap - bh; align = 'center'
        } else if (stack) {
          if (n.angle === -18) { x = Math.min(n.x + bw * 0.6, w - pad) - bw; y = n.y - nodeR - 12 - bh; align = 'right' }
          else if (n.angle === 54) { x = Math.min(n.x + bw * 0.6, w - pad) - bw; y = n.y + nodeR + 12; align = 'right' }
          else if (n.angle === 126) { x = Math.max(n.x - bw * 0.6, pad); y = n.y + nodeR + 12; align = 'left' }
          else { x = Math.max(n.x - bw * 0.6, pad); y = n.y - nodeR - 12 - bh; align = 'left' }
        } else {
          if (n.angle === -18) { x = n.x + nodeR + gap; y = n.y - bh * 0.65; align = 'left' }
          else if (n.angle === 54) { x = n.x + nodeR * 0.5; y = n.y + nodeR + gap; align = 'left' }
          else if (n.angle === 126) { x = n.x - bw - nodeR * 0.5; y = n.y + nodeR + gap; align = 'right' }
          else { x = n.x - nodeR - gap - bw; y = n.y - bh * 0.65; align = 'right' }
        }
        x = Math.max(pad, Math.min(x, w - pad - bw))
        y = Math.max(pad, Math.min(y, h - pad - bh))
        return { x, y, w: bw, h: bh, align }
      })
      return { cx, cy, rx, ry, nodes, labels, ringR }
    }

    const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // canAutoplay: motion allowed. The entrance replays on every scroll-in (see the observer).
    const canAutoplay = motionOK

    let W = 0, H = 0, DPR = 1
    let layout: Layout | null = null
    let dots: Dot[] = []
    let phase: 'idle' | 'playing' | 'settled' = 'idle'
    let running = false
    let inView = true
    let clockT0 = 0, pausedAccum = 0, pausedAt: number | null = null
    let sparkIdx = 4, sparkStart = -10
    const SPARK_EVERY = 2.4, SPARK_LIFE = 1.7, PLAY_LEN = 1.95

    let seed = 1234567
    const srand = () => { seed = 1234567 }
    const rand = (a: number, b: number) => { seed = (seed * 1664525 + 1013904223) % 4294967296; return a + (seed / 4294967296) * (b - a) }
    const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3)
    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

    function placeLabels() {
      const est = layoutConvergence(W, H)
      labelEls.forEach((el, i) => { if (!el) return; el.style.width = est.labels[i].w + 'px'; el.style.textAlign = est.labels[i].align })
      const measured = labelEls.map((el) => (el ? el.offsetHeight || 60 : 60))
      layout = layoutConvergence(W, H, measured)
      labelEls.forEach((el, i) => {
        if (!el || !layout) return
        const L = layout.labels[i]
        el.style.left = L.x + 'px'; el.style.top = L.y + 'px'; el.style.width = L.w + 'px'; el.style.textAlign = L.align
      })
      if (layout && centerLabel) { centerLabel.style.left = layout.cx + 'px'; centerLabel.style.top = layout.cy + 'px' }
    }

    function scatterFrom(hx: number, hy: number) {
      if (!layout) return { x: hx, y: hy }
      const dx = hx - layout.cx, dy = hy - layout.cy
      const len = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
      let ux = dx / len, uy = dy / len
      if (len < 20) { const a = rand(0, Math.PI * 2); ux = Math.cos(a); uy = Math.sin(a) }
      const d = rand(90, 300)
      return { x: hx + ux * d + rand(-40, 40), y: hy + uy * d + rand(-40, 40) }
    }

    function buildDots() {
      if (!layout) return
      srand()
      dots = []
      const mobile = W < 640
      const satsPerNode = mobile ? 9 : 12
      const dustCount = mobile ? 14 : 22
      layout.nodes.forEach((n, ni) => {
        dots.push({ kind: 'core', node: ni, hx: n.x, hy: n.y, from: scatterFrom(n.x, n.y), r: 3.4, a: 0.95, delay: rand(0.05, 0.3), dur: rand(1.0, 1.3), dAmp: 1.6, dW: rand(0.18, 0.32), dP: rand(0, 6.3), tW: 0, tP: 0 })
        for (let s = 0; s < satsPerNode; s++) {
          const ang = rand(0, Math.PI * 2), rr = rand(7, 24)
          const hx = n.x + Math.cos(ang) * rr, hy = n.y + Math.sin(ang) * rr
          dots.push({ kind: 'sat', node: ni, hx, hy, from: scatterFrom(hx, hy), r: rand(0.9, 2.1), a: rand(0.24, 0.55), delay: rand(0, 0.45), dur: rand(0.95, 1.35), dAmp: rand(3.5, 7.5), dW: rand(0.18, 0.5), dP: rand(0, 6.3), tW: rand(0, 1) < 0.35 ? rand(0.6, 1.4) : 0, tP: rand(0, 6.3) })
        }
      })
      for (let d2 = 0; d2 < dustCount; d2++) {
        const da = rand(0, Math.PI * 2), ds = rand(0.55, 1.2)
        const dhx = layout.cx + Math.cos(da) * layout.rx * ds
        const dhy = layout.cy + Math.sin(da) * layout.ry * ds
        dots.push({ kind: 'dust', node: -2, hx: dhx, hy: dhy, from: scatterFrom(dhx, dhy), r: rand(0.7, 1.3), a: rand(0.08, 0.16), delay: rand(0, 0.4), dur: rand(1.0, 1.4), dAmp: rand(3, 7), dW: rand(0.1, 0.25), dP: rand(0, 6.3), tW: 0, tP: 0 })
      }
    }

    function lineEnd(n: LNode) {
      if (!layout) return { x: n.x, y: n.y }
      const dx = layout.cx - n.x, dy = layout.cy - n.y
      const len = Math.sqrt(dx * dx + dy * dy)
      const stop = (len - layout.ringR - 4) / len
      return { x: n.x + dx * stop, y: n.y + dy * stop }
    }

    function draw(t: number, playT: number) {
      if (!layout) return
      ctx.clearRect(0, 0, W, H)
      const playing = phase === 'playing'
      let px: number, py: number, alpha: number

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        if (d.kind === 'core') continue
        if (playing) {
          const p = easeOutCubic(clamp01((playT - d.delay) / d.dur))
          px = d.from.x + (d.hx - d.from.x) * p; py = d.from.y + (d.hy - d.from.y) * p; alpha = d.a * p
        } else {
          px = d.hx + Math.sin(t * d.dW + d.dP) * d.dAmp; py = d.hy + Math.cos(t * d.dW * 0.8 + d.dP * 1.7) * d.dAmp
          alpha = d.a * (d.tW ? 0.72 + 0.28 * Math.sin(t * d.tW + d.tP) : 1)
        }
        if (alpha <= 0.005) continue
        ctx.beginPath(); ctx.arc(px, py, d.r, 0, 6.2832); ctx.fillStyle = cream(alpha); ctx.fill()
      }

      for (let i = 0; i < layout.nodes.length; i++) {
        const n = layout.nodes[i]
        const lp = playing ? easeOutCubic(clamp01((playT - 1.05 - i * 0.09) / 0.45)) : 1
        if (lp <= 0) continue
        const end = lineEnd(n)
        ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(n.x + (end.x - n.x) * lp, n.y + (end.y - n.y) * lp)
        ctx.strokeStyle = cream(0.13); ctx.lineWidth = 1; ctx.stroke()
      }

      if (!playing && motionOK) {
        let since = t - sparkStart
        if (since > SPARK_EVERY) { sparkStart = t; sparkIdx = (sparkIdx + 1) % 5; since = 0 }
        const q = clamp01(since / SPARK_LIFE)
        if (q > 0 && q < 1) {
          const sn = layout.nodes[sparkIdx], se = lineEnd(sn)
          const sx = sn.x + (se.x - sn.x) * q, sy = sn.y + (se.y - sn.y) * q
          ctx.beginPath(); ctx.arc(sx, sy, 1.8, 0, 6.2832); ctx.fillStyle = tang(0.55 * Math.sin(Math.PI * q)); ctx.fill()
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        if (d.kind !== 'core') continue
        if (playing) {
          const cp = easeOutCubic(clamp01((playT - d.delay) / d.dur))
          px = d.from.x + (d.hx - d.from.x) * cp; py = d.from.y + (d.hy - d.from.y) * cp; alpha = 0.95 * cp
        } else {
          px = d.hx + Math.sin(t * d.dW + d.dP) * d.dAmp; py = d.hy + Math.cos(t * d.dW * 0.8 + d.dP) * d.dAmp; alpha = 0.95
        }
        if (alpha <= 0.01) continue
        ctx.beginPath(); ctx.arc(px, py, 6.5, 0, 6.2832); ctx.fillStyle = cream(0.08 * (alpha / 0.95)); ctx.fill()
        ctx.beginPath(); ctx.arc(px, py, d.r, 0, 6.2832); ctx.fillStyle = cream(alpha); ctx.fill()
      }

      const centerIn = playing ? easeOutCubic(clamp01((playT - 0.25) / 1.0)) : 1
      if (centerIn > 0) {
        const breathe = playing ? 0 : Math.sin(t * 0.5) * 0.6
        const rr = layout.ringR * (0.6 + 0.4 * centerIn) + breathe
        const glowR = layout.ringR * 2.4
        const g = ctx.createRadialGradient(layout.cx, layout.cy, layout.ringR * 0.4, layout.cx, layout.cy, glowR)
        g.addColorStop(0, gold(0.12 * centerIn)); g.addColorStop(1, gold(0))
        ctx.beginPath(); ctx.arc(layout.cx, layout.cy, glowR, 0, 6.2832); ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(layout.cx, layout.cy, rr, 0, 6.2832); ctx.strokeStyle = gold(0.85 * centerIn); ctx.lineWidth = 1.5; ctx.stroke()
      }
    }

    function showLabels(instant?: boolean) {
      if (instant) field!.classList.add('pc-instant')
      labelEls.forEach((el) => el && el.classList.add('on'))
      centerLabel!.classList.add('on')
      if (instant) { void field!.offsetWidth; setTimeout(() => field!.classList.remove('pc-instant'), 60) }
    }
    function revealByClock(playT: number) {
      if (playT > 0.7) centerLabel!.classList.add('on')
      labelEls.forEach((el, i) => { if (el && playT > 0.95 + i * 0.11) el.classList.add('on') })
    }

    const nowMs = () => performance.now()
    const elapsed = () => (nowMs() - clockT0 - pausedAccum) / 1000

    let raf = 0
    function frame() {
      if (!running) return
      const t = elapsed()
      if (phase === 'playing') {
        draw(t, t); revealByClock(t)
        if (t >= PLAY_LEN) { phase = 'settled'; showLabels() }
      } else {
        draw(t, PLAY_LEN)
        if (!motionOK) { running = false; return }
      }
      raf = requestAnimationFrame(frame)
    }
    function start() { if (running) return; if (pausedAt !== null) { pausedAccum += nowMs() - pausedAt; pausedAt = null }; running = true; raf = requestAnimationFrame(frame) }
    function stop() { if (!running) return; running = false; pausedAt = nowMs(); if (raf) { cancelAnimationFrame(raf); raf = 0 } }

    function settleInstantly() {
      phase = 'settled'; clockT0 = nowMs(); pausedAccum = 0; pausedAt = null
      draw(0, PLAY_LEN); showLabels(true)
      if (motionOK && inView && !document.hidden) start()
    }
    function play() {
      phase = 'playing'; clockT0 = nowMs(); pausedAccum = 0; pausedAt = null; sparkStart = -10
      field!.classList.add('pc-instant')
      labelEls.forEach((el) => el && el.classList.remove('on')); centerLabel!.classList.remove('on')
      void field!.offsetWidth; field!.classList.remove('pc-instant')
      if (inView && !document.hidden) start(); else pausedAt = nowMs()
    }

    function paintStatic() {
      if (phase === 'idle' && canAutoplay) { phase = 'playing'; draw(0, 0); phase = 'idle' }
      else draw(motionOK ? elapsed() : 0, PLAY_LEN)
    }
    function resize() {
      const rect = field!.getBoundingClientRect()
      W = Math.round(rect.width); H = Math.round(rect.height)
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = W * DPR; canvas!.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      placeLabels(); buildDots()
      if (phase === 'playing') { phase = 'settled'; showLabels(true) }
      paintStatic()
    }

    resize()
    if (!canAutoplay) settleInstantly()

    // Replay the entrance every time the section scrolls back into view. armed flips true once the
    // section fully leaves, so a scroll-past replays exactly once, not on every ratio wobble.
    let armed = true
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        inView = en.isIntersecting
        if (!en.isIntersecting) { armed = true; stop(); return }
        if (armed && motionOK && en.intersectionRatio >= 0.3) { armed = false; play(); return }
        if (phase === 'settled' && !document.hidden) start()
      })
    }, { threshold: [0, 0.3] })
    io.observe(field)

    const onVis = () => { if (document.hidden) stop(); else if (inView && (phase === 'playing' || (phase === 'settled' && motionOK))) start() }
    document.addEventListener('visibilitychange', onVis)

    let ro: ResizeObserver | null = null
    if (window.ResizeObserver) { ro = new ResizeObserver(() => resize()); ro.observe(field) }
    else window.addEventListener('resize', resize)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => resize())

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      if (ro) ro.disconnect(); else window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="profile-section"
      aria-label="Profile: five proven capabilities converge on AI go-to-market"
      style={{
        position: 'relative',
        overflow: 'hidden',
        // faint gold lift (echoing the hub) so the section is not flat black; ink token elsewhere
        background: 'radial-gradient(120% 100% at 50% 46%, rgba(201,169,97,0.05) 0%, var(--color-ink) 62%)',
        padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(2.5rem, 5vw, 4rem)',
      }}
    >
      <div className="pc-fluid" aria-hidden="true">
        <HeroFluidCanvas variant="aurora" />
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--color-tangerine)',
            margin: '0 0 1rem',
          }}
        >
          profile
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 400,
            fontSize: 'clamp(1.7rem, 4.4vw, 3.1rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            color: 'var(--color-cream)',
            margin: 0,
          }}
        >
          AI GTM wasn&rsquo;t a pivot for me. I&rsquo;d spent five years doing the pieces.
        </h2>
      </div>

      <div ref={fieldRef} className="pc-field" aria-hidden="true">
        <canvas ref={canvasRef} />
        <div className="pc-labels">
          {NODES.map((n, i) => (
            <div key={n.cap} className="pc-node-label" ref={(el) => { labelRefs.current[i] = el }}>
              <div className="pc-bob">
                <span className="pc-cap">{n.cap}</span>
                <span className="pc-prov">{n.prov}</span>
              </div>
            </div>
          ))}
        </div>
        <div ref={centerLabelRef} className="pc-center-label">AI GTM</div>
      </div>

      {/* accessible, crawlable equivalent of the visual map */}
      <p className="sr-only">
        Five proven capabilities converge on AI go-to-market: Consumer insight (Slurrp Farm, Epigamia);
        Pitching and sales (Schbang, roughly 50% win rate); Brand and 0-to-1 go-to-market (Zomato,
        Founder&rsquo;s Award AI campaign); Shipping AI (four AI products built); Strategy (Schbang, Oxford MBA).
      </p>

      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <a href="/profile" className="pc-deeper">
          the full path
          <span aria-hidden="true" style={{ marginLeft: 8 }}>&#8594;</span>
        </a>
      </div>

      <style>{`
        .pc-fluid { position: absolute; inset: 0; z-index: 0; opacity: 0.16; pointer-events: none; -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 32%, rgba(0,0,0,0.28) 68%, rgba(0,0,0,0.12) 100%); mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 32%, rgba(0,0,0,0.28) 68%, rgba(0,0,0,0.12) 100%); }
        .pc-field {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1240px;
          height: clamp(460px, 72vh, 760px);
          margin: clamp(0.5rem, 2vw, 1.5rem) auto 0;
        }
        .pc-field canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .pc-labels { position: absolute; inset: 0; pointer-events: none; }
        .pc-node-label { position: absolute; opacity: 0; transform: translateY(6px); transition: opacity 600ms ease, transform 600ms ease; }
        .pc-node-label.on { opacity: 1; transform: translateY(0); }
        .pc-node-label .pc-bob { animation: pc-bob 9s ease-in-out infinite alternate; }
        .pc-node-label:nth-child(2) .pc-bob { animation-duration: 11s; animation-delay: -3s; }
        .pc-node-label:nth-child(3) .pc-bob { animation-duration: 8s; animation-delay: -5s; }
        .pc-node-label:nth-child(4) .pc-bob { animation-duration: 10s; animation-delay: -2s; }
        .pc-node-label:nth-child(5) .pc-bob { animation-duration: 12s; animation-delay: -6s; }
        @keyframes pc-bob { from { transform: translateY(-1.5px); } to { transform: translateY(1.5px); } }
        .pc-cap { display: block; font-family: var(--font-fraunces), serif; font-weight: 400; font-size: 13.5px; line-height: 1.3; color: rgba(244,239,230,0.92); }
        .pc-prov { display: block; margin-top: 5px; font-family: var(--font-jetbrains-mono), monospace; font-size: 10px; line-height: 1.5; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(201,169,97,0.85); }
        @media (min-width: 960px) { .pc-cap { font-size: 15px; } .pc-prov { font-size: 10.5px; } }
        .pc-center-label { position: absolute; font-family: var(--font-fraunces), serif; font-weight: 400; font-size: 14px; letter-spacing: 0.02em; color: var(--color-cream); transform: translate(-50%, -50%); opacity: 0; transition: opacity 700ms ease 150ms; pointer-events: none; white-space: nowrap; }
        @media (min-width: 640px) { .pc-center-label { font-size: 16px; } }
        .pc-center-label.on { opacity: 1; }
        .pc-instant .pc-node-label, .pc-instant .pc-center-label { transition: none; }
        .pc-deeper { display: inline-block; margin-top: clamp(0.5rem, 2vw, 1rem); font-family: var(--font-jetbrains-mono), monospace; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-cream-muted); text-decoration: none; transition: color 200ms ease; }
        .pc-deeper:hover, .pc-deeper:focus-visible { color: var(--color-tangerine); }
        @media (prefers-reduced-motion: reduce) {
          .pc-node-label, .pc-center-label { transition: none; }
          .pc-node-label .pc-bob { animation: none; }
        }
      `}</style>
    </section>
  )
}
