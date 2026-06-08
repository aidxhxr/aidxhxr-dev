import Link from "next/link";
import { projects } from "@/lib/projects";

export default function Home() {
  const recent = projects.slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 space-y-14">
      <section>
        <h1 className="text-fg text-lg font-medium mb-3">
          Amirkhan Aidarkhan
        </h1>
        <p className="text-muted text-sm leading-relaxed">
          CS and Applied Math student at Swarthmore. Pursuing my natural rabbit holes and
          building things along the way.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <Row label="speaks" value="C++ · Python · TypeScript · Go" />
        <Row label="into" value="ML systems · LocalLLM · CUDA · distributed infra · SWE" />
        <Row
          label="email"
          value={
            <a
              href="mailto:aaidark1@swarthmore.edu"
              className="text-muted hover:text-fg transition-colors"
            >
              aaidark1@swarthmore.edu
            </a>
          }
        />
      </section>

      {recent.length > 0 && (
        <section>
          <p className="text-xs font-mono text-dim mb-5 uppercase tracking-widest">
            projects
          </p>
          <ul className="space-y-7">
            {recent.map((p) => (
              <li key={p.name}>
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <span className="text-sm text-fg">{p.name}</span>
                  <span className="text-xs font-mono text-dim shrink-0">{p.year}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-2">
                  {p.description}
                </p>
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
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/projects"
              className="text-xs font-mono text-dim hover:text-muted transition-colors"
            >
              all projects →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="font-mono text-dim w-20 shrink-0">{label}</span>
      <span className="text-muted">{value}</span>
    </div>
  );
}
