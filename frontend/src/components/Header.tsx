import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const smoothScroll = (targetId: string) => {
    setMenuOpen(false);
    if (isHomePage) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/', { state: { scrollTo: targetId } });
    }
  };

  const navLinks = [
    { label: 'Offers', id: 'services' },
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      className="flex justify-between items-center mb-16 md:mb-20 relative"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link to="/" className="text-lg font-semibold tracking-tight text-white hover:text-white/80 transition-colors">
        Mustafa
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => smoothScroll(link.id)}
            className="text-sm text-[#888] hover:text-white transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={() => smoothScroll('contact')}
          className="flex items-center gap-2 bg-[#7B5CF6] hover:bg-[#6B4EF0] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200"
        >
          Book a Free Call
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile burger */}
      <button
        className="md:hidden text-[#888] hover:text-white transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-0 bg-[#141414] border border-white/[0.07] rounded-2xl shadow-2xl flex flex-col gap-1 p-3 md:hidden w-52 z-50"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => smoothScroll(link.id)}
                className="text-left text-sm text-[#888] hover:text-white hover:bg-white/[0.05] transition-colors px-4 py-2.5 rounded-xl"
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-white/[0.07] mt-1 pt-2">
              <button
                onClick={() => smoothScroll('contact')}
                className="w-full flex items-center justify-center gap-2 bg-[#7B5CF6] hover:bg-[#6B4EF0] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
              >
                Book a Free Call
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
