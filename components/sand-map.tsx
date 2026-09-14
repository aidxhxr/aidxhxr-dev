"use client";

import { useEffect, useRef } from "react";
import { HOME, INFLUENCES, type Place } from "@/lib/influences";
import { LAT_BOTTOM, LAT_TOP, MASK_B64, MASK_H, MASK_W } from "@/lib/world-mask";

const HOLD_MS = 14000;
const COURIER_EVERY_MS = 900;
const COURIER_MS = 1700;
const MAP_ASPECT = MASK_W / MASK_H;

// palette slots
const P_LAND = 0;
const P_LAND_WARM = 1;
const P_PIN = 2;
const P_HOME = 3;
const P_GRAIN = 4;
const ALPHA = [0.42, 0.85, 1, 1, 0.6];

// cell kinds
const K_LAND = 0;
const K_PIN = 1;
const K_HOME = 2;

type Grain = { x: number; y: number; v: number; ty: number };
type Particle = { x: number; y: number; vx: number; vy: number; c: number; ttl?: number };
type Courier = { x0: number; y0: number; x1: number; y1: number; t0: number; bend: number };
type Pin = { place: Place; x: number; y: number; home: boolean };

type Sim = {
  cols: number;
  rows: number;
  filled: Int8Array;
  kind: Uint8Array;
  queues: Map<number, number[]>;
  remaining: number;
  grains: Grain[];
  particles: Particle[];
  couriers: Courier[];
  pins: Pin[];
  phase: "pour" | "hold" | "wind";
  holdUntil: number;
  windDir: number;
  windStart: number;
  cycle: number;
  nextCourier: number;
  flashes: { i: number; until: number }[];
  pending: { x: number; y: number; at: number }[];
};

const MASK = (() => {
  const bin = atob(MASK_B64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
})();

const isLand = (mx: number, my: number) => {
  if (mx < 0 || my < 0 || mx >= MASK_W || my >= MASK_H) return false;
  const i = my * MASK_W + mx;
  return ((MASK[i >> 3] >> (i & 7)) & 1) === 1;
};

const project = (p: Place, cols: number, rows: number) => ({
  x: Math.round(((p.lon + 180) / 360) * cols),
  y: Math.round(((LAT_TOP - p.lat) / (LAT_TOP - LAT_BOTTOM)) * rows),
});

// pin glyphs, drawn as offsets. home is a small diamond, others a plus.
const PLUS = [
  [0, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const DIAMOND = [
  [0, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [2, 0],
  [-2, 0],
  [0, 2],
  [0, -2],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];

function buildTargets(cols: number, rows: number) {
  const kind = new Uint8Array(cols * rows);
  const want = new Uint8Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    const my = Math.floor(((y + 0.5) / rows) * MASK_H);
    for (let x = 0; x < cols; x++) {
      const mx = Math.floor(((x + 0.5) / cols) * MASK_W);
      if (isLand(mx, my)) want[y * cols + x] = 1;
    }
  }
  const pins: Pin[] = [];
  const stamp = (p: Place, home: boolean) => {
    const { x, y } = project(p, cols, rows);
    pins.push({ place: p, x, y, home });
    for (const [dx, dy] of home ? DIAMOND : PLUS) {
      const cx = x + dx;
      const cy = y + dy;
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
      const i = cy * cols + cx;
      want[i] = 1;
      kind[i] = home ? K_HOME : K_PIN;
    }
  };
  for (const p of INFLUENCES) stamp(p, false);
  stamp(HOME, true);

  const queues = new Map<number, number[]>();
  let remaining = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!want[y * cols + x]) continue;
      let q = queues.get(x);
      if (!q) {
        q = [];
        queues.set(x, q);
      }
      q.push(y);
      remaining++;
    }
  }
  for (const q of queues.values()) q.sort((a, b) => b - a);
  return { queues, remaining, kind, pins };
}

const colorFor = (k: number) =>
  k === K_HOME ? P_HOME : k === K_PIN ? P_PIN : Math.random() < 0.16 ? P_LAND_WARM : P_LAND;

