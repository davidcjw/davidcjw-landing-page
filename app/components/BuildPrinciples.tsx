"use client";

import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Small and shipped beats big and someday",
    body: "Most of these took a weekend or less. The constraint is the point — finish it, deploy it, move on. Momentum compounds in a way that perfect plans never do.",
  },
  {
    title: "Build for one real person",
    body: "Almost every project here scratches an actual itch — mine, my kid's, or a friend's. A single real user beats an imaginary market every time.",
  },
  {
    title: "Building in public keeps me honest",
    body: "Shipping in the open, with live links anyone can poke at, is a forcing function. It's harder to fool yourself when the work is right there.",
  },
];

export default function BuildPrinciples() {
  return (
    <section className="border-y border-white/5 bg-gray-900/60 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3 text-center">
          How I build
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          A few things I believe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-2xl border border-white/8 bg-gray-800/40 p-6"
            >
              <div className="mb-3 h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-semibold">
                {i + 1}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
