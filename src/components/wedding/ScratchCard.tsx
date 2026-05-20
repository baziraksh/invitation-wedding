import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#d4a64a");
    grad.addColorStop(0.5, "#f5d97a");
    grad.addColorStop(1, "#a87625");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(80,40,10,0.7)";
    ctx.font = "600 18px Cormorant Garamond, serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to Reveal ✦", rect.width / 2, rect.height / 2 - 6);
    ctx.font = "13px Cormorant Garamond, serif";
    ctx.fillText("our special date", rect.width / 2, rect.height / 2 + 16);

    ctx.globalCompositeOperation = "destination-out";

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const scratch = (e: PointerEvent) => {
      if (!drawing.current) return;
      const { x, y } = pos(e);
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
      checkReveal();
    };
    const checkReveal = () => {
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      for (let i = 3; i < img.length; i += 64) if (img[i] === 0) cleared++;
      if (cleared / (img.length / 64) > 0.45) setRevealed(true);
    };

    const down = (e: PointerEvent) => {
      drawing.current = true;
      scratch(e);
    };
    const up = () => (drawing.current = false);

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", scratch);
    window.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", scratch);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div className="relative mx-auto h-64 w-full max-w-md overflow-hidden rounded-3xl glass glow-gold">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <p className="font-script text-3xl text-gradient-gold">Wedding Date</p>
        <h3 className="mt-2 font-display text-4xl text-cream sm:text-5xl">3rd July 2026</h3>
        <p className="mt-3 text-xs uppercase tracking-[0.4em] text-gold-soft/80">Friday · Puri, Odisha</p>
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${
          revealed ? "pointer-events-none opacity-0" : "cursor-crosshair opacity-100"
        }`}
      />
      {revealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ y: -10, opacity: 0, scale: 0 }}
              animate={{ y: 260, opacity: [0, 1, 0], scale: [0, 1, 0.5] }}
              transition={{ duration: 1.6, delay: i * 0.04, ease: "easeOut" }}
              className="absolute h-2 w-2 rounded-full bg-gold"
              style={{ left: `${(i / 30) * 100}%`, boxShadow: "0 0 10px var(--gold)" }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
