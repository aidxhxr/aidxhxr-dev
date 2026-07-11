"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { ASCII_COLS, ASCII_ROWS, ASCII_FRAMES, ASCII_QUOTES } from "@/lib/ascii-frames";
import { renderTextFrame } from "@/lib/ascii-text";

const CELL_W = 3;
const CELL_H = 4.5;
const FONT_SIZE = 4.8;
const LEVELS = 16;
const SEG_CHAOS = 450;
const SEG_RESOLVE = 1300;
const SEG_HOLD = 3200;
const SEG_DISSOLVE = 1100;
const BASE = 0.55;
const DIM = 0.3;
const CHAOS = "@#%*+=~-:.oxiltf/\\|()<>";
const QUOTE_GAP = 3;
const QUOTE_ROWS = 13;
const ROWS = ASCII_ROWS + QUOTE_GAP + QUOTE_ROWS;
const N = ASCII_COLS * ROWS;
const ASPECT = (ASCII_COLS * CELL_W) / (ROWS * CELL_H);
const H_MAX = Math.log2(CHAOS.length);

const SEQUENCE = ASCII_FRAMES.map((art, i) => {
  const q = ASCII_QUOTES[i];
  const frame = [
    ...art,
    ...Array.from({ length: ASCII_ROWS - art.length + QUOTE_GAP }, () => ""),
    ...(q
      ? renderTextFrame(q, ASCII_COLS, QUOTE_ROWS)
      : Array.from({ length: QUOTE_ROWS }, () => "")),
  ];
  return { frame, hold: q ? Math.max(SEG_HOLD, q.length * 90) : SEG_HOLD };
});

const OFFSETS = SEQUENCE.reduce<number[]>(
  (a, s) => (a.push(a[a.length - 1] + SEG_CHAOS + SEG_RESOLVE + s.hold + SEG_DISSOLVE), a),
  [0]
);
const CYCLE_MS = OFFSETS[OFFSETS.length - 1];

const GLYPHS = (() => {
  const s = new Set<string>(CHAOS);
  for (const { frame } of SEQUENCE)
    for (const row of frame) for (const ch of row) s.add(ch);
  s.delete(" ");
  return [...s].join("");
})();

const GLYPH_INDEX = new Map([...GLYPHS].map((ch, i) => [ch, i]));
const SPACE_IDX = GLYPHS.length;

function histEntropy(counts: ArrayLike<number>) {
  let h = 0;
  for (let k = 0; k < counts.length; k++) {
    const c = counts[k];
    if (!c) continue;
    const q = c / N;
    h -= q * Math.log2(q);
  }
  return h;
}

const H_TARGET = SEQUENCE.map(({ frame }) => {
  const counts = new Float64Array(GLYPHS.length + 1);
  for (let y = 0; y < ROWS; y++) {
    const row = frame[y];
    for (let x = 0; x < ASCII_COLS; x++) {
      counts[GLYPH_INDEX.get(row[x] ?? " ") ?? SPACE_IDX]++;
    }
  }
  return histEntropy(counts);
});

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

