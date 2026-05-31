import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SSTag from "./SSTag";

type Phase = "idle" | "line" | "name" | "ss" | "tagline" | "exit" | "done";

export default function Loader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);

  // Check reduced-motion + sessionStorage on mount
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      setShouldShow(false);
      return;
    }

    const seen = sessionStorage.getItem("loader_seen");
    if (seen === "1") {
      setShouldShow(false);
      return;
    }
    setShouldShow(true);
    sessionStorage.setItem("loader_seen", "1");
  }, []);

  // Drive the phase sequence
  useEffect(() => {
    if (shouldShow !== true) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("line"), 300));
    timers.push(setTimeout(() => setPhase("name"), 900));
    timers.push(setTimeout(() => setPhase("ss"), 1500));
    timers.push(setTimeout(() => setPhase("tagline"), 2100));
    timers.push(setTimeout(() => setPhase("exit"), 2700));
    timers.push(setTimeout(() => setPhase("done"), 3000));
    return () => timers.forEach(clearTimeout);
  }, [shouldShow]);

  if (shouldShow === null || shouldShow === false || phase === "done")
    return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: "var(--wall)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: phase === "exit" ? "none" : "auto",
        }}
      >
        <LoaderContent phase={phase} />
      </motion.div>
    </AnimatePresence>
  );
}

function LoaderContent({ phase }: { phase: Phase }) {
  const phaseIndex = ["idle", "line", "name", "ss", "tagline", "exit"].indexOf(
    phase
  );
  const showLine = phaseIndex >= 1;
  const showName = phaseIndex >= 2;
  const showSS = phaseIndex >= 3;
  const showTagline = phaseIndex >= 4;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 640,
        padding: "0 24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Name sitting on the horizon line (space reserved to avoid shifting) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "clamp(40px, 12vw, 110px)",
        }}
      >
        {/* The horizon line — responsive width, drawn behind the name */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(380px, 86%)",
            height: 2,
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 380 2"
            preserveAspectRatio="none"
            width="100%"
            height="2"
            style={{ display: "block" }}
          >
            <motion.line
              x1="0"
              y1="1"
              x2="380"
              y2="1"
              stroke="var(--ink)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: showLine ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </svg>
        </div>

        {/* The name, typed in */}
        {showName && <TypedName />}
      </div>

      {/* The SS spray — centered below the name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showSS ? 1 : 0, scale: showSS ? 1 : 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          marginTop: 22,
          height: 36,
          transform: "rotate(-6deg)",
        }}
        aria-hidden="true"
      >
        <SSTag size={36} />
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showTagline ? 1 : 0, y: showTagline ? 0 : 8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          marginTop: 18,
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(7px, 2.4vw, 9px)",
          color: "var(--muted)",
          letterSpacing: "0.22em",
          whiteSpace: "nowrap",
        }}
      >
        SECURITY · FINANCE · WRITING · NOTES
      </motion.div>
    </div>
  );
}

function TypedName() {
  const target = "SAHIL SHAIKH";
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= target.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), 20);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <div
      style={{
        position: "relative",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(28px, 9vw, 92px)",
        lineHeight: 1.1,
        color: "var(--ink)",
        letterSpacing: "0.04em",
        textTransform: "uppercase" as const,
        whiteSpace: "nowrap",
      }}
    >
      {target.slice(0, revealed)}
      <span
        style={{
          display: "inline-block",
          width: "0.6em",
          opacity: revealed < target.length ? 1 : 0,
          animation: "cursor-blink 0.5s steps(2) infinite",
        }}
      >
        ▍
      </span>
    </div>
  );
}
