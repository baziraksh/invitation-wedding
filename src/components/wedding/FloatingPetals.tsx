import { useEffect, useState } from "react";

export function FloatingPetals({ count = 18 }: { count?: number }) {
  const [petals, setPetals] = useState<
    { id: number; left: number; delay: number; duration: number; size: number; hue: string }[]
  >([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 14,
        size: 12 + Math.random() * 20,
        hue: Math.random() > 0.5 ? "oklch(0.78 0.12 10)" : "oklch(0.85 0.14 60)",
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute block rounded-full"
          style={{
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 0.6,
            background: `radial-gradient(ellipse at 30% 30%, ${p.hue}, transparent 70%)`,
            filter: "blur(0.3px)",
            animation: `float-petal ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
