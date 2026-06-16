import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — Amirkhan Aidarkhan",
};

const experience = [
  {
    company: "kaspi.kz",
    role: "software engineering intern",
    period: "apr – aug 2025",
    location: "astana, kz",
    bullets: [
      "built a full-stack service tracking internal status changes for client requests — 300k+ req/day",
      "pricing dashboard pipeline for Kaspi Store with currency-specific search across product listings (React, Node.js, TypeScript, FastAPI)",
      "Kafka-backed event pipeline sustaining 1,500+ messages/second",
      "shipped to production with 100+ unit and integration tests following internal engineering standards",
    ],
  },
  {
    company: "kazrockets",
    role: "software engineering intern",
    period: "may – sept 2024",
    location: "almaty, kz",
    bullets: [
      "built Kazakhstan's first aerospace society website from scratch — 40% growth in social media reach",
      "interactive event dashboard with MongoDB, Express.js, Node.js, and React — 52% retention improvement",
    ],
  },
  {
    company: "swarthmore college — icpc",
    role: "competitive programming coach",
    period: "aug 2025 – present",
    location: "swarthmore, pa",
    bullets: [
      "lead the ICPC club of 40 members as the highest-rated; run weekly 8-problem contests with 2-hour editorial sessions",
      "secured 20% increase in club funding",
      "1,500+ problems on Codeforces over 4 years — expert-level C++ with templates, STL, and custom data structures",
    ],
  },
  {
    company: "swarthmore its",
    role: "it student associate",
    period: "aug 2025 – present",
    location: "swarthmore, pa",
    bullets: [
      "built an AI-powered class suggestion system covering up to 8 semesters and 40 credits",
      "server administration for department infrastructure including H200 GPU cluster setup and Linux systems management",
      "80+ technical support tickets resolved as the primary student employee",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <div className="max-w-[773px] mx-auto px-6 py-16">
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
