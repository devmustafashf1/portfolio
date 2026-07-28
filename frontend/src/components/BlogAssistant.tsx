import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import DOMPurify from "dompurify";
import { explainPost } from "../lib/ai";

interface Props {
  blogId: string;
}

export default function BlogAssistant({ blogId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleExplain = async () => {
    setError("");
    setLoading(true);
    try {
      const { explanation } = await explainPost(blogId);
      setExplanation(explanation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating robot button — pinned to the bottom of the screen, stays put while scrolling */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Get help understanding this post"
        className="fixed z-40 right-4 bottom-4 sm:right-8 sm:bottom-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative block w-24 h-24 sm:w-28 sm:h-28">
          <span className="absolute -inset-4 rounded-full bg-[#7B5CF6]/40 blur-2xl" />
          <span className="absolute inset-0 rounded-full bg-[#7B5CF6]/20 blur-lg animate-pulse" />
          <img
            src="/robot.png"
            alt=""
            className="relative w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(123,92,246,0.5)]"
          />
        </span>
      </motion.button>

      {/* Backdrop blur — phone only; disappears automatically whenever the popup closes */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="sm:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
            className="fixed z-50 left-4 right-4 bottom-32 sm:left-auto sm:right-8 sm:bottom-[9.5rem] sm:w-full sm:max-w-sm bg-[#0f0f0f] border border-[#7B5CF6]/20 rounded-2xl shadow-2xl shadow-[#7B5CF6]/10 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <img src="/robot.png" alt="" className="w-6 h-6 object-contain" />
                <span className="text-sm font-medium text-white">Need help understanding this?</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[#555] hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {!explanation && !loading && (
                <div className="text-center py-4">
                  <p className="text-sm text-[#888] mb-4">
                    I can read through this post and explain it to you in a simple, friendly way.
                  </p>
                  <button
                    type="button"
                    onClick={handleExplain}
                    className="inline-flex items-center gap-1.5 bg-[#7B5CF6] hover:bg-[#6B4EF0] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Explain this post
                  </button>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center gap-3 py-6">
                  <motion.img
                    src="/robot.png"
                    alt=""
                    className="w-10 h-10 object-contain"
                    animate={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <p className="text-xs text-[#666]">Reading through it...</p>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              {explanation && (
                <div
                  className="text-sm text-[#aaa] leading-relaxed [&_h4]:text-white [&_h4]:font-semibold [&_h4]:text-sm [&_h4]:mt-4 [&_h4]:mb-1.5 first:[&_h4]:mt-0 [&_p]:mb-3 [&_ul]:space-y-1.5 [&_ul]:mb-3 [&_ul]:pl-4 [&_ul]:list-disc [&_strong]:text-white [&_strong]:font-medium"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(explanation, {
                      ALLOWED_TAGS: ["h4", "p", "ul", "li", "strong", "em"],
                    }),
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
