import katex from "katex";

export default function Equation({ latex, label }: { latex: string; label?: string }) {
  const html = katex.renderToString(latex, {
    displayMode: true,
    output: "htmlAndMathml",
    throwOnError: true,
    trust: false,
    strict: "error",
  });
  return (
    <figure className="equation not-prose">
      <div className="equation-scroll" tabIndex={0} role="region" aria-label={label || "Mathematical equation"} dangerouslySetInnerHTML={{ __html: html }} />
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}
