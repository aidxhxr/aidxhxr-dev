export type Project = {
  name: string;
  description: string;
  github?: string;
  slug?: string;
  demo?: string;
  press?: string;
  date: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "Company Brain",
    description:
      "AI assistant for small businesses, built with Silkroad Innovation Hub. Every chat gets triaged and distilled into a wikilinked Markdown vault behind an approval queue; reaches owners over iMessage and email with a budget monitor, audit log, and trust ramp in front of anything that sends.",
    github: "https://github.com/Silkroad-Innovation-Hub/FDE-company-brain",
    slug: "company-brain",
    date: "Sep 2026",
    tags: ["TypeScript", "React", "MongoDB", "LibreChat", "d3"],
  },
  {
    name: "SwatGPT",
    description:
      "Swarthmore's self-hosted campus LLM, run by SCCS. Qwen3.6-35B-A3B on vLLM, hybrid dense and sparse retrieval over 3,500 scraped campus docs with a 1.5 second fail-open budget, live campus data over MCP, Keycloak login. Nothing leaves campus.",
    github: "https://github.com/swat-sccs/SwatGPT",
    slug: "swatgpt",
    demo: "https://chat.sccs.swarthmore.edu",
    date: "Sep 2026",
    tags: ["TypeScript", "Python", "vLLM", "Qdrant", "RAG", "Docker"],
  },
  {
    name: "PINN Research",
    description:
      "Parameter recovery for a 7-state colorectal cancer ODE model with physics-informed neural networks: an integral residual that beat autodiff 50 to 37, Fisher information and Bayesian PINNs for identifiability, and neural-mechanistic hybrids that only learn the mechanism when an experiment drives its input to zero. Paper with Nate Kim and our advisor.",
    github: "https://github.com/aidxhxr/PINN-Research",
    slug: "pinn-research",
    date: "Sep 2026",
    tags: ["Python", "PyTorch", "SciPy", "HMC"],
  },
  {
    name: "Swarthmore Clubs",
    description:
      "Swarthmore's first club-discovery platform, built with SCCS. Faceted search over 409 clubs on precomputed indexes, admin info and join requests, and student-to-club matching by cosine similarity over interest embeddings. Next.js 16 in front, Go and Postgres on Docker Swarm behind. 100+ users, opening to all 1,600 students in fall 2026.",
    github: "https://github.com/swat-sccs/clubs",
    date: "Sep 2026",
    tags: ["TypeScript", "Next.js", "Go", "PostgreSQL", "Docker Swarm"],
  },
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
    name: "TickFlow",
    description:
      "Task and project management for student orgs, on SCCS infra. Next.js server actions, Prisma on Postgres, a Swarm service pinned to one node, and no auth yet.",
    github: "https://github.com/swat-sccs/tickflow",
    slug: "building-tickflow",
    date: "Jun 2026",
    tags: ["TypeScript", "Next.js", "Postgres"],
  },
  {
    name: "Beelieve",
    description:
      "IoT and ML platform for bee colony health, which I founded and ran. 300+ beekeepers, $1,000 MRR, and $30,000+ from Samsung Innovations, UNESCO Startups, and Kazakhstan's Ministry of Ecology. A real-time pipeline over 500,000+ sensor datapoints (Kafka, LightGBM, MQTT, TimescaleDB) plus a fine-tuned Mistral-7B recommender.",
    github: "https://github.com/aidxhxr/Beelieve",
    press: "https://csr.samsung.com/en/story/inspiring-journeys/inside-%E2%80%98beelieve%E2%80%99-the-award-winning-ai-beekeeping-project-created-by-three-stude",
    date: "Dec 2025",
    tags: ["Python", "Kafka", "LightGBM", "TimescaleDB", "React"],
  },
  {
    name: "Breadcrumbs",
    description:
      "Social platform built around intentional sharing. Five items a day, 24-hour expiry, group-based feeds, designed against engagement maximization. Half-built on Supabase.",
    slug: "breadcrumbs",
    date: "Dec 2025",
    tags: ["TypeScript", "Supabase", "Product design"],
  },
];
