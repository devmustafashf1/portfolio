import { motion } from "framer-motion";

export default function About() {
  const skills = [
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Next.js",
    "PostgreSQL",
  ];

  return (
    <motion.section
      id="about"
      className="mb-20 md:mb-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 flex items-center gap-3 "
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-3xl md:text-4xl font-bold flex items-center gap-3 md:mt-16 mt-10">
         <span className="text-slate-600 font-bold text-3xl ">//</span>
         About Me
        </div>
      </motion.h2>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Text Section */}
        <motion.div
          className="space-y-5 text-slate-300 text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <p>
            I'm a developer who loves turning ideas into reality through clean
            code and thoughtful design. Currently building digital products that
            people actually enjoy using.
          </p>
          <p>
            When I'm not coding, you'll find me exploring new tech, contributing
            to open source, or probably debugging something at 3 AM with a coffee
            in hand.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-3 md:p-4 hover:border-cyan-400/50 hover:bg-slate-800 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="text-slate-300">{skill}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
