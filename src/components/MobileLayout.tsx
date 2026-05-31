import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Tile from "./Tile";
import FooterCascade from "./FooterCascade";
import SSTag from "./SSTag";
import PostContent from "./PostContent";
import EndDog from "./EndDog";
import type { PostData } from "./types";
import type { TileKey } from "../data/tiles";

const CATS = [
  { code: "ALL", label: "ALL" },
  { code: "SEC", label: "SEC" },
  { code: "RES", label: "RES" },
  { code: "FIN", label: "FIN" },
  { code: "WRI", label: "WRI" },
  { code: "NOT", label: "NOT" },
];

const NAV = [
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

interface MobileLayoutProps {
  posts: PostData[];
  activeSlug?: string | null;
  activeCategory: string;
  onCategoryChange: (code: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Pixel band footer (measures its own width, reuses TileBand)        */
/* ------------------------------------------------------------------ */
function MobilePixelBand({
  tileKey,
  houseTile,
}: {
  tileKey?: TileKey;
  houseTile?: string;
}) {
  const H = 36;

  return (
    <div
      style={{
        height: H,
        flexShrink: 0,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--ink)",
      }}
    >
      <FooterCascade tileKey={tileKey} houseTile={houseTile} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 14px",
        }}
      >
        <span style={{ transform: "rotate(-4deg)", display: "block" }}>
          <SSTag size={26} />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide-in drawer menu                                               */
/* ------------------------------------------------------------------ */
function Drawer({
  open,
  onClose,
  currentPath,
  reduced,
}: {
  open: boolean;
  onClose: () => void;
  currentPath: string;
  reduced: boolean | null;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap + Escape
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          )
        )
      : [];
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
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
  }, [open, onClose]);

  const dur = reduced ? 0.00001 : 0.24;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9990,
              background: "rgba(10,10,10,0.3)",
            }}
          />
          <motion.div
            key="drawer-panel"
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
                onClick={onClose}
                aria-label="Close menu"
                aria-expanded={true}
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
                const active = currentPath === item.href;
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
  );
}

