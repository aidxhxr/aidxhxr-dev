export type Project = {
  name: string;
  description: string;
  github?: string;
  slug?: string;
  demo?: string;
  image?: string;
  date: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "GrokEye",
    description:
      "Voice-driven AR coaching over a live camera feed, top 6 at xAI's Grokathon. Web Speech in, Grok 4.5 for vision and answers, xAI TTS out, three hedged requests to make box calls fast, and a dependency-free TypeScript tracker to keep them on the object.",
    github: "https://github.com/dereky925/GrokEye",
    slug: "grokeye",
    demo: "https://www.youtube.com/watch?v=lC4oP8kb9KE",
    date: "Aug 2026",
    tags: ["TypeScript", "React", "Node.js", "Grok", "CV"],
  },
  {
    name: "SwatGPT",
    description:
      "Self-hosted LLM with RAG for Swarthmore. Qwen3-30B-A3B on an Nvidia Blackwell 96GB GPU, local embeddings and re-ranking, campus domain scraped. LibreChat fork for the UI.",
    github: "https://github.com/aidxhxr/SwatChat-v2",
    slug: "swatgpt",
    demo: "/",
    date: "Apr 2026",
    tags: ["Python", "Docker", "CUDA", "RAG", "vLLM"],
  },
  {
    name: "PINN Research",
    description:
      "Parameter recovery for a 7-state colorectal cancer ODE model with physics-informed neural networks: an integral residual that doubled recovery over autodiff, Fisher information and Bayesian PINNs for identifiability, and neural-mechanistic hybrids. Paper with Nate Kim and our advisor.",
    github: "https://github.com/aidxhxr/PINN-Research",
    slug: "pinn-research",
    date: "Jul 2026",
    tags: ["Python", "PyTorch", "SciPy", "HMC"],
  },
  {
    name: "Breadcrumbs",
    description:
      "Social platform built around intentional sharing. Five items a day, 24-hour expiry, group-based feeds — designed against engagement maximization.",
    slug: "breadcrumbs",
    demo: "/",
    date: "Dec 2025",
    tags: ["TypeScript", "Next.js", "Postgres"],
  },
  {
    name: "TickFlow",
    description:
      "Task and project management platform for student organizations. Full-stack — Next.js, REST API, Postgres.",
    github: "https://github.com/aidxhxr/tickflow",
    slug: "building-tickflow",
    demo: "/",
    date: "Oct 2025",
    tags: ["TypeScript", "Next.js", "Postgres"],
  },
];
