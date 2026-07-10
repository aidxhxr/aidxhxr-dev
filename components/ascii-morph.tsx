"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { ASCII_COLS, ASCII_ROWS, ASCII_FRAMES, ASCII_QUOTES } from "@/lib/ascii-frames";

const CELL_W = 3;
const CELL_H = 4.5;
const FONT_SIZE = 4.8;
const LEVELS = 16;
const SEG_CHAOS = 450;
const SEG_RESOLVE = 1300;
const SEG_HOLD = 3200;
const SEG_DISSOLVE = 1100;
const SEG_TOTAL = SEG_CHAOS + SEG_RESOLVE + SEG_HOLD + SEG_DISSOLVE;
const BASE = 0.55;
const DIM = 0.3;
const CHAOS = "@#%*+=~-:.oxiltf/\\|()<>";
const N = ASCII_COLS * ASCII_ROWS;

const GLYPHS = (() => {
  const s = new Set<string>(CHAOS);
  for (const frame of ASCII_FRAMES)
    for (const row of frame) for (const ch of row) s.add(ch);
  s.delete(" ");
  return [...s].join("");
})();

const GLYPH_INDEX = new Map([...GLYPHS].map((ch, i) => [ch, i]));

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function buildRamp(dim: string, lit: string, hot: string) {
  const stops = [hexToRgb(dim), hexToRgb(lit), hexToRgb(hot)];
  const ramp: string[] = [];
  for (let i = 0; i < LEVELS; i++) {
    const t = i / (LEVELS - 1);
    const [a, b, u] =
      t < 0.72
        ? [stops[0], stops[1], t / 0.72]
        : [stops[1], stops[2], (t - 0.72) / 0.28];
    const mix = (k: number) => Math.round(a[k] + (b[k] - a[k]) * u);
    ramp.push(`rgb(${mix(0)},${mix(1)},${mix(2)})`);
  }
  return ramp;
}

