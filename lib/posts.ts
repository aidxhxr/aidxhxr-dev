export type Post = {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  description: string;
  readingMinutes?: number;
  kind: "Research" | "Engineering" | "Product";
  category: string;
};

export const posts: Post[] = [
  {
    slug: "company-brain",
    updatedDate: "2026-09-10",
    readingMinutes: 11,
    kind: "Engineering",
    category: "AI systems",
    title: "Turning conversations into a business’s memory",
    date: "2026-08-30",
    description:
      "How Company Brain turns chat into reviewable notes, retrieves what matters, and connects an assistant to the places a business already works.",
  },
  {
    slug: "pinn-research",
    kind: "Research",
    category: "Scientific machine learning",
    title: "When a good fit hides the wrong mechanism",
    date: "2026-09-10",
    readingMinutes: 43,
    description:
      "A research account of physics-informed neural networks, inverse problems, Bayesian calibration, and learning biological mechanisms from informative experiments.",
  },
  {
    slug: "swatgpt",
    updatedDate: "2026-09-10",
    readingMinutes: 11,
    kind: "Engineering",
    category: "Campus infrastructure",
    title: "From a chat app to a campus service",
    date: "2026-08-24",
    description:
      "Building SwatGPT around local inference, campus knowledge, live tools, and the unglamorous work of keeping a service running.",
  },
  {
    slug: "grokeye",
    updatedDate: "2026-09-10",
    readingMinutes: 11,
    kind: "Engineering",
    category: "Multimodal interfaces",
    title: "Making a slow vision model feel present",
    date: "2026-08-10",
    description:
      "A Grokathon experiment in voice, visual grounding, and tracking—and the shortcuts that helped a one-day prototype work.",
  },
  {
    slug: "breadcrumbs",
    updatedDate: "2026-09-10",
    readingMinutes: 6,
    kind: "Product",
    category: "Social software",
    title: "What if a social app asked for less?",
    date: "2026-03-10",
    description:
      "Five posts a day, small groups, and an expiring feed. Notes on designing a social app around the people you actually want to hear from.",
  },
  {
    slug: "building-tickflow",
    updatedDate: "2026-09-10",
    readingMinutes: 10,
    kind: "Product",
    category: "Software for student organizations",
    title: "Building a task manager, one schema at a time",
    date: "2026-09-10",
    description:
      "TickFlow started with student organizations and became a lesson in data modeling, permissions, and the distance between a prototype and a usable service.",
  },
];
