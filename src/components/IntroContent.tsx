import SSTag from "./SSTag";

export default function IntroContent() {
  return (
    <div style={{ minHeight: "100%", position: "relative" }}>
      <div style={{ padding: "56px 96px 88px" }}>
        {/* Category tagline */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--red)",
            marginBottom: 22,
          }}
        >
          SECURITY · FINANCE · WRITING · NOTES
        </div>

        {/* Name */}
        <h1 style={{ marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(56px, 6vw, 88px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              lineHeight: 0.92,
              display: "block",
            }}
          >
            Sahil
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(56px, 6vw, 88px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--red)",
              lineHeight: 0.92,
              fontStyle: "italic",
              display: "block",
              marginTop: 2,
            }}
          >
            Shaikh.
          </span>
        </h1>

        {/* Bio paragraphs */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 400,
            fontVariationSettings: "'opsz' 16",
            color: "var(--ink)",
            lineHeight: 1.75,
            maxWidth: 460,
            marginBottom: 14,
          }}
        >
          A cybersecurity engineer in Vadodara. Right now I'm building an ISMS
          from scratch at a pharma company. Before this — SANS, the Internet
          Storm Center, and nine GIAC certifications.
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 400,
            fontVariationSettings: "'opsz' 16",
            color: "var(--ink)",
            lineHeight: 1.75,
            maxWidth: 460,
            marginBottom: 0,
          }}
        >
          I write about defenses, markets, and what I'm reading.{" "}
          <span style={{ color: "var(--red)" }}>Pick one →</span>
        </p>
      </div>

      {/* SS Tag — spray-painted signature */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 36,
          transform: "rotate(-4deg)",
          zIndex: 2,
        }}
      >
        <SSTag size={64} />
      </div>

      {/* Banksy mascot — fill via MJ later */}
    </div>
  );
}
