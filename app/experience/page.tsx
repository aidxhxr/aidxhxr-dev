import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — Amirkhan Aidarkhan",
};

const experience = [
  {
    company: "google × basta — code2career",
    role: "tech fellow",
    period: "jun – aug 2026",
    location: "remote",
    bullets: [
      "earned a spot as 1 of 150 fellows from 1,500 applicants (top 10%) for a 10-week mentorship with a Google software engineer on data structures, algorithms, and technical interviews",
      "building data-intensive infrastructure in Rust and C++ alongside Google SWE Parneet Kaur",
    ],
  },
  {
    company: "swarthmore college computer society (sccs)",
    role: "system admin & software engineer",
    period: "jan 2026 – present",
    location: "swarthmore, pa",
    bullets: [
      "keep 2,000+ daily users online across campus infrastructure (course planner, swatgpt, student catalog, club manager) by maintaining the full stack in TypeScript and PostgreSQL",
      "administer a self-hosted Portainer fleet of 31 stacks, 95 containers, and 345 volumes on a 3-node server (512GB RAM, 5 GPUs, 165GB VRAM) with Docker and Linux",
      "keep the platform observable by self-hosting Grafana and managing NFS storage across nodes",
    ],
  },
  {
    company: "swatgpt",
    role: "lead swe & pm",
    period: "jan 2026 – present",
    location: "swarthmore, pa",
    bullets: [
      "ship a campus-wide LLM assistant by fine-tuning and serving Qwen3 35B-A3B (MoE, 3B active params) on vLLM with tensor parallelism across 5 GPUs / 165GB VRAM",
      "hold inference latency low under concurrent campus load via continuous batching behind an OpenAI-compatible API",
      "ground answers in campus data with a RAG pipeline over course catalogs and student handbooks",
      "own the product roadmap and feature prioritization as PM",
    ],
  },
  {
    company: "headstart fellowship",
    role: "tech fellow (sp26 cohort)",
    period: "jan – may 2026",
    location: "remote",
    bullets: [
      "selected for a competitive fellowship (sub-8% acceptance) preparing students for careers across tech, finance, and consulting",
      "improved how HeadStart manages its network by building a graph CRUD system with Go, gRPC, Neo4j, and a TypeScript frontend",
      "sharpened financial-analysis and professional skills through mentorship and direct engagement with corporate partners including Sixth Street",
    ],
  },
  {
    company: "swarthmore college — icpc",
    role: "lead competitive programmer",
    period: "sept 2025 – present",
    location: "swarthmore, pa",
    bullets: [
      "lead the Swarthmore ICPC club of 20 as the highest-rated member, organizing practices and contests",
      "run weekly training by constructing 5-hour, 8-problem contests with 2-hour editorials for div-2 teams",
      "solved 1,500+ Codeforces problems over 4+ years — expert-level C++ with STL containers, iterators, templates, and custom data structures",
    ],
  },
  {
    company: "colgate university",
    role: "algorithmic research",
    period: "apr 2024 – mar 2025",
    location: "remote",
    bullets: [
      "researched the NP-hard Graph Bandwidth Problem on a 100% scholarship with prof. David Perkins",
      "beat GRASP, simulated annealing, genetic algorithms, and ICA by ~20% with a novel genetic algorithm using wave function collapse (NGA-WFC)",
      "published as an Outstanding Research Paper in the Pioneer Journal (top 1.3% of submissions)",
    ],
  },
  {
    company: "beelieve",
    role: "founder & ceo",
    period: "mar 2024 – dec 2025",
    location: "kazakhstan",
    bullets: [
      "secured $30,000+ from Samsung Innovations, UNESCO Startups, and Kazakhstan's Ministry of Ecology to tackle large-scale bee population decline",
      "grew to 300+ active beekeepers with a data-driven dashboard in React, TypeScript, Next.js, and MongoDB",
      "delivered real-time hive-health predictions with an ML pipeline over 500,000+ datapoints — Confluent Kafka, LightGBM, MQTT, TimescaleDB, FastAPI",
      "reached $1,000 MRR with a live apiary-recommendation system over LoRaWAN powered by a fine-tuned Mistral-7B-Instruct-v0.3",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <div className="max-w-[773px] mx-auto px-6 py-10 sm:py-16">
      <header className="mb-14">
        <h1 className="text-fg text-2xl font-medium tracking-tight mb-2">
          experience
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          learning real-world systems through internships, research, and fellowships.
        </p>
      </header>
      <ul className="space-y-10">
        {experience.map((e, i) => (
          <li key={i} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 mb-1">
              <span className="text-sm text-fg font-medium">{e.company}</span>
              <span className="text-xs font-mono text-dim">{e.period}</span>
            </div>
            <p className="text-xs font-mono text-dim mb-4">
              {e.role} · {e.location}
            </p>
            <ul className="space-y-2">
              {e.bullets.map((b, j) => (
                <li key={j} className="flex gap-3 text-sm text-muted leading-relaxed">
                  <span className="text-dim shrink-0 select-none">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
