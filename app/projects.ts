// Server-only project resolver: merges the manually-curated list with GitHub
// repos opted-in via the `showcase` topic. Imported only by Server Components
// (the page.tsx files) — never by a "use client" component.
//
// "Dynamic" lives here: the GitHub fetch uses ISR (`revalidate`), so the
// DEPLOYED site re-pulls on an interval. Tag a repo `showcase` on GitHub and it
// appears within the revalidation window — no redeploy, no edit to this repo.

import { manualProjects, type Project } from "./data";

const GITHUB_USER = "davidcjw";
const SHOWCASE_TOPIC = "showcase";
const REVALIDATE_SECONDS = 60 * 60 * 24; // re-pull GitHub once a day

/**
 * Per-repo overrides, keyed by GitHub repo name. Every field is optional — set
 * only what you want to override on top of the GitHub-derived defaults. Use this
 * to give a repo a prettier display name, a custom domain, hand-picked tech
 * tags, an `app` category, or to hide it without untagging it on GitHub.
 */
const overrides: Record<string, Partial<Project>> = {
  // "osrs-hours-to-max": {
  //   name: "OSRS Hours to Max",
  //   url: "https://hourstomax.davidcjw.com",
  //   category: "app",
  // },
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

/** Fetch public repos tagged `showcase` and map them to `Project`s. */
async function fetchShowcaseProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE_SECONDS },
    },
  );
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
  const repos: GitHubRepo[] = await res.json();

  return repos
    .filter(
      (r) => !r.fork && !r.archived && (r.topics ?? []).includes(SHOWCASE_TOPIC),
    )
    .map((r) => {
      const o = overrides[r.name] ?? {};
      const topicTech = (r.topics ?? []).filter((t) => t !== SHOWCASE_TOPIC);
      return {
        name: o.name ?? r.name,
        description: o.description ?? r.description ?? "",
        tech:
          o.tech ??
          (topicTech.length ? topicTech : r.language ? [r.language] : []),
        url: o.url ?? r.homepage ?? null,
        github: o.github ?? r.html_url,
        category: o.category ?? "open-source",
        hidden: o.hidden,
      } satisfies Project;
    });
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * The site's project list. Manual entries first (preserving the curated
 * home-page teaser order), then GitHub `showcase` repos not already represented
 * manually. Falls back to the manual list alone if GitHub is unreachable, so a
 * build/render never breaks on a network hiccup or rate limit.
 */
export async function getProjects(): Promise<Project[]> {
  let github: Project[] = [];
  try {
    github = await fetchShowcaseProjects();
  } catch (err) {
    console.warn(
      `[projects] GitHub fetch failed — using manual list only: ${(err as Error).message}`,
    );
  }

  // A GitHub repo is a duplicate if a manual entry shares its normalized name or
  // its exact GitHub URL (catches custom display names like "OSRS Hours to Max").
  const manualKeys = new Set<string>();
  for (const p of manualProjects) {
    manualKeys.add(norm(p.name));
    if (p.github) manualKeys.add(p.github.toLowerCase());
  }

  const fresh = github.filter(
    (g) =>
      !manualKeys.has(norm(g.name)) &&
      !(g.github && manualKeys.has(g.github.toLowerCase())),
  );

  return [...manualProjects, ...fresh];
}
