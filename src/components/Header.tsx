import { useState } from "react";
import { Code2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav 
      className="flex justify-between items-center mb-16 md:mb-20 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
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
    </motion.nav>
  );
}