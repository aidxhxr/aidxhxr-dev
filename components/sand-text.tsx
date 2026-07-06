"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const PHRASES = ["personal reflections", "coming soon"];
const HOLD_MS = 3600;

type Grain = { x: number; y: number; v: number; ty: number };
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  c: number;
  ttl?: number;
};

type Sim = {
  cols: number;
  rows: number;
  filled: Int8Array;
  queues: Map<number, number[]>;
  remaining: number;
  grains: Grain[];
  particles: Particle[];
  phase: "pour" | "hold" | "wind";
  holdUntil: number;
  windDir: number;
  windStart: number;
  phrase: number;
  flashes: { i: number; until: number }[];
  pending: { x: number; y: number; at: number }[];
};

function buildTargets(cols: number, rows: number, phrase: string, font: string) {
  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const c = off.getContext("2d", { willReadFrequently: true })!;
  c.textAlign = "center";
  c.textBaseline = "middle";
  const fitSize = (lines: string[]) => {
    let s = Math.floor((rows / lines.length) * 0.8);
    while (s > 8) {
      c.font = `600 ${s}px ${font}`;
      if (lines.every((l) => c.measureText(l).width <= cols * 0.94)) break;
      s--;
    }
    return s;
  };
  let lines = [phrase];
  let size = fitSize(lines);
  if (size < 15 && phrase.includes(" ")) {
    const words = phrase.split(" ");
    let best = lines;
    let bestLen = Infinity;
    for (let i = 1; i < words.length; i++) {
      const a = words.slice(0, i).join(" ");
      const b = words.slice(i).join(" ");
      const m = Math.max(a.length, b.length);
      if (m < bestLen) {
        bestLen = m;
        best = [a, b];
      }
    }
    lines = best;
    size = fitSize(lines);
  }
  c.font = `600 ${size}px ${font}`;
  const lh = size * 1.25;
  const y0 = rows / 2 - ((lines.length - 1) * lh) / 2 + 1;
  lines.forEach((l, i) => c.fillText(l, cols / 2, y0 + i * lh));
  const data = c.getImageData(0, 0, cols, rows).data;
  const queues = new Map<number, number[]>();
  let remaining = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (data[(y * cols + x) * 4 + 3] > 110) {
        let q = queues.get(x);
        if (!q) {
          q = [];
          queues.set(x, q);
        }
        q.push(y);
        remaining++;
      }
    }
  }
  for (const q of queues.values()) q.sort((a, b) => b - a);
  return { queues, remaining };
}

export default function SandText() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paletteRef = useRef<string[]>(["#888", "#666"]);
  const flashRef = useRef("#fff");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const ascii = root.getPropertyValue("--c-ascii").trim();
    const dim = root.getPropertyValue("--c-ascii-dim").trim();
    const fg = root.getPropertyValue("--c-text").trim();
    paletteRef.current = [ascii, ascii, ascii, fg, dim];
    flashRef.current = root.getPropertyValue("--c-sharp").trim();
  }, [resolvedTheme]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-geist-mono")
        .trim() || "monospace";

    let sim: Sim | null = null;
    let raf = 0;
    const pointer = { x: -1, y: -1, vx: 0, vy: 0, active: false };
    const blast = { x: 0, y: 0, pending: false };

    const setup = () => {
      const w = wrap.clientWidth;
      const cell = w < 480 ? 2 : 3;
      const h = Math.max(180, Math.min(260, Math.round(w * 0.34)));
      const cols = Math.floor(w / cell);
      const rows = Math.floor(h / cell);
      canvas.width = cols;
      canvas.height = rows;
      canvas.style.height = `${rows * cell}px`;
      const { queues, remaining } = buildTargets(cols, rows, PHRASES[0], font);
      sim = {
        cols,
        rows,
        filled: new Int8Array(cols * rows).fill(-1),
        queues,
        remaining,
        grains: [],
        particles: [],
        phase: "pour",
        holdUntil: 0,
        windDir: 1,
        windStart: 0,
        phrase: 0,
        flashes: [],
        pending: [],
      };
      if (reduce) {
        ctx.clearRect(0, 0, cols, rows);
        const pal = paletteRef.current;
        for (const [x, ys] of queues) {
          for (const y of ys) {
            ctx.fillStyle = pal[(Math.random() * pal.length) | 0];
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    };

    const spawn = (s: Sim, count: number) => {
      const colsWithWork: number[] = [];
      for (const [x, q] of s.queues) if (q.length) colsWithWork.push(x);
      for (let i = 0; i < count && colsWithWork.length; i++) {
        const ci = (Math.random() * colsWithWork.length) | 0;
        const x = colsWithWork[ci];
        const q = s.queues.get(x)!;
        const ty = q.shift()!;
        if (!q.length) colsWithWork.splice(ci, 1);
        s.grains.push({ x, y: -1 - Math.random() * s.rows * 0.6, v: 0.3 + Math.random() * 0.4, ty });
      }
    };

    const eject = (s: Sim, px: number, py: number, r: number, now: number, heal: number) => {
      const r2 = r * r;
      const x0 = Math.max(0, Math.floor(px - r));
      const x1 = Math.min(s.cols - 1, Math.ceil(px + r));
      const y0 = Math.max(0, Math.floor(py - r));
      const y1 = Math.min(s.rows - 1, Math.ceil(py + r));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const dx = x - px;
          const dy = y - py;
          if (dx * dx + dy * dy > r2) continue;
          const idx = y * s.cols + x;
          const c = s.filled[idx];
          if (c < 0) continue;
          s.filled[idx] = -1;
          const d = Math.max(0.6, Math.hypot(dx, dy));
          s.particles.push({
            x,
            y,
            vx: (dx / d) * (0.8 + Math.random() * 0.8) + pointer.vx * 0.4,
            vy: (dy / d) * 0.8 - 0.6 - Math.random() * 0.5 + pointer.vy * 0.4,
            c,
          });
          if (s.phase !== "wind") {
            s.pending.push({ x, y, at: now + heal });
            s.remaining++;
          }
        }
      }
    };

    const step = (s: Sim, now: number) => {
      if (s.phase === "pour" || s.phase === "hold") {
        for (let i = s.pending.length - 1; i >= 0; i--) {
          const w = s.pending[i];
          if (now < w.at) continue;
          let q = s.queues.get(w.x);
          if (!q) {
            q = [];
            s.queues.set(w.x, q);
          }
          q.push(w.y);
          q.sort((a, b) => b - a);
          s.pending.splice(i, 1);
        }
        spawn(s, s.phase === "pour" ? 14 : 4);
        for (let i = s.grains.length - 1; i >= 0; i--) {
          const g = s.grains[i];
          g.v = Math.min(1.6, g.v + 0.06);
          g.y += g.v;
          if (g.y >= g.ty) {
            const idx = g.ty * s.cols + g.x;
            if (s.filled[idx] < 0) {
              s.filled[idx] = (Math.random() * paletteRef.current.length) | 0;
              s.remaining--;
              s.flashes.push({ i: idx, until: now + 130 });
              if (Math.random() < 0.3) {
                s.particles.push({
                  x: g.x + (Math.random() < 0.5 ? -1 : 1),
                  y: g.ty - 1,
                  vx: (Math.random() - 0.5) * 0.7,
                  vy: -0.4 - Math.random() * 0.5,
                  c: paletteRef.current.length - 1,
                  ttl: 8 + Math.random() * 8,
                });
              }
            }
            s.grains.splice(i, 1);
          }
        }
        if (s.phase === "hold" && Math.random() < 0.5) {
          const i = (Math.random() * s.filled.length) | 0;
          if (s.filled[i] >= 0) s.flashes.push({ i, until: now + 90 });
        }
        if (s.phase === "hold" && pointer.active) {
          s.holdUntil = Math.max(s.holdUntil, now + 1600);
        }
        if (s.phase === "pour" && s.remaining <= 0 && !s.grains.length) {
          s.phase = "hold";
          s.holdUntil = now + HOLD_MS;
        } else if (s.phase === "hold" && now >= s.holdUntil) {
          s.phase = "wind";
          s.windDir = -s.windDir;
          s.windStart = now;
          s.grains.length = 0;
          s.pending.length = 0;
          for (const q of s.queues.values()) q.length = 0;
        }
      } else {
        const sweep = ((now - s.windStart) / 1400) * (s.cols + 30);
        const front = s.windDir > 0 ? sweep : s.cols - sweep;
        let any = false;
        for (let i = 0; i < s.filled.length; i++) {
          const c = s.filled[i];
          if (c < 0) continue;
          any = true;
          const x = i % s.cols;
          const gap = s.windDir > 0 ? front - x : x - front;
          if (gap > Math.random() * 26) {
            s.filled[i] = -1;
            s.particles.push({
              x,
              y: (i / s.cols) | 0,
              vx: s.windDir * (0.6 + Math.random() * 1.6),
              vy: -0.5 + Math.random() * 0.9,
              c,
            });
          }
        }
        if (!any && !s.particles.length) {
          s.phrase = (s.phrase + 1) % PHRASES.length;
          const t = buildTargets(s.cols, s.rows, PHRASES[s.phrase], font);
          s.queues = t.queues;
          s.remaining = t.remaining;
          s.phase = "pour";
        }
      }
      const wind = s.phase === "wind";
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        if (wind) {
          p.vx += s.windDir * 0.05 + Math.sin(p.y * 0.35 + now * 0.004) * 0.05;
          p.vy += 0.012;
        } else {
          p.vy += 0.09;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.ttl !== undefined && --p.ttl <= 0) {
          s.particles.splice(i, 1);
          continue;
        }
        if (p.y > s.rows + 2 || p.x < -2 || p.x > s.cols + 2 || p.y < -s.rows) {
          s.particles.splice(i, 1);
        }
      }
      if (pointer.active) eject(s, pointer.x, pointer.y, 5, now, 300);
      if (blast.pending) {
        blast.pending = false;
        eject(s, blast.x, blast.y, 11, now, 750);
      }
    };

    const draw = (s: Sim, now: number) => {
      ctx.clearRect(0, 0, s.cols, s.rows);
      const pal = paletteRef.current;
      for (let i = 0; i < s.filled.length; i++) {
        const c = s.filled[i];
        if (c < 0) continue;
        ctx.fillStyle = pal[c];
        ctx.fillRect(i % s.cols, (i / s.cols) | 0, 1, 1);
      }
      if (s.flashes.length) {
        ctx.fillStyle = flashRef.current;
        for (let i = s.flashes.length - 1; i >= 0; i--) {
          const f = s.flashes[i];
          if (now >= f.until || s.filled[f.i] < 0) {
            s.flashes.splice(i, 1);
            continue;
          }
          ctx.fillRect(f.i % s.cols, (f.i / s.cols) | 0, 1, 1);
        }
      }
      ctx.fillStyle = pal[pal.length - 1];
      for (const g of s.grains) {
        ctx.fillRect(g.x, g.y | 0, 1, 1);
      }
      for (const p of s.particles) {
        ctx.fillStyle = pal[p.c];
        ctx.fillRect(p.x | 0, p.y | 0, 1, 1);
      }
    };

    const tick = (now: number) => {
      if (sim) {
        step(sim, now);
        draw(sim, now);
      }
      raf = requestAnimationFrame(tick);
    };

    setup();
    if (!reduce) raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * (sim?.cols ?? 1);
      const ny = ((e.clientY - rect.top) / rect.height) * (sim?.rows ?? 1);
      pointer.vx = Math.max(-4, Math.min(4, pointer.active ? nx - pointer.x : 0));
      pointer.vy = Math.max(-4, Math.min(4, pointer.active ? ny - pointer.y : 0));
      pointer.x = nx;
      pointer.y = ny;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.vx = 0;
      pointer.vy = 0;
    };
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      blast.x = ((e.clientX - rect.left) / rect.width) * (sim?.cols ?? 1);
      blast.y = ((e.clientY - rect.top) / rect.height) * (sim?.rows ?? 1);
      blast.pending = true;
    };
    if (!reduce) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      canvas.addEventListener("pointerdown", onDown);
    }

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 150);
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      ro.disconnect();
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full">
      <canvas
        ref={canvasRef}
        aria-label="falling sand spelling: personal reflections, coming soon"
        className="w-full touch-none select-none"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
