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

export const projects = [
  {
    name: "IPPT Calculator",
    description: "Singapore IPPT scoring calculator — computes your 2.4 km run, sit-ups, and push-ups scores with real-time results.",
    tech: ["Next.js", "TypeScript"],
    url: "https://ippt.davidcjw.com",
    github: null,
  },
  {
    name: "SG Retirement Planner",
    description: "Singapore's most comprehensive retirement planner, including CPF",
    tech: ["Next.js", "TypeScript"],
    url: "https://sgretirementplanner.davidcjw.com",
    github: null,
  },
  {
    name: "One Click PDF",
    description: "Share any PDF via a URL with a simple click",
    tech: ["Next.js", "TypeScript"],
    url: null,
    github: "https://pdflink.app",
  },
  {
    name: "Number Rush",
    description: "A fast-paced number game challenging your mental arithmetic speed.",
    tech: [],
    url: null,
    github: "https://game-ecru-mu-74.vercel.app/",
  },
];
