"use client";

import { motion } from "framer-motion";

interface ExperienceCardProps {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tech: string[];
  index: number;
}

export default function ExperienceCard({
  role,
  company,
  period,
  bullets,
  tech,
  index,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 to-indigo-500/5 last:bg-none" />

      {/* Timeline dot */}
      <div className="absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full bg-indigo-500 ring-2 ring-gray-800 ring-offset-0" />

      {/* Card */}
      <div className="bg-gray-900/60 border border-white/8 rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
          <div>
            <h3 className="text-white font-semibold text-base">{role}</h3>
            <p className="text-indigo-400 text-sm font-medium">{company}</p>
          </div>
          <span className="text-gray-500 text-xs shrink-0">{period}</span>
        </div>

        <ul className="space-y-1.5 mb-4">
          {bullets.map((b, i) => (
            <li key={i} className="text-gray-400 text-sm leading-relaxed flex gap-2">
              <span className="text-indigo-500 mt-1 shrink-0">›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-xs rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
