import { motion } from "motion/react";

interface EnvelopeProps {
  size: number;
  open: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function Envelope({ size, open, onClick, style }: EnvelopeProps) {
  const h = size * 0.7;

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 100 70"
      style={{ display: "block", cursor: onClick ? "pointer" : "default", ...style }}
      onClick={onClick}
    >
      {/* Envelope body */}
      <rect
        x="0"
        y="20"
        width="100"
        height="50"
        fill="var(--wall)"
        stroke="var(--ink)"
        strokeWidth="2"
      />

      {/* Inner V fold line */}
      <path
        d="M 0 20 L 50 50 L 100 20"
        stroke="var(--ink)"
        strokeWidth="1"
        fill="none"
        opacity="0.15"
      />

      {/* Flap — animated open/close */}
      <motion.path
        d="M 0 20 L 50 0 L 100 20 L 50 40 Z"
        fill="var(--wall)"
        stroke="var(--ink)"
        strokeWidth="2"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: open ? -160 : 0 }}
        style={{ transformOrigin: "50px 20px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Wax seal — only when closed */}
      {!open && <circle cx="50" cy="40" r="6" fill="var(--red)" />}
    </svg>
  );
}
