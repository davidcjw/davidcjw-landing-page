"use client";

import { motion } from "framer-motion";
import DotGrid from "../../blocks/Backgrounds/DotGrid/DotGrid";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* DotGrid background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <DotGrid
          baseColor="#3730a3"
          activeColor="#a5b4fc"
          dotSize={12}
          gap={28}
          proximity={120}
          shockRadius={220}
          shockStrength={3}
          resistance={900}
          returnDuration={1.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4"
        >
          Hey, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-bold text-white mb-4 leading-tight"
        >
          David Chong
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-xl sm:text-2xl text-indigo-300 font-medium mb-6"
        >
          Software Engineer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed"
        >
          A self-taught engineer passionate about building products with real-world impact.
          From economics to finance, AI to cloud infrastructure — my journey has been anything but linear.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex gap-4 mt-8"
        >
          <a
            href="#experience"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-full transition-colors"
          >
            View Experience
          </a>
          <a
            href="#portfolio"
            className="px-6 py-3 border border-white/20 hover:border-indigo-400 text-gray-300 hover:text-white text-sm font-medium rounded-full transition-colors"
          >
            See Portfolio
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-indigo-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
