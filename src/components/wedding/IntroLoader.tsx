import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Particles } from "./Particles";

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      setTimeout(onDone, 900);
    }, 3600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--gradient-royal)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <Particles count={60} />
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative z-10 text-center"
          >
            <p className="font-script text-3xl text-gold-soft sm:text-5xl text-glow">Save The Date</p>
            <motion.h1
              initial={{ letterSpacing: "0.5em", opacity: 0 }}
              animate={{ letterSpacing: "0.2em", opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.6 }}
              className="mt-6 font-display text-2xl uppercase shimmer-text sm:text-4xl"
            >
              Rajesh &nbsp;·&nbsp; Rupa
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mx-auto mt-6 h-px w-48 bg-gold origin-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="mt-4 text-sm tracking-[0.4em] text-cream/70"
            >
              03 · JULY · 2026
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
