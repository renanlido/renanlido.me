export function PulseLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0 40 H180 L210 40 L228 12 L246 68 L264 40 H420 L450 40 L468 18 L486 62 L504 40 H720 L750 40 L768 8 L786 72 L804 40 H1010 L1040 40 L1058 16 L1076 64 L1094 40 H1200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pulse-path"
        opacity="0.9"
      />
      <path
        d="M0 40 H180 L210 40 L228 12 L246 68 L264 40 H420 L450 40 L468 18 L486 62 L504 40 H720 L750 40 L768 8 L786 72 L804 40 H1010 L1040 40 L1058 16 L1076 64 L1094 40 H1200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.15"
      />
    </svg>
  );
}
