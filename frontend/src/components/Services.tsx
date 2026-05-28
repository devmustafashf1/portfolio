import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const services = [
  {
    tag: "Fix It.",
    headline: "Your product is broken or stuck. I fix it.",
    price: "Starting from $500",
    priceNote: "Per engagement",
    bullets: [
      "Diagnose what's actually failing",
      "Stabilise fragile code and deployments",
      "Restore confidence and execution flow",
      "One clear person who owns the fix",
    ],
    featured: false,
  },
  {
    tag: "Build It.",
    headline: "You have an idea. I ship the first version.",
    price: "Project-based",
    priceNote: "Typical range: $2k – $8k",
    bullets: [
      "Build across web, mobile, and backend",
      "Ship something real — not just a prototype",
      "Delivered in weeks, not quarters",
      "You own everything, no lock-in",
    ],
    featured: false,
  },
  {
    tag: "Own It.",
    headline: "I own your product execution, ongoing.",
    price: "Monthly retainer",
    priceNote: "Starts at $1,500 / month",
    bullets: [
      "Two delivery decisions, priorities, and execution per week",
      "Work across the full stack, every week",
      "Direct line — no account managers, no delays",
      "Cancel any time, no contracts",
    ],
    featured: true,
  },
];

export default function Services() {
  return (
    <motion.section
      id="services"
      className="mb-24 md:mb-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-4">
        How I Can Help
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
        3 ways to work with me
      </h2>
      <p className="text-[#666] text-sm mb-12 max-w-lg">
        Every path leads to the same thing — your product moving again.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-2xl p-6 border transition-all ${
              s.featured
                ? "bg-[#7B5CF6]/[0.08] border-[#7B5CF6]/40"
                : "bg-[#0f0f0f] border-white/[0.07]"
            }`}
          >
            {s.featured && (
              <span className="absolute -top-3 right-5 bg-[#7B5CF6] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Recommended
              </span>
            )}

            <p className="text-xs font-bold tracking-widest text-[#555] uppercase mb-4">
              {s.tag}
            </p>

            <h3 className="text-lg font-semibold leading-snug mb-6 text-white">
              {s.headline}
            </h3>

            <div className="mb-6">
              <p className="text-2xl font-bold text-white">{s.price}</p>
              <p className="text-xs text-[#666] mt-1">{s.priceNote}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {s.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-[#999]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B5CF6] mt-1.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollTo('contact')}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                s.featured
                  ? "bg-[#7B5CF6] hover:bg-[#6B4EF0] text-white"
                  : "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.07]"
              }`}
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
