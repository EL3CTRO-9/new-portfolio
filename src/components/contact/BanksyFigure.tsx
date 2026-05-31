// FUTURE: Replace SVG placeholder with MJ-generated transparent PNG art.
// The component accepts `holdingEnvelope` and `walking` props.
// When real art is ready:
//   1. Generate standing PNG (transparent bg) — used when holdingEnvelope=true, walking=false
//   2. Generate mid-stride PNG (right leg forward) — used when walking=true
//   3. Generate tucked-envelope PNG (envelope under arm) — used during walking state
//   4. Set an `imageUrl` prop and switch to <img> rendering
//   5. For walking, alternate standing/mid-stride frames via CSS steps() animation
// The prop API is already correct; only the rendering swaps.

interface BanksyFigureProps {
  holdingEnvelope: boolean;
  walking: boolean;
}

export default function BanksyFigure({
  holdingEnvelope,
  walking,
}: BanksyFigureProps) {
  return (
    <svg
      width={140}
      height={280}
      viewBox="0 0 140 280"
      fill="var(--ink)"
      style={{ display: "block" }}
    >
      {/* Head */}
      <circle cx="70" cy="38" r="22" />

      {/* Neck + shoulders + torso + legs */}
      <path
        d="
          M 58 60 L 82 60
          L 88 78
          Q 102 82, 108 100
          L 110 160
          Q 108 168, 100 170
          L 100 200
          L 92 270
          L 78 270
          L 74 200
          L 66 200
          L 62 270
          L 48 270
          L 40 200
          L 40 170
          Q 32 168, 30 160
          L 32 100
          Q 38 82, 52 78 Z
        "
      />

      {/* Arm holding envelope (front, slightly raised) */}
      {holdingEnvelope && (
        <path
          d="
            M 95 100
            L 108 130
            Q 110 140, 102 144
            L 88 142
            Q 80 138, 82 128
            L 90 105 Z
          "
        />
      )}

      {/* Envelope when held */}
      {holdingEnvelope && (
        <g transform="translate(74 128)">
          <rect
            x="0"
            y="0"
            width="32"
            height="22"
            fill="var(--wall)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M 0 0 L 16 12 L 32 0"
            stroke="var(--ink)"
            strokeWidth="2"
            fill="none"
          />
          {/* Wax seal */}
          <circle cx="16" cy="11" r="4" fill="var(--red)" />
        </g>
      )}

      {/* FUTURE: swap point for walking frame — alternate standing/mid-stride PNGs here */}
    </svg>
  );
}
