import { ImageResponse } from "next/og";
import { BANNER_PATH } from "@/components/Banner";

/**
 * The preview shown when a link to the site is shared. Built at compile time
 * from the same banner path and palette as the page, so it can't drift from it.
 */
export const alt = "forest: an idea through research, requirements, a design direction and a build.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0a0a0a",
          color: "#c9c9d1",
          fontSize: 36,
          lineHeight: 1.4,
        }}
      >
        <svg viewBox="0 17 160 42" width={1008} height={265} shapeRendering="crispEdges">
          <path d={BANNER_PATH} fill="#bcbcc6" />
        </svg>
        <div style={{ marginTop: 56, display: "flex" }}>
          An idea through research, requirements, a design direction and a
          build. 6 camps, inside Claude Code.
        </div>
        <div style={{ marginTop: 20, fontSize: 26, color: "#9aa8d8", display: "flex" }}>
          From k-d studio
        </div>
      </div>
    ),
    size,
  );
}
