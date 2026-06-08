import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { notFound } from "next/navigation";

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

  const { default: Post } = await import(`@/content/writing/${slug}.mdx`);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <Link
          href="/projects"
          className="text-xs font-mono text-dim hover:text-muted transition-colors"
        >
          ← projects
        </Link>
      </div>
      <div className="mb-10">
        <h1 className="text-fg text-lg font-medium mb-2 leading-snug">
          {post.title}
        </h1>
        <p className="text-xs font-mono text-dim">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
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
