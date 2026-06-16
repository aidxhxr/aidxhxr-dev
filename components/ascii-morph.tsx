"use client";

import { useEffect, useRef } from "react";
import { ASCII_COLS, ASCII_ROWS, ASCII_FRAMES } from "@/lib/ascii-frames";

const CHAOS = "@#%*+=~-:.oxiltf/\\|()<>";
const N = ASCII_COLS * ASCII_ROWS;

type Seg = { kind: "chaos" | "resolve" | "hold" | "dissolve"; dur: number; frame: number };

function buildSequence(): Seg[] {
  const seq: Seg[] = [];
  for (let i = 0; i < ASCII_FRAMES.length; i++) {
    seq.push({ kind: "chaos", dur: 650, frame: i });
    seq.push({ kind: "resolve", dur: 950, frame: i });
    seq.push({ kind: "hold", dur: 2000, frame: i });
    seq.push({ kind: "dissolve", dur: 750, frame: i });
  }
  return seq;
}

function chaosChar() {
  return CHAOS[(Math.random() * CHAOS.length) | 0];
}

export default function AsciiMorph() {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.textContent = ASCII_FRAMES[ASCII_FRAMES.length - 1].join("\n");
      node.classList.add("text-ascii");
      node.classList.remove("text-ascii-dim");
      return;
    }

    const seq = buildSequence();
    const total = seq.reduce((a, s) => a + s.dur, 0);
    const ranks = new Float32Array(N);
    let ranksFor = -1;

    const reshuffle = () => {
      for (let i = 0; i < N; i++) ranks[i] = Math.random();
    };

    let raf = 0;
    const start = performance.now();
    let bright = false;

    const tick = (now: number) => {
      let t = (now - start) % total;
      let seg = seq[0];
      for (const s of seq) {
        if (t < s.dur) {
          seg = s;
          break;
        }
        t -= s.dur;
      }
      const p = t / seg.dur;

      if (seg.kind === "resolve" || seg.kind === "dissolve") {
        const key = seg.frame * 2 + (seg.kind === "resolve" ? 0 : 1);
        if (key !== ranksFor) {
          reshuffle();
          ranksFor = key;
        }
      }

      const frame = ASCII_FRAMES[seg.frame];
      let out = "";
      let i = 0;
      for (let y = 0; y < ASCII_ROWS; y++) {
        const row = frame[y];
        for (let x = 0; x < ASCII_COLS; x++) {
          let locked: boolean;
          if (seg.kind === "chaos") locked = false;
          else if (seg.kind === "hold") locked = true;
          else if (seg.kind === "resolve") locked = ranks[i] < p;
          else locked = ranks[i] > p;
          out += locked ? row[x] : chaosChar();
          i++;
        }
        if (y < ASCII_ROWS - 1) out += "\n";
      }
      node.textContent = out;

      const wantBright = seg.kind === "hold" || (seg.kind === "resolve" && p > 0.2);
      if (wantBright !== bright) {
        bright = wantBright;
        node.classList.toggle("text-ascii", bright);
        node.classList.toggle("text-ascii-dim", !bright);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className="font-mono text-ascii-dim transition-colors select-none text-[6px] md:text-[7px] leading-[1em] tracking-[0]"
    />
  );
}
