"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

// ─── Topo layer config ────────────────────────────────────────────────────────
const LAYERS = [
  { id: 0, scaleX: 840, scaleY: 440, waviness: 22, speed: 0.028, opacity: 0.12, stroke: 1.1, seed: 1.1 },
  { id: 1, scaleX: 700, scaleY: 360, waviness: 18, speed: 0.022, opacity: 0.16, stroke: 1.0, seed: 2.3 },
  { id: 2, scaleX: 560, scaleY: 285, waviness: 15, speed: 0.016, opacity: 0.20, stroke: 0.9, seed: 3.7 },
  { id: 3, scaleX: 430, scaleY: 215, waviness: 12, speed: 0.011, opacity: 0.26, stroke: 0.85, seed: 4.2 },
  { id: 4, scaleX: 310, scaleY: 155, waviness: 9,  speed: 0.007, opacity: 0.32, stroke: 0.8, seed: 5.9 },
  { id: 5, scaleX: 200, scaleY:  98, waviness: 6,  speed: 0.004, opacity: 0.40, stroke: 0.75, seed: 6.4 },
  { id: 6, scaleX:  98, scaleY:  48, waviness: 4,  speed: 0.002, opacity: 0.55, stroke: 0.7, seed: 7.1 },
];

// ─── Generate organic topographic path ───────────────────────────────────────
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

// ─── Animated grain overlay via canvas ───────────────────────────────────────
function GrainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = (Math.random() * 28) | 0; // very subtle alpha
      }
      ctx.putImageData(img, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "overlay", opacity: 0.55 }}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HalideTopoHero() {
  const [vw, setVw] = useState(1440);
  const [vh, setVh] = useState(900);
  const cx = vw / 2;
  const cy = vh / 2;

  // Smooth spring mouse position
  const rawX = useRef(0);
  const rawY = useRef(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const springConfig = { stiffness: 60, damping: 20 };
  const mx = useSpring(0, springConfig);
  const my = useSpring(0, springConfig);

  useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onMove = useCallback((e: React.MouseEvent) => {
    const dx = e.clientX - vw / 2;
    const dy = e.clientY - vh / 2;
    mx.set(dx);
    my.set(dy);
    rawX.current = dx;
    rawY.current = dy;
  }, [mx, my, vw, vh]);

  // Sync spring values → state for SVG transforms
  useEffect(() => {
    const unsub = mx.on("change", (v) => setMouse(prev => ({ ...prev, x: v })));
    return unsub;
  }, [mx]);
  useEffect(() => {
    const unsub = my.on("change", (v) => setMouse(prev => ({ ...prev, y: v })));
    return unsub;
  }, [my]);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]"
      onMouseMove={onMove}
    >
      {/* ── SVG topographic layers ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${vw} ${vh}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Vignette radial gradient */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#080808" stopOpacity="0" />
            <stop offset="100%" stopColor="#080808" stopOpacity="0.92" />
          </radialGradient>
          {/* Subtle glow at center */}
          <radialGradient id="glow" cx="50%" cy="50%" r="35%">
            <stop offset="0%" stopColor="#e8e8e8" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#080808" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <ellipse cx={cx} cy={cy} rx={vw * 0.4} ry={vh * 0.4} fill="url(#glow)" />

        {/* Topo contour layers */}
        {LAYERS.map((layer) => {
          const tx = mouse.x * layer.speed;
          const ty = mouse.y * layer.speed;
          const d = buildPath(cx + tx, cy + ty, layer.scaleX, layer.scaleY, layer.waviness, layer.seed);
          return (
            <path
              key={layer.id}
              d={d}
              fill="none"
              stroke="white"
              strokeWidth={layer.stroke}
              opacity={layer.opacity}
            />
          );
        })}

        {/* Vignette */}
        <rect x={0} y={0} width={vw} height={vh} fill="url(#vignette)" />
      </svg>

      {/* ── Film grain overlay ── */}
      <GrainCanvas />

      {/* ── Hero text ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.35em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-white/40 text-xs font-light tracking-[0.45em] uppercase mb-6"
        >
          davidcjw.com
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-6xl sm:text-8xl font-bold tracking-tight leading-none mb-4"
          style={{ fontFamily: "var(--font-figtree)" }}
        >
          David Chong
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="h-px w-32 bg-white/20 mb-4 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          className="text-white/50 text-sm sm:text-base font-light tracking-widest uppercase"
        >
          Software Engineer
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.3 }}
          className="text-white/30 text-sm mt-5 max-w-xs leading-relaxed font-light"
        >
          From economics to AI to cloud infrastructure — a non-linear journey through tech.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex gap-5 mt-10"
        >
          <a
            href="#experience"
            className="px-7 py-2.5 border border-white/20 text-white/70 hover:text-white hover:border-white/50 text-xs tracking-widest uppercase transition-all duration-300"
          >
            Experience
          </a>
          <a
            href="#portfolio"
            className="px-7 py-2.5 bg-white/8 border border-white/10 text-white/60 hover:bg-white/15 hover:text-white text-xs tracking-widest uppercase transition-all duration-300"
          >
            Portfolio
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
        />
        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
