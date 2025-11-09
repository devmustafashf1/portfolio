import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Sparkles,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6 md:py-12">
        {/* NAVBAR */}
        <nav className="flex justify-between items-center mb-16 md:mb-20 relative">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              GM
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              About
            </a>
            <a href="#work" className="hover:text-cyan-400 transition-colors">
              Work
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute top-14 right-0 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg flex flex-col items-center gap-4 p-6 md:hidden w-48 z-50">
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-400 transition-colors"
              >
                About
              </a>
              <a
                href="#work"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-400 transition-colors"
              >
                Work
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-400 transition-colors"
              >
                Contact
              </a>
            </div>
          )}
        </nav>

        {/* HERO SECTION */}
        <section className="mb-20 mt-12 md:mt-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left side */}
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <TypeAnimation
                  sequence={[
                    "DEVELOPER & CREATOR",
                    2000,
                    "CONTENT CREATOR",
                    2000,
                    "PRODUCT DESIGNER",
                    2000,
                    "PART TIME TEACHER",
                    2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  cursorStyle="▋"
                  style={{
                    color: "#22d3ee",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    display: "inline-block",
                  }}
                />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
                Mustafa Shf
              </h1>

              <p className="text-base sm:text-lg md:text-2xl text-slate-400 mb-6 leading-relaxed max-w-md md:max-w-none">
                Crafting digital experiences that push boundaries and{" "}
                <span className="text-white font-medium">make an impact</span>
              </p>

              <div className="flex justify-center md:justify-start gap-4 mt-6 flex-wrap">
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
              </div>
            </div>

            {/* Right side (Image section, hidden on mobile) */}
            <div className="hidden md:flex justify-center md:justify-end">
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

              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-1 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-full flex items-center justify-center overflow-hidden profile-circle">
                  <img
                    src="/gm.jpg"
                    alt="Mustafa Shf"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30"></div>
                <div className="absolute -inset-2 rounded-full border border-blue-500/20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="mb-20 md:mb-32">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 flex items-center gap-3">
            <span className="text-slate-600 text-2xl">//</span>
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5 text-slate-300 text-base md:text-lg leading-relaxed">
              <p>
                I'm a developer who loves turning ideas into reality through
                clean code and thoughtful design. Currently building digital
                products that people actually enjoy using.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new tech,
                contributing to open source, or probably debugging something at
                3 AM with a coffee in hand.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                "React",
                "TypeScript",
                "Node.js",
                "Tailwind CSS",
                "Next.js",
                "PostgreSQL",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-slate-800/50 border border-slate-700 rounded-2xl p-3 md:p-4 hover:border-cyan-400/50 hover:bg-slate-800 transition-all"
                >
                  <span className="text-slate-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK SECTION */}
        <section id="work" className="mb-20 md:mb-32">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 flex items-center gap-3">
            <span className="text-slate-600 text-2xl">//</span>
            Featured Work
          </h2>
          <div className="space-y-5 md:space-y-6">
            {[
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
            ].map((project, idx) => (
              <div
                key={idx}
                className="bg-slate-800/30 border border-slate-700 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-cyan-400/50 hover:bg-slate-800/50 transition-all group cursor-pointer"
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
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-16 md:mb-20">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              Let's Build Something
            </h2>
            <p className="text-base md:text-xl text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto">
              Got a project in mind? Let's collaborate and create something
              amazing together.
            </p>
            <div className="flex justify-center gap-4 md:gap-6">
              <a
                href="https://github.com"
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
                href="mailto:contact@mustafashf.com"
                className="bg-slate-800 p-3 md:p-4 rounded-full hover:bg-cyan-500 hover:scale-110 transition-all"
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-slate-500 py-6 md:py-8 border-t border-slate-800 text-sm md:text-base">
          <p>© 2025 Mustafa Shf. Built with care and lots of coffee.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
