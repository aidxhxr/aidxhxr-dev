# aidxhxr.dev

This is my personal site — a quiet place to keep my writing, the projects I've built, and a short note about who I am. I mostly use it to document the things I work on so other people can take a look.

It's built with Next.js 16 and MDX, styled with Tailwind CSS v4, and it ships a dark and a light theme that you can switch between (handled by `next-themes`).

## How it's laid out

```
app/
  page.tsx          personal introduction + filterable featured work
  writing/          [slug] MDX reader; index redirects to projects
  projects/         project list
  experience/       experience timeline
content/writing/    the .mdx post files
lib/
  posts.ts          post metadata
  projects.ts       project metadata
components/
  featured-work.tsx homepage cards and category filters
  project-article.tsx engineering and product article layout
  research/        PINN reader, contents navigation, interactive figure
```

## Running it locally

Install the dependencies and start the dev server:

```bash
npm install
npm run dev
```

That's it — it'll be live at `localhost:3000`.

## Writing a new post

When I want to add something to the writing section, it takes three steps:

1. Add the post's metadata to `lib/posts.ts`, including its kind (`Research`, `Engineering`, or `Product`), category, and reading time. If it's a project, link it from `lib/projects.ts` with the same `slug`.
2. Create the matching `content/writing/<slug>.mdx` file and write the post.
3. Import it in `app/writing/[slug]/page.tsx` and add it to `postComponents`.

Images go in `public/writing/<slug>/`. Inside a post, `<Figure src alt caption width height />`, `<FigureRow>` (two side by side), and `<YouTube id title caption />` are available without importing anything. The publication reader adds linked section headings, scrollable Markdown tables, and `<Equation tex caption />` through `components/mdx/research-components.tsx`. Pass dimensions to figures to reserve space while they load.

Use a final `## Sources and scope` section for project posts so the header's source link has a target. The PINN article uses its own research layout and `Sources and reproducibility` section. The homepage's featured order is in `app/page.tsx`; its illustrations are in `components/work-visual.tsx`.

## Checks and deployment

```bash
npm run lint
npm run build
npm run preview
```

The preview runs the OpenNext build in Cloudflare's local Workers runtime. With Wrangler authenticated to the site's Cloudflare account, `npm run deploy` builds and deploys the existing `aidxhxr-dev` Worker. Generated `.next`, `.open-next`, and `.wrangler` directories stay out of Git.
