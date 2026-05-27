import { motion } from "framer-motion";
import { Phone, FileText, Zap } from "lucide-react";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Book a Discovery Call",
    description:
      "We talk for 30 minutes. No pitch, no pressure — just a direct conversation about what's broken and what needs to ship.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Scoped Proposal",
    description:
      "You get a clear plan: timeline, recommended approach, and a fixed price. No ambiguity, no surprises.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Execute & Own",
    description:
      "I take full ownership of delivery. Regular updates, fast decisions, and you always know where things stand.",
  },
];

export default function HowItWorks() {
  return (
    <motion.section
      className="mb-24 md:mb-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-4">
        The Process
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-12 leading-snug">
        How it works
      </h2>
      <p className="text-[#666] text-sm mb-12 -mt-8 max-w-md">
        Three steps from first message to your product moving again.
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#7B5CF6]/[0.12] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#7B5CF6]" />
                </div>
                <span className="text-3xl font-bold text-white/[0.06]">{step.number}</span>
              </div>
              <h3 className="text-base font-semibold mb-3 text-white">{step.title}</h3>
              <p className="text-sm text-[#777] leading-relaxed">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
