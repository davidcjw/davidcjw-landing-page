"use client";

import { motion } from "framer-motion";

interface PortfolioCardProps {
  name: string;
  description: string;
  tech: string[];
  url: string | null;
  github: string | null;
  index: number;
}

export default function PortfolioCard({
  name,
  description,
  tech,
  url,
  github,
  index,
}: PortfolioCardProps) {
  const primaryLink = url ?? github ?? "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ scale: 1.025 }}
      onClick={() => window.open(primaryLink, "_blank", "noopener,noreferrer")}
      className="group relative flex flex-col bg-gray-800/50 border border-white/8 rounded-2xl p-6 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] transition-all duration-300 cursor-pointer"
    >
      {/* Top glow on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/50 transition-all duration-500 rounded-t-2xl" />

      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-semibold text-lg group-hover:text-indigo-300 transition-colors">
          {name}
        </h3>
        <div className="flex gap-2 ml-2 shrink-0">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-500 hover:text-indigo-400 transition-colors"
            >
              <ExternalIcon />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-500 hover:text-indigo-400 transition-colors"
            >
              <GithubIcon />
            </a>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{description}</p>

      {tech.length > 0 && (
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
      )}
    </motion.div>
  );
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.836a9.57 9.57 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}
