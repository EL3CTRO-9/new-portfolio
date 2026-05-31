import FooterCascade from "./FooterCascade";
import { TILES, type TileKey } from "../data/tiles";
import { FOOTER_H } from "../lib/constants";

interface FooterStripProps {
  /** Active post tile. Undefined = idle (no post selected). */
  tileKey?: TileKey;
  /** Optional idle background image (e.g. the house tile on home / about). */
  houseTile?: string;
  /** Optional override for the left-hand label (e.g. "ABOUT"). */
  label?: string;
  onHomeClick?: (e: React.MouseEvent) => void;
}

export default function FooterStrip({
  tileKey,
  houseTile,
  label,
  onHomeClick,
}: FooterStripProps) {
  const meta = tileKey ? TILES[tileKey] : undefined;
  const tileName = meta ? meta.name.toUpperCase() : "";

  const today = new Date()
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

  const leftLabel = label ?? (tileKey ? `POST · ${tileName}` : `HOME · ${today}`);

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 8,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#faf8f5",
    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
  };

  return (
    <div
      style={{
        height: FOOTER_H,
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FooterCascade tileKey={tileKey} houseTile={houseTile} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 22px",
        }}
      >
        <span style={labelStyle}>{leftLabel}</span>

        {tileKey && onHomeClick && (
          <a
            href="/"
            onClick={onHomeClick}
            style={{
              ...labelStyle,
              textDecoration: "none",
            }}
          >
            ↩ INDEX
          </a>
        )}
      </div>
    </div>
  );
}
