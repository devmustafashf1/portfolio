import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "../../public/gm-formal.png";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="mb-28 md:mb-36">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-full">

        {/* Left */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          {/* Available badge */}
          <motion.div variants={item} className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-[#888]">Available for new projects</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-5"
          >
            I build products that actually ship.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-[#888] leading-relaxed mb-8 max-w-md"
          >
            Full-stack developer and technical partner for founders and teams who need
            real execution — not just code. I take ownership of messy, delayed, or
            stalled products and move them forward across web and mobile.
          </motion.p>

          {/* Stats */}
          <motion.div variants={item} className="flex items-center gap-8 mb-10">
            <div>
              <p className="text-2xl font-bold">4+</p>
              <p className="text-xs text-[#666] mt-0.5">Years</p>
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div>
              <p className="text-2xl font-bold">20+</p>
              <p className="text-xs text-[#666] mt-0.5">Projects</p>
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div>
              <p className="text-2xl font-bold">5★</p>
              <p className="text-xs text-[#666] mt-0.5">Rating</p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 bg-[#7B5CF6] hover:bg-[#6B4EF0] text-white text-sm font-medium px-6 py-3 rounded-full transition-all duration-200 group"
            >
              Book a Free Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('work')}
              className="flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full border border-white/[0.1] text-[#aaa] hover:text-white hover:border-white/25 transition-all duration-200"
            >
              See My Work
            </button>
          </motion.div>
        </motion.div>

        {/* Right — Photo card (desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="hidden md:flex justify-end"
        >
          <div className="relative w-[380px] h-[460px] rounded-2xl overflow-hidden bg-[#111] border border-white/[0.07]">
            <img
              src={heroImg}
              alt="Mustafa"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#090909]/60 to-transparent" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
