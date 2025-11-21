import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section 
      id="contact" 
      className="mb-16 md:mb-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Let's Build Something
        </motion.h2>
        <motion.p 
          className="text-base md:text-xl text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Got a project in mind? Let's collaborate and create something
          amazing together.
        </motion.p>
        <motion.div 
          className="flex justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://github.com/devmustafashf1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 p-3 md:p-4 rounded-full hover:bg-cyan-500 hover:scale-110 transition-all"
          >
            <Github className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 p-3 md:p-4 rounded-full hover:bg-cyan-500 hover:scale-110 transition-all"
          >
            <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href="mailto:devmustafashf@gmail.com"
            className="bg-slate-800 p-3 md:p-4 rounded-full hover:bg-cyan-500 hover:scale-110 transition-all"
          >
            <Mail className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}