import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-white/[0.06] py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#444]">
          © {new Date().getFullYear()} Mustafa Shafique. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/blog" className="text-sm text-[#444] hover:text-white transition-colors">
            Blog
          </Link>
          <a href="https://github.com/devmustafashf1" target="_blank" rel="noopener noreferrer" className="text-sm text-[#444] hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#444] hover:text-white transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
