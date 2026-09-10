import FeaturedWork from "@/components/featured-work";
import { posts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import AsciiMorph from "@/components/ascii-morph";

export default function Home() {
  const order = ["pinn-research", "swatgpt", "grokeye", "company-brain", "breadcrumbs", "building-tickflow"];
  const featured = order.flatMap(slug => {
    const post = posts.find(p => p.slug === slug);
    const project = projects.find(p => p.slug === slug);
    return post && project ? [{ post, name: project.name }] : [];
  });

  return (
    <>
    <div className="max-w-[773px] mx-auto px-6 pt-10 pb-6 sm:pt-16 sm:pb-10">
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

    </div>
    <FeaturedWork items={featured} />
    </>
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
