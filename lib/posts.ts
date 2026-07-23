export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export const posts: Post[] = [
  {
    slug: "pinn-research",
    title: "learning physics-informed neural networks",
    date: "2026-06-01",
    description:
      "A CS066 final project that didn't stop at the semester. Reimplementing Raissi, Lu, and Ji in PyTorch, and finding out where PINNs actually work.",
  },
  {
    slug: "swatgpt",
    title: "swatgpt: self-hosting a 30b model on campus",
    date: "2026-04-15",
    description:
      "Qwen3-30B on the college's Blackwell card, a crawler for swarthmore.edu, and a week of learning that localhost inside a container means the container.",
  },
  {
    slug: "breadcrumbs",
    title: "breadcrumbs: a social platform built around what you don't post",
    date: "2026-03-10",
    description:
      "Five items a day, 24-hour expiry, group-based feeds. Designing around intentional sharing instead of maximizing engagement.",
  },
  {
    slug: "building-tickflow",
    title: "building tickflow: task management for student orgs",
    date: "2026-02-20",
    description:
      "Schema decisions, auth tradeoffs, and why simple beats clever in a full-stack ticketing system.",
  },
];
