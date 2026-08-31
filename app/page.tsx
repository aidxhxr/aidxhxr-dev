import Link from "next/link";
import { projects } from "@/lib/projects";
import AsciiMorph from "@/components/ascii-morph";

export default function Home() {
  const recent = projects.slice(0, 3);

  return (
    <div className="max-w-[773px] mx-auto px-6 py-10 sm:py-16 space-y-14">
      <div className="flex min-h-[calc(100svh-148px)] flex-col gap-8 sm:min-h-[calc(100svh-196px)] md:min-h-0 md:flex-row md:items-center md:gap-10">
        <div className="space-y-10 md:space-y-14 md:flex-1 min-w-0">
          <section className="rise">
            <h1 className="text-fg text-lg font-medium mb-3">
              Amirkhan Aidarkhan
            </h1>
            <p className="text-muted text-sm leading-relaxed">
              Pursuing my natural rabbit holes and building things along the way.
            </p>
          </section>

          <section className="rise space-y-2 text-sm" style={{ animationDelay: "140ms" }}>
            <Row label="speaks" value="C++ · Python · TypeScript · Go · Rust" />
            <Row label="digging" value="alignment · evals · ML systems · distributed compute · SWE · CUDA" />
            <Row
              label="email"
              value={
                <a
                  href="mailto:aaidark1@swarthmore.edu"
                  className="text-muted hover:text-fg transition-colors link-underline"
                >
                  aaidark1@swarthmore.edu
                </a>
              }
            />
            <div className="sm:hidden">
              <Row
                label="github"
                value={
                  <a
                    href="https://github.com/aidxhxr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-fg transition-colors link-underline"
                  >
                    aidxhxr ↗
                  </a>
                }
              />
            </div>
            <div className="sm:hidden">
              <Row
                label="linkedin"
                value={
                  <a
                    href="https://www.linkedin.com/in/amirkhan-aidarkhan-53b926347"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-fg transition-colors link-underline"
                  >
                    amirkhan-aidarkhan ↗
                  </a>
                }
              />
            </div>
          </section>
        </div>

        <div className="flex min-h-0 flex-1 flex-col self-stretch md:flex-none md:self-start">
          <AsciiMorph />
        </div>
      </div>

      {recent.length > 0 && (
        <section className="rise" style={{ animationDelay: "280ms" }}>
          <p className="text-xs font-mono text-dim mb-5 uppercase tracking-widest">
            projects
          </p>
          <ul className="space-y-7">
            {recent.map((p) => (
              <li key={p.name}>
                {p.slug ? (
                  <Link href={`/writing/${p.slug}`} className="group block mb-2">
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <span className="text-sm text-fg group-hover:text-sharp transition-colors link-underline-group">
                        {p.name}
                      </span>
                      <span className="text-xs font-mono text-dim shrink-0">{p.date}</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed group-hover:text-fg transition-colors">
                      {p.description}
                    </p>
                  </Link>
                ) : (
                  <div className="mb-2">
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <span className="text-sm text-fg">{p.name}</span>
                      <span className="text-xs font-mono text-dim shrink-0">{p.date}</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                )}
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
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/projects"
              className="text-xs font-mono text-dim hover:text-muted transition-colors link-underline"
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
