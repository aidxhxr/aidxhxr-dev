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
    slug: "grokeye",
    title: "grokeye: hands-free ar coaching, built in a day at grokathon",
    date: "2026-08-10",
    description:
      "Top 6 at xAI's Grokathon. A regex router, three hedged Grok calls, and a 900-line TypeScript tracker to make a slow multimodal model feel present.",
  },
  {
    slug: "breadcrumbs",
    title: "breadcrumbs: a social platform built around what you don't post",
    date: "2026-03-10",
    description:
      "Five posts a day, gone in 24 hours, split by group. Trying to build the thing my good group chats already are by accident.",
  },
  {
    slug: "building-tickflow",
    title: "building tickflow: task management for student orgs",
    date: "2026-02-20",
    description:
      "Rewriting the Prisma schema three times, pinning a Swarm service to one node, and still not having built auth.",
  },
];
