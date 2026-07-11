const FONT: Record<string, string[]> = {
  A: [".#.", "#.#", "###", "#.#", "#.#"],
  B: ["##.", "#.#", "##.", "#.#", "##."],
  C: [".##", "#..", "#..", "#..", ".##"],
  D: ["##.", "#.#", "#.#", "#.#", "##."],
  E: ["###", "#..", "##.", "#..", "###"],
  F: ["###", "#..", "##.", "#..", "#.."],
  G: [".##", "#..", "#.#", "#.#", ".##"],
  H: ["#.#", "#.#", "###", "#.#", "#.#"],
  I: ["###", ".#.", ".#.", ".#.", "###"],
  J: ["..#", "..#", "..#", "#.#", ".#."],
  K: ["#.#", "#.#", "##.", "#.#", "#.#"],
  L: ["#..", "#..", "#..", "#..", "###"],
  M: ["#.#", "###", "###", "#.#", "#.#"],
  N: ["##.", "#.#", "#.#", "#.#", "#.#"],
  O: [".#.", "#.#", "#.#", "#.#", ".#."],
  P: ["##.", "#.#", "##.", "#..", "#.."],
  Q: [".#.", "#.#", "#.#", ".#.", "..#"],
  R: ["##.", "#.#", "##.", "#.#", "#.#"],
  S: [".##", "#..", ".#.", "..#", "##."],
  T: ["###", ".#.", ".#.", ".#.", ".#."],
  U: ["#.#", "#.#", "#.#", "#.#", "###"],
  V: ["#.#", "#.#", "#.#", "#.#", ".#."],
  W: ["#.#", "#.#", "#.#", "###", "#.#"],
  X: ["#.#", "#.#", ".#.", "#.#", "#.#"],
  Y: ["#.#", "#.#", ".#.", ".#.", ".#."],
  Z: ["###", "..#", ".#.", "#..", "###"],
  ".": [".", ".", ".", ".", "#"],
  ",": [".", ".", ".", "#", "#"],
  "-": ["..", "..", "##", "..", ".."],
  "'": ["#", "#", ".", ".", "."],
};

const LINE_H = 5;
const LINE_GAP = 2;
const WORD_GAP = 3;

function wordWidth(word: string) {
  let w = 0;
  for (const ch of word) {
    const g = FONT[ch.toUpperCase()];
    if (g) w += g[0].length + 1;
  }
  return Math.max(0, w - 1);
}

function wrapWords(words: string[], limit: number): string[][] {
  const widths = words.map(wordWidth);
  const lineWidth = (a: number, b: number) => {
    let w = widths[a];
    for (let i = a + 1; i <= b; i++) w += WORD_GAP + widths[i];
    return w;
  };

  let count = 1;
  let cur = widths[0] ?? 0;
  for (let i = 1; i < widths.length; i++) {
    if (cur + WORD_GAP + widths[i] <= limit) cur += WORD_GAP + widths[i];
    else {
      count++;
      cur = widths[i];
    }
  }

  let best: { breaks: number[]; max: number } | null = null;
  const walk = (start: number, left: number, breaks: number[], worst: number) => {
    if (left === 1) {
      const w = lineWidth(start, words.length - 1);
      if (w > limit) return;
      const max = Math.max(worst, w);
      if (!best || max < best.max) best = { breaks: [...breaks], max };
      return;
    }
    for (let end = start; end <= words.length - left; end++) {
      const w = lineWidth(start, end);
      if (w > limit) break;
      breaks.push(end + 1);
      walk(end + 1, left - 1, breaks, Math.max(worst, w));
      breaks.pop();
    }
  };
  walk(0, count, [], 0);

  const cuts = best ? [0, ...(best as { breaks: number[] }).breaks, words.length] : [0, words.length];
  const lines: string[][] = [];
  for (let i = 0; i + 1 < cuts.length; i++) lines.push(words.slice(cuts[i], cuts[i + 1]));
  return lines;
}

export function renderTextFrame(text: string, cols: number, rows: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = wrapWords(words, cols - 2);
  const height = lines.length * LINE_H + (lines.length - 1) * LINE_GAP;
  const top = Math.max(0, ((rows - height) / 2) | 0);
  const grid = Array.from({ length: rows }, () => new Array<string>(cols).fill(" "));

  lines.forEach((line, li) => {
    const lw = line.reduce((w, word, i) => w + wordWidth(word) + (i ? WORD_GAP : 0), 0);
    let x = Math.max(0, ((cols - lw) / 2) | 0);
    const y = top + li * (LINE_H + LINE_GAP);
    line.forEach((word, wi) => {
      if (wi) x += WORD_GAP;
      for (const ch of word) {
        const g = FONT[ch.toUpperCase()];
        if (!g) continue;
        for (let r = 0; r < LINE_H; r++) {
          if (y + r >= rows) break;
          const strokes = g[r];
          for (let c = 0; c < strokes.length; c++) {
            if (strokes[c] === "#" && x + c < cols) grid[y + r][x + c] = "@";
          }
        }
        x += g[0].length + 1;
      }
      x -= 1;
    });
  });

  return grid.map((r) => r.join(""));
}
