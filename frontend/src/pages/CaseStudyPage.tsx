import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { PROJECTS } from "../data/projects";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = PROJECTS.find((p) => p.slug === slug);
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[currentIndex + 1] ?? PROJECTS[0];

  // Scroll to top on mount / slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#090909] flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-[#666]">Case study not found.</p>
        <button onClick={() => navigate("/")} className="text-[#7B5CF6] hover:underline text-sm">
          ← Back home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white">

      {/* ── Top nav ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-5">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-base font-semibold text-white hover:text-white/80 transition-colors">
            Mustafa.
          </Link>
          <div className="hidden md:flex items-center gap-1 bg-[#141414] border border-white/[0.08] rounded-full px-2 py-1.5">
            {[
              { label: "Home", to: "/" },
              { label: "Offers", id: "services" },
              { label: "Case Studies", id: "work" },
              { label: "About", id: "about" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm text-[#888] hover:text-white transition-colors px-4 py-1.5 rounded-full"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  to={`/${item.id ? `#${item.id}` : ""}`}
                  className="text-sm text-[#888] hover:text-white transition-colors px-4 py-1.5 rounded-full"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
          <Link
            to="/"
            className="bg-[#7B5CF6] hover:bg-[#6B4EF0] text-white text-sm font-medium px-5 py-2 rounded-full transition-all"
          >
            Book a Call
          </Link>
        </nav>
      </div>

      {/* ── Full-bleed hero image ── */}
      <div className="relative w-full overflow-hidden bg-[#090909]" style={{ height: "340px" }}>
        {/* Image — clear, bright, shown as a floating showcase panel */}
        <img
          src={project.image_url}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.85 }}
        />
        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-56 bg-gradient-to-r from-[#090909] to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-32 md:w-56 bg-gradient-to-l from-[#090909] to-transparent z-10" />
        {/* Bottom fade — key for blending into content */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent z-10" />
        {/* Top fade — subtle */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#090909] to-transparent z-10" />
      </div>

      {/* ── Main content ── */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-[#555] mb-8"
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <button onClick={() => { navigate("/"); setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 150); }} className="hover:text-white transition-colors">
            Case Studies
          </button>
          <span>/</span>
          <span className="text-white">{project.title}</span>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          {/* Category — highlighted */}
          <span className="bg-[#7B5CF6] text-white text-xs font-semibold px-4 py-1.5 rounded-full border border-[#7B5CF6]">
            {project.category}
          </span>
          {/* Tech tags — outline */}
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#888] border border-white/[0.15] px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-4"
        >
          {project.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-lg text-[#888] leading-relaxed mb-10 max-w-2xl"
        >
          {project.subtitle}
        </motion.p>

        {/* WHAT CHANGED box */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="border border-white/[0.12] rounded-xl p-5 mb-14"
        >
          <p className="text-xs font-bold tracking-widest text-[#7B5CF6] uppercase mb-2">
            What Changed
          </p>
          <p className="text-white text-base font-medium leading-relaxed">
            {project.whatChanged}
          </p>
        </motion.div>

        {/* ── Sections ── */}
        <div className="space-y-14">

          {/* Context */}
          <Section title="Context">
            <p className="text-[#999] text-base leading-relaxed">{project.context}</p>
          </Section>

          {/* Problem */}
          <Section title="The Problem">
            <p className="text-[#999] text-base leading-relaxed">{project.problem}</p>
          </Section>

          {/* Outcomes */}
          <Section title="Results">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {project.outcomes.map((o, i) => (
                <div
                  key={i}
                  className="bg-[#0f0f0f] border border-white/[0.06] rounded-xl p-5 text-center"
                >
                  <p className="text-2xl md:text-3xl font-bold text-[#7B5CF6] mb-1">{o.metric}</p>
                  <p className="text-xs text-[#666] leading-snug">{o.label}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Approach */}
          <Section title="How We Did It">
            <div className="space-y-4 mt-2">
              {project.approach.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7B5CF6]/10 text-[#7B5CF6] text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-[#999] text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Testimonial */}
          {project.testimonial && (
            <Section title="In Their Words">
              <blockquote className="border-l-2 border-[#7B5CF6] pl-6 mt-2">
                <p className="text-white text-base md:text-lg leading-relaxed mb-5">
                  "{project.testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7B5CF6]/20 flex items-center justify-center text-xs font-bold text-[#7B5CF6]">
                    {project.testimonial.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{project.testimonial.author}</p>
                    <p className="text-xs text-[#555]">{project.testimonial.role}</p>
                  </div>
                </div>
              </blockquote>
            </Section>
          )}

          {/* External link */}
          {project.project_url !== "#" && (
            <div>
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#7B5CF6] hover:text-[#9B7DFF] transition-colors border-b border-[#7B5CF6]/40 hover:border-[#9B7DFF] pb-0.5"
              >
                View live project <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* ── Next case study ── */}
        <div className="mt-20 pt-10 border-t border-white/[0.06]">
          <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-5">
            Next Case Study
          </p>
          <Link
            to={`/work/${next.slug}`}
            className="group flex items-center justify-between bg-[#0f0f0f] border border-white/[0.06] hover:border-[#7B5CF6]/30 rounded-2xl p-6 transition-all duration-300"
          >
            <div>
              <p className="text-lg font-semibold text-white group-hover:text-[#7B5CF6] transition-colors mb-1">
                {next.title}
              </p>
              <p className="text-sm text-[#555]">{next.subtitle}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#444] group-hover:text-[#7B5CF6] group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
          </Link>
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6">
          <div>
            <p className="font-semibold text-white mb-1">Got a similar challenge?</p>
            <p className="text-sm text-[#666]">Let's talk about your product.</p>
          </div>
          <Link
            to="/"
            onClick={() => setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 150)}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#7B5CF6] hover:bg-[#6B4EF0] text-white font-medium px-6 py-3 rounded-full transition-all duration-200 group"
          >
            Book a Free Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[#555] hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-5">
        <span className="w-0.5 h-5 bg-[#7B5CF6] rounded-full flex-shrink-0" />
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
