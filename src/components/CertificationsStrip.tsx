import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  certifications,
  focusAreaLabels,
  focusAreaOrder,
  buildCredlyUrl,
  type Certification,
} from "../data/certifications";

export default function CertificationsStrip() {
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [focusedCode, setFocusedCode] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const grouped = focusAreaOrder.map((area) => ({
    area,
    label: focusAreaLabels[area],
    certs: certifications.filter((c) => c.focusArea === area),
  }));

  const isActive = (code: string) =>
    hoveredCode === code || focusedCode === code;

  return (
    <section
      style={{
        padding: "40px 80px 60px",
        borderTop: "1px solid var(--divider)",
      }}
    >
      {/* Accessible heading */}
      <h2
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Certifications
      </h2>

      {/* Kicker */}
      <span
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.25em",
          textTransform: "uppercase" as const,
          color: "var(--red)",
          display: "block",
          marginBottom: 16,
        }}
      >
        / CERTIFICATIONS
      </span>

      {/* Lead paragraph */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 400,
          fontVariationSettings: "'opsz' 16",
          color: "var(--ink)",
          lineHeight: 1.75,
          maxWidth: 520,
          marginBottom: 32,
        }}
      >
        Ten GIAC certifications across cyber defense, cloud security, and
        development. All earned through SANS Technology Institute.
      </p>

      {/* Focus area groups */}
      {grouped.map((group, groupIndex) => (
        <motion.div
          key={group.area}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.5,
                  delay: groupIndex * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
        >
          {/* Group label with rules */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              marginTop: groupIndex === 0 ? 0 : 36,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 24,
                height: 1,
                background: "var(--divider)",
                flexShrink: 0,
              }}
            />
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                color: "var(--muted)",
                whiteSpace: "nowrap",
                margin: 0,
                fontWeight: 400,
              }}
            >
              {group.label}
            </h3>
            <span
              aria-hidden="true"
              style={{
                flex: 1,
                height: 1,
                background: "var(--divider)",
              }}
            />
          </div>

          {/* Badge grid */}
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {group.certs.map((cert) => (
              <li key={cert.code}>
                <a
                  href={buildCredlyUrl(cert.credlyUuid!)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${cert.fullName}, verify on Credly`}
                  onMouseEnter={() => setHoveredCode(cert.code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  onFocus={() => setFocusedCode(cert.code)}
                  onBlur={() => setFocusedCode(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                    color: "inherit",
                    padding: 4,
                    cursor: "pointer",
                    outline: "none",
                    borderRadius: 2,
                    width: 120,
                    ...(focusedCode === cert.code
                      ? {
                          outline: "2px solid var(--red)",
                          outlineOffset: 4,
                        }
                      : {}),
                  }}
                >
                  <BadgeCircle
                    cert={cert}
                    active={isActive(cert.code)}
                    reducedMotion={reducedMotion}
                  />
                  <BadgeMeta cert={cert} />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </section>
  );
}

/* ── Sub-components ── */

function BadgeCircle({
  cert,
  active,
  reducedMotion,
}: {
  cert: Certification;
  active: boolean;
  reducedMotion: boolean;
}) {
  const transition = reducedMotion
    ? "none"
    : "filter 280ms ease, transform 280ms ease";

  return (
    <img
      src={cert.badgeImage}
      alt=""
      loading="lazy"
      width={110}
      height={110}
      style={{
        width: 110,
        height: 110,
        objectFit: "contain",
        display: "block",
        borderRadius: "50%",
        filter: active
          ? "grayscale(0) brightness(1.05)"
          : "grayscale(0.35) brightness(0.92)",
        transition,
        transform:
          active && !reducedMotion ? "translateY(-2px) scale(1.06)" : "none",
      }}
    />
  );
}

function BadgeMeta({ cert }: { cert: Certification }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: "var(--ink)",
        }}
      >
        {cert.code}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          lineHeight: 1.35,
          color: "var(--muted)",
          textAlign: "center",
        }}
      >
        {cert.name}
      </span>
    </div>
  );
}
