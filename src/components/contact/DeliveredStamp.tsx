import { motion } from "motion/react";

interface DeliveredStampProps {
  visible: boolean;
}

export default function DeliveredStamp({ visible }: DeliveredStampProps) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: "rotate(-8deg)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg width={280} height={80} viewBox="0 0 280 80">
        {/* Outer border — slightly irregular with dasharray for rubber stamp feel */}
        <rect
          x="3"
          y="3"
          width="274"
          height="74"
          fill="none"
          stroke="var(--red)"
          strokeWidth="3"
          strokeDasharray="8 2 4 2"
          rx="2"
        />
        {/* Inner border */}
        <rect
          x="9"
          y="9"
          width="262"
          height="62"
          fill="none"
          stroke="var(--red)"
          strokeWidth="1.5"
          rx="1"
        />

        {/* DELIVERED text */}
        <text
          x="140"
          y="40"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.3em",
            fill: "var(--red)",
          }}
        >
          DELIVERED
        </text>

        {/* Date line */}
        <text
          x="140"
          y="60"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            letterSpacing: "0.2em",
            fill: "var(--red)",
          }}
        >
          SS · {today}
        </text>
      </svg>
    </motion.div>
  );
}
