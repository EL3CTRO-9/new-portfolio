import { useState, useRef, useEffect } from "react";
import { motion, MotionConfig } from "motion/react";
import Tile from "./Tile";
import TileBand from "./TileBand";
import MobileNav from "./MobileNav";
import { TILES, type TileKey } from "../data/tiles";
import { TOP_BAR_H, FOOTER_H } from "../lib/constants";

const ARCHIVE_LAYOUT: {
  slug: string;
  tileKey: TileKey;
  w: number;
  h: number;
  title: string;
  date: string;
  category: string;
}[] = [
  { slug: "building-an-isms-from-scratch", tileKey: "victorian_plum", w: 2, h: 1, title: "Building an ISMS from Scratch", date: "MAY 2026", category: "SEC" },
  { slug: "androxgh0st-malware-analysis", tileKey: "plum_vine", w: 1, h: 2, title: "AndroxGh0st Malware Analysis", date: "APR 2026", category: "RES" },
  { slug: "ot-security-assessment", tileKey: "red_oxide", w: 1, h: 1, title: "OT Security Assessment", date: "MAR 2026", category: "SEC" },
  { slug: "bug-bounties-field-guide", tileKey: "indigo_cross", w: 1, h: 1, title: "Bug Bounties: A Field Guide", date: "FEB 2026", category: "WRI" },
  { slug: "phpunit-rce-deep-dive", tileKey: "royal_blue", w: 2, h: 1, title: "PHPUnit RCE Deep Dive", date: "JAN 2026", category: "RES" },
  { slug: "giac-certifications", tileKey: "emerald", w: 2, h: 1, title: "What I Learned from GIAC", date: "DEC 2025", category: "NOT" },
  { slug: "position-sizing", tileKey: "burgundy", w: 1, h: 1, title: "How I Think About Position Sizing", date: "NOV 2025", category: "FIN" },
  { slug: "reading-q1", tileKey: "ochre", w: 1, h: 1, title: "Reading Log — Q1", date: "OCT 2025", category: "NOT" },
  { slug: "threat-modeling", tileKey: "victorian_plum", w: 1, h: 1, title: "Threat Modeling for Startups", date: "SEP 2025", category: "SEC" },
  { slug: "isc-diary", tileKey: "red_oxide", w: 1, h: 2, title: "ISC Diary: DNS Anomalies", date: "AUG 2025", category: "RES" },
  { slug: "effective-writing", tileKey: "indigo_cross", w: 2, h: 1, title: "Writing for Security Audiences", date: "JUL 2025", category: "WRI" },
  { slug: "dlp-rollout", tileKey: "royal_blue", w: 1, h: 1, title: "DLP Rollout Lessons", date: "JUN 2025", category: "SEC" },
];

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

function ArchiveCell({
  slug,
  tileKey,
  w,
  h,
  title,
  date,
  category,
  index,
}: {
  slug: string;
  tileKey: TileKey;
  w: number;
  h: number;
  title: string;
  date: string;
  category: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={`/posts/${slug}`}
      className="archive-cell"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        gridColumn: `span ${w}`,
        gridRow: `span ${h}`,
        position: "relative",
        overflow: "hidden",
        display: "block",
        textDecoration: "none",
      }}
    >
      {/* Tile background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Tile tileKey={tileKey} size={600} />
        </div>
      </div>

      {/* Hover overlay */}
      <div
        className="archive-cell-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10, 10, 10, 0.78)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 200ms ease-out",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--red)",
            letterSpacing: "0.2em",
            marginBottom: 6,
          }}
        >
          {category} · {date}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            color: "var(--wall)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
      </div>
    </motion.a>
  );
}

export default function ArchivePage() {
  const [footerTileKey] = useState<TileKey>(() => {
    const keys = Object.keys(TILES) as TileKey[];
    return keys[Math.floor(Math.random() * keys.length)];
  });
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerWidth, setFooterWidth] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setFooterWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const footerMeta = TILES[footerTileKey];

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
                color:
                  item.label === "Archive" ? "var(--red)" : "var(--muted)",
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
        <MobileNav current="archive" />
      </div>

      {/* Scrollable content */}
      <main
        className="secondary-main"
        style={{
          flex: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
                  }}
      >
        {/* Label row */}
        <div
          className="archive-label"
          style={{
            padding: "16px 40px",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--red)",
            }}
          >
            / ARCHIVE — {ARCHIVE_LAYOUT.length} ENTRIES
          </h1>

          {/* Banksy archive motif — rat/witness figure, MJ-generated */}
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 76,
              width: 100,
              height: 100,
            }}
          >
            {/* Banksy archive motif — rat/witness figure, MJ-generated */}
          </div>
        </div>

        {/* Hairline divider */}
        <div
          className="archive-divider"
          style={{
            borderBottom: "1px solid var(--ink)",
            marginLeft: 40,
            marginRight: 40,
          }}
        />

        {/* Mosaic grid */}
        <div
          className="archive-grid"
          style={{
            padding: `16px 64px ${FOOTER_H + 24}px 40px`,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: 120,
            gridAutoFlow: "dense",
            gap: 6,
          }}
        >
          {ARCHIVE_LAYOUT.map((cell, i) => (
            <ArchiveCell key={cell.slug} {...cell} index={i} />
          ))}
        </div>
      </main>

      {/* Fixed footer tile strip */}
      <footer
        ref={footerRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: FOOTER_H,
          borderTop: "1px solid var(--ink)",
          overflow: "hidden",
        }}
      >
        {footerWidth > 0 && (
          <TileBand
            tileKey={footerTileKey}
            width={footerWidth}
            height={FOOTER_H}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 22px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#faf8f5",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            ARCHIVE · {footerMeta.name.toUpperCase()}
          </span>
          <a
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#faf8f5",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              textDecoration: "none",
            }}
          >
            ↩ HOME
          </a>
        </div>
      </footer>

    </div>
    </MotionConfig>
  );
}
