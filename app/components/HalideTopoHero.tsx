"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

// ─── Topo layer config ────────────────────────────────────────────────────────
const LAYERS = [
  { id: 0, scaleX: 840, scaleY: 440, waviness: 22, speed: 0.028, opacity: 0.10, stroke: 1.1, seed: 1.1 },
  { id: 1, scaleX: 700, scaleY: 360, waviness: 18, speed: 0.022, opacity: 0.13, stroke: 1.0, seed: 2.3 },
  { id: 2, scaleX: 560, scaleY: 285, waviness: 15, speed: 0.016, opacity: 0.16, stroke: 0.9, seed: 3.7 },
  { id: 3, scaleX: 430, scaleY: 215, waviness: 12, speed: 0.011, opacity: 0.22, stroke: 0.85, seed: 4.2 },
  { id: 4, scaleX: 310, scaleY: 155, waviness: 9,  speed: 0.007, opacity: 0.28, stroke: 0.8, seed: 5.9 },
  { id: 5, scaleX: 200, scaleY:  98, waviness: 6,  speed: 0.004, opacity: 0.36, stroke: 0.75, seed: 6.4 },
  { id: 6, scaleX:  98, scaleY:  48, waviness: 4,  speed: 0.002, opacity: 0.50, stroke: 0.7, seed: 7.1 },
];

function buildPath(cx: number, cy: number, rx: number, ry: number, waviness: number, seed: number): string {
  const pts = 80;
  const coords: string[] = [];
  for (let i = 0; i <= pts; i++) {
    const t = (i / pts) * Math.PI * 2;
    const w =
      Math.sin(t * 3 + seed) * waviness +
      Math.sin(t * 5 + seed * 1.7) * waviness * 0.45 +
      Math.sin(t * 11 + seed * 3.1) * waviness * 0.2;
    const x = cx + (rx + w) * Math.cos(t);
    const y = cy + (ry + w * 0.55) * Math.sin(t);
    coords.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return coords.join(" ") + " Z";
}

// ─── Film grain canvas ────────────────────────────────────────────────────────
function GrainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = (Math.random() * 22) | 0;
      }
      ctx.putImageData(img, 0, 0);
      raf.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "overlay", opacity: 0.45 }}
    />
  );
}

// ─── SVG Landscape panel image ────────────────────────────────────────────────
function LandscapeImage() {
  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f0f1a" />
          <stop offset="60%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0d0d15" />
        </linearGradient>
        <linearGradient id="mt1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1e30" />
          <stop offset="100%" stopColor="#0a0a12" />
        </linearGradient>
        <linearGradient id="mt2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#252538" />
          <stop offset="100%" stopColor="#0d0d1a" />
        </linearGradient>
        <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111122" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>
        {/* Subtle indigo atmospheric haze */}
        <radialGradient id="haze" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#312e81" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-sm">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="800" height="500" fill="url(#sky)" />

      {/* Distant mountain range 1 */}
      <path
        d="M0 320 L60 240 L130 270 L200 190 L280 230 L360 160 L440 200 L520 150 L600 185 L670 145 L740 170 L800 155 L800 500 L0 500 Z"
        fill="url(#mt1)"
        filter="url(#blur-sm)"
        opacity="0.7"
      />

      {/* Mid mountain range */}
      <path
        d="M0 370 L80 300 L160 330 L240 265 L310 300 L390 240 L470 275 L540 235 L620 260 L700 220 L800 245 L800 500 L0 500 Z"
        fill="url(#mt2)"
        opacity="0.85"
      />

      {/* Foreground terrain */}
      <path
        d="M0 420 L100 390 L180 410 L260 375 L340 395 L420 365 L500 385 L580 360 L660 378 L740 355 L800 370 L800 500 L0 500 Z"
        fill="url(#fg)"
      />

      {/* Atmospheric haze */}
      <rect width="800" height="500" fill="url(#haze)" />

      {/* Subtle horizontal scan lines for film texture */}
      {Array.from({ length: 25 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={i * 20}
          x2="800"
          y2={i * 20}
          stroke="white"
          strokeWidth="0.3"
          opacity="0.025"
        />
      ))}

      {/* Topo contour lines within the image */}
      <ellipse cx="400" cy="290" rx="280" ry="90" fill="none" stroke="#4f46e5" strokeWidth="0.6" opacity="0.12" />
      <ellipse cx="400" cy="290" rx="220" ry="68" fill="none" stroke="#4f46e5" strokeWidth="0.6" opacity="0.15" />
      <ellipse cx="400" cy="290" rx="160" ry="50" fill="none" stroke="#6366f1" strokeWidth="0.5" opacity="0.18" />
    </svg>
  );
}

