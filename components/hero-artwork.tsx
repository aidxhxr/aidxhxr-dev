/** An illustrative drawing, separate from the measured research figures. */
export default function HeroArtwork() {
  return (
    <div className="research-artwork">
      <div className="artwork-topline"><span>WNT / RA / HOX</span><span>07 states · 36 parameters</span></div>
      <svg viewBox="0 0 580 360" fill="none" role="img" aria-labelledby="research-art-title research-art-description">
        <title id="research-art-title">From observed trajectories to hidden dynamics</title>
        <desc id="research-art-description">An illustrative phase-space drawing: seven trajectories flow from different initial states toward an equilibrium. This is a schematic, not experimental data.</desc>
        <defs>
          <pattern id="research-grid" width="35" height="35" patternUnits="userSpaceOnUse">
            <path d="M35 0H0V35" className="art-grid" strokeWidth=".65" />
          </pattern>
        </defs>
        <rect x="35" y="20" width="510" height="305" fill="url(#research-grid)" />
        <path d="M58 282H532M58 282V38" className="art-axis" strokeWidth="1" />
        <path d="m527 278 5 4-5 4M54 43l4-5 4 5" className="art-axis" />
        <path d="M65 265C107 262 126 122 186 92C249 60 263 234 349 220C402 211 371 111 316 131C272 147 304 203 338 189C358 180 347 155 332 164C323 169 329 179 335 174" className="art-trajectory art-rust" strokeWidth="2.5" />
        <path d="M67 61C131 68 119 217 206 234C281 249 267 89 345 114C416 137 355 220 317 190C289 168 315 140 337 155C351 165 342 181 333 174" className="art-trajectory art-olive" strokeWidth="2" />
        <path d="M67 183C134 186 166 59 247 69C327 79 278 229 357 205C409 189 371 118 328 139C298 155 306 194 336 184C351 177 344 159 334 167" className="art-trajectory art-ink" strokeWidth="1.6" />
        <path d="M67 226C151 220 150 89 222 104C283 117 265 210 327 220C390 229 394 136 345 131C309 129 294 177 322 190C346 201 355 172 338 166" className="art-trajectory art-rust" strokeOpacity=".48" strokeWidth="1.4" />
        <path d="M67 113C151 111 130 262 231 251C312 242 289 87 360 115C426 142 371 225 324 197C288 176 308 137 333 148C357 158 349 185 334 178" className="art-trajectory art-olive" strokeOpacity=".45" strokeWidth="1.4" />
        <path d="M67 146C116 141 172 246 242 211C305 179 296 102 351 138C397 168 350 219 321 187C298 162 325 144 340 162C350 174 338 184 332 173" className="art-trajectory art-ink" strokeOpacity=".35" strokeWidth="1.2" />
        <path d="M67 248C130 257 134 122 207 130C274 137 282 250 361 211C411 186 365 104 319 141C288 167 316 202 340 183C352 173 340 159 332 169" className="art-trajectory art-rust" strokeOpacity=".25" strokeWidth="1.2" />
        {[61, 113, 146, 183, 226, 248, 265].map((cy, index) => <circle key={cy} cx="67" cy={cy} r="3" className={index % 2 ? "art-point-rust" : "art-point-olive"} />)}
        <circle cx="334" cy="172" r="5" className="art-equilibrium" />
        <circle cx="334" cy="172" r="11" className="art-equilibrium-ring" strokeWidth=".8" />
        <path d="m348 163 75-53h72" className="art-axis" strokeDasharray="3 4" />
        <text x="428" y="101" className="art-annotation">hidden dynamics</text>
        <text x="76" y="307" className="art-annotation">observations</text>
        <text x="383" y="307" className="art-equation">ẋ = f(x, θ) + gφ(x)</text>
      </svg>
      <div className="artwork-bottomline"><span>Fit the trajectory. Question the mechanism.</span><span>Illustrative schematic</span></div>
    </div>
  );
}
