import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS, type CaseStudy } from "../data/projects";

export default function FeaturedWork() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("https://portfolio-sm6r.onrender.com/works")
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((data: unknown) => {
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data as CaseStudy[]);
        } else {
          setProjects(PROJECTS);
        }
      })
      .catch(() => { if (mounted) setProjects(PROJECTS); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const goTo = (p: CaseStudy) => {
    if (p.slug) {
      navigate(`/work/${p.slug}`);
    } else if (p.project_url && p.project_url !== "#") {
      window.open(p.project_url, "_blank");
    }
  };

  return (
    <motion.section
      id="work"
      className="mb-24 md:mb-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-4">
        Proof of Work
      </p>
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-3xl md:text-4xl font-bold leading-snug">Case studies</h2>
        <p className="text-sm text-[#666] hidden md:block max-w-xs text-right">
          Real projects. Real problems. What was broken, what I learned, what changed.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-[#0f0f0f] border border-white/[0.06] animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* First project — large featured */}
          {projects[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => goTo(projects[0])}
              className="group mb-5 bg-[#0f0f0f] border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="flex flex-col md:grid md:grid-cols-2">
                <div className="p-6 md:p-9 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
                      {projects[0].tags?.map((tag) => (
                        <span key={tag} className="text-xs text-[#666] bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-[#7B5CF6] transition-colors">
                      {projects[0].title}
                    </h3>
                    <p className="text-sm text-[#888] leading-relaxed">{projects[0].description}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-5 text-sm text-[#7B5CF6] font-medium">
                    Read case study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                {projects[0].image_url && (
                  <div className="relative hidden md:block h-52 md:h-auto overflow-hidden">
                    <img
                      src={projects[0].image_url}
                      alt={projects[0].title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Remaining projects — horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-3 md:gap-5 snap-x snap-mandatory md:snap-none scrollbar-hide">
            {projects.slice(1).map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => goTo(project)}
                className="group flex-shrink-0 w-[72vw] sm:w-[54vw] md:w-auto bg-[#0f0f0f] border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer hover:border-white/[0.12] transition-all duration-300 snap-start"
              >
                {project.image_url && (
                  <div className="relative h-36 md:h-40 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-[#555] bg-white/[0.04] border border-white/[0.05] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold mb-1.5 group-hover:text-[#7B5CF6] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#666] leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-xs text-[#7B5CF6] font-medium">
                    {project.slug ? "Read case study" : "View more"}
                    {project.slug
                      ? <ArrowRight className="w-3 h-3" />
                      : <ExternalLink className="w-3 h-3" />
                    }
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.section>
  );
}
