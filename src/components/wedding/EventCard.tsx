import { motion } from "framer-motion";

export function EventCard({
  title,
  date,
  time,
  icon,
  i,
}: {
  title: string;
  date: string;
  time: string;
  icon: string;
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl glass p-8 text-center transition-shadow hover:shadow-[0_0_50px_oklch(0.80_0.15_82/0.35)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="text-5xl">{icon}</div>
      <h3 className="mt-4 font-display text-2xl text-gradient-gold sm:text-3xl">{title}</h3>
      <div className="my-3 mx-auto h-px w-12 bg-gold/60" />
      <p className="text-sm uppercase tracking-[0.3em] text-cream/80">{date}</p>
      <p className="mt-1 font-script text-2xl text-gold-soft">{time}</p>
    </motion.div>
  );
}
