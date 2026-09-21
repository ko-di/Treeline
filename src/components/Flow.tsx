/**
 * The six camps as a flow, drawn inline. Two drawings of the same thing: a
 * row for wide screens, and a column for phones, where the row would shrink
 * its labels to about six pixels. CSS shows one or the other.
 */
const LABELS = ["Frame", "Learn", "Decide", "Shape", "Build", "Ship"];
const LOOP_LABEL = "what you learn feeds the next project";

export function Flow() {
  return (
    <div className="flow" aria-hidden="true">
      <Row />
      <Column />
    </div>
  );
}

function Row() {
  const W = 84;      // box width, wide enough for "Decide"
  const STEP = 114;  // box + gap
  const X0 = 33;     // left margin

  const x = (i: number) => X0 + i * STEP;
  const last = x(LABELS.length - 1) + W / 2;
  const first = X0 + W / 2;
  const span = (last - first) / 2;

  return (
    <svg className="flow-row" viewBox="0 0 720 96" role="presentation" focusable="false">
      {LABELS.map((label, i) => (
        <g key={label} transform={`translate(${x(i)} 26)`}>
          <rect x="0" y="0" width={W} height="30" rx="4" />
          <text x={W / 2} y="19">{label}</text>
        </g>
      ))}
      {LABELS.slice(0, -1).map((_, i) => (
        <path key={i} d={`M${x(i) + W + 2} 41 L${x(i + 1) - 2} 41`} className="arrow" />
      ))}
      <path d={`M${last} 58 q0 30 -${span} 30 q-${span} 0 -${span} -30`} className="loop" />
      <text x={(first + last) / 2} y="94" className="loop-label">
        {LOOP_LABEL}
      </text>
    </svg>
  );
}

function Column() {
  const W = 120;     // box width
  const H = 26;      // box height
  const STEP = 36;   // box + gap
  const X = 90;      // left edge of the boxes, leaving room for the loop
  const Y0 = 4;

  const y = (i: number) => Y0 + i * STEP;
  const mid = (i: number) => y(i) + H / 2;
  const lastMid = mid(LABELS.length - 1);
  const height = y(LABELS.length - 1) + H + 30;

  return (
    <svg className="flow-column" viewBox={`0 0 300 ${height}`} role="presentation" focusable="false">
      {LABELS.map((label, i) => (
        <g key={label} transform={`translate(${X} ${y(i)})`}>
          <rect x="0" y="0" width={W} height={H} rx="4" />
          <text x={W / 2} y={H / 2 + 5}>{label}</text>
        </g>
      ))}
      {LABELS.slice(0, -1).map((_, i) => (
        <path key={i} d={`M${X + W / 2} ${y(i) + H + 2} L${X + W / 2} ${y(i + 1) - 2}`} className="arrow" />
      ))}
      <path
        d={`M${X - 2} ${lastMid} H${X - 34} q-8 0 -8 -8 V${mid(0) + 8} q0 -8 8 -8 H${X - 2}`}
        className="loop"
      />
      <text x={X + W / 2} y={height - 6} className="loop-label">
        {LOOP_LABEL}
      </text>
    </svg>
  );
}
