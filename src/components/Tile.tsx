import { TILES, type TileKey } from "../data/tiles";

function PatternShape({
  pattern,
  accent,
  size,
}: {
  pattern: string;
  accent: string;
  size: number;
}) {
  const s = size;
  const c = s / 2;

  switch (pattern) {
    case "cross":
      return (
        <g stroke={accent} strokeWidth={s * 0.04} fill="none">
          <line x1={c} y1={s * 0.15} x2={c} y2={s * 0.85} />
          <line x1={s * 0.15} y1={c} x2={s * 0.85} y2={c} />
          <line x1={s * 0.25} y1={s * 0.25} x2={s * 0.75} y2={s * 0.75} />
          <line x1={s * 0.75} y1={s * 0.25} x2={s * 0.25} y2={s * 0.75} />
        </g>
      );
    case "vine":
      return (
        <g stroke={accent} strokeWidth={s * 0.03} fill="none">
          <path
            d={`M ${s * 0.2} ${s * 0.8} Q ${c} ${s * 0.2}, ${s * 0.8} ${s * 0.5}`}
          />
          <circle cx={s * 0.3} cy={s * 0.6} r={s * 0.04} fill={accent} />
          <circle cx={s * 0.6} cy={s * 0.35} r={s * 0.03} fill={accent} />
          <circle cx={s * 0.75} cy={s * 0.55} r={s * 0.035} fill={accent} />
        </g>
      );
    case "floral":
      return (
        <g stroke={accent} strokeWidth={s * 0.02} fill="none">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx={c}
              cy={c - s * 0.18}
              rx={s * 0.06}
              ry={s * 0.16}
              transform={`rotate(${deg} ${c} ${c})`}
            />
          ))}
          <circle cx={c} cy={c} r={s * 0.06} fill={accent} />
        </g>
      );
    case "mandala":
      return (
        <g stroke={accent} strokeWidth={s * 0.02} fill="none">
          <circle cx={c} cy={c} r={s * 0.3} />
          <circle cx={c} cy={c} r={s * 0.18} />
          <circle cx={c} cy={c} r={s * 0.06} fill={accent} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1={c}
              y1={c - s * 0.18}
              x2={c}
              y2={c - s * 0.3}
              transform={`rotate(${deg} ${c} ${c})`}
            />
          ))}
        </g>
      );
    case "star":
      return (
        <g stroke={accent} strokeWidth={s * 0.025} fill="none">
          {[0, 72, 144, 216, 288].map((deg) => (
            <line
              key={deg}
              x1={c}
              y1={s * 0.15}
              x2={c}
              y2={s * 0.85}
              transform={`rotate(${deg} ${c} ${c})`}
            />
          ))}
          <circle cx={c} cy={c} r={s * 0.08} fill={accent} />
        </g>
      );
    case "lattice":
      return (
        <g stroke={accent} strokeWidth={s * 0.02} fill="none">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={`h${f}`} x1={s * 0.1} y1={s * f} x2={s * 0.9} y2={s * f} />
          ))}
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={`v${f}`} x1={s * f} y1={s * 0.1} x2={s * f} y2={s * 0.9} />
          ))}
        </g>
      );
    default:
      return null;
  }
}

interface TileProps {
  tileKey: TileKey;
  size: number;
  className?: string;
}

export default function Tile({ tileKey, size, className }: TileProps) {
  const meta = TILES[tileKey];
  if (!meta) return null;

  if (meta.imageUrl) {
    return (
      <img
        src={meta.imageUrl}
        width={size}
        height={size}
        alt=""
        className={className}
        style={{ objectFit: "cover", display: "block" }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ display: "block" }}
    >
      <rect width={size} height={size} fill={meta.color} />
      <PatternShape pattern={meta.pattern} accent={meta.accent} size={size} />
      <defs>
        <linearGradient id={`glaze-${tileKey}-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect
        width={size}
        height={size}
        fill={`url(#glaze-${tileKey}-${size})`}
      />
    </svg>
  );
}
