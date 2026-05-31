import { motion, MotionConfig } from "motion/react";
import Tile from "./Tile";
import SSTag from "./SSTag";
import CertificationsStrip from "./CertificationsStrip";
import FooterStrip from "./FooterStrip";
import MobileNav from "./MobileNav";
import { TOP_BAR_H } from "../lib/constants";
import { TILES } from "../data/tiles";

const SOCIAL_LINKS = [
  { label: "LINKEDIN", href: "#" },
  { label: "GITHUB", href: "#" },
  { label: "EMAIL", href: "#" },
];

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

export default function AboutPage() {
  const tileKey = "emerald";
  const tileMeta = TILES[tileKey];

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
                  item.label === "About" ? "var(--red)" : "var(--muted)",
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
        <MobileNav current="about" />
      </div>

      {/* Scrollable main content */}
      <main
        className="secondary-main"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {/* Two-column layout */}
        <div
          className="about-cols"
          style={{
            display: "flex",
          }}
        >
        {/* Bio column */}
        <div
          className="about-bio"
          style={{
            flex: 1,
            minWidth: 0,
            position: "relative",
            padding: "48px 56px 120px 80px",
          }}
        >
          {/* Section label */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--red)",
              marginBottom: 20,
            }}
          >
            / ABOUT
          </div>

          {/* Title */}
          <h1 style={{ marginBottom: 28 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4.5vw, 56px)",
                fontWeight: 400,
                letterSpacing: "0.01em",
                color: "var(--ink)",
                lineHeight: 0.95,
                display: "block",
                textTransform: "uppercase",
              }}
            >
              A cybersecurity engineer
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(28px, 3.2vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--muted)",
                lineHeight: 1.1,
                fontStyle: "italic",
                display: "block",
                marginTop: 4,
              }}
            >
              in Vadodara.
            </span>
          </h1>

          {/* Bio paragraphs */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 400,
              fontVariationSettings: "'opsz' 16",
              color: "var(--ink)",
              lineHeight: 1.75,
              maxWidth: 420,
              marginBottom: 14,
            }}
          >
            I build defenses for a living. Right now that means standing up an
            ISMS at a pharma company — SIEM, EDR, DLP, policies, and an ISO
            27001 audit on the horizon.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 400,
              fontVariationSettings: "'opsz' 16",
              color: "var(--ink)",
              lineHeight: 1.75,
              maxWidth: 420,
            }}
          >
            Before this — SANS. Nine GIAC certifications, internships at the
            Internet Storm Center, a bachelors. I write what I learn here.
          </motion.p>

          {/* Social links */}
          <div style={{ display: "flex", gap: 18, marginTop: 36 }}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--ink)",
                  paddingBottom: 2,
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
                {link.label}
              </a>
            ))}
          </div>

          {/* Banksy mascot slot — bird with key, MJ-generated */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              left: 80,
              width: 140,
              height: 140,
            }}
          >
            {/* Banksy mascot slot — bird with key, MJ-generated */}
          </div>

          {/* SS Tag */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 232,
              transform: "rotate(-6deg)",
            }}
          >
            <SSTag size={42} />
          </div>
        </div>

        {/* Portrait tile column */}
        <div
          className="about-portrait"
          style={{
            width: 300,
            flexShrink: 0,
            paddingTop: 48,
            marginRight: 32,
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "3/4",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Tile background — emerald lattice */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Tile tileKey={tileKey} size={400} />
            </div>

            {/* Portrait silhouette overlay — placeholder for now */}
            {/* When MJ tile is ready, the silhouette will be baked into the image itself */}
            <svg
              viewBox="0 0 300 400"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <ellipse
                cx="150"
                cy="130"
                rx="44"
                ry="54"
                fill="var(--ink)"
                opacity="0.75"
              />
              <path
                d="M 150 184 C 100 198, 50 240, 50 400 L 250 400 C 250 240, 200 198, 150 184 Z"
                fill="var(--ink)"
                opacity="0.75"
              />
            </svg>
          </div>

          {/* Caption */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: 12,
            }}
          >
            SAHIL SHAIKH · {tileMeta.name.toUpperCase()}
          </div>
        </div>
        </div>

        {/* Certifications strip */}
        <CertificationsStrip />

        {/* Footer band — idle house tile. Sits at the end of the scrollable
            content so it only appears once you scroll to the very bottom. */}
        <footer>
          <FooterStrip houseTile="/tiles/house.png" label="ABOUT" />
        </footer>
      </main>
    </div>
    </MotionConfig>
  );
}
