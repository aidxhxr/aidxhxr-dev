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
    name: "Company Brain",
    description:
      "AI assistant for small businesses, built with Silkroad Innovation Hub. Selective ingestion turns conversations into linked Markdown notes, with retrieval, owner approvals, and shared workflows across web chat, email, and iMessage.",
    github: "https://github.com/Silkroad-Innovation-Hub/FDE-company-brain",
    slug: "company-brain",
    date: "Sep 2026",
    tags: ["TypeScript", "React", "MongoDB", "LibreChat", "d3"],
  },
  {
    name: "GrokEye",
    description:
      "A Grokathon prototype combining voice, visual grounding, and browser tracking. Local detection and hedged model calls reduce waiting; the write-up separates live behavior from the rehearsed demo paths.",
    github: "https://github.com/dereky925/GrokEye",
    slug: "grokeye",
    demo: "https://www.youtube.com/watch?v=lC4oP8kb9KE",
    date: "Aug 2026",
    tags: ["TypeScript", "React", "Node.js", "Grok", "CV"],
  },
  {
    name: "SwatGPT",
    description:
      "Swarthmore's self-hosted campus assistant, built with SCCS. Local model inference, hybrid retrieval over campus documents, live tools, Keycloak sign-in, and the operational work around a shared service.",
    github: "https://github.com/swat-sccs/SwatGPT",
    slug: "swatgpt",
    demo: "https://chat.sccs.swarthmore.edu",
    date: "Sep 2026",
    tags: ["TypeScript", "Python", "vLLM", "Qdrant", "RAG", "Docker"],
  },
  {
    name: "PINN Research",
    description:
      "Parameter recovery for a 7-state colorectal cancer ODE model with physics-informed neural networks: forward and inverse learning, integral-residual training, Fisher information, Bayesian calibration, and neural–mechanistic hybrids with targeted intervention experiments.",
    github: "https://github.com/aidxhxr/PINN-Research",
    slug: "pinn-research",
    date: "Sep 2026",
    tags: ["Python", "PyTorch", "SciPy", "HMC"],
  },
  {
    name: "Breadcrumbs",
    description:
      "A social-app prototype exploring five posts a day, small groups, and an expiring feed. Product decisions and early implementation notes about making sharing feel more personal.",
    slug: "breadcrumbs",
    date: "Dec 2025",
    tags: ["TypeScript", "Supabase", "Product design"],
  },
  {
    name: "TickFlow",
    description:
      "A task-management prototype built with SCCS: a database-backed Kanban board, relational assignments, project search, and Swarm deployment. A technical account of the implemented core and unfinished identity and settings layers.",
    github: "https://github.com/swat-sccs/tickflow",
    slug: "building-tickflow",
    date: "Jun 2026",
    tags: ["TypeScript", "Next.js", "Postgres"],
  },
];
