"use client";
import { Sparkles, ArrowRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { motion, Variants } from "framer-motion";
import heroImg from "../../public/gm.jpg";

// ✅ Define variants properly using the Variants type
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // delay between child animations
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <motion.section 
      className="mb-20 mt-12 md:mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left side */}
        <motion.div
          className="text-center md:text-left flex flex-col items-center md:items-start"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* 1️⃣ Top text */}
          <motion.div
            className="flex items-center justify-center md:justify-start gap-2 mb-4"
            variants={item}
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h1
              style={{
                color: "#22d3ee",
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                display: "inline-block",
              }}
            >
              <Typewriter
                words={[
                  "DEVELOPER & CREATOR",
                  "CONTENT CREATOR",
                  "PRODUCT DESIGNER",
                  "PART TIME TEACHER",
                ]}
                loop
                cursor
                cursorStyle="▋"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1200}
              />
            </h1>
          </motion.div>

          {/* 2️⃣ Name */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight"
            variants={item}
          >
            Mustafa Shf
          </motion.h1>

          {/* 3️⃣ Description */}
          <motion.p
            className="text-base sm:text-lg md:text-2xl text-slate-400 mb-6 leading-relaxed max-w-md md:max-w-none"
            variants={item}
          >
            Crafting digital experiences that push boundaries and{" "}
            <span className="text-white font-medium">make an impact</span>
          </motion.p>

          {/* 4️⃣ Buttons */}
          <motion.div
            className="flex justify-center md:justify-start gap-4 mt-6 flex-wrap"
            variants={item}
          >
            <a
              href="#contact"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 group"
            >
              Let's Talk
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#work"
              className="border border-slate-700 px-7 py-3 rounded-full font-medium hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              View Work
            </a>
          </motion.div>
        </motion.div>

        {/* Right side (Image section) */}
        <motion.div
          className="flex justify-center md:justify-end mt-8 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 60px rgba(34, 211, 238, 0.3), inset 0 0 60px rgba(34, 211, 238, 0.1); }
              50% { box-shadow: 0 0 80px rgba(34, 211, 238, 0.5), inset 0 0 80px rgba(34, 211, 238, 0.2); }
            }
            .profile-circle {
              animation: float 3s ease-in-out infinite, glow 3s ease-in-out infinite;
            }
          `}</style>

          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96">
            <div className="absolute inset-1 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-full flex items-center justify-center overflow-hidden profile-circle">
              <img
                src={heroImg}
                alt="Mustafa Shf"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30"></div>
            <div className="absolute -inset-2 rounded-full border border-blue-500/20"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
