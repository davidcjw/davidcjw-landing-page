"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioCard from "./PortfolioCard";
import { projects } from "../data";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Apps", value: "app" },
  { label: "Open Source", value: "open-source" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

export default function PortfolioExplorer() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map(({ label, value }) => {
            const count =
              value === "all"
                ? projects.length
                : projects.filter((p) => p.category === value).length;
            return (
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
                <span
                  className={`ml-1.5 ${
                    active === value ? "text-indigo-200" : "text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
