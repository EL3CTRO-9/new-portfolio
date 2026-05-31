type SocialKind = "in" | "gh" | "x";

interface SocialTagProps {
  kind: SocialKind;
  href: string;
  size?: number;
  ariaLabel: string;
}

function InTag({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* I */}
      <line x1="22" y1="15" x2="22" y2="55" />
      {/* N */}
      <line x1="48" y1="55" x2="48" y2="15" />
      <line x1="48" y1="17" x2="78" y2="55" />
      <line x1="78" y1="55" x2="78" y2="15" />
      {/* drip from I */}
      <line x1="22" y1="55" x2="22" y2="66" strokeWidth="2.5" />
      <circle cx="22" cy="68" r="2" fill="currentColor" stroke="none" />
      {/* spray dot */}
      <circle cx="92" cy="22" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GhTag({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* G */}
      <path d="M 42 20 Q 28 14, 20 28 Q 16 45, 30 52 Q 45 52, 45 38 L 33 38" />
      {/* H */}
      <line x1="60" y1="15" x2="60" y2="55" />
      <line x1="60" y1="33" x2="85" y2="33" />
      <line x1="85" y1="15" x2="85" y2="55" />
      {/* drip from H */}
      <line x1="85" y1="55" x2="85" y2="66" strokeWidth="2.5" />
      <circle cx="85" cy="68" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XTag({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 70 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* X */}
      <line x1="15" y1="15" x2="55" y2="55" />
      <line x1="55" y1="15" x2="15" y2="55" />
      {/* drip */}
      <line x1="55" y1="55" x2="55" y2="66" strokeWidth="2.5" />
      <circle cx="55" cy="68" r="2" fill="currentColor" stroke="none" />
      {/* spray dot */}
      <circle cx="35" cy="35" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function SocialTag({
  kind,
  href,
  size = 40,
  ariaLabel,
}: SocialTagProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={{
        display: "inline-block",
        color: "var(--ink)",
        transition: "color 180ms ease, transform 180ms ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--red)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--ink)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {kind === "in" && <InTag size={size} />}
      {kind === "gh" && <GhTag size={size} />}
      {kind === "x" && <XTag size={size} />}
    </a>
  );
}
