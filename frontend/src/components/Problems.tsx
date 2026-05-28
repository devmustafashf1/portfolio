import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";

const problems = [
  "Product is breaking in production — bugs are piling up with no clear owner.",
  "Delivery keeps slipping — deadlines are missed and scope never stops changing.",
  "Codebase is fragile — every new feature breaks something that was working.",
  "No one owns technical decisions — execution feels chaotic and leaderless.",
  "Frontend, backend, and integrations are disconnected — nothing works as one system.",
  "MVP is half-built or stalled — you're stuck and need someone who can actually ship.",
];

export default function Problems() {
  return (
    <motion.section
      className="mb-24 md:mb-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-4">
        To Fix Problems
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-xl leading-snug">
        When clients bring me in
      </h2>

      <p className="text-[#666] text-sm mb-10 max-w-lg">
        These are the exact situations I step in to fix.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {problems.map((problem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="flex gap-3 bg-[#0f0f0f] border border-white/[0.06] rounded-xl p-4"
          >
            <CheckSquare className="w-4 h-4 text-[#7B5CF6] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#aaa] leading-relaxed">{problem}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
