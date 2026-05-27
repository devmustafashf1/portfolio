import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ahmad Usman",
    role: "Founder",
    company: "LogiTech",
    review:
      "Mustafa delivered strong execution on our wallet app and handled it better than most senior developers I've worked with. Communication was clear and the backend was solid.",
    avatar: "AU",
  },
  {
    name: "Fauath",
    role: "CEO",
    company: "Traversiq",
    review:
      "Collaborating on Traversiq was smooth because we could work across frontend and backend without constant direction. He solved problems and kept delivery moving without hand-holding.",
    avatar: "F",
  },
  {
    name: "Chris",
    role: "Founder",
    company: "SaaS Co.",
    review:
      "The real product goes seriously and comes across as a capable platform. The booking and user journey improvements made a real difference for our team.",
    avatar: "C",
  },
];

export default function ReviewsBar() {
  return (
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

      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between gap-6"
          >
            <p className="text-sm text-[#999] leading-relaxed">
              "{review.review}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7B5CF6]/20 flex items-center justify-center text-xs font-bold text-[#7B5CF6]">
                {review.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{review.name}</p>
                <p className="text-xs text-[#555]">
                  {review.role} · {review.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
