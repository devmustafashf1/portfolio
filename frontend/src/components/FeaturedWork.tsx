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

  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchWorks = async () => {
      try {
        const res = await fetch("https://portfolio-sm6r.onrender.com/works");
        if (!res.ok) {
          console.error("Fetch failed:", await res.text());
          return;
        }

        const data = await res.json();
        if (mounted) setProjects(data);
      } catch (err) {
        console.error("Error fetching works:", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchWorks();
    return () => (mounted = false);
  }, []);

  const cardEntrance = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
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
        <span className="text-slate-600 font-bold text-3xl">//</span>
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
              initial="hidden"
              animate="show"
              layout
              transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
              className={`relative overflow-hidden p-6 md:p-8 rounded-2xl bg-slate-800/30 border border-slate-700 backdrop-blur-xl transition-all cursor-pointer
                ${isHovered ? "shadow-xl scale-[1.01]" : "shadow-md"}`}
              onMouseEnter={() =>
                window.innerWidth >= 768 && setHoveredIndex(idx)
              }
              onMouseLeave={() =>
                window.innerWidth >= 768 && setHoveredIndex(null)
              }
              onClick={() => {
                if (window.innerWidth < 768) {
                  setHoveredIndex(isHovered ? null : idx);
                }
              }}
            >
              <div className="flex items-start justify-between relative z-20">
                <div className="w-full md:max-w-[65%]">
                  <h3
                    className={`text-xl md:text-2xl font-semibold transition-colors ${
                      isHovered ? "text-cyan-400" : "text-white"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm md:text-base mt-1">
                    {project.description}
                  </p>

                  {/* URL */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        key="visit-link"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 flex items-center gap-2"
                      >
                        <LinkIcon className="w-4 h-4 text-cyan-400" />
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 text-sm hover:underline max-w-[200px] truncate"
                        >
                          {project.project_url}
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
                  onClick={() => window.open(project.project_url, "_blank")}
                >
                  <ArrowRight
                    className={`w-6 h-6 ${
                      isHovered ? "text-cyan-400" : "text-slate-500"
                    }`}
                  />
                </motion.div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2 z-20 relative">
                {project.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-slate-700/40 border border-slate-600 rounded-full text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Desktop Floating Image (kept OUTSIDE text area) */}
              <AnimatePresence>
                {isHovered && window.innerWidth >= 768 && (
                  <motion.div
                    initial={{ opacity: 0, x: 120 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 120 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="hidden md:block absolute top-8 right-8 w-64 h-44 rounded-xl overflow-hidden shadow-xl border border-slate-600 bg-black z-10"
                  >
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Expand Image */}
              <AnimatePresence>
                {isHovered && window.innerWidth < 768 && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.35 }}
                    className="w-full mt-4 rounded-xl overflow-hidden shadow-xl border border-slate-600"
                  >
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
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
