/** The six camps as a flow, drawn inline. */
export function Flow() {
  const labels = ["Intake", "Discover", "Define", "Design", "Build", "Ship"];
  const W = 84;      // box width, wide enough for "Discover"
  const STEP = 114;  // box + gap
  const X0 = 33;     // left margin

  const x = (i: number) => X0 + i * STEP;
  const last = x(labels.length - 1) + W / 2;
  const first = X0 + W / 2;
  const span = (last - first) / 2;

  return (
    <div className="flow" aria-hidden="true">
      <svg viewBox="0 0 720 96" role="presentation" focusable="false">
        {labels.map((label, i) => (
          <g key={label} transform={`translate(${x(i)} 26)`}>
            <rect x="0" y="0" width={W} height="30" rx="4" />
            <text x={W / 2} y="19">{label}</text>
          </g>
        ))}
        {labels.slice(0, -1).map((_, i) => (
          <path key={i} d={`M${x(i) + W + 2} 41 L${x(i + 1) - 2} 41`} className="arrow" />
        ))}
        <path d={`M${last} 58 q0 30 -${span} 30 q-${span} 0 -${span} -30`} className="loop" />
        <text x={(first + last) / 2} y="94" className="loop-label">
          what you learn feeds the next project
        </text>
      </svg>
    </div>
  );
}
