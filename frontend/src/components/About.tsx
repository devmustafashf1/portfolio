import { motion } from "framer-motion";
import { FileText, Github, Linkedin, ExternalLink } from "lucide-react";
import heroImg from "../../public/gm-formal.png";

const skills = [
  "React Native", "Next.js", "React", "Node.js",
  "PostgreSQL", "Express.js", "MongoDB", "TypeScript",
];

const stats = [
  { top: "Geeks for Growth", bottom: "Senior Engineer" },
  { top: "4+ Years", bottom: "Production delivery" },
  { top: "Dubai · US · Nigeria", bottom: "International clients" },
];

const links = [
  { label: "Resume", icon: FileText, url: "#", external: true },
  { label: "GitHub", icon: Github, url: "https://github.com/devmustafashf1", external: true },
  { label: "LinkedIn", icon: Linkedin, url: "https://linkedin.com", external: true },
];

export default function About() {
  return (
    <motion.section
      id="about"
      className="mb-24 md:mb-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* Left — photo with bottom stat badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Photo card */}
          <div
            className="w-full rounded-2xl overflow-hidden bg-[#0f0f0f] border border-white/[0.06]"
            style={{ aspectRatio: "3/4", maxHeight: "560px" }}
          >
            <img
              src={heroImg}
              alt="Mustafa"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Stat badges — overlapping bottom edge */}
          <div className="flex gap-2 mt-3 md:mt-0 md:absolute md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:w-[calc(100%-2rem)]">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex-1 bg-[#0f0f0f]/90 backdrop-blur-sm border border-white/[0.08] rounded-xl px-3 py-2.5 text-center"
              >
                <p className="text-white text-xs font-semibold leading-tight mb-0.5">{s.top}</p>
                <p className="text-[#555] text-[10px] leading-tight">{s.bottom}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — text content */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-[#7B5CF6] uppercase mb-4">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
            I'm not just a developer. I'm a technical partner.
          </h2>

          <p className="text-[#aaa] text-base leading-relaxed mb-4">
            I work with founders and lean teams as a product engineer and technical
            partner. My focus is real execution — not just writing code, but owning delivery
            decisions, scoping features correctly, and making sure the right things get
            shipped.
          </p>
          <p className="text-[#aaa] text-base leading-relaxed mb-8">
            Previously worked with international teams including{" "}
            <strong className="text-white">Geeks for Growth</strong>.
            Currently working with clients across logistics, fintech, recovery platforms, and
            digital commerce.
          </p>

          {/* Stack */}
          <div className="mb-8">
            <p className="text-xs text-[#555] uppercase tracking-widest mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs text-[#888] bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Link buttons */}
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-sm text-white bg-transparent border border-white/[0.12] hover:border-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
                {link.label === "Resume" && <ExternalLink className="w-3 h-3 text-[#666]" />}
              </a>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}
