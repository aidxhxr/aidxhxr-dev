import Link from "next/link";
import type { Post } from "@/lib/posts";

type WorkItem = { post: Post; name: string; note: string };

export default function FeaturedWork({ items }: { items: WorkItem[] }) {
  return (
    <section id="featured-work" aria-labelledby="featured-title" className="rise scroll-mt-10" style={{ animationDelay: "280ms" }}>
      <h2 id="featured-title" className="text-xs font-mono text-dim mb-5">
        selected work
      </h2>
      <ul className="space-y-6">
        {items.map(({ post, name, note }) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group block focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-muted"
            >
              <span className="text-sm text-fg group-hover:text-sharp transition-colors link-underline-group">
                {name} <span aria-hidden="true" className="text-dim">↗</span>
              </span>
              <p className="mt-1 text-sm text-muted leading-relaxed">{note}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/projects" className="inline-block mt-6 text-xs font-mono text-dim hover:text-muted transition-colors link-underline">
        all projects →
      </Link>
    </section>
  );
}
