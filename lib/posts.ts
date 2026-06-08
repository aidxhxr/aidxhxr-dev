export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export const posts: Post[] = [
  {
    slug: "pinn-research",
    title: "learning physics-informed neural networks",
    date: "2026-06-01",
    description:
      "Six months of reading Raissi, Lu, and Ji — implementing PINNs from scratch in PyTorch, running experiments on a 96GB GPU.",
  },
  {
    slug: "swatgpt",
    title: "swatgpt: self-hosting a 30b model on campus",
    date: "2026-04-15",
    description:
      "RAG pipeline with local embeddings and re-ranking, Docker, and a forked LibreChat UI — all on an Nvidia Blackwell with 96GB VRAM.",
  },
  {
    slug: "breadcrumbs",
    title: "breadcrumbs: a social platform built around what you don't post",
    date: "2026-03-10",
    description:
      "Five items a day, 24-hour expiry, group-based feeds. Designing around intentional sharing instead of maximizing engagement.",
  },
  {
    slug: "building-tickflow",
    title: "building tickflow: task management for student orgs",
    date: "2026-02-20",
    description:
      "Schema decisions, auth tradeoffs, and why simple beats clever in a full-stack ticketing system.",
  },
];
