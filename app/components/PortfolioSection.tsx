"use client";

import { motion } from "framer-motion";
import PortfolioCard from "./PortfolioCard";
import { projects } from "../data";

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-gray-900 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Portfolio
          </h2>
          <p className="text-gray-400 mt-3 text-base max-w-md mx-auto">
            A selection of things I&apos;ve built — from web apps to mobile tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <PortfolioCard key={project.name} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
