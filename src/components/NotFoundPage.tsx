import { motion, MotionConfig } from "motion/react";
import Tile from "./Tile";
import SSTag from "./SSTag";
import MobileNav from "./MobileNav";
import { TOP_BAR_H } from "../lib/constants";
import type { TileKey } from "../data/tiles";

const FRAGMENTS: {
  tileKey: TileKey;
  size: number;
  top: number;
  left: number;
  rotate: number;
}[] = [
  { tileKey: "red_oxide", size: 72, top: 80, left: 100, rotate: -8 },
  { tileKey: "indigo_cross", size: 52, top: 150, left: 240, rotate: 15 },
  { tileKey: "emerald", size: 84, top: 320, left: 80, rotate: -22 },
  { tileKey: "plum_vine", size: 60, top: 240, left: 380, rotate: 11 },
  { tileKey: "ochre", size: 56, top: 100, left: 480, rotate: -6 },
  { tileKey: "victorian_plum", size: 48, top: 380, left: 320, rotate: 28 },
];

// Indices of fragments kept (repositioned) on mobile; the rest are hidden ≤640px.
const MOBILE_KEEP_FRAGMENTS = [0, 2, 4];

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

export default function NotFoundPage() {
  return (
    <MotionConfig reducedMotion="user">
    <div
      className="secondary-root"
      style={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--wall)",
      }}
    >
      {/* Top bar */}
      <div className="secondary-topbar-desktop">
      <header
        style={{
          height: TOP_BAR_H,
          flexShrink: 0,
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
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          Sahil Shaikh
        </a>
        <nav aria-label="Primary" style={{ display: "flex", gap: 16 }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      </div>
      <div className="secondary-topbar-mobile">
        <MobileNav current={null} />
      </div>

      {/* Stage */}
      <main
        className="secondary-main"
        style={{
          flex: 1,
          position: "relative",
                    overflow: "hidden",
        }}
      >
        {/* Tile fragments */}
        {FRAGMENTS.map((f, i) => (
          <motion.div
            key={f.tileKey}
            className={
              MOBILE_KEEP_FRAGMENTS.includes(i)
                ? `nf-frag-keep nf-frag-${i}`
                : "nf-fragment"
            }
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "absolute",
              top: f.top,
              left: f.left,
              transform: `rotate(${f.rotate}deg)`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            <Tile tileKey={f.tileKey} size={f.size} />
          </motion.div>
        ))}

        {/* Banksy 404 motif — girl with red balloon, MJ-generated */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            width: 140,
            height: 140,
          }}
        >
          {/* Banksy 404 motif — girl with red balloon, MJ-generated */}
        </div>

        {/* 404 label block */}
        <div
          className="nf-label"
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            maxWidth: 380,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--red)",
              marginBottom: 14,
            }}
          >
            404 / NOT FOUND
          </div>

          <h1>
            <span
              className="nf-h1-line"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(48px, 5.5vw, 72px)",
                fontWeight: 400,
                letterSpacing: "0",
                color: "var(--ink)",
                lineHeight: 0.95,
                display: "block",
                textTransform: "uppercase",
              }}
            >
              A tile fell off
            </span>
            <span
              className="nf-h2-line"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                lineHeight: 1.1,
                fontStyle: "italic",
                display: "block",
                marginTop: 4,
              }}
            >
              the wall.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 400,
              fontVariationSettings: "'opsz' 14",
              color: "var(--muted)",
              lineHeight: 1.55,
              maxWidth: 320,
              marginTop: 18,
              marginBottom: 22,
            }}
          >
            The page you're after doesn't exist. Or it did and I broke it.
            Either way — head back to the index.
          </p>

          <a
            href="/"
            className="nf-home"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink)",
              textDecoration: "none",
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 3,
              display: "inline-block",
              transition: "color 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--red)";
              e.currentTarget.style.borderBottomColor = "var(--red)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--ink)";
              e.currentTarget.style.borderBottomColor = "var(--ink)";
            }}
          >
            ← HOME
          </a>
        </div>

        {/* SS Tag */}
        <div
          className="nf-sstag"
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            transform: "rotate(-8deg)",
          }}
        >
          <SSTag size={42} />
        </div>
      </main>

    </div>
    </MotionConfig>
  );
}
