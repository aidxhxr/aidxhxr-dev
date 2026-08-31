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
      "earned a spot as 1 of 250 fellows from 1,500 applicants for a 10-week mentorship with a Google software engineer on data structures, algorithms, and technical interviews",
      "building data-intensive infrastructure in Rust and C++ alongside Google SWE Parneet Kaur",
    ],
  },
  {
    company: "swarthmore college computer society (sccs)",
    role: "systems administrator · vice president",
    period: "sept 2025 – present",
    location: "swarthmore, pa",
    bullets: [
      "run production infrastructure for a 1,600-student campus at 99% uptime: a 128-thread, 503 GiB Proxmox hypervisor with 15 VMs and a 94-container Docker Swarm behind Traefik, with Keycloak SSO in front of everything",
      "serve an RTX 6000 Pro (96 GB) and an RTX 5090 (32 GB) to 40+ professors and students for research, vLLM inference, and 3D rendering; 70 TB of ZFS with Proxmox Backup Server, Prometheus/Grafana, and CrowdSec",
      "as vice president, lead the largest and best-funded student tech org on campus (100+ members): member project teams, a $15,000/semester budget, recruitment, events, and operations",
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
      "selected to the tech track of a competitive fellowship (sub-8% acceptance) focused on engineering skills and technical career prep",
      "improved how HeadStart manages its network by building a graph CRUD system with Go, gRPC, Neo4j, and a TypeScript frontend",
      "sharpened engineering and professional skills through mentorship and direct engagement with corporate partners",
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
