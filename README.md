# aidxhxr.dev

This is my personal site — a quiet place to keep my writing, the projects I've built, and a short note about who I am. I mostly use it to document the things I work on so other people can take a look.

It's built with Next.js 16 and MDX, styled with Tailwind CSS v4, and it ships a dark and a light theme that you can switch between (handled by `next-themes`).

## How it's laid out

```
app/
  page.tsx          about (homepage)
  writing/          post list + [slug] MDX reader
  projects/         project list
  experience/       experience timeline
content/writing/    the .mdx post files
lib/
  posts.ts          post metadata
  projects.ts       project metadata
components/
  nav.tsx
```

## Running it locally

Install the dependencies and start the dev server:

```bash
npm install
npm run dev
```

That's it — it'll be live at `localhost:3000`.

## Writing a new post

When I want to add something to the writing section, it takes two steps:

1. Add the post's metadata to `lib/posts.ts` (and, if it's a project, link it from `lib/projects.ts` with the same `slug`).
2. Create the matching `content/writing/<slug>.mdx` file and write the post.
3. Import it in `app/writing/[slug]/page.tsx` and add it to `postComponents`.

Images go in `public/writing/<slug>/`. Inside a post, `<Figure src alt caption />`, `<FigureRow>` (two side by side), and `<YouTube id title caption />` are available without importing anything — they're registered in `mdx-components.tsx`.