function buildAtlas(ramp: string[], font: string, dpr: number) {
  const c = document.createElement("canvas");
  c.width = GLYPHS.length * CELL_W * dpr;
  c.height = LEVELS * CELL_H * dpr;
  const g = c.getContext("2d")!;
  g.font = `${FONT_SIZE * dpr}px ${font}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  for (let l = 0; l < LEVELS; l++) {
    g.fillStyle = ramp[l];
    for (let i = 0; i < GLYPHS.length; i++) {
      g.fillText(GLYPHS[i], (i + 0.5) * CELL_W * dpr, (l + 0.55) * CELL_H * dpr);
    }
  }
  return c;
}

export default function AsciiMorph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const atlasRef = useRef<HTMLCanvasElement | null>(null);
  const staticDrawRef = useRef<(() => void) | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    const build = () => {
      const root = getComputedStyle(document.documentElement);
      const dim = root.getPropertyValue("--c-ascii-dim").trim();
      const lit = root.getPropertyValue("--c-ascii").trim();
      const hot = root.getPropertyValue("--c-ascii-hot").trim();
      const font =
        root.getPropertyValue("--font-geist-mono").trim() || "monospace";
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      atlasRef.current = buildAtlas(buildRamp(dim, lit, hot), font, dpr);
      staticDrawRef.current?.();
    };
    build();
    document.fonts?.ready.then(() => {
      if (!cancelled) build();
    });
    return () => {
      cancelled = true;
    };
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const quote = quoteRef.current;
    if (!canvas || !quote) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = ASCII_COLS * CELL_W * dpr;
    canvas.height = ASCII_ROWS * CELL_H * dpr;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cw = CELL_W * dpr;
    const ch = CELL_H * dpr;

    const blit = (x: number, y: number, glyph: string, b: number) => {
      const gi = GLYPH_INDEX.get(glyph);
      if (gi === undefined) return;
      const level = Math.min(LEVELS - 1, Math.max(0, (b * (LEVELS - 1) + 0.5) | 0));
      ctx.drawImage(atlasRef.current!, gi * cw, level * ch, cw, ch, x * cw, y * ch, cw, ch);
    };

    const showQuote = (frame: number, on: boolean) => {
      if (on) quote.textContent = ASCII_QUOTES[frame] ?? "";
      quote.style.opacity = on ? "1" : "0";
      quote.style.transform = on
        ? "translateY(0) scaleY(1)"
        : "translateY(-3px) scaleY(0.55)";
      quote.style.filter = on ? "blur(0)" : "blur(1.5px)";
    };

    if (reduce) {
      const drawStatic = () => {
        if (!atlasRef.current) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const frame = ASCII_FRAMES[0];
        for (let y = 0; y < ASCII_ROWS; y++) {
          const row = frame[y];
          for (let x = 0; x < ASCII_COLS; x++) {
            const g = row[x] ?? " ";
            if (g !== " ") blit(x, y, g, BASE);
          }
        }
      };
      staticDrawRef.current = drawStatic;
      drawStatic();
      showQuote(0, true);
      return () => {
        staticDrawRef.current = null;
      };
    }

    const rnd = new Float32Array(N);
    for (let i = 0; i < N; i++) rnd[i] = Math.random();
    const ranks = new Float32Array(N);
    let ranksFor = -1;
    const reshuffle = () => {
      for (let i = 0; i < N; i++) ranks[i] = Math.random();
    };

    const ptr = { x: 0, y: 0, tx: 0, ty: 0, a: 0, ta: 0 };
    let quoteOn = false;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!atlasRef.current) return;

      ptr.x += (ptr.tx - ptr.x) * 0.18;
      ptr.y += (ptr.ty - ptr.y) * 0.18;
      ptr.a += (ptr.ta - ptr.a) * 0.08;

      const t = (now - start) % (SEG_TOTAL * ASCII_FRAMES.length);
      const fi = (t / SEG_TOTAL) | 0;
      let tt = t - fi * SEG_TOTAL;
      let seg: "chaos" | "resolve" | "hold" | "dissolve";
      let p: number;
      if (tt < SEG_CHAOS) {
        seg = "chaos";
        p = tt / SEG_CHAOS;
      } else if ((tt -= SEG_CHAOS) < SEG_RESOLVE) {
        seg = "resolve";
        p = tt / SEG_RESOLVE;
      } else if ((tt -= SEG_RESOLVE) < SEG_HOLD) {
        seg = "hold";
        p = tt / SEG_HOLD;
      } else {
        seg = "dissolve";
        p = (tt - SEG_HOLD) / SEG_DISSOLVE;
      }

      if (seg === "resolve" || seg === "dissolve") {
        const key = fi * 2 + (seg === "resolve" ? 0 : 1);
        if (key !== ranksFor) {
          reshuffle();
          ranksFor = key;
        }
      }

      const frame = ASCII_FRAMES[fi];
      const bucket = (now / 55) | 0;
      const lamp = ptr.a > 0.01;
      const wt = now * 0.0011;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let i = 0;
      for (let y = 0; y < ASCII_ROWS; y++) {
        const row = frame[y];
        for (let x = 0; x < ASCII_COLS; x++, i++) {
          let locked: boolean;
          if (seg === "chaos") locked = false;
          else if (seg === "hold") locked = true;
          else if (seg === "resolve") locked = ranks[i] < p;
          else locked = ranks[i] > p;

          let b: number;
          let glyph: string;
          if (locked) {
            glyph = row[x] ?? " ";
            if (glyph === " ") continue;
            b = BASE + 0.06 * Math.sin(wt + x * 0.16 + y * 0.24 + rnd[i] * 2);
            if (seg === "resolve") {
              const age = (p - ranks[i]) * SEG_RESOLVE;
              const glow = Math.max(0, 1 - age / 450);
              b += (1 - BASE) * glow * glow;
            }
          } else {
            glyph = CHAOS[(i * 31 + bucket * 101 + ((rnd[i] * 89) | 0)) % CHAOS.length];
            b = DIM;
            if (seg === "dissolve") {
              const age = (p - ranks[i]) * SEG_DISSOLVE;
              const glow = Math.max(0, 1 - age / 300);
              b = DIM + (1 - DIM) * glow * glow;
            }
          }
          if (lamp) {
            const dx = x - ptr.x;
            const dy = (y - ptr.y) * 1.5;
            b += ptr.a * 0.4 * Math.exp(-(dx * dx + dy * dy) / 128);
          }
          blit(x, y, glyph, Math.min(1, b));
        }
      }

      const wantQuote = seg === "hold" || (seg === "resolve" && p > 0.55);
      if (wantQuote !== quoteOn) {
        quoteOn = wantQuote;
        showQuote(fi, wantQuote);
      }
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.tx = ((e.clientX - r.left) / r.width) * ASCII_COLS;
      ptr.ty = ((e.clientY - r.top) / r.height) * ASCII_ROWS;
      ptr.ta = 1;
    };
    const onLeave = () => {
      ptr.ta = 0;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center md:items-start gap-4">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block select-none touch-none"
        style={{
          width: ASCII_COLS * CELL_W,
          maxWidth: "100%",
          height: "auto",
          aspectRatio: `${ASCII_COLS * CELL_W} / ${ASCII_ROWS * CELL_H}`,
        }}
      />
      <div className="min-h-10 w-full max-w-72 self-center md:self-start">
        <blockquote
          ref={quoteRef}
          style={{
            opacity: 0,
            transform: "translateY(-3px) scaleY(0.55)",
            transformOrigin: "top left",
          }}
          className="w-fit border-l-2 border-dim pl-3 font-sans italic text-muted text-xs md:text-sm leading-relaxed transition-all duration-700 ease-out will-change-transform"
        />
      </div>
    </div>
  );
}
