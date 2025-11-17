import { ArrowRight, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function FeaturedWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasEntered) {
          setHasEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasEntered]);

  const projects = [
    {
      title: "E-Commerce Platform",
      desc: "Full-stack application with real-time inventory syncing and admin dashboard.",
      tags: ["React", "Node.js", "MongoDB"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&fit=crop&q=80",
      projectUrl:
        "https://ecommerce-demo.vercel.app/this-is-a-very-long-link-to-test-truncation",
    },
    {
      title: "Task Management App",
      desc: "Kanban-style task board with team collaboration tools.",
      tags: ["Next.js", "TypeScript", "Supabase"],
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&fit=crop&q=80",
      projectUrl: "https://taskboard-app.netlify.app",
    },
    {
      title: "Portfolio Dashboard",
      desc: "Analytics and insights for creative professionals.",
      tags: ["React", "D3.js", "Express"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&fit=crop&q=80",
      projectUrl: "https://portfolio-analytics.herokuapp.com",
    },
  ];

  const cardEntrance = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.12 },
    }),
  };

  return (
    <motion.section
      id="work"
      ref={sectionRef}
      className="mb-24 md:mb-40 max-w-6xl mx-auto px-4"
      initial={hasEntered ? false : "hidden"}
      animate={hasEntered ? false : "show"}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
      }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-12 md:mb-16">
        <span className="text-cyan-400 text-3xl">//</span>
        <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
      </div>

      {/* Project Cards */}
      <div className="flex flex-col gap-10">
        {projects.map((project, idx) => {
          const isHovered = hoveredIndex === idx;

          return (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardEntrance}
              initial={hasEntered ? false : "hidden"}
              animate={hasEntered ? undefined : "show"}
              layout
              className={`relative p-6 md:p-8 rounded-2xl bg-slate-800/30 border border-slate-700 backdrop-blur-xl transition-all cursor-pointer
                ${isHovered ? "shadow-2xl" : "shadow-md"}`}
              onMouseEnter={() => window.innerWidth >= 768 && setHoveredIndex(idx)}
              onMouseLeave={() => window.innerWidth >= 768 && setHoveredIndex(null)}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setHoveredIndex(isHovered ? null : idx);
                }
              }}
            >
              {/* Text + Arrow */}
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className={`text-xl md:text-2xl font-semibold transition-colors ${
                      isHovered ? "text-cyan-400" : "text-white"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm md:text-base mt-1">{project.desc}</p>

                  {/* URL link below description */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        key="visit-link"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.25 }}
                        className="mt-1 flex items-center gap-1"
                      >
                        <LinkIcon className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 text-sm truncate max-w-[250px] hover:underline"
                          title={project.projectUrl}
                        >
                          {project.projectUrl}
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop Arrow */}
                <motion.div
                  className="hidden md:block"
                  animate={isHovered ? { x: -10 } : { x: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => window.open(project.projectUrl, "_blank")}
                >
                  <ArrowRight
                    className={`w-6 h-6 ${
                      isHovered ? "text-cyan-400" : "text-slate-500"
                    }`}
                  />
                </motion.div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-slate-700/40 border border-slate-600 rounded-full text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Desktop Image */}
              <AnimatePresence>
                {isHovered && window.innerWidth >= 768 && (
                  <motion.div
                    className="hidden md:block absolute top-4 right-4 w-64 h-40 rounded-xl overflow-hidden shadow-xl border border-slate-600 bg-black"
                    initial={{ x: 150, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 150, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Image */}
              <AnimatePresence initial={false}>
                {isHovered && window.innerWidth < 768 && (
                  <motion.div
                    key="mobile-img"
                    className="md:hidden w-full mt-4 rounded-xl overflow-hidden border border-slate-600 shadow-xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <img src={project.image} alt={project.title} className="w-full h-44 object-cover" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
