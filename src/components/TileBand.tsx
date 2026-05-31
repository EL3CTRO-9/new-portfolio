import { useId } from "react";
import { TILES, type TileKey } from "../data/tiles";

interface TileBandProps {
  tileKey: TileKey;
  width: number;
  height: number;
}

function BandPattern({
  pattern,
  accent,
  size,
}: {
  pattern: string;
  accent: string;
  size: number;
}) {
  const c = size / 2;
  switch (pattern) {
    case "cross":
      return (
        <g stroke={accent} strokeWidth={size * 0.04} fill="none">
          <line x1={c} y1={size * 0.15} x2={c} y2={size * 0.85} />
          <line x1={size * 0.15} y1={c} x2={size * 0.85} y2={c} />
        </g>
      );
    case "vine":
      return (
        <g stroke={accent} strokeWidth={size * 0.03} fill="none">
          <path d={`M ${size * 0.1} ${c} Q ${c} ${size * 0.2}, ${size * 0.9} ${c}`} />
          <circle cx={c} cy={size * 0.4} r={size * 0.04} fill={accent} />
        </g>
      );
    case "floral":
      return (
        <g stroke={accent} strokeWidth={size * 0.02} fill="none">
          {[0, 90, 180, 270].map((deg) => (
            <ellipse
              key={deg}
              cx={c}
              cy={c - size * 0.15}
              rx={size * 0.05}
              ry={size * 0.13}
              transform={`rotate(${deg} ${c} ${c})`}
            />
          ))}
          <circle cx={c} cy={c} r={size * 0.05} fill={accent} />
        </g>
      );
    case "mandala":
      return (
        <g stroke={accent} strokeWidth={size * 0.02} fill="none">
          <circle cx={c} cy={c} r={size * 0.28} />
          <circle cx={c} cy={c} r={size * 0.14} />
          <circle cx={c} cy={c} r={size * 0.05} fill={accent} />
        </g>
      );
    case "star":
      return (
        <g stroke={accent} strokeWidth={size * 0.025} fill="none">
          {[0, 72, 144, 216, 288].map((deg) => (
            <line
              key={deg}
              x1={c}
              y1={size * 0.18}
              x2={c}
              y2={size * 0.82}
              transform={`rotate(${deg} ${c} ${c})`}
            />
          ))}
        </g>
      );
    case "lattice":
      return (
        <g stroke={accent} strokeWidth={size * 0.02} fill="none">
          <line x1={size * 0.25} y1={size * 0.1} x2={size * 0.25} y2={size * 0.9} />
          <line x1={size * 0.5} y1={size * 0.1} x2={size * 0.5} y2={size * 0.9} />
          <line x1={size * 0.75} y1={size * 0.1} x2={size * 0.75} y2={size * 0.9} />
          <line x1={size * 0.1} y1={c} x2={size * 0.9} y2={c} />
        </g>
      );
    default:
      return null;
  }
}

export default function TileBand({ tileKey, width, height }: TileBandProps) {
  const id = useId();
  const meta = TILES[tileKey];
  if (!meta) return null;

  if (meta.imageUrl) {
    return (
      <div
        style={{
          width,
          height,
          backgroundImage: `url(${meta.imageUrl})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: `${height}px ${height}px`,
        }}
      />
    );
  }

  const tileSize = height;
  const count = Math.ceil(width / tileSize) + 1;

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <defs>
        <pattern
          id={`band-${id}`}
          width={tileSize}
          height={tileSize}
          patternUnits="userSpaceOnUse"
        >
          <rect width={tileSize} height={tileSize} fill={meta.color} />
          <BandPattern
            pattern={meta.pattern}
            accent={meta.accent}
            size={tileSize}
          />
        </pattern>
        <linearGradient id={`band-glaze-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill={`url(#band-${id})`} />
      <rect width={width} height={height} fill={`url(#band-glaze-${id})`} />
    </svg>
  );
}
