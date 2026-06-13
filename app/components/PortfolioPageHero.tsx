"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "../data";

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
        {value}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wider text-gray-500">
        {label}
      </span>
    </div>
  );
}

export default function PortfolioPageHero() {
  const visible = projects.filter((p) => !p.hidden);
  const total = visible.length;
  const live = visible.filter((p) => p.url).length;
  const openSource = visible.filter((p) => p.category === "open-source").length;
  const technologies = new Set(visible.flatMap((p) => p.tech)).size;

  return (
    <header className="px-6 pt-28 pb-14">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-400 transition-colors"
        >
          <span aria-hidden>←</span> David Chong
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
            Building in public
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-[1.1]">
            Everything I&apos;m
            <br />
            building.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gray-400 leading-relaxed">
            A running collection of the things I ship — small, useful, and out in
            the open. Web apps, open-source tools, and the occasional experiment.
            Most started as an itch I wanted to scratch.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/8 pt-8">
            <Stat value={total} label="Projects" />
            <Stat value={live} label="Live" />
            <Stat value={openSource} label="Open source" />
            <Stat value={technologies} label="Technologies" />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
