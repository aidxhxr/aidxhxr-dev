export type Project = {
  name: string;
  description: string;
  github?: string;
  slug?: string;
  demo?: string;
  image?: string;
  year: number;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "SwatGPT",
    description:
      "Self-hosted LLM with RAG for Swarthmore. Qwen3-30B-A3B on an Nvidia Blackwell 96GB GPU, local embeddings and re-ranking, campus domain scraped. LibreChat fork for the UI.",
    github: "https://github.com/aidxhxr/SwatChat-v2",
    slug: "swatgpt",
    demo: "/",
    year: 2026,
    tags: ["Python", "Docker", "CUDA", "RAG", "vLLM"],
  },
  {
    name: "PINN Research",
    description:
      "Six months of implementing physics-informed neural networks from scratch in PyTorch — reading Raissi, Lu, and Ji, running experiments on a 96GB GPU.",
    slug: "pinn-research",
    demo: "/",
    year: 2026,
    tags: ["Python", "PyTorch", "CUDA"],
  },
  {
    name: "Breadcrumbs",
    description:
      "Social platform built around intentional sharing. Five items a day, 24-hour expiry, group-based feeds — designed against engagement maximization.",
    slug: "breadcrumbs",
    demo: "/",
    year: 2026,
    tags: ["TypeScript", "Next.js", "Postgres"],
  },
  {
    name: "TickFlow",
    description:
      "Task and project management platform for student organizations. Full-stack — Next.js, REST API, Postgres.",
    github: "https://github.com/aidxhxr/tickflow",
    slug: "building-tickflow",
    demo: "/",
    year: 2025,
    tags: ["TypeScript", "Next.js", "Postgres"],
  },
];
