export const experiences = [
  {
    role: "Senior Software Engineer",
    company: "Shopee",
    period: "Feb 2024 – Present",
    bullets: [
      "Part of the Cloud Native Colocation team co-locating latency-sensitive workloads using a Kubelet-like agent deployed across 21,000 nodes in 22 Kubernetes clusters",
      "Creator and maintainer of Global Scheduler — a resource-aware scheduling orchestrator that raised cluster utilisation from ~25% to ~50%",
      "Team's presentation at KubeCon 2024",
    ],
    tech: ["Kubernetes", "Golang", "Linux", "React.js"],
  },
  {
    role: "Senior MLOps Engineer",
    company: "GoTo Financial (Gojek)",
    period: "Oct 2021 – Feb 2024",
    bullets: [
      "Maintained Data Science analytics infrastructure — JupyterHub, Airflow, Dask & MLFlow on GKE",
      "Upgraded infrastructure from single VMs to JupyterHub on GKE with Dask, cutting training cost by ~60%",
      "Principal contributor and maintainer of the internal Data Science Python library used across the team",
      "Automated batch and real-time model deployments via Gitlab CI/CD",
    ],
    tech: ["GKE", "Python", "Airflow", "MLFlow", "Gitlab", "Dask"],
  },
  {
    role: "AI Engineer",
    company: "AI Singapore",
    period: "Nov 2020 – Oct 2021",
    bullets: [
      "Led a team of 3 engineers building a multi-modal content-classification model for a regional AI startup",
      "Models: DistilUSE v2 (text), ResNet50 (image), Jodel (emoji) — combined via early/late fusion",
    ],
    tech: ["Docker", "Kubernetes", "Python", "FastAPI", "W&B", "DVC"],
  },
  {
    role: "Full Stack AI Engineer (Pro Bono)",
    company: "Idea Ink Pte Ltd",
    period: "Sep 2020 – Apr 2022",
    bullets: [
      "Ideated and built a PDF-to-infographic service served via a web application",
    ],
    tech: ["Python", "TypeScript", "Vue 3", "AWS", "FastAPI", "PostgreSQL"],
  },
  {
    role: "AI Associate Engineer",
    company: "AI Singapore",
    period: "Feb 2020 – Nov 2020",
    bullets: [
      "Built an end-to-end Recommender System for a local university library — from scoping to deployment",
    ],
    tech: ["Docker", "FastAPI", "MLFlow", "Python", "Gitlab"],
  },
  {
    role: "Data Analyst",
    company: "Nomura Singapore Limited",
    period: "Aug 2017 – Jan 2020",
    bullets: [
      "Led process automation and data analytics initiatives using Python and SQL",
      "Built Power BI and Tableau dashboards to aggregate risk data for data-driven decision-making",
    ],
    tech: ["Python", "SQL", "Power BI", "Tableau"],
  },
];

export type Project = {
  name: string;
  description: string;
  tech: string[];
  url: string | null;
  github: string | null;
  category: "app" | "open-source";
  /**
   * Set `hidden: true` to keep a project in this list but hide it from the
   * site (both the home teaser and /portfolio). Your curation switch — flip
   * weaker/experimental projects off without deleting them.
   */
  hidden?: boolean;
};

