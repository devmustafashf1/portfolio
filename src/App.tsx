import { Github, Linkedin, Mail, Code2, Sparkles, ArrowRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              MS
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#work" className="hover:text-cyan-400 transition-colors">Work</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </nav>

        <section className="mb-32 mt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 text-sm tracking-wider">DEVELOPER & CREATOR</span>
              </div>
              <h1 className="text-7xl md:text-7xl font-bold mb-6 leading-tight">
                Mustafa Shf
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-8 leading-relaxed">
                Crafting digital experiences that push boundaries and{' '}
                <span className="text-white font-medium">make an impact</span>
              </p>
              <div className="flex gap-4 mt-12">
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 group"
                >
                  Let's Talk
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#work"
                  className="border border-slate-700 px-8 py-4 rounded-full font-medium hover:border-cyan-400 hover:text-cyan-400 transition-all"
                >
                  View Work
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
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
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-1 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-full flex items-center justify-center overflow-hidden profile-circle">
                  <img
                    src="/gm.jpg"
                    alt="Mustafa Shf"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 opacity-100"></div>
                <div className="absolute -inset-2 rounded-full border border-blue-500/20"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mb-32">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <span className="text-slate-600 text-2xl">//</span>
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                I'm a developer who loves turning ideas into reality through clean code and
                thoughtful design. Currently building digital products that people actually enjoy using.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new tech, contributing to open source,
                or probably debugging something at 3 AM with a coffee in hand.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js', 'PostgreSQL'].map((skill) => (
                <div
                  key={skill}
                  className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 hover:border-cyan-400/50 hover:bg-slate-800 transition-all"
                >
                  <span className="text-slate-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="mb-32">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <span className="text-slate-600 text-2xl">//</span>
            Featured Work
          </h2>
          <div className="space-y-6">
            {[
              {
                title: 'E-Commerce Platform',
                desc: 'Full-stack application with real-time inventory management',
                tags: ['React', 'Node.js', 'MongoDB'],
              },
              {
                title: 'Task Management App',
                desc: 'Collaborative tool for team productivity',
                tags: ['Next.js', 'TypeScript', 'Supabase'],
              },
              {
                title: 'Portfolio Dashboard',
                desc: 'Analytics platform for creative professionals',
                tags: ['React', 'D3.js', 'Express'],
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className="bg-slate-800/30 border border-slate-700 rounded-3xl p-8 hover:border-cyan-400/50 hover:bg-slate-800/50 transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400">{project.desc}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
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

        <section id="contact" className="mb-20">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-12 text-center">
            <h2 className="text-5xl font-bold mb-6">Let's Build Something</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Got a project in mind? Let's collaborate and create something amazing together.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-4 rounded-full hover:bg-cyan-500 hover:scale-110 transition-all"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-4 rounded-full hover:bg-cyan-500 hover:scale-110 transition-all"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:contact@mustafashf.com"
                className="bg-slate-800 p-4 rounded-full hover:bg-cyan-500 hover:scale-110 transition-all"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        <footer className="text-center text-slate-500 py-8 border-t border-slate-800">
          <p>© 2025 Mustafa Shf. Built with care and lots of coffee.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
