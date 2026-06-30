"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const SCALE = 1.6;

const BITMAP = [
  "#",
  "##",
  "#.#",
  "#..#",
  "#...#",
  "#....#",
  "#.....#",
  "#......#",
  "#.......#",
  "#........#",
  "#.....####",
  "#..#..#",
  "#.# #..#",
  "##  #..#",
  "#    #..#",
  "     #..#",
  "      #.#",
  "       ##",
];

const COLS = Math.max(...BITMAP.map((r) => r.length));
const ROWS = BITMAP.length;

const cells = BITMAP.flatMap((row, y) =>
  [...row].flatMap((ch, x) =>
    ch === "#" || ch === "." ? [{ x, y, outline: ch === "#" }] : []
  )
);

function cursorUri(fill: string, outline: string) {
  const rects = cells
    .map(
      (c) =>
        `<rect x="${c.x}" y="${c.y}" width="1" height="1" fill="${
          c.outline ? outline : fill
        }"/>`
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${COLS * SCALE}" height="${
    ROWS * SCALE
  }" viewBox="0 0 ${COLS} ${ROWS}" shape-rendering="crispEdges">${rects}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function PixelCursor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const raf = requestAnimationFrame(() => {
      const root = getComputedStyle(document.documentElement);
      const fill = root.getPropertyValue("--c-ascii").trim();
      const outline = root.getPropertyValue("--c-sharp").trim();
      const uri = cursorUri(fill, outline);

      let el = document.getElementById("pixel-cursor-style") as HTMLStyleElement | null;
      if (!el) {
        el = document.createElement("style");
        el.id = "pixel-cursor-style";
        document.head.appendChild(el);
      }
      el.textContent = `*,*::before,*::after{cursor:url("${uri}") 0 0,auto!important}`;
    });

    return () => cancelAnimationFrame(raf);
  }, [resolvedTheme]);

  return null;
}
