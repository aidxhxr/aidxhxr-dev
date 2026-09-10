import type { MDXComponents } from "mdx/types";
import FigureRow from "@/components/mdx/figure-row";
import YouTube from "@/components/mdx/youtube";
import Equation from "@/components/mdx/equation";
import AnchorExplorer from "@/components/research/anchor-explorer";
import { Children, isValidElement, type ReactNode } from "react";

function Figure({ src, alt, caption, width, height }: { src: string; alt: string; caption?: string; width?: number; height?: number }) {
  return <figure className="research-figure not-prose">
    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size figure: ${alt}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- source research figures, no image optimizer on Workers */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    </a>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function plainText(children: ReactNode): string {
  return Children.toArray(children).map((child) => {
    if (typeof child === "string" || typeof child === "number") return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return plainText(child.props.children);
    return "";
  }).join("");
}

function Heading({ children, id }: { children?: ReactNode; id?: string }) {
  const slug = id || plainText(children).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
  return <h2 id={slug}><a className="heading-anchor" href={`#${slug}`}>{children}<span aria-hidden="true">↗</span></a></h2>;
}

export function researchComponents(tableLabel = "Research data table"): MDXComponents {
  return { Figure, FigureRow, YouTube, Equation, AnchorExplorer, h2: Heading,
    table: ({ children }) => <div className="table-scroll" tabIndex={0} role="region" aria-label={tableLabel}><table>{children}</table></div>,
  };
}
