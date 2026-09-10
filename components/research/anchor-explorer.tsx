"use client";

import { useId, useState } from "react";

export default function AnchorExplorer() {
  const id = useId();
  const [minimum, setMinimum] = useState(0.65);
  const width = 600, height = 260, left = 46, right = 574, bottom = 215, top = 25;
  const sx = (x: number) => left + (x / 2) * (right - left);
  const sy = (y: number) => bottom - (y / 1.6) * (bottom - top);
  const truth = (x: number) => 1.35 * x * x / (0.25 + x * x);
  const shifted = (x: number) => truth(x) + 0.24 * (1 - Math.exp(-x / 0.08));
  const path = (fn: (x: number) => number) => Array.from({ length: 121 }, (_, i) => { const x = i / 60; return `${i ? "L" : "M"}${sx(x).toFixed(2)},${sy(fn(x)).toFixed(2)}`; }).join(" ");
  const discrepancy = 0.24 * Math.exp(-minimum / 0.08);

  return (
    <figure className="anchor-explorer not-prose">
      <div className="explorer-heading"><span className="eyebrow">Explore the mechanism</span><span>Illustration · not a fitted run</span></div>
      <h3>Both functions are zero at zero.<br />The measurements decide if that matters.</h3>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={`${id}-title ${id}-description`}>
        <title id={`${id}-title`}>A zero anchor can coexist with an offset on the observed range</title>
        <desc id={`${id}-description`}>The true Hill curve and an anchored alternative differ by approximately 0.24 away from zero. Lowering the basal parameter by 0.24 cancels that difference except near zero. The shaded region starts at the selected minimum input.</desc>
        <rect x={sx(minimum)} y={top} width={right - sx(minimum)} height={bottom - top} fill="var(--c-olive)" opacity=".1" />
        {[0, .5, 1, 1.5].map(y => <g key={y}><line x1={left} x2={right} y1={sy(y)} y2={sy(y)} stroke="var(--c-border)" /><text x={left - 12} y={sy(y) + 4} textAnchor="end">{y}</text></g>)}
        {[0, .5, 1, 1.5, 2].map(x => <text key={x} x={sx(x)} y={bottom + 20} textAnchor="middle">{x}</text>)}
        <path d={path(truth)} fill="none" stroke="var(--c-text)" strokeWidth="2.5" />
        <path d={path(shifted)} fill="none" stroke="var(--c-accent)" strokeWidth="2.5" strokeDasharray="6 4" />
        <line x1={sx(minimum)} x2={sx(minimum)} y1={top} y2={bottom} stroke="var(--c-olive)" strokeDasharray="3 4" />
        <circle cx={left} cy={bottom} r="4" fill="var(--c-text)" />
        <text x={right} y={height - 3} textAnchor="end">Regulator concentration, x</text>
      </svg>
      <div className="explorer-legend"><span><i />True function</span><span><i />Anchored alternative</span><span><i />Observed range</span></div>
      <label htmlFor={id}>Lowest observed input <output htmlFor={id}>{minimum.toFixed(2)}</output></label>
      <input id={id} type="range" min="0" max="1" step="0.01" value={minimum} onChange={event => setMinimum(Number(event.target.value))} />
      <p className="explorer-insight" aria-live="polite">{minimum < .15 ? "Near the anchor, the alternative cannot hide its offset." : "Away from the anchor, a changed basal rate can cancel almost the entire offset."} The largest remaining production mismatch in the shaded range is <strong>{discrepancy.toFixed(3)}</strong>.</p>
      <figcaption>The alternative adds 0.24(1 − exp(−x/0.08)) to a Hill function and subtracts 0.24 from a basal rate of 0.30. The total production mismatch is 0.24 exp(−x/0.08). This algebraic example explains the compensation; it does not simulate the seven-state model.</figcaption>
    </figure>
  );
}