function buildAtlas(ramp: string[], font: string, px: number) {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.ceil(GLYPHS.length * CELL_W * px));
  c.height = Math.max(1, Math.ceil(LEVELS * CELL_H * px));
  const g = c.getContext("2d")!;
  g.font = `${FONT_SIZE * px}px ${font}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  for (let l = 0; l < LEVELS; l++) {
    g.fillStyle = ramp[l];
    for (let i = 0; i < GLYPHS.length; i++) {
      g.fillText(GLYPHS[i], (i + 0.5) * CELL_W * px, (l + 0.55) * CELL_H * px);
    }
  }
  return c;
}

export default function AsciiMorph() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitsRef = useRef<HTMLSpanElement>(null);
  const atlasRef = useRef<HTMLCanvasElement | null>(null);
  const staticDrawRef = useRef<(() => void) | null>(null);
  const buildRef = useRef<(() => void) | null>(null);
  const scaleRef = useRef(1);
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
      atlasRef.current = buildAtlas(
        buildRamp(dim, lit, hot),
        font,
        dpr * scaleRef.current
      );
      staticDrawRef.current?.();
    };
    buildRef.current = build;
    build();
    document.fonts?.ready.then(() => {
      if (!cancelled) build();
    });
    return () => {
      cancelled = true;
      buildRef.current = null;
    };
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    const bits = bitsRef.current;
    if (!canvas || !box || !bits) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cw = 0;
    let ch = 0;

    const fit = () => {
      const r = box.getBoundingClientRect();
      const cap = window.matchMedia("(min-width: 768px)").matches
        ? Infinity
        : Math.max(48, window.innerHeight - (r.top + window.scrollY) - 72);
      const availH = Math.min(r.height || cap, cap);
      const w = Math.max(32, Math.min(r.width, availH * ASPECT));
      const h = w / ASPECT;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      cw = canvas.width / ASCII_COLS;
      ch = canvas.height / ROWS;
      scaleRef.current = w / (ASCII_COLS * CELL_W);
      buildRef.current?.();
    };

    const blit = (x: number, y: number, glyph: string, b: number) => {
      const gi = GLYPH_INDEX.get(glyph);
      if (gi === undefined) return;
      const level = Math.min(LEVELS - 1, Math.max(0, (b * (LEVELS - 1) + 0.5) | 0));
      ctx.drawImage(atlasRef.current!, gi * cw, level * ch, cw, ch, x * cw, y * ch, cw, ch);
    };

    if (reduce) {
      const drawStatic = () => {
        if (!atlasRef.current) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const frame = SEQUENCE[0].frame;
        for (let y = 0; y < ROWS; y++) {
          const row = frame[y];
          for (let x = 0; x < ASCII_COLS; x++) {
            const g = row[x] ?? " ";
            if (g !== " ") blit(x, y, g, BASE);
          }
        }
      };
      staticDrawRef.current = drawStatic;
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(box);
      bits.textContent = "0.000";
      return () => {
        staticDrawRef.current = null;
        ro.disconnect();
      };
    }

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);

    const rnd = new Float32Array(N);
    for (let i = 0; i < N; i++) rnd[i] = Math.random();
    const ranks = new Float32Array(N);
    let ranksFor = -1;
    const reshuffle = () => {
      for (let i = 0; i < N; i++) ranks[i] = Math.random();
    };

    const ptr = { x: 0, y: 0, tx: 0, ty: 0, a: 0, ta: 0 };
    const glyphCounts = new Int32Array(GLYPHS.length + 1);
    let raf = 0;
    let meterBucket = -1;
    const start = performance.now();

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!atlasRef.current) return;

      ptr.x += (ptr.tx - ptr.x) * 0.18;
      ptr.y += (ptr.ty - ptr.y) * 0.18;
      ptr.a += (ptr.ta - ptr.a) * 0.08;

      const t = (now - start) % CYCLE_MS;
      let fi = SEQUENCE.length - 1;
      for (let k = 1; k < OFFSETS.length; k++) {
        if (t < OFFSETS[k]) {
          fi = k - 1;
          break;
        }
      }
      let tt = t - OFFSETS[fi];
      const hold = SEQUENCE[fi].hold;
      let seg: "chaos" | "resolve" | "hold" | "dissolve";
      let p: number;
      if (tt < SEG_CHAOS) {
        seg = "chaos";
        p = tt / SEG_CHAOS;
      } else if ((tt -= SEG_CHAOS) < SEG_RESOLVE) {
        seg = "resolve";
        p = tt / SEG_RESOLVE;
      } else if ((tt -= SEG_RESOLVE) < hold) {
        seg = "hold";
        p = tt / hold;
      } else {
        seg = "dissolve";
        p = (tt - hold) / SEG_DISSOLVE;
      }

      if (seg === "resolve" || seg === "dissolve") {
        const key = fi * 2 + (seg === "resolve" ? 0 : 1);
        if (key !== ranksFor) {
          reshuffle();
          ranksFor = key;
        }
      }

      const frame = SEQUENCE[fi].frame;
      const bucket = (now / 55) | 0;
      const lamp = ptr.a > 0.01;
      const wt = now * 0.0011;
      let amp = 0.06;
      if (seg === "hold")
        amp = 0.06 * (1 - Math.min(1, p / 0.1, (1 - p) / 0.1));
      glyphCounts.fill(0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let i = 0;
      for (let y = 0; y < ROWS; y++) {
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
            if (glyph === " ") {
              glyphCounts[SPACE_IDX]++;
              continue;
            }
            b = BASE + amp * Math.sin(wt + x * 0.16 + y * 0.24 + rnd[i] * 2);
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
          glyphCounts[GLYPH_INDEX.get(glyph) ?? SPACE_IDX]++;
          if (lamp) {
            const dx = x - ptr.x;
            const dy = (y - ptr.y) * 1.5;
            b += ptr.a * 0.4 * Math.exp(-(dx * dx + dy * dy) / 128);
          }
          blit(x, y, glyph, Math.min(1, b));
        }
      }

      const mb = (now / 90) | 0;
      if (mb !== meterBucket) {
        meterBucket = mb;
        const h = Math.max(0, histEntropy(glyphCounts) - H_TARGET[fi]);
        bits.textContent = h.toFixed(3);
      }
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.tx = ((e.clientX - r.left) / r.width) * ASCII_COLS;
      ptr.ty = ((e.clientY - r.top) / r.height) * ROWS;
      ptr.ta = 1;
    };
    const onLeave = () => {
      ptr.ta = 0;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-4 md:flex-none md:items-start">
      <div
        ref={boxRef}
        className="relative flex min-h-0 w-full flex-1 items-center justify-center md:h-[484px] md:w-[352px] md:flex-none md:items-start md:justify-start"
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 m-auto block select-none md:static md:m-0"
        />
      </div>
      <div
        aria-hidden="true"
        className="flex w-full max-w-72 items-baseline justify-center gap-2 self-center font-mono text-[10px] text-dim select-none md:max-w-[352px]"
      >
        <span className="uppercase tracking-widest">entropy</span>
        <span className="tabular-nums">
          <span ref={bitsRef} className="text-muted">
            {(H_MAX - H_TARGET[0]).toFixed(3)}
          </span>{" "}
          bits/cell
        </span>
      </div>
    </div>
  );
}
