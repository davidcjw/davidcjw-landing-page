"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContainerScrollProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function ContainerScroll({ header, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.45], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.86, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.28], [0, -40]);
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-start pt-20 overflow-hidden">
        {/* Header text fades out as card comes in */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-10 px-4"
        >
          {header}
        </motion.div>

        {/* 3D perspective container */}
        <div style={{ perspective: "1000px" }} className="w-full max-w-5xl px-4">
          <motion.div
            style={{ rotateX, scale, opacity: cardOpacity }}
            className="w-full rounded-2xl border border-white/10 bg-gray-800/60 backdrop-blur-sm shadow-2xl overflow-hidden"
          >
            {/* Gradient top border */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="p-6 sm:p-10 max-h-[72vh] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-transparent">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
