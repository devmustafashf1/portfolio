import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { src: "/T11.png", bg: "#ffffff", imgClass: "object-contain p-2", alt: "Review by Sasan on Superprof" },
  { src: "/T3.png", bg: "#0a1a0a", imgClass: "object-cover object-center", alt: "Upwork client review - SaaS project" },
  { src: "/T22.png", bg: "#ffffff", imgClass: "object-contain p-2", alt: "Review by Dee on Superprof" },
  { src: "/T4.png", bg: "#0a1a0a", imgClass: "object-cover object-center", alt: "Upwork client review - Nuxt/Vue platform" },
];

const doubled = [...testimonials, ...testimonials];

export default function ReviewsBar() {
  const [selected, setSelected] = useState<{ src: string; bg: string; alt: string } | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <motion.section
        className="mb-24 md:mb-32"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-4">
          Social Proof
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
          Proof from real product teams
        </h2>
        <p className="text-[#666] text-sm mb-12 max-w-md">
          Honest feedback from founders and teams I've moved forward.
        </p>

        <div className="overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#090909] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#090909] to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-4 min-w-max"
            style={{ animation: "marquee-rtl 28s linear infinite" }}
          >
            {doubled.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelected(testimonials[i % testimonials.length])}
                className="flex-shrink-0 rounded-2xl overflow-hidden flex items-center justify-center cursor-zoom-in transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                style={{ width: "340px", height: "170px", backgroundColor: t.bg }}
              >
                <img
                  src={t.src}
                  alt={t.alt}
                  className={`w-full h-full ${t.imgClass}`}
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* image container */}
            <motion.div
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full"
              style={{ backgroundColor: selected.bg }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full h-auto object-contain p-6 md:p-10"
              />
            </motion.div>

            {/* close button */}
            <button
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
