import { motion, useReducedMotion } from "motion/react";

interface EndDogProps {
  src: string;
  caption?: string;
}

/**
 * End-of-post dog silhouette. Sits on a bone-colored (#f5f3ec) breathing-space
 * block between the last paragraph and the footer tile band. The bottom padding
 * guarantees a >=24px bone gap so the pure-black silhouette never merges into
 * the dark footer below it. Optional mono caption shows only when provided.
 *
 * Width / padding differ by viewport via the .end-dog / .end-dog-img classes
 * (640px breakpoint in global.css). Entrance is a scroll-in fade + rise that
 * collapses to an opacity-only fade under reduced motion.
 */
export default function EndDog({ src, caption }: EndDogProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="end-dog"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={
        reduce
          ? { duration: 0.08 }
          : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }
    >
      <img
        className="end-dog-img"
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ height: "auto", display: "block" }}
      />
      {caption && (
        <p
          className="end-dog-caption"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--muted)",
            textAlign: "center",
            margin: "12px 0 0",
          }}
        >
          {caption}
        </p>
      )}
    </motion.div>
  );
}
