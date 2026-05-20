export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-28" />
      <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <circle cx="20" cy="20" r="8" />
          <circle cx="20" cy="20" r="14" strokeDasharray="2 3" />
          <circle cx="20" cy="20" r="18" />
        </g>
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-28" />
    </div>
  );
}
