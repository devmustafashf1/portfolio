import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <motion.section
      className="mb-24 md:mb-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="relative rounded-2xl bg-[#0f0f0f] border border-white/[0.06] overflow-hidden px-8 py-14 md:py-20 text-center">
        {/* Subtle purple glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(123,92,246,0.08)_0%,_transparent_70%)] pointer-events-none" />

        <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-5">
          Ready to move?
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
          Got a product that's stuck?
        </h2>
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#7B5CF6] leading-tight">
          Let's fix it.
        </h2>
        <p className="text-[#777] text-base mb-10 max-w-md mx-auto">
          Book a free 30-minute call. No pitch, no pressure — just a direct
          conversation about what's blocked and what needs to move.
        </p>
        <button
          onClick={scrollToContact}
          className="inline-flex items-center gap-2 bg-[#7B5CF6] hover:bg-[#6B4EF0] text-white font-medium px-8 py-4 rounded-full transition-all duration-200 group"
        >
          Book a Free Call
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.section>
  );
}
