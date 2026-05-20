export function Diya({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="animate-flicker">
        <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
          <ellipse cx="28" cy="14" rx="6" ry="10" fill="url(#flame)" />
          <ellipse cx="28" cy="12" rx="3" ry="6" fill="oklch(0.98 0.08 90)" />
          <path d="M6 36 Q28 56 50 36 Q50 44 28 48 Q6 44 6 36 Z" fill="url(#bowl)" />
          <ellipse cx="28" cy="36" rx="22" ry="4" fill="oklch(0.32 0.13 18)" />
          <defs>
            <radialGradient id="flame" cx="50%" cy="60%">
              <stop offset="0%" stopColor="oklch(0.98 0.1 90)" />
              <stop offset="50%" stopColor="oklch(0.85 0.18 70)" />
              <stop offset="100%" stopColor="oklch(0.60 0.20 35 / 0)" />
            </radialGradient>
            <linearGradient id="bowl" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.78 0.14 80)" />
              <stop offset="100%" stopColor="oklch(0.45 0.12 50)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
