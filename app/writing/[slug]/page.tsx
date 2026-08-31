import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/content/writing/breadcrumbs.mdx";
import BuildingTickflow from "@/content/writing/building-tickflow.mdx";
import PinnResearch from "@/content/writing/pinn-research.mdx";
import Swatgpt from "@/content/writing/swatgpt.mdx";

const postComponents: Record<string, React.ComponentType> = {
  breadcrumbs: Breadcrumbs,
  "building-tickflow": BuildingTickflow,
  "pinn-research": PinnResearch,
  swatgpt: Swatgpt,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Amirkhan Aidarkhan`,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const project = projects.find((p) => p.slug === slug);
  const Post = postComponents[slug];
  if (!Post) notFound();

  return (
    <div className="max-w-[773px] mx-auto px-6 py-10 sm:py-16">
      <div className="mb-10">
        <Link
          href="/projects"
          className="text-xs font-mono text-dim hover:text-muted transition-colors link-underline"
        >
          ← projects
        </Link>
      </div>
      <div className="mb-10">
        <h1 className="text-fg text-lg font-medium mb-2 leading-snug">
          {post.title}
        </h1>
        <p className="text-xs font-mono text-dim mb-6">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
        {project && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-dim border border-border px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-xs font-mono">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim hover:text-muted transition-colors link-underline"
                >
                  github ↗
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim hover:text-muted transition-colors link-underline"
                >
                  demo ↗
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className="
          prose prose-sm max-w-none dark:prose-invert
          prose-p:text-muted prose-p:leading-relaxed
          prose-headings:text-fg prose-headings:font-medium
          prose-a:text-fg prose-a:no-underline hover:prose-a:text-sharp prose-a:transition-colors
          prose-code:text-fg prose-code:text-[0.8em]
          prose-code:before:content-none prose-code:after:content-none
          prose-hr:border-border
          prose-li:text-muted
          prose-strong:text-fg prose-strong:font-medium
        "
      >
        <Post />
      </div>
    </div>
  );
}
