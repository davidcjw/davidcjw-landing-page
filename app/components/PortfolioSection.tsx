"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioCard from "./PortfolioCard";
import { projects } from "../data";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Apps", value: "app" },
  { label: "Open Source", value: "open-source" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

export default function PortfolioSection() {
  const [active, setActive] = useState<Filter>("all");

  const visible = projects.filter((p) => !p.hidden);
  const filtered = active === "all" ? visible : visible.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="bg-gray-900 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Portfolio
          </h2>
          <p className="text-gray-400 mt-3 text-base max-w-md mx-auto">
            A selection of things I&apos;ve built — from web apps to open-source tools.
          </p>
          <Link
            href="/portfolio"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View everything I&apos;m building <span aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10"
        >
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === value
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-transparent border-white/10 text-gray-400 hover:border-indigo-500/40 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {filtered.map((project, i) => (
              <PortfolioCard key={project.name} {...project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
