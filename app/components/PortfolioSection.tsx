"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PortfolioCard from "./PortfolioCard";
import { projects } from "../data";

// Home page shows a teaser; the full set lives on /portfolio.
const TEASER_COUNT = 4;

export default function PortfolioSection() {
  const visible = projects.filter((p) => !p.hidden);
  const featured = visible.slice(0, TEASER_COUNT);

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
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Portfolio</h2>
          <p className="text-gray-400 mt-3 text-base max-w-md mx-auto">
            A few things I&apos;ve built — from web apps to open-source tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {featured.map((project, i) => (
            <PortfolioCard key={project.name} {...project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-600/10 px-6 py-3 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-600 hover:text-white"
          >
            View all {visible.length} projects <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
