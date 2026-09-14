export type Post = {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  description: string;
  readingMinutes?: number;
  kind: "Research" | "Engineering";
};

export const posts: Post[] = [
  {
    slug: "company-brain",
    kind: "Engineering",
    readingMinutes: 8,
    title: "company brain: a business's chats, distilled into a vault",
    date: "2026-08-30",
    description:
      "A LibreChat fork that logs every message, triages it on a cheap model, distills it into wikilinked notes, and only writes with approval. Built for small businesses, dogfooded on my own texts.",
  },
  {
    slug: "pinn-research",
    kind: "Research",
    readingMinutes: 20,
    title: "physics-informed neural networks, six months later",
    date: "2026-08-26",
    description:
      "Thirty-six unknown parameters of a colorectal cancer model, a residual that doesn't differentiate, and four ways of finding out which parameters you can't recover.",
  },
  {
    slug: "swatgpt",
    kind: "Engineering",
    readingMinutes: 9,
    title: "swatgpt: a campus llm that stays on campus",
    date: "2026-08-24",
    description:
      "Rebuilt on LibreChat: three scrapers, hybrid dense and sparse retrieval on a 1.5 second budget, live campus data over MCP, and a deploy that refuses to go green with zero tools.",
  },
  {
    slug: "grokeye",
    kind: "Engineering",
    readingMinutes: 8,
    title: "grokeye: hands-free ar coaching, built in a day at grokathon",
    date: "2026-08-10",
    description:
      "Top 6 at xAI's Grokathon. A regex router, three hedged Grok calls, and a 900-line TypeScript tracker to make a slow multimodal model feel present.",
  },
  {
    slug: "breadcrumbs",
    kind: "Engineering",
    readingMinutes: 5,
    title: "breadcrumbs: a social platform built around what you don't post",
    date: "2026-03-10",
    description:
      "Five posts a day, gone in 24 hours, split by group. Trying to build the thing my good group chats already are by accident.",
  },
  {
    slug: "building-tickflow",
    kind: "Engineering",
    readingMinutes: 5,
    title: "building tickflow: task management for student orgs",
    date: "2026-02-20",
    description:
      "Rewriting the Prisma schema three times, pinning a Swarm service to one node, and still not having built auth.",
  },
];
