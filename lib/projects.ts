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
      "Swarthmore's self-hosted campus LLM, run by SCCS. Qwen3.6-35B-A3B on vLLM, hybrid dense and sparse retrieval over 3,500 scraped campus docs with a 1.5 second fail-open budget, live campus data over MCP, Keycloak login. Nothing leaves campus.",
    github: "https://github.com/swat-sccs/SwatGPT",
    slug: "swatgpt",
    demo: "https://chat.sccs.swarthmore.edu",
    date: "Aug 2026",
    tags: ["TypeScript", "Python", "vLLM", "Qdrant", "RAG", "Docker"],
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
