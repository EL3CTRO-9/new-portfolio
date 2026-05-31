import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TOP_BAR_H } from "../lib/constants";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

interface MobileNavProps {
  current?: "about" | "archive" | "contact" | null;
}

export default function MobileNav({ current = null }: MobileNavProps) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus trap + Escape
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
        )
      : [];
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const dur = reduced ? 0.00001 : 0.24;

  return (
    <header
      style={{
        height: TOP_BAR_H,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid var(--ink)",
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink)",
          textDecoration: "none",
        }}
      >
        Sahil Shaikh
      </a>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--ink)",
          padding: 10,
          margin: -10,
          minWidth: 44,
          minHeight: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
          <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mnav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9990,
                background: "rgba(10,10,10,0.3)",
              }}
            />
            <motion.div
              key="mnav-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(78vw, 320px)",
                zIndex: 9991,
                background: "var(--wall)",
                borderLeft: "1px solid var(--ink)",
                display: "flex",
                flexDirection: "column",
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: 18,
                    lineHeight: 1,
                    color: "var(--ink)",
                    padding: 8,
                    margin: -8,
                  }}
                >
                  ✕
                </button>
              </div>
              <nav style={{ display: "flex", flexDirection: "column" }}>
                {NAV.map((item) => {
                  const active = current === item.label.toLowerCase();
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 15,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: active ? "var(--red)" : "var(--ink)",
                        textDecoration: "none",
                        padding: "14px 0",
                        borderBottom: "1px solid var(--divider)",
                        minHeight: 44,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
