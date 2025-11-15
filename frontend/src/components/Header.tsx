import { useState } from "react";
import { Code2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

interface HeaderProps {
  onLoginClick: () => void;
  onBlogClick: () => void;
}

export default function Header({ onLoginClick, onBlogClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const smoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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

      {/* Desktop Links & Login */}
      <div className="hidden md:flex items-center gap-8">
        <button onClick={() => smoothScroll('about')} className="hover:text-cyan-400 transition-colors">
          About
        </button>
        <button onClick={() => smoothScroll('work')} className="hover:text-cyan-400 transition-colors">
          Work
        </button>
        <button onClick={onBlogClick} className="hover:text-cyan-400 transition-colors">
          Blog
        </button>
        <button onClick={() => smoothScroll('contact')} className="hover:text-cyan-400 transition-colors">
          Contact
        </button>
        <button 
          onClick={onLoginClick}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
        >
          <LogIn className="w-5 h-5 text-white" />
           login
        </button>

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
          <button
            onClick={() => { smoothScroll('about'); setMenuOpen(false); }}
            className="hover:text-cyan-400 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => { smoothScroll('work'); setMenuOpen(false); }}
            className="hover:text-cyan-400 transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => { onBlogClick(); setMenuOpen(false); }}
            className="hover:text-cyan-400 transition-colors"
          >
            Blog
          </button>
          <button
            onClick={() => { smoothScroll('contact'); setMenuOpen(false); }}
            className="hover:text-cyan-400 transition-colors"
          >
            Contact
          </button>
          <button
            onClick={() => { onLoginClick(); setMenuOpen(false); }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all mt-2 flex items-center justify-center gap-2"
          >
           <LogIn className="w-5 h-5 text-white" />
           login
          </button>

        </div>
      )}
    </motion.nav>
  );
}