export default function SandMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<string[]>(["#999", "#888", "#666", "#000", "#aaa"]);
  const flashRef = useRef("#fff");

  useEffect(() => {
    const readPalette = () => {
      const root = getComputedStyle(document.documentElement);
      const v = (n: string) => root.getPropertyValue(n).trim();
      paletteRef.current = [v("--c-ascii"), v("--c-ascii"), v("--c-ascii-hot"), v("--c-ascii-hot"), v("--c-ascii")];
      flashRef.current = v("--c-sharp");
    };
    readPalette();
    // the theme toggles by swapping a class on <html>, so watch that rather than react state
    const mo = new MutationObserver(readPalette);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const tip = tipRef.current;
    if (!wrap || !canvas || !tip) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let sim: Sim | null = null;
    let raf = 0;
    let cellPx = 3;
    const pointer = { x: -1, y: -1, vx: 0, vy: 0, active: false };
    const blast = { x: 0, y: 0, pending: false };
    let hovered: Pin | null = null;

    const setup = () => {
      const w = wrap.clientWidth;
      cellPx = w < 480 ? 2 : 3;
      const cols = Math.floor(w / cellPx);
      const rows = Math.round(cols / MAP_ASPECT);
      canvas.width = cols;
      canvas.height = rows;
      canvas.style.height = `${rows * cellPx}px`;
      const t = buildTargets(cols, rows);
      sim = {
        cols,
        rows,
        filled: new Int8Array(cols * rows).fill(-1),
        kind: t.kind,
        queues: t.queues,
        remaining: t.remaining,
        grains: [],
        particles: [],
        couriers: [],
        pins: t.pins,
        phase: "pour",
        holdUntil: 0,
        windDir: 1,
        windStart: 0,
        cycle: 0,
        nextCourier: 0,
        flashes: [],
        pending: [],
      };
      if (reduce) {
        ctx.clearRect(0, 0, cols, rows);
        const pal = paletteRef.current;
        for (const [x, ys] of t.queues) {
          for (const y of ys) {
            const c = colorFor(t.kind[y * cols + x]);
            ctx.fillStyle = pal[c];
            ctx.globalAlpha = ALPHA[c];
            ctx.fillRect(x, y, 1, 1);
          }
        }
        ctx.globalAlpha = 1;
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
        const up = s.cycle % 2 === 1;
        s.grains.push({
          x,
          y: up ? s.rows + 1 + Math.random() * s.rows * 0.6 : -1 - Math.random() * s.rows * 0.6,
          v: 0.3 + Math.random() * 0.4,
          ty,
        });
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
          if (c < 0 || s.kind[idx] !== K_LAND) continue;
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
        spawn(s, s.phase === "pour" ? 40 : 4);
        const up = s.cycle % 2 === 1;
        for (let i = s.grains.length - 1; i >= 0; i--) {
          const g = s.grains[i];
          g.v = Math.min(1.8, g.v + 0.07);
          g.y += up ? -g.v : g.v;
          if (up ? g.y <= g.ty : g.y >= g.ty) {
            const idx = g.ty * s.cols + g.x;
            if (s.filled[idx] < 0) {
              s.filled[idx] = colorFor(s.kind[idx]);
              s.remaining--;
              s.flashes.push({ i: idx, until: now + 130 });
              if (Math.random() < 0.2) {
                s.particles.push({
                  x: g.x + (Math.random() < 0.5 ? -1 : 1),
                  y: g.ty - 1,
                  vx: (Math.random() - 0.5) * 0.7,
                  vy: -0.4 - Math.random() * 0.5,
                  c: P_GRAIN,
                  ttl: 8 + Math.random() * 8,
                });
              }
            }
            s.grains.splice(i, 1);
          }
        }
        if (s.phase === "hold") {
          if (Math.random() < 0.5) {
            const i = (Math.random() * s.filled.length) | 0;
            if (s.filled[i] >= 0 && s.kind[i] === K_LAND) s.flashes.push({ i, until: now + 90 });
          }
          // home breathes
          const home = s.pins[s.pins.length - 1];
          if (Math.sin(now / 420) > 0.92) {
            for (const [dx, dy] of DIAMOND) {
              const i = (home.y + dy) * s.cols + home.x + dx;
              if (i >= 0 && i < s.filled.length && s.filled[i] >= 0) s.flashes.push({ i, until: now + 120 });
            }
          }
          // couriers: a grain sets off from a writer and walks home
          if (now >= s.nextCourier && s.pins.length > 1) {
            const from = s.pins[(Math.random() * (s.pins.length - 1)) | 0];
            s.couriers.push({
              x0: from.x,
              y0: from.y,
              x1: home.x,
              y1: home.y,
              t0: now,
              bend: (Math.random() - 0.5) * 0.35,
            });
            s.nextCourier = now + COURIER_EVERY_MS * (0.6 + Math.random() * 0.8);
          }
          if (pointer.active) s.holdUntil = Math.max(s.holdUntil, now + 2500);
        }
        if (s.phase === "pour" && s.remaining <= 0 && !s.grains.length) {
          s.phase = "hold";
          s.holdUntil = now + HOLD_MS;
          s.nextCourier = now + 600;
        } else if (s.phase === "hold" && now >= s.holdUntil) {
          s.phase = "wind";
          s.windDir = -s.windDir;
          s.windStart = now;
          s.grains.length = 0;
          s.pending.length = 0;
          s.couriers.length = 0;
          for (const q of s.queues.values()) q.length = 0;
        }
      } else {
        const sweep = ((now - s.windStart) / 1600) * (s.cols + 30);
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
          s.cycle++;
          const t = buildTargets(s.cols, s.rows);
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
      for (let i = s.couriers.length - 1; i >= 0; i--) {
        if (now - s.couriers[i].t0 > COURIER_MS) s.couriers.splice(i, 1);
      }
      if (pointer.active) eject(s, pointer.x, pointer.y, 4, now, 300);
      if (blast.pending) {
        blast.pending = false;
        eject(s, blast.x, blast.y, 11, now, 750);
      }
    };

    const courierAt = (c: Courier, t: number) => {
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const dx = c.x1 - c.x0;
      const dy = c.y1 - c.y0;
      const len = Math.hypot(dx, dy) || 1;
      const arc = Math.sin(e * Math.PI) * len * c.bend;
      return { x: c.x0 + dx * e - (dy / len) * arc, y: c.y0 + dy * e + (dx / len) * arc };
    };

    const draw = (s: Sim, now: number) => {
      ctx.clearRect(0, 0, s.cols, s.rows);
      const pal = paletteRef.current;
      for (let c = 0; c < pal.length; c++) {
        ctx.fillStyle = pal[c];
        ctx.globalAlpha = ALPHA[c];
        for (let i = 0; i < s.filled.length; i++) {
          if (s.filled[i] !== c) continue;
          ctx.fillRect(i % s.cols, (i / s.cols) | 0, 1, 1);
        }
      }
      ctx.globalAlpha = 1;
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
      ctx.fillStyle = pal[P_GRAIN];
      ctx.globalAlpha = ALPHA[P_GRAIN];
      for (const g of s.grains) ctx.fillRect(g.x, g.y | 0, 1, 1);
      for (const p of s.particles) {
        ctx.fillStyle = pal[p.c];
        ctx.globalAlpha = ALPHA[p.c];
        ctx.fillRect(p.x | 0, p.y | 0, 1, 1);
      }
      ctx.globalAlpha = 1;
      for (const c of s.couriers) {
        const t = (now - c.t0) / COURIER_MS;
        for (let k = 3; k >= 0; k--) {
          const tt = t - k * 0.02;
          if (tt < 0) continue;
          const { x, y } = courierAt(c, tt);
          ctx.fillStyle = k === 0 ? flashRef.current : pal[k === 1 ? P_HOME : P_PIN];
          ctx.fillRect(x | 0, y | 0, 1, 1);
        }
      }
      if (hovered) {
        const h = hovered;
        ctx.fillStyle = flashRef.current;
        const r = 3 + ((now / 120) % 3 | 0);
        for (let a = 0; a < 12; a++) {
          const ang = (a / 12) * Math.PI * 2;
          ctx.fillRect((h.x + Math.cos(ang) * r) | 0, (h.y + Math.sin(ang) * r) | 0, 1, 1);
        }
      }
    };

    const showTip = (pin: Pin | null) => {
      hovered = pin;
      if (!pin) {
        tip.hidden = true;
        return;
      }
      tip.textContent = pin.home
        ? `${pin.place.place} · home`
        : `${pin.place.name} · ${pin.place.place}`;
      tip.hidden = false;
      const rect = canvas.getBoundingClientRect();
      const px = (pin.x / (sim?.cols ?? 1)) * rect.width;
      const py = (pin.y / (sim?.rows ?? 1)) * rect.height;
      const half = tip.offsetWidth / 2 + 4;
      const left = Math.min(Math.max(px, half), rect.width - half);
      tip.style.left = `${left}px`;
      tip.style.top = `${py}px`;
    };

    const pinNear = (x: number, y: number) => {
      if (!sim) return null;
      let best: Pin | null = null;
      let bd = 36;
      for (const p of sim.pins) {
        const d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < bd) {
          bd = d;
          best = p;
        }
      }
      return best;
    };

    let lastTick = 0;
    const tick = (now: number) => {
      if (sim) {
        if (lastTick && now - lastTick > 400) {
          const gap = now - lastTick;
          sim.holdUntil += gap;
          sim.windStart += gap;
          sim.nextCourier += gap;
          for (const w of sim.pending) w.at += gap;
          for (const c of sim.couriers) c.t0 += gap;
        }
        lastTick = now;
        step(sim, now);
        draw(sim, now);
      }
      raf = requestAnimationFrame(tick);
    };

    setup();
    if (!reduce) raf = requestAnimationFrame(tick);

    const toCell = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * (sim?.cols ?? 1),
        y: ((e.clientY - rect.top) / rect.height) * (sim?.rows ?? 1),
      };
    };
    const onMove = (e: PointerEvent) => {
      const { x: nx, y: ny } = toCell(e);
      pointer.vx = Math.max(-4, Math.min(4, pointer.active ? nx - pointer.x : 0));
      pointer.vy = Math.max(-4, Math.min(4, pointer.active ? ny - pointer.y : 0));
      pointer.x = nx;
      pointer.y = ny;
      const near = pinNear(nx, ny);
      pointer.active = !near;
      if (near !== hovered) showTip(near);
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.vx = 0;
      pointer.vy = 0;
      showTip(null);
    };
    const onDown = (e: PointerEvent) => {
      const { x, y } = toCell(e);
      const near = pinNear(x, y);
      if (near) {
        showTip(near);
        if (near.place.url && e.pointerType === "mouse") window.open(near.place.url, "_blank", "noopener");
        return;
      }
      blast.x = x;
      blast.y = y;
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
    <div ref={wrapRef} className="relative w-full select-none" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block w-full cursor-crosshair touch-none"
        style={{ imageRendering: "pixelated" }}
      />
      <div
        ref={tipRef}
        hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-sm border border-border bg-bg px-2 py-1 font-mono text-[11px] text-fg"
      />
    </div>
  );
}