export const projects: Project[] = [
  {
    name: "P1 Registration Planner",
    description: "A Google-maps inspired free tool for Singapore parents navigating Primary 1 school registration.",
    tech: ["Next.js", "TypeScript", "React Leaflet", "Framer Motion", "Anthropic SDK"],
    url: "https://p1-registration.davidcjw.com",
    github: null,
    category: "app",
  },
  {
    name: "IPPT Calculator",
    description: "Singapore IPPT scoring calculator — computes your 2.4 km run, sit-ups, and push-ups scores with real-time results.",
    tech: ["Next.js", "TypeScript"],
    url: "https://ippt.davidcjw.com",
    github: null,
    category: "app",
  },
  {
    name: "SG Retirement Planner",
    description: "Singapore's most comprehensive retirement planner, including CPF",
    tech: ["Next.js", "TypeScript"],
    url: "https://sgretirementplanner.davidcjw.com",
    github: null,
    category: "app",
  },
  {
    name: "One Click PDF",
    description: "Share any PDF via a URL with a simple click",
    tech: ["Next.js", "TypeScript"],
    url: "https://pdflink.app",
    github: null,
    category: "app",
  },
  {
    name: "Number Rush",
    description: "A fast-paced number game challenging your mental arithmetic speed.",
    tech: ["Vanilla js"],
    url: "https://numberrush.davidcjw.com",
    github: null,
    category: "app",
  },
  {
    name: "Paw Patrol Educational Game",
    description: "Your toddler's favourite pup as an educational game.",
    tech: ["Next.js", "Typescript", "Vite"],
    url: "https://pawpatrol.davidcjw.com",
    github: null,
    category: "app",
  },
  {
    name: "agents-md-generator",
    description: "Generate an AGENTS.md for any public GitHub repo using Claude AI — gives AI coding agents instant project context.",
    tech: ["Next.js", "TypeScript", "Claude AI"],
    url: "https://agents-md-generator.vercel.app",
    github: "https://github.com/davidcjw/agents-md-generator",
    category: "open-source",
  },
  {
    name: "install-prompt",
    description: "Turn any public GitHub repo into an AI-ready installation prompt. Works with Claude, ChatGPT, Gemini, and more.",
    tech: ["Next.js", "TypeScript"],
    url: "https://install-prompt.vercel.app",
    github: "https://github.com/davidcjw/install-prompt",
    category: "open-source",
  },
  {
    name: "miles-wallet",
    description: "Track bank points and loyalty miles in one place — localStorage-based, zero backend.",
    tech: ["React", "TypeScript"],
    url: "https://miles-wallet.vercel.app",
    github: "https://github.com/davidcjw/miles-wallet",
    category: "open-source",
  },
  {
    name: "photomind-mcp",
    description: "Local-first MCP server for intelligent macOS Photos.app management — semantic search via CLIP, duplicate detection, and quality scoring.",
    tech: ["Python", "MCP", "CLIP"],
    url: null,
    github: "https://github.com/davidcjw/photomind-mcp",
    category: "open-source",
  },
  {
    name: "godaddy-mcp",
    description: "GoDaddy DNS MCP server — manage DNS records via natural language through AI assistants.",
    tech: ["Python", "MCP"],
    url: null,
    github: "https://github.com/davidcjw/godaddy-mcp",
    category: "open-source",
  },
  {
    name: "mcp-eval",
    description: "CI-embeddable eval harness for MCP-native agentic workflows — tool-call graph correctness and regression tracking.",
    tech: ["Python", "MCP"],
    url: null,
    github: "https://github.com/davidcjw/mcp-eval",
    category: "open-source",
  },
  {
    name: "sir-reminds-a-lot-v2",
    description: "Portable Telegram bot for credit card spend tracking and due-date reminders. SQLite-backed, Docker-deployable, zero external services.",
    tech: ["Python", "Telegram", "Docker", "SQLite"],
    url: null,
    github: "https://github.com/davidcjw/sir-reminds-a-lot-v2",
    category: "open-source",
  },

  // ── Pulled in from the wider ~/code portfolio ──────────────────────────────
  // Links inferred from your davidcjw.com domains and github.com/davidcjw/<repo>
  // pattern — verify any that are private and flip `hidden` as you like.
  {
    name: "Job Hunt Command Center",
    description: "A calm, Singapore-localised job-application tracker — Kanban board, a Today view, and stats.",
    tech: ["Next.js", "TypeScript", "Supabase"],
    url: "https://jobhunt.davidcjw.com",
    github: null,
    category: "app",
  },
  {
    name: "Card Manager",
    description: "A credit-card manager that recommends the optimal card for every spend category.",
    tech: ["Next.js", "TypeScript"],
    url: "https://cardmanager.davidcjw.com",
    github: null,
    category: "app",
  },
  {
    name: "DevMind AI",
    description: "An AI-native engineering advisor built on Claude Opus.",
    tech: ["Next.js", "TypeScript", "Claude AI"],
    url: "https://devmind-ai-lilac.vercel.app",
    github: null,
    category: "app",
  },
  {
    name: "OSRS Hours to Max",
    description: "Calculates how many hours stand between you and a maxed Old School RuneScape account.",
    tech: ["Next.js", "TypeScript"],
    url: "https://osrs-hours-to-max.vercel.app",
    github: null,
    category: "app",
  },
  {
    name: "Democratizing Claude",
    description: "A blog and course on getting the most out of Claude Code as an engineer.",
    tech: ["Next.js", "TypeScript"],
    url: "https://democratizing-claude.davidcjw.com",
    github: null,
    category: "app",
  },
  {
    name: "AgentReady",
    description: "Scores any GitHub repo for AI-agent readiness (0–10) with an embeddable SVG badge.",
    tech: ["Next.js", "TypeScript"],
    url: null,
    github: "https://github.com/davidcjw/agentready",
    category: "open-source",
  },
  {
    name: "Claude's Brain",
    description: "A local dashboard that visualises which files Claude Code reads — green if present, red if missing.",
    tech: ["Next.js", "TypeScript"],
    url: null,
    github: "https://github.com/davidcjw/claude-brain",
    category: "open-source",
  },
  {
    name: "Telegram Claude Agent",
    description: "A personal Claude Code agent on your phone, via Telegram and the Claude Agent SDK.",
    tech: ["Python", "Claude Agent SDK"],
    url: null,
    github: "https://github.com/davidcjw/telegram-claude-agent",
    category: "open-source",
  },
  {
    name: "NoDoze",
    description: "A minimalist macOS menu-bar app — one toggle keeps your laptop awake while agents run.",
    tech: ["Swift", "macOS"],
    url: null,
    github: "https://github.com/davidcjw/nodoze",
    category: "open-source",
  },
  {
    name: "VCP Swing Trading",
    description: "An MCP server for VCP (volatility-contraction pattern) swing-trading analysis.",
    tech: ["Python", "MCP"],
    url: null,
    github: null, // private repo — no public link yet
    category: "open-source",
  },

  // ── Hidden by default — real projects without a confirmed public link, or
  //    lighter experiments. Flip `hidden` (or add a url/github) to surface them.
  {
    name: "QuoteCompare SG",
    description: "AI side-by-side comparison of interior-design renovation quotes.",
    tech: ["Next.js", "TypeScript", "Claude AI"],
    url: null,
    github: null,
    category: "app",
    hidden: true,
  },
  {
    name: "The Chronicle",
    description: "An OSRS-inspired productivity dashboard — journals and quest logs for real-life goals.",
    tech: ["Next.js", "Tailwind"],
    url: null,
    github: null,
    category: "app",
    hidden: true,
  },
  {
    name: "Jiak Simi Ah",
    description: "A Singapore food decider that settles the 'what to eat' debate in one tap.",
    tech: ["Next.js", "Google Places"],
    url: null,
    github: null,
    category: "app",
    hidden: true,
  },
  {
    name: "Reno Shopping List",
    description: "A renovation shopping checklist — track what to buy and where.",
    tech: ["Next.js", "Tailwind"],
    url: null,
    github: null,
    category: "app",
    hidden: true,
  },
  {
    name: "再多一个 (Zai Duo Yi Ge)",
    description: "A storefront for a Singapore homemade-tiramisu brand.",
    tech: ["Next.js", "Tailwind"],
    url: null,
    github: null,
    category: "app",
    hidden: true,
  },
  {
    name: "Ato Gelateria",
    description: "A storefront for a Singapore artisanal-gelato brand.",
    tech: ["Next.js", "Tailwind"],
    url: null,
    github: null,
    category: "app",
    hidden: true,
  },
  {
    name: "PAW Patrol Character Explorer",
    description: "A scrollytelling site exploring PAW Patrol characters — built for my son.",
    tech: ["Vite", "TypeScript"],
    url: null,
    github: null,
    category: "app",
    hidden: true,
  },
];
