import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer 
      className="text-center text-slate-500 py-6 md:py-8 border-t border-slate-800 text-sm md:text-base"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p>© 2025 Mustafa Shf. Built with care and lots of coffee.</p>
    </motion.footer>
  );
}