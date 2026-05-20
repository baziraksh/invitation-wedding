import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-03T10:00:00+05:30").getTime();

function getTime() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(getTime());
  useEffect(() => {
    const i = setInterval(() => setT(getTime()), 1000);
    return () => clearInterval(i);
  }, []);
  const items = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6">
      {items.map((it) => (
        <div key={it.label} className="glass rounded-2xl p-4 text-center sm:p-6">
          <div className="font-display text-3xl text-gradient-gold sm:text-6xl">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-cream/70 sm:text-xs">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
