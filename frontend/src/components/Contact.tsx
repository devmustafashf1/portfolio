import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    github: "",
    linkedin: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://portfolio.mustafashf.dev/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="mb-16 md:mb-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-4">
        Get In Touch
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-12 leading-snug">
        Let's talk about your product
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left — form */}
        <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6 md:p-8">
          <p className="text-sm text-[#666] mb-7 leading-relaxed">
            Tell me what's broken or blocked. Share where you're stuck, what
            you're building, and what matters most — usually within 24 hours.
          </p>

          {sent ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-[#7B5CF6]/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#7B5CF6]" />
              </div>
              <p className="font-semibold text-white">Message sent!</p>
              <p className="text-sm text-[#666]">I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handle}
                    required
                    placeholder="Your name"
                    className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handle}
                    required
                    placeholder="you@company.com"
                    className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">GitHub</label>
                  <input
                    name="github"
                    value={form.github}
                    onChange={handle}
                    placeholder="github.com/you"
                    className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">LinkedIn</label>
                  <input
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handle}
                    placeholder="linkedin.com/in/you"
                    className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handle}
                  required
                  className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7B5CF6]/50 transition-colors appearance-none"
                >
                  <option value="" className="bg-[#141414]">— Select an option —</option>
                  <option value="fix" className="bg-[#141414]">Fix a broken product</option>
                  <option value="build" className="bg-[#141414]">Build something new</option>
                  <option value="retainer" className="bg-[#141414]">Ongoing retainer</option>
                  <option value="other" className="bg-[#141414]">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  required
                  rows={4}
                  placeholder="Describe what you're building or what's stuck..."
                  className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 bg-[#7B5CF6] hover:bg-[#6B4EF0] disabled:opacity-60 text-white font-medium py-3.5 rounded-xl transition-all duration-200 group"
              >
                {sending ? "Sending..." : "Send Message"}
                {!sending && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
              </button>
            </form>
          )}
        </div>

        {/* Right — quick links */}
        <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <p className="text-sm text-[#666] mb-7 leading-relaxed">
              Or send a message directly via any of these channels. I check them regularly
              and respond to every serious inquiry.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:devmustafashf@gmail.com"
                className="flex items-center gap-4 bg-[#141414] border border-white/[0.06] hover:border-[#7B5CF6]/30 rounded-xl px-5 py-4 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#7B5CF6]/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#7B5CF6]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Email</p>
                  <p className="text-xs text-[#555]">devmustafashf@gmail.com</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#444] group-hover:text-[#7B5CF6] group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="https://github.com/devmustafashf1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#141414] border border-white/[0.06] hover:border-[#7B5CF6]/30 rounded-xl px-5 py-4 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <Github className="w-4 h-4 text-[#888]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">GitHub</p>
                  <p className="text-xs text-[#555]">devmustafashf1</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#444] group-hover:text-[#7B5CF6] group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#141414] border border-white/[0.06] hover:border-[#7B5CF6]/30 rounded-xl px-5 py-4 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-[#888]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">LinkedIn</p>
                  <p className="text-xs text-[#555]">Connect professionally</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#444] group-hover:text-[#7B5CF6] group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <p className="text-xs text-[#444] leading-relaxed">
              Typically respond within 24 hours on weekdays. For urgent requests, email is fastest.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
