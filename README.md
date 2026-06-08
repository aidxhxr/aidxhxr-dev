# aidxhxr.dev

personal website — writing, projects, about.

built with Next.js 16, MDX, Tailwind CSS v4, dark/light theme via `next-themes`.

## structure

```
app/
  page.tsx          about (homepage)
  writing/          post list + [slug] MDX reader
  projects/         project list
content/writing/    .mdx post files
lib/
  posts.ts          post metadata
  projects.ts       project metadata
components/
  nav.tsx
```

## dev

```bash
npm install
npm run dev
```

## adding a post

1. add metadata to `lib/posts.ts`
2. create `content/writing/<slug>.mdx`
