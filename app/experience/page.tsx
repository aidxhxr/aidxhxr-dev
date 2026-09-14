import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experience — Amirkhan Aidarkhan",
};

type Entry = {
  company: string;
  url?: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  links?: { label: string; href: string }[];
};

const experience: Entry[] = [
  {
    company: "silkroad innovation hub",
    url: "https://silkroadinnovationhub.com",
    role: "software engineering intern",
    period: "jul – aug 2026",
    location: "menlo park, ca",
    bullets: [
      "selected as 1 of 10 fellows from Central Asia; worked alongside the C-suite to ship \"Company Brain\" AI assistants to small businesses",
      "rebuilt the LibreChat UI (React 18, Vite, Tailwind, Radix) into a white-label product live for 6 SMB clients: a d3-force knowledge-graph explorer, a Recharts analytics dashboard, and an approval queue over new Express + MongoDB APIs",
      "cut LLM costs 33% by routing simpler tasks to cheaper models in a two-stage ingestion pipeline (triage, then distillation via OpenRouter) that distills chats into a wikilinked Markdown vault backed by pgvector",
      "provisioned 15+ Linux VPSs with Docker; spent 40+ hours onboarding clients onto white-labeled deployments",
    ],
    links: [
      { label: "write-up", href: "/writing/company-brain" },
      { label: "github", href: "https://github.com/Silkroad-Innovation-Hub/FDE-company-brain" },
    ],
  },
  {
    company: "swarthmore college computer society (sccs)",
    url: "https://sccs.swarthmore.edu",
    role: "systems administrator · vice president",
    period: "sept 2025 – present",
    location: "swarthmore, pa",
    bullets: [
      "run production infrastructure for a 1,600-student campus at 99% uptime: a 128-thread, 503 GiB Proxmox hypervisor with 15 VMs and a 94-container Docker Swarm behind Traefik, with Keycloak SSO in front of everything",
      "serve an RTX 6000 Pro (96 GB) and an RTX 5090 (32 GB) to 40+ professors and students for research, vLLM inference, and 3D rendering; 70 TB of ZFS with Proxmox Backup Server, Prometheus/Grafana, and CrowdSec",
      "as vice president since feb 2026, lead the largest and best-funded student tech org on campus (100+ members): member project teams, a $15,000/semester budget, recruitment, events, and operations",
    ],
    links: [{ label: "github", href: "https://github.com/swat-sccs" }],
  },
  {
    company: "swarthmore ai safety initiative (saisi)",
    url: "https://saisi.club",
    role: "founder & lead",
    period: "aug 2026 – present",
    location: "swarthmore, pa",
    bullets: [
      "founding Swarthmore's first AI safety student group, funded by Kairos",
      "launching an 8-week AI Safety Fundamentals reading group and a speaker and workshop series on alignment, interpretability, and AI policy for fall 2026",
    ],
    links: [{ label: "kairos", href: "https://kairos-project.org" }],
  },
  {
    company: "google × basta — code2career",
    url: "https://www.projectbasta.com/code2career",
    role: "mentee",
    period: "jun – aug 2026",
    location: "remote",
    bullets: [
      "1 of 250 selected from 1,500 applicants for a 10-week 1:1 mentorship with Google SWE Parneet Kaur: C++, data structures and algorithms, and technical interview prep",
    ],
  },
  {
    company: "physics-informed ml research, swarthmore college",
    role: "undergraduate researcher",
    period: "mar – jul 2026",
    location: "swarthmore, pa",
    bullets: [
      "recovered up to 36 unknown ODE parameters of a colorectal-cancer signaling model (2× the autodiff baseline) by training Fourier-feature PINNs (Adam, then L-BFGS) with a derivative-free trapezoidal integral residual",
      "triangulated parameter identifiability via Fisher information, profile likelihoods, and Sobol sensitivity (SALib); ported a 27-species ODE model from MATLAB to Python at <1% error on a 64-core queued GPU platform",
      "paper accepted to the SIAM conference in NYC; awarded a competitive $6,000 internal research grant to fund the project",
    ],
    links: [
      { label: "write-up", href: "/writing/pinn-research" },
      { label: "github", href: "https://github.com/aidxhxr/PINN-Research" },
    ],
  },
  {
    company: "swatgpt",
    url: "https://chat.sccs.swarthmore.edu",
    role: "lead swe & pm",
    period: "jan 2026 – present",
    location: "swarthmore, pa",
    bullets: [
      "adapted the open-source LibreChat stack into Swarthmore's fully self-hosted campus LLM, serving 1,300 unique users (200 weekly active, 88M tokens/week) with Qwen3.6-35B-A3B (MoE, FP8) via vLLM; no data leaves campus",
      "replaced LibreChat's stock RAG with a custom TypeScript hybrid retrieval engine (parallel Qdrant dense + sparse lexical search, TEI cross-encoder reranking, hard 1.5s fail-open budget); 96% answer accuracy, average latency from 4.5s to 1.8s",
      "wrote the Python ingestion pipeline: 3,528 campus docs into 11,302 chunks in 23s, with an atomic alias swap for zero-downtime reindexing",
      "own the product roadmap and feature prioritization as PM",
    ],
    links: [
      { label: "write-up", href: "/writing/swatgpt" },
      { label: "github", href: "https://github.com/swat-sccs/SwatGPT" },
    ],
  },
  {
    company: "headstart fellowship",
    url: "https://www.headstartfellowship.com",
    role: "tech fellow (sp26 cohort)",
    period: "jan – may 2026",
    location: "remote",
    bullets: [
      "selected to the tech track of a competitive fellowship (sub-8% acceptance) focused on engineering skills and technical career prep",
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
    url: "https://github.com/aidxhxr/Beelieve",
    role: "founder & ceo",
    period: "mar 2024 – dec 2025",
    location: "kazakhstan",
    bullets: [
      "secured $30,000+ from Samsung Innovations, UNESCO Startups, and Kazakhstan's Ministry of Ecology to tackle large-scale bee population decline",
      "grew to 300+ active beekeepers with a data-driven dashboard in React, TypeScript, Next.js, and MongoDB",
      "delivered real-time hive-health predictions with an ML pipeline over 500,000+ datapoints — Confluent Kafka, LightGBM, MQTT, TimescaleDB, FastAPI",
      "reached $1,000 MRR with a live apiary-recommendation system over LoRaWAN powered by a fine-tuned Mistral-7B-Instruct-v0.3",
    ],
    links: [
      { label: "samsung story", href: "https://csr.samsung.com/en/story/inspiring-journeys/inside-%E2%80%98beelieve%E2%80%99-the-award-winning-ai-beekeeping-project-created-by-three-stude" },
    ],
  },
];

const linkClass = "text-dim hover:text-muted transition-colors link-underline";

function EntryLink({ label, href }: { label: string; href: string }) {
  const external = href.startsWith("http");
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {label} ↗
    </a>
  ) : (
    <Link href={href} className={linkClass}>
      {label} ↗
    </Link>
  );
}

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
        {experience.map((e) => (
          <li key={e.company} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 mb-1">
              {e.url ? (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg font-medium hover:text-sharp transition-colors link-underline"
                >
                  {e.company} <span aria-hidden="true" className="text-dim">↗</span>
                </a>
              ) : (
                <span className="text-sm text-fg font-medium">{e.company}</span>
              )}
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
            {e.links && (
              <div className="flex flex-wrap gap-4 text-xs font-mono mt-4">
                {e.links.map((l) => (
                  <EntryLink key={l.href} {...l} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
