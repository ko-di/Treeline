"use client";

/**
 * The 6 camps as a loop. Hovering or focusing a camp lights the 2 links it
 * sits between, and draws the accent line in from where it starts.
 *
 * The 4 camps a project can finish at carry a ring around the dot. Hovering
 * one fades the trail past it, which is the same thing the kit does to a
 * map when the outcome is not a build: available rather than required. The
 * ring demonstrates the idea rather than labelling it.
 *
 * Shape carries a second, dotted link back to Learn, because Shape is not
 * gated to its slot in the order: it runs whenever references turn up, which
 * is usually while Learn is still open. The dotted line says that without a
 * paragraph having to.
 *
 * The geometry is computed once at module scope, so the server and the client
 * draw the same numbers and nothing shifts on hydration. Arc lengths are
 * exact (R × θ for a circular arc), which saves measuring paths in the DOM.
 */
import { useState } from "react";
import { CAMPS } from "@/lib/content";
import { Ticks } from "@/components/sections";

const N = CAMPS.length;
const CX = 126;
const CY = 116;
const R = 80;
const LABEL_OFFSET = 19;

/** One sixth of the circle, the length of a single segment. */
const ARC_LEN = (2 * Math.PI * R) / N;

const angleAt = (i: number) => ((-90 + i * (360 / N)) * Math.PI) / 180;
const round = (v: number) => Math.round(v * 100) / 100;

function pointAt(angle: number, r: number) {
  return { x: round(CX + r * Math.cos(angle)), y: round(CY + r * Math.sin(angle)) };
}

const PTS = CAMPS.map((_, i) => pointAt(angleAt(i), R));

/** Labels sit outside the ring, turned away from the centre. */
const LABELS = CAMPS.map((camp, i) => {
  const a = angleAt(i);
  const p = pointAt(a, R + LABEL_OFFSET);
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return {
    name: camp.name,
    x: p.x,
    y: p.y + (sin < -0.3 ? -2 : sin > 0.3 ? 10 : 4),
    anchor: cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle",
  } as const;
});

const RING = CAMPS.map((_, i) => {
  const from = i;
  const to = (i + 1) % N;
  const a = PTS[from];
  const b = PTS[to];
  return { from, to, d: `M${a.x},${a.y} A${R},${R} 0 0 1 ${b.x},${b.y}` };
});

const SHAPE = CAMPS.findIndex((c) => c.slug === "shape");
const LEARN = CAMPS.findIndex((c) => c.slug === "learn");
const EXTRA = {
  d: `M${PTS[SHAPE].x},${PTS[SHAPE].y} L${PTS[LEARN].x},${PTS[LEARN].y}`,
};

function joins(i: number) {
  const before = CAMPS[(i - 1 + N) % N].name;
  const after = CAMPS[(i + 1) % N].name;
  const line = `From ${before}, into ${after}.`;
  if (i === SHAPE) return `${line} Also runs alongside ${CAMPS[LEARN].name}.`;
  if (i === LEARN) return `${line} Also runs alongside ${CAMPS[SHAPE].name}.`;
  return line;
}

export function Flow() {
  const [active, setActive] = useState<number | null>(null);

  const linked = (i: number) => {
    if (active === null) return false;
    if ((i + 1) % N === active || (active + 1) % N === i) return true;
    return (
      (active === SHAPE && i === LEARN) || (active === LEARN && i === SHAPE)
    );
  };

  const nodeClass = (i: number) => {
    if (active === null) return "node";
    if (i === active) return "node is-active";
    return linked(i) ? "node is-related" : "node is-dim";
  };

  /**
   * Past the hovered camp's finish line. Only when that camp is one somebody
   * can stop at, and never for Ship, which is the end of the trail anyway.
   */
  const segBeyond = (from: number) =>
    active !== null &&
    CAMPS[active].exit !== undefined &&
    active < N - 1 &&
    from >= active;

  const segLit = (from: number, to: number) =>
    !segBeyond(from) && (active === from || active === to);

  return (
    <div className="loop">
      <svg viewBox="0 0 252 245" focusable="false">
        {RING.map((seg) => (
          <path
            key={`base-${seg.from}`}
            className={
              "seg-base" +
              (segBeyond(seg.from)
                ? " is-beyond"
                : segLit(seg.from, seg.to)
                  ? " is-lit"
                  : active !== null
                    ? " is-dim"
                    : "")
            }
            d={seg.d}
          />
        ))}
        {RING.map((seg) => (
          <path
            key={`flow-${seg.from}`}
            className={"seg-flow" + (segLit(seg.from, seg.to) ? " is-lit" : "")}
            style={{ "--len": ARC_LEN } as React.CSSProperties}
            d={seg.d}
          />
        ))}
        <path
          className={
            "seg-extra" +
            (active === SHAPE || active === LEARN ? " is-lit" : "")
          }
          d={EXTRA.d}
        />

        {CAMPS.map((camp, i) => (
          <g
            key={camp.slug}
            className={nodeClass(i)}
            tabIndex={0}
            role="button"
            aria-label={
              `${camp.name}. ${camp.short} ${joins(i)}` +
              (camp.exit ? ` You could stop here: ${camp.exit.leave}.` : "")
            }
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(i)}
          >
            <circle className="node-hit" cx={PTS[i].x} cy={PTS[i].y} r={21} />
            {camp.exit && (
              <circle className="node-ring" cx={PTS[i].x} cy={PTS[i].y} r={14.6} />
            )}
            <circle className="node-dot" cx={PTS[i].x} cy={PTS[i].y} r={11.2} />
            <text x={LABELS[i].x} y={LABELS[i].y} textAnchor={LABELS[i].anchor}>
              {camp.name}
            </text>
          </g>
        ))}
      </svg>

      {/* A visual echo of each camp's own label, so it is not read out twice. */}
      <div className="loop-caption" aria-hidden="true">
        {active === null ? (
          <p className="idle">
            One loop, 6 camps. The 4 with a ring are places you could stop.
          </p>
        ) : (
          <>
            <p className="step">{CAMPS[active].name}</p>
            <p className="desc">{CAMPS[active].short}</p>
            {CAMPS[active].exit ? (
              <p className="desc stop">
                Stop here and you have <Ticks>{CAMPS[active].exit.leave}</Ticks>.
              </p>
            ) : (
              <p className="desc dim">{joins(active)}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
