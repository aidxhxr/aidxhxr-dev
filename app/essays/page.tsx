import type { Metadata } from "next";
import SandMap from "@/components/sand-map";
import { HOME, INFLUENCES, fmtCoord } from "@/lib/influences";

export const metadata: Metadata = {
  title: "Essays — Amirkhan Aidarkhan",
};

export default function EssaysPage() {
  return (
    <div className="max-w-[773px] mx-auto px-6 py-10 sm:py-16">
      <header className="mb-10">
        <h1 className="text-fg text-2xl font-medium tracking-tight mb-2">
          essays
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          I was born in Kazakhstan and have done most of my reading in essays
          written somewhere else, from Tim Denning in Melbourne to Zvi
          Mowshowitz in New York. This is the map of that reading. Each point
          is a writer who changed how I think, and the bright one is home. My
          own essays will start there.
        </p>
      </header>

      <SandMap />

      <section className="mt-10">
        <h2 className="text-xs font-mono text-dim mb-3">read from</h2>
        <ul className="space-y-2 text-sm">
          {INFLUENCES.map((p) => (
            <li key={p.name} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <span className="text-xs font-mono text-dim sm:w-40 sm:shrink-0 sm:pt-0.5">
                {fmtCoord(p.lat, p.lon)}
              </span>
              <span className="text-muted">
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-muted transition-colors link-underline"
                  >
                    {p.name}
                  </a>
                ) : (
                  <span className="text-fg">{p.name}</span>
                )}
                <span className="text-dim"> · {p.place}</span>
                <span className="block text-xs text-muted">{p.note}</span>
              </span>
            </li>
          ))}
          <li className="flex flex-col gap-0.5 border-t border-border pt-3 sm:flex-row sm:gap-4">
            <span className="text-xs font-mono text-ascii sm:w-40 sm:shrink-0 sm:pt-0.5">
              {fmtCoord(HOME.lat, HOME.lon)}
            </span>
            <span className="text-muted">
              <span className="text-fg">{HOME.name}</span>
              <span className="text-dim"> · {HOME.place}</span>
              <span className="block text-xs text-muted">{HOME.note}</span>
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
