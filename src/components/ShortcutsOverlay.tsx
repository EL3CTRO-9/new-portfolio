import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const SHORTCUT_GROUPS = [
  {
    label: "Navigation",
    shortcuts: [
      { keys: ["g", "h"], desc: "Go to Home" },
      { keys: ["g", "a"], desc: "Go to About" },
      { keys: ["g", "r"], desc: "Go to Archive" },
      { keys: ["g", "c"], desc: "Go to Contact" },
    ],
  },
  {
    label: "Actions",
    shortcuts: [
      { keys: ["⌘", "K"], desc: "Open command palette" },
      { keys: ["/"], desc: "Open command palette" },
      { keys: ["?"], desc: "Toggle this overlay" },
    ],
  },
  {
    label: "Cube Strip",
    shortcuts: [
      { keys: ["↑", "↓"], desc: "Move between cubes" },
      { keys: ["Home"], desc: "First cube" },
      { keys: ["End"], desc: "Last cube" },
      { keys: ["Esc"], desc: "Exit cube strip" },
    ],
  },
];

export default function ShortcutsOverlay() {
  const [open, setOpen] = useState(false);

  // "g" prefix state for g+key navigation
  const gPending = useCallback(() => {
    const state = { pending: false, timer: 0 };
    return state;
  }, []);

  useEffect(() => {
    let gPressed = false;
    let gTimer = 0;

    const down = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      // Don't intercept when in form fields (except Escape)
      if (isInput && e.key !== "Escape") return;

      // "?" to toggle shortcuts overlay
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      // Escape closes overlay
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
        return;
      }

      // g+key navigation
      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !gPressed) {
        gPressed = true;
        clearTimeout(gTimer);
        gTimer = window.setTimeout(() => {
          gPressed = false;
        }, 800);
        return;
      }

      if (gPressed) {
        gPressed = false;
        clearTimeout(gTimer);

        const routes: Record<string, string> = {
          h: "/",
          a: "/about",
          r: "/archive",
          c: "/contact",
        };

        const target = routes[e.key];
        if (target) {
          e.preventDefault();
          window.location.href = target;
        }
      }
    };

    // Listen for custom event from CommandPalette
    const handleOpenShortcuts = () => setOpen(true);
    window.addEventListener("open-shortcuts", handleOpenShortcuts);
    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-shortcuts", handleOpenShortcuts);
      clearTimeout(gTimer);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="shortcuts-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(10, 10, 10, 0.25)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            key="shortcuts-panel"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 480,
              maxHeight: "70vh",
              background: "#fff",
              border: "1px solid var(--divider)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              overflow: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px 12px",
                borderBottom: "1px solid var(--divider)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                }}
              >
                Keyboard Shortcuts
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "var(--muted)",
                  background: "none",
                  border: "1px solid var(--divider)",
                  padding: "2px 8px",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                }}
              >
                ESC
              </button>
            </div>

            {/* Groups */}
            <div style={{ padding: "12px 20px 20px" }}>
              {SHORTCUT_GROUPS.map((group) => (
                <div key={group.label} style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--red)",
                      marginBottom: 8,
                    }}
                  >
                    {group.label}
                  </div>
                  {group.shortcuts.map((sc, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "6px 0",
                        borderBottom:
                          i < group.shortcuts.length - 1
                            ? "1px solid var(--divider)"
                            : "none",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 13,
                          color: "var(--ink)",
                        }}
                      >
                        {sc.desc}
                      </span>
                      <div style={{ display: "flex", gap: 4 }}>
                        {sc.keys.map((key, ki) => (
                          <kbd
                            key={ki}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 10,
                              padding: "2px 6px",
                              background: "rgba(0,0,0,0.04)",
                              border: "1px solid var(--divider)",
                              borderRadius: 3,
                              color: "var(--ink)",
                              minWidth: 22,
                              textAlign: "center",
                              lineHeight: "16px",
                            }}
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
