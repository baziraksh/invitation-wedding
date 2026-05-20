import { useEffect, useState } from "react";

export function Particles({ count = 40 }: { count?: number }) {
  const [dots, setDots] = useState<
    { id: number; left: number; top: number; delay: number; duration: number; size: number }[]
  >([]);

  useEffect(() => {
    setDots(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
        size: 2 + Math.random() * 3,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 8px var(--gold), 0 0 16px var(--gold)",
            animation: `pulse-glow ${d.duration}s ease-in-out ${d.delay}s infinite`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}
