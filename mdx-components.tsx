import type { MDXComponents } from "mdx/types";
import Figure from "@/components/mdx/figure";
import FigureRow from "@/components/mdx/figure-row";
import YouTube from "@/components/mdx/youtube";

export function useMDXComponents(): MDXComponents {
  return { Figure, FigureRow, YouTube };
}
