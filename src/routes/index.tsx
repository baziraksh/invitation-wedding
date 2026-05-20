import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { IntroLoader } from "@/components/wedding/IntroLoader";
import { FloatingPetals } from "@/components/wedding/FloatingPetals";
import { Particles } from "@/components/wedding/Particles";
import { Ornament } from "@/components/wedding/Ornament";
import { Countdown } from "@/components/wedding/Countdown";
import { ScratchCard } from "@/components/wedding/ScratchCard";
import { Gallery } from "@/components/wedding/Gallery";
import { EventCard } from "@/components/wedding/EventCard";
import { Diya } from "@/components/wedding/Diya";
import { Fireworks } from "@/components/wedding/Fireworks";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import hero from "@/assets/gallery/couple-stage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rajesh ❤ Rupa · Wedding Invitation · 3 July 2026" },
      {
        name: "description",
        content:
          "With joy in our hearts, Rajesh Pradhan & Rupa Sahoo invite you to celebrate their wedding on 3rd July 2026 in Puri, Odisha.",
      },
      { property: "og:title", content: "Rajesh weds Rupa · 3 July 2026" },
      { property: "og:description", content: "Two Hearts, One Soul · A Royal Indian Wedding Celebration" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Great+Vibes&display=swap",
      },
    ],
  }),
  component: WeddingPage,
});

function WeddingPage() {
  const [introDone, setIntroDone] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}
      <FloatingPetals />
      <MusicToggle />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        </motion.div>
        <Particles count={50} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 30 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="relative z-10 text-center"
        >
          <p className="font-script text-4xl text-gradient-gold sm:text-6xl">Two Hearts, One Soul</p>
          <Ornament className="my-8" />
          <h1 className="font-display text-5xl uppercase tracking-[0.15em] text-cream sm:text-7xl md:text-8xl text-glow">
            Rajesh
          </h1>
          <div className="my-4 flex items-center justify-center gap-4 sm:my-6">
            <span className="h-px w-12 bg-gold sm:w-20" />
            <motion.span
              className="inline-block text-3xl animate-heartbeat"
              style={{ filter: "drop-shadow(0 0 12px oklch(0.78 0.18 20))" }}
            >
              ❤
            </motion.span>
            <span className="font-script text-3xl text-gold-soft sm:text-4xl">weds</span>
            <motion.span
              className="inline-block text-3xl animate-heartbeat"
              style={{ filter: "drop-shadow(0 0 12px oklch(0.78 0.18 20))" }}
            >
              ❤
            </motion.span>
            <span className="h-px w-12 bg-gold sm:w-20" />
          </div>
          <h1 className="font-display text-5xl uppercase tracking-[0.15em] text-cream sm:text-7xl md:text-8xl text-glow">
            Rupa
          </h1>
          <p className="mt-10 text-xs uppercase tracking-[0.5em] text-gold-soft sm:text-sm">
            03 · July · 2026 &nbsp;·&nbsp; Puri, Odisha
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16 text-gold/70"
          >
            <p className="text-[10px] uppercase tracking-[0.4em]">scroll</p>
            <div className="mx-auto mt-2 h-10 w-px bg-gradient-to-b from-gold to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-script text-4xl text-gradient-gold sm:text-5xl">Counting Down</p>
            <Ornament className="my-6" />
            <p className="mb-10 text-sm uppercase tracking-[0.4em] text-cream/70">to our forever</p>
          </motion.div>
          <Countdown />
        </div>
      </section>

      {/* SCRATCH CARD */}
      <section className="relative px-4 py-20">
        <div className="text-center">
          <p className="font-script text-4xl text-gradient-gold sm:text-5xl">A Little Surprise</p>
          <Ornament className="my-6" />
          <p className="mb-10 text-sm uppercase tracking-[0.4em] text-cream/70">scratch to reveal the date</p>
        </div>
        <ScratchCard />
      </section>

      {/* EVENTS */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-script text-4xl text-gradient-gold sm:text-5xl">Wedding Festivities</p>
            <Ornament className="my-6" />
            <p className="mb-14 text-sm uppercase tracking-[0.4em] text-cream/70">
              join us in our sacred celebrations
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Haldi", date: "1 July 2026", time: "Morning", icon: "🌼" },
              { title: "Mehendi", date: "1 July 2026", time: "Evening", icon: "🌿" },
              { title: "Sangeet", date: "2 July 2026", time: "Night", icon: "🎶" },
              { title: "Wedding", date: "3 July 2026", time: "Auspicious Muhurat", icon: "💍" },
              { title: "Reception", date: "4 July 2026", time: "Evening", icon: "🥂" },
              { title: "Vidaai", date: "5 July 2026", time: "Morning", icon: "🪔" },
            ].map((e, i) => (
              <EventCard key={e.title} i={i} {...e} />
            ))}
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-script text-4xl text-gradient-gold sm:text-5xl">The Venue</p>
            <Ornament className="my-6" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-10 overflow-hidden rounded-3xl glass"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 sm:p-12">
                <h3 className="font-display text-3xl text-gradient-gold sm:text-4xl">Balighat, Puri</h3>
                <p className="mt-3 text-cream/80">Odisha 752002, India</p>
                <div className="my-6 h-px w-20 bg-gold/60" />
                <p className="text-cream/70">
                  By the sacred shores of Puri, where the divine meets the eternal — we invite you to bless
                  our union under the blessings of Lord Jagannath.
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=19.825408,85.847781"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:scale-105 glow-gold"
                >
                  Navigate Now →
                </a>
              </div>
              <div className="relative min-h-[300px]">
                <iframe
                  title="Wedding venue map"
                  src="https://www.google.com/maps?q=19.825408,85.847781&z=15&output=embed"
                  className="absolute inset-0 h-full w-full grayscale-[40%]"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative px-4 py-24">
        <div className="text-center">
          <p className="font-script text-4xl text-gradient-gold sm:text-5xl">Our Moments</p>
          <Ornament className="my-6" />
          <p className="mb-12 text-sm uppercase tracking-[0.4em] text-cream/70">a story in pictures</p>
        </div>
        <Gallery />
      </section>

      {/* BLESSINGS */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center gap-6">
            <Diya />
            <Diya />
            <Diya />
          </div>
          <p className="font-script text-4xl text-gradient-gold sm:text-5xl">With Blessings</p>
          <Ornament className="my-6" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass mt-8 rounded-3xl p-8 sm:p-12"
          >
            <p className="text-cream/80 leading-relaxed sm:text-lg">
              With the divine blessings of the Almighty, and with hearts full of joy,
              <br />
              <span className="text-gold">Mr. & Mrs. Pradhan</span> and{" "}
              <span className="text-gold">Mr. & Mrs. Sahoo</span>
              <br />
              along with all family members, cordially invite you to bless
            </p>
            <p className="my-6 font-script text-4xl text-gradient-gold sm:text-5xl">Rajesh & Rupa</p>
            <p className="text-cream/70">
              on their auspicious wedding day. Your presence will make this day complete and unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden px-4 py-24">
        <Fireworks />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="font-script text-5xl text-gradient-gold sm:text-7xl">Rajesh & Rupa</p>
          <div className="my-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-2xl animate-heartbeat">❤</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-cream/60">03 · July · 2026</p>
          <p className="mt-10 text-sm text-cream/50">
            Made with <span className="text-rose">❤</span> for Rajesh &amp; Rupa
          </p>
        </div>
      </footer>
    </main>
  );
}
