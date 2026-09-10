/** Editorial illustrations, not screenshots or measured results. */
export default function WorkVisual({ slug }: { slug: string }) {
  return (
    <div className={`work-visual visual-${slug}`} aria-hidden="true">
      <svg viewBox="0 0 600 360" fill="none" focusable="false">
        {slug === "pinn-research" && <>
          <g className="visual-grid">{[90, 150, 210, 270].map(y => <path key={y} d={`M50 ${y}H550`} />)}{[100, 200, 300, 400, 500].map(x => <path key={x} d={`M${x} 50V305`} />)}</g>
          {Array.from({ length: 12 }, (_, i) => <path key={i} className={i % 3 === 0 ? "visual-accent" : "visual-line"} opacity={.3 + i * .05} strokeWidth={1.5} d={`M50 ${285 - i * 5} C145 ${280 - i * 13}, 130 ${70 + i * 4}, 255 ${77 + i * 12} S400 ${280 - i * 13}, 550 ${80 + i * 11}`} />)}
          <circle cx="300" cy="178" r="55" className="visual-line" strokeDasharray="2 6" />
          <text x="50" y="33">TRAJECTORY / MECHANISM</text><text x="50" y="333">f(t; θ)</text><text x="494" y="333">t →</text>
        </>}
        {slug === "swatgpt" && <>
          <g className="visual-grid">{Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${40 + i * 30} 40V320`} />)}{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M40 ${40 + i * 30}H560`} />)}</g>
          <path d="M98 208V135L150 102L202 135V208M116 208V146H184V208M140 208V175H160V208M83 211H218" className="visual-line" strokeWidth="2" />
          <path d="M219 174H282M398 174H467" className="visual-accent" strokeWidth="2" strokeDasharray="3 5" />
          <rect x="282" y="116" width="116" height="116" rx="58" className="visual-solid" />
          <g className="visual-inverse" strokeWidth="1.4">{[-24, 0, 24].map(x => <ellipse key={x} cx="340" cy="174" rx={40 - Math.abs(x)} ry="40" />)}<path d="M300 174H380M306 154H374M306 194H374" /></g>
          <path d="M468 139H530V192H491L478 204V192H468Z" className="visual-line" strokeWidth="2" />
          <path d="M481 155H518M481 165H511M481 175H503" className="visual-line" />
          <text x="150" y="268" textAnchor="middle">CAMPUS KNOWLEDGE</text><text x="340" y="268" textAnchor="middle">LOCAL INFERENCE</text><text x="500" y="268" textAnchor="middle">CONVERSATION</text>
          <text x="42" y="35">SWARTHMORE / SCCS</text>
        </>}
        {slug === "grokeye" && <>
          <g className="visual-grid"><path d="M55 80H545M55 180H545M55 280H545M145 45V315M300 45V315M455 45V315" /></g>
          <path d="M94 251L224 103L357 251Z" className="visual-line" opacity=".3" /><path d="M261 264L384 90L508 264Z" className="visual-line" opacity=".3" />
          <path d="M227 133L310 108L373 155V238L290 265L227 218Z" className="visual-line" strokeWidth="1.5" />
          <path d="M227 133L290 181L373 155M290 181V265" className="visual-line" strokeWidth="1.5" />
          <rect x="207" y="88" width="186" height="192" className="visual-accent" strokeDasharray="2 5" />
          <path d="M207 113V88H232M368 88H393V113M393 255V280H368M232 280H207V255" className="visual-accent" strokeWidth="3" />
          <circle cx="291" cy="181" r="6" className="visual-solid" /><path d="M407 183H493" className="visual-accent" /><text x="408" y="169">FOLLOW THE OBJECT</text>
          <text x="42" y="35">SEE → TRACK → RESPOND</text><path d="M42 324H138" className="visual-line" /><text x="420" y="330">VOICE + VISION</text>
        </>}
        {slug === "company-brain" && <>
          <g className="visual-line" opacity=".45"><path d="M299 170L149 95M299 170L444 79M299 170L474 237M299 170L178 272M299 170L79 209M149 95L79 209M444 79L474 237M178 272L79 209M178 272L474 237" /></g>
          {[[149,95,"DECISIONS"],[444,79,"CUSTOMERS"],[474,237,"INVOICES"],[178,272,"CONTEXT"],[79,209,"CHATS"]].map(([x,y,label]) => <g key={label} transform={`translate(${x},${y})`}><circle r="25" className="visual-paper" /><path d="M-8 -10H5L10 -5V10H-8ZM-3 -3H5M-3 2H5" className="visual-line" /><text y="44" textAnchor="middle">{label}</text></g>)}
          <circle cx="299" cy="170" r="53" className="visual-solid" /><g className="visual-inverse"><rect x="278" y="150" width="42" height="40" /><path d="M284 143H326V183M285 161H313M285 169H310M285 177H302" /></g>
          <text x="299" y="243" textAnchor="middle">THE VAULT</text><text x="42" y="35">MEMORY, WITH CONNECTIONS</text>
        </>}
        {slug === "breadcrumbs" && <>
          <path d="M74 240C135 240 105 114 206 114S267 261 369 247S440 109 527 109" className="visual-line" strokeDasharray="2 7" />
          {[[85,221],[180,100],[294,158],[401,222],[510,112]].map(([x,y],i) => <g key={i} transform={`translate(${x},${y}) rotate(${[8,-9,5,-5,9][i]})`}><rect x="-33" y="-41" width="66" height="82" className="visual-paper" /><circle cy="-9" r="16" className="visual-solid" opacity={1 - i * .14} /><path d="M-17 18H17M-17 25H7" className="visual-line" opacity=".5" /></g>)}
          <text x="42" y="35">A SMALLER SOCIAL SPACE</text><text x="42" y="330">FIVE A DAY.</text><text x="421" y="330">ROOM TO DISAPPEAR.</text>
        </>}
        {slug === "building-tickflow" && <>
          <g className="visual-grid">{[100,160,220,280].map(y => <path key={y} d={`M60 ${y}H540`} />)}{[180,270,360,450,540].map(x => <path key={x} d={`M${x} 68V290`} />)}</g>
          {[100,160,220,280].map((y,i) => <g key={y}><circle cx="83" cy={y - 20} r="8" className="visual-line" /><path d={`M79 ${y - 20}l3 3 5 -6`} className="visual-accent" /><path d={`M105 ${y - 20}H145`} className="visual-line" opacity=".5" /><rect x={180 + i * 60} y={y - 35} width={160 - i * 16} height="28" rx="3" className="visual-solid" opacity={1 - i * .18} /></g>)}
          <path d="M332 58V293" className="visual-accent" strokeDasharray="3 5" /><text x="42" y="35">TASKS → PROJECTS → PEOPLE</text><text x="42" y="330">MAKING THE WORK VISIBLE</text>
        </>}
      </svg>
    </div>
  );
}
