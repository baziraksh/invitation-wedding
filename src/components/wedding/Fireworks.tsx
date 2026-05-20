import { useEffect, useRef } from "react";

export function Fireworks() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !active.current) {
          active.current = true;
          burst();
          const i = setInterval(burst, 1500);
          setTimeout(() => clearInterval(i), 6000);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();

    function burst() {
      if (!el) return;
      const cx = Math.random() * el.clientWidth;
      const cy = Math.random() * (el.clientHeight * 0.6);
      const hue = ["#f5d97a", "#ff9ec7", "#b07cff", "#ff7e6b"][Math.floor(Math.random() * 4)];
      for (let i = 0; i < 24; i++) {
        const p = document.createElement("span");
        const angle = (i / 24) * Math.PI * 2;
        const dist = 80 + Math.random() * 60;
        p.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:6px;height:6px;border-radius:9999px;background:${hue};box-shadow:0 0 10px ${hue};pointer-events:none;transition:transform 1.2s cubic-bezier(0.2,0.8,0.2,1),opacity 1.2s;`;
        el.appendChild(p);
        requestAnimationFrame(() => {
          p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0.3)`;
          p.style.opacity = "0";
        });
        setTimeout(() => p.remove(), 1300);
      }
    }
  }, []);
  return <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" />;
}
