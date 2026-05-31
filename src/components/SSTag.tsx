export default function SSTag({ size = 42 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 120 80"
      fill="none"
      stroke="#d4280e"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="SS signature"
    >
      <path d="M 15 25 Q 15 12, 30 12 Q 45 12, 45 25 Q 45 35, 30 35 Q 15 35, 15 45 Q 15 55, 30 55 Q 45 55, 45 45" />
      <path d="M 60 25 Q 60 12, 75 12 Q 90 12, 90 25 Q 90 35, 75 35 Q 60 35, 60 45 Q 60 55, 75 55 Q 90 55, 90 45" />
      <line x1="30" y1="55" x2="30" y2="72" strokeWidth="2.5" />
      <circle cx="30" cy="74" r="2.5" fill="#d4280e" stroke="none" />
      <line x1="78" y1="50" x2="78" y2="65" strokeWidth="1.8" />
      <circle cx="78" cy="67" r="1.8" fill="#d4280e" stroke="none" />
      <circle cx="52" cy="18" r="0.8" fill="#d4280e" stroke="none" />
      <circle cx="55" cy="35" r="0.6" fill="#d4280e" stroke="none" />
      <circle cx="95" cy="28" r="0.7" fill="#d4280e" stroke="none" />
    </svg>
  );
}
