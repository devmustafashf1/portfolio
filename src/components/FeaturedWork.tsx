import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturedWork() {
  const projects = [
    {
      title: "E-Commerce Platform",
      desc: "Full-stack application with real-time inventory management",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Task Management App",
      desc: "Collaborative tool for team productivity",
      tags: ["Next.js", "TypeScript", "Supabase"],
    },
    {
      title: "Portfolio Dashboard",
      desc: "Analytics platform for creative professionals",
      tags: ["React", "D3.js", "Express"],
    },
  ];

  return (
    <motion.section 
      id="work" 
      className="mb-20 md:mb-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 flex items-center gap-3"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-slate-600 text-2xl">//</span>
        Featured Work
      </motion.h2>
      <div className="space-y-5 md:space-y-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="bg-slate-800/30 border border-slate-700 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-cyan-400/50 hover:bg-slate-800/50 transition-all group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base">
                  {project.desc}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-700/50 px-3 py-1 rounded-full text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}