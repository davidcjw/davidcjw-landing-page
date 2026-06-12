"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Experience", href: "#experience", external: false },
  { label: "Portfolio", href: "#portfolio", external: false },
  { label: "Blog", href: "https://democratizing-claude.davidcjw.com", external: true },
  { label: "Contact", href: "#contact", external: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 inset-x-0 z-50 bg-gray-900/85 backdrop-blur-md border-b border-white/5"
        >
          <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a
              href="#top"
              className="text-white font-semibold tracking-tight hover:text-indigo-400 transition-colors"
            >
              David Chong
            </a>
            <ul className="flex gap-6">
              {links.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
