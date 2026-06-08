import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Amirkhan Aidarkhan",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-xs font-mono text-dim uppercase tracking-widest mb-2">
        projects
      </h1>
      <p className="text-xs text-dim mb-10">
        things I&apos;ve built and written about
      </p>
      <ul>
        {projects.map((p, i) => (
          <li key={p.name}>
            {i > 0 && (
              <div className="py-8">
                <div className="w-12 border-t border-border" />
              </div>
            )}
            {p.image ? (
              <div className="relative w-full aspect-video mb-4 rounded overflow-hidden border border-border">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-video mb-4 rounded border border-border bg-border" />
            )}
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <span className="text-sm text-fg font-medium">{p.name}</span>
              <span className="text-xs font-mono text-dim shrink-0">{p.date}</span>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-3">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-dim border border-border px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(p.slug || p.github || p.demo) && (
              <div className="flex gap-4 text-xs font-mono">
                {p.slug && (
                  <Link
                    href={`/writing/${p.slug}`}
                    className="text-dim hover:text-muted transition-colors"
                  >
                    write-up ↗
                  </Link>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dim hover:text-muted transition-colors"
                  >
                    github ↗
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dim hover:text-muted transition-colors"
                  >
                    demo ↗
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
