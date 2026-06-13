import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { KBDDragon } from "./components/KBDDragon";
import { Analytics } from "@vercel/analytics/next";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const description =
  "Software engineer passionate about building products with real-world impact — web apps, open-source tools, and experiments, shipped in public.";

export const metadata: Metadata = {
  metadataBase: new URL("https://davidcjw.com"),
  title: {
    default: "David Chong — Software Engineer",
    template: "%s · David Chong",
  },
  description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "David Chong",
    "software engineer",
    "Singapore",
    "portfolio",
    "open source",
    "AI tools",
    "Next.js",
  ],
  authors: [{ name: "David Chong", url: "https://davidcjw.com" }],
  openGraph: {
    type: "website",
    siteName: "David Chong",
    url: "https://davidcjw.com",
    title: "David Chong — Software Engineer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "David Chong — Software Engineer",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-900">
        {children}
        <KBDDragon />
        <Analytics />
      </body>
    </html>
  );
}
