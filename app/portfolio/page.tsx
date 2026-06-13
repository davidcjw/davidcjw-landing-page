import type { Metadata } from "next";
import Link from "next/link";
import PortfolioPageHero from "../components/PortfolioPageHero";
import PortfolioExplorer from "../components/PortfolioExplorer";
import BuildPrinciples from "../components/BuildPrinciples";

export const metadata: Metadata = {
  title: "Portfolio · David Chong",
  description:
    "Everything I'm building in public — web apps, open-source tools, and experiments.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-gray-900 min-h-screen">
      <PortfolioPageHero />
      <PortfolioExplorer />
      <BuildPrinciples />

      <footer className="px-6 py-16 text-center">
        <p className="text-gray-400">Want to see the rest of my work?</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Back to davidcjw.com
        </Link>
      </footer>
    </main>
  );
}
