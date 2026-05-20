import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import g1 from "@/assets/gallery/rings-hands.jpg";
import g2 from "@/assets/gallery/bouquet.jpg";
import g3 from "@/assets/gallery/just-engaged.jpg";
import g4 from "@/assets/gallery/cake.jpg";
import g5 from "@/assets/gallery/couple-stage.jpg";
import g6 from "@/assets/gallery/couple-sunset.jpg";

const images = [
  { src: g3, caption: "Just Engaged" },
  { src: g5, caption: "Two Hearts" },
  { src: g6, caption: "Golden Hour" },
  { src: g1, caption: "Forever Bound" },
  { src: g4, caption: "Sweet Beginnings" },
  { src: g2, caption: "A Promise" },
];

export function Gallery() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl glass glow-gold sm:aspect-[16/10]">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0"
          >
            <img src={images[idx].src} alt={images[idx].caption} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="font-script text-3xl text-gradient-gold sm:text-5xl">{images[idx].caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full glass px-4 py-3 text-gold transition hover:scale-110"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full glass px-4 py-3 text-gold transition hover:scale-110"
          aria-label="Next"
        >
          ›
        </button>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {images.map((im, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-16 w-20 overflow-hidden rounded-lg border transition ${
              i === idx ? "border-gold scale-105 glow-gold" : "border-border opacity-60 hover:opacity-100"
            }`}
          >
            <img src={im.src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