/* ------------------------------------------------------------------ */
/*  Main mobile home                                                   */
/* ------------------------------------------------------------------ */
export default function MobileLayout({
  posts,
  activeSlug,
  activeCategory,
  onCategoryChange,
}: MobileLayoutProps) {
  const reduced = useReducedMotion();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  const activePost = activeSlug
    ? posts.find((p) => p.slug === activeSlug) ?? null
    : null;

  const chipScrollRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [drawerOpen]);

  const updateFades = useCallback(() => {
    const el = chipScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setFadeLeft(scrollLeft > 2);
    setFadeRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateFades();
    const el = chipScrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);
    return () => {
      el.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
    };
  }, [updateFades]);

  const visiblePosts =
    activeCategory === "ALL"
      ? posts
      : posts.filter((p) =>
          p.category.toUpperCase().startsWith(activeCategory)
        );

  const fadeDur = reduced ? 0 : 0.16;

  return (
    <div
      style={{
        height: "100dvh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        background: "var(--wall)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
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
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          aria-expanded={drawerOpen}
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
      </div>

      {/* Reading view — shown when a post slug is active */}
      {activePost && (
        <motion.article
          key={activePost.slug}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: 1, padding: "20px 16px 56px" }}
        >
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              minHeight: 44,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
              marginBottom: 12,
            }}
          >
            ← Index
          </a>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--red)",
              marginBottom: 12,
            }}
          >
            {activePost.category} ·{" "}
            {new Date(activePost.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "clamp(28px, 8vw, 38px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              margin: "0 0 20px",
            }}
          >
            {activePost.title}
          </h1>
          <PostContent htmlContent={activePost.htmlContent} />
        </motion.article>
      )}

      {/* End-of-post dog silhouette — full-bleed bone block above footer band */}
      {activePost && activePost.endDog && (
        <div style={{ flexShrink: 0 }}>
          <EndDog src={activePost.endDog} caption={activePost.dogCaption} />
        </div>
      )}

      {!activePost && (
        <>
      {/* Hero — name on the left, bio copy on the right */}
      <div
        style={{
          padding: "24px 16px 18px",
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
        }}
      >
        <h1 style={{ margin: 0, flexShrink: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "clamp(40px, 9.5vw, 60px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              display: "block",
            }}
          >
            Sahil
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(40px, 9.5vw, 60px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "var(--red)",
              display: "block",
            }}
          >
            Shaikh.
          </span>
        </h1>

        <div style={{ minWidth: 0, flex: 1, paddingTop: 2 }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 400,
              fontVariationSettings: "'opsz' 16",
              color: "var(--ink)",
              lineHeight: 1.6,
              margin: "0 0 8px",
            }}
          >
            GIAC-certified cybersecurity professional.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 400,
              fontVariationSettings: "'opsz' 16",
              color: "var(--ink)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            I write about defenses, markets, and what I'm reading.{" "}
            <span style={{ color: "var(--red)" }}>Pick one →</span>
          </p>
        </div>
      </div>

      {/* Filter chip row */}
      <div
        style={{
          position: "relative",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div
          ref={chipScrollRef}
          role="tablist"
          aria-label="Filter posts by category"
          className="mobile-chip-row"
          style={{
            display: "flex",
            gap: 6,
            padding: "10px 16px",
            overflowX: "auto",
          }}
        >
          {CATS.map((cat) => {
            const isActive = activeCategory === cat.code;
            return (
              <button
                key={cat.code}
                role="tab"
                aria-selected={isActive}
                aria-controls="mobile-index-list"
                onClick={() => onCategoryChange(cat.code)}
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "8px 12px",
                  lineHeight: 1,
                  cursor: "pointer",
                  background: isActive ? "var(--red)" : "transparent",
                  color: isActive ? "var(--wall)" : "var(--muted)",
                  border: isActive
                    ? "1px solid var(--red)"
                    : "1px solid rgba(0,0,0,0.18)",
                  transition: reduced
                    ? "none"
                    : "background 160ms ease, color 160ms ease, border-color 160ms ease",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Edge fades */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 28,
            pointerEvents: "none",
            opacity: fadeLeft ? 1 : 0,
            transition: "opacity 160ms ease",
            background:
              "linear-gradient(to right, var(--wall), rgba(250,248,245,0))",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: 28,
            pointerEvents: "none",
            opacity: fadeRight ? 1 : 0,
            transition: "opacity 160ms ease",
            background:
              "linear-gradient(to left, var(--wall), rgba(250,248,245,0))",
          }}
        />
      </div>

      {/* Index list */}
      <div id="mobile-index-list" role="tabpanel" style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeDur }}
          >
            {visiblePosts.length === 0 ? (
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  textAlign: "center",
                  padding: "32px 16px",
                }}
              >
                No posts in this category yet
              </div>
            ) : (
              visiblePosts.map((post, i) => {
                const dateLabel = new Date(post.date)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                  .toUpperCase();
                return (
                  <a
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    aria-label={`${post.title}, ${post.category}, ${dateLabel}`}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "14px 16px",
                      minHeight: 44,
                      textDecoration: "none",
                      borderBottom:
                        i < visiblePosts.length - 1
                          ? "1px solid rgba(0,0,0,0.06)"
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        width: 36,
                        height: 36,
                        flexShrink: 0,
                        borderRadius: 2,
                        overflow: "hidden",
                        background: "var(--ink)",
                        display: "block",
                      }}
                    >
                      <Tile tileKey={post.tileKey as TileKey} size={36} />
                    </span>
                    <span style={{ minWidth: 0, flex: 1 }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        {post.category} · {dateLabel}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-body)",
                          fontSize: 14,
                          fontWeight: 500,
                          lineHeight: 1.25,
                          color: "var(--ink)",
                        }}
                      >
                        {post.title}
                      </span>
                    </span>
                  </a>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
        </>
      )}

      {/* Pixel band footer — idle (no post) shows the house tile */}
      <MobilePixelBand
        tileKey={activePost?.tileKey as TileKey | undefined}
        houseTile="/tiles/house.png"
      />

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentPath={currentPath}
        reduced={reduced}
      />
    </div>
  );
}
