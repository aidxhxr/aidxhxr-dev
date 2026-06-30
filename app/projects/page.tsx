import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Amirkhan Aidarkhan",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-[773px] mx-auto px-6 py-16">
      <header className="mb-14">
        <h1 className="text-fg text-2xl font-medium tracking-tight mb-2">
          projects
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          things I&apos;ve built and written about.
        </p>
      </header>
      <ul>
        {projects.map((p, i) => (
          <li key={p.name}>
            {i > 0 && (
              <div className="py-8">
                <div className="w-12 border-t border-border" />
              </div>
            )}
            {p.slug ? (
              <Link href={`/writing/${p.slug}`} className="group block mb-3">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <span className="text-base text-fg font-medium group-hover:text-sharp transition-colors link-underline-group">
                    {p.name}
                  </span>
                  <span className="text-xs font-mono text-dim shrink-0">{p.date}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed group-hover:text-fg transition-colors">
                  {p.description}
                </p>
              </Link>
            ) : (
              <div className="mb-3">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <span className="text-base text-fg font-medium">{p.name}</span>
                  <span className="text-xs font-mono text-dim shrink-0">{p.date}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{p.description}</p>
              </div>
            )}
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
                    className="text-dim hover:text-muted transition-colors link-underline"
                  >
                    write-up ↗
                  </Link>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dim hover:text-muted transition-colors link-underline"
                  >
                    github ↗
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dim hover:text-muted transition-colors link-underline"
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