// ─── Main hero ────────────────────────────────────────────────────────────────
export default function HalideTopoHero() {
  const [vw, setVw] = useState(1440);
  const [vh, setVh] = useState(900);
  const cx = vw / 2;
  const cy = vh / 2;

  useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Mouse tracking
  const rawMx = useSpring(0, { stiffness: 55, damping: 22 });
  const rawMy = useSpring(0, { stiffness: 55, damping: 22 });

  // Topo layer mouse state (for re-render)
  const [topoMouse, setTopoMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const u1 = rawMx.on("change", (v) => setTopoMouse(p => ({ ...p, x: v })));
    const u2 = rawMy.on("change", (v) => setTopoMouse(p => ({ ...p, y: v })));
    return () => { u1(); u2(); };
  }, [rawMx, rawMy]);

  // 3D panel rotation — more dramatic than topo layers
  const panelRotateX = useTransform(rawMy, [-vh / 2, vh / 2], [12, -12]);
  const panelRotateY = useTransform(rawMx, [-vw / 2, vw / 2], [-18, 18]);

  // Panel parallax drift
  const panelX = useTransform(rawMx, [-vw / 2, vw / 2], [-18, 18]);
  const panelY = useTransform(rawMy, [-vh / 2, vh / 2], [-10, 10]);

  const onMove = useCallback((e: React.MouseEvent) => {
    rawMx.set(e.clientX - vw / 2);
    rawMy.set(e.clientY - vh / 2);
  }, [rawMx, rawMy, vw, vh]);

  return (
    <section
      id="top"
      className="relative w-full min-h-screen overflow-hidden bg-gray-900"
      onMouseMove={onMove}
    >
      {/* ── Topo SVG background ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${vw} ${vh}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#111827" stopOpacity="0" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0.96" />
          </radialGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={cx} cy={cy} rx={vw * 0.45} ry={vh * 0.45} fill="url(#glow)" />
        {LAYERS.map((layer) => {
          const tx = topoMouse.x * layer.speed;
          const ty = topoMouse.y * layer.speed;
          return (
            <path
              key={layer.id}
              d={buildPath(cx + tx, cy + ty, layer.scaleX, layer.scaleY, layer.waviness, layer.seed)}
              fill="none"
              stroke="#818cf8"
              strokeWidth={layer.stroke}
              opacity={layer.opacity}
            />
          );
        })}
        <rect x={0} y={0} width={vw} height={vh} fill="url(#vignette)" />
      </svg>

      {/* ── Film grain ── */}
      <GrainCanvas />

      {/* ── Page content ── */}
      <div className="relative z-10 w-full h-screen flex flex-col px-8 sm:px-14 py-8">

        {/* Top bar */}
        <div className="flex justify-between items-start">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-xs font-mono tracking-widest uppercase"
          >
            davidcjw.com
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-right font-mono text-[11px] leading-relaxed"
          >
            <p className="text-indigo-400">LOCATION: SINGAPORE</p>
            <p className="text-indigo-400/70">STACK: GOLANG · K8S · REACT</p>
          </motion.div>
        </div>

        {/* Main area — text + 3D panel */}
        <div className="flex-1 flex items-center relative">

          {/* Large display name — left, behind panel */}
          <div className="absolute bottom-24 left-0 z-0 select-none leading-none">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-bold tracking-tight"
              style={{ fontSize: "clamp(4.5rem, 11vw, 9.5rem)", lineHeight: 0.92, fontFamily: "var(--font-figtree)" }}
            >
              DAVID
              <br />
              CHONG
            </motion.h1>
          </div>

          {/* 3D floating image panel — plain div for positioning so FM can't clobber translateY(-50%) */}
          <div
            className="absolute right-0 z-10"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              width: "clamp(320px, 52vw, 660px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
            {/* Perspective wrapper */}
            <div style={{ perspective: "900px" }}>
              <motion.div
                style={{
                  rotateX: panelRotateX,
                  rotateY: panelRotateY,
                  x: panelX,
                  y: panelY,
                  transformStyle: "preserve-3d",
                }}
                className="relative rounded-sm overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
              >
                {/* Image */}
                <div className="aspect-[16/10]">
                  <LandscapeImage />
                </div>

                {/* Top-edge highlight (simulates 3D surface lighting) */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
                {/* Left-edge highlight */}
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-indigo-400/20 to-transparent" />

                {/* Film-grain-style dark vignette over the image */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
                  }}
                />

                {/* Bottom caption bar */}
                <div className="absolute bottom-0 inset-x-0 px-4 py-3 flex justify-between items-end bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
                    [ Software Engineer ]
                  </p>
                  <p className="text-indigo-400/60 text-[10px] font-mono tracking-wider">
                    SG · 2026
                  </p>
                </div>
              </motion.div>
            </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-end pb-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <p className="text-white/40 text-xs font-mono tracking-widest uppercase">[ Portfolio 2026 ]</p>
            <p className="text-white/30 text-xs font-mono tracking-wider uppercase mt-0.5">
              Cloud · AI · Full Stack
            </p>
          </motion.div>

          {/* Divider line (centre) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="hidden sm:block flex-1 mx-8 h-px bg-white/10 origin-left"
          />

          <motion.a
            href="#experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="px-6 py-3 bg-white text-gray-900 text-xs font-bold tracking-[0.2em] uppercase hover:bg-indigo-100 transition-colors shrink-0"
          >
            Explore Depth
          </motion.a>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-indigo-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
