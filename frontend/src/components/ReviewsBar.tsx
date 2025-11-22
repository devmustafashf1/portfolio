import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewsBar() {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      review: "Exceptional developer with great attention to detail. Delivered our project ahead of schedule.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "CTO",
      company: "StartupXYZ",
      review: "Outstanding technical skills and communication. Would definitely work with again.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Design Lead",
      company: "Creative Agency",
      review: "Perfect collaboration between design and development. Brought our vision to life beautifully.",
      rating: 5
    },
    {
      name: "Alex Rodriguez",
      role: "Founder",
      company: "E-commerce Plus",
      review: "Transformed our online presence completely. Sales increased by 200% after the new website launch.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "Digital Solutions",
      review: "Professional, reliable, and incredibly talented. The best developer we've worked with.",
      rating: 5
    }
  ];

  return (
    <div className="mb-24 md:mb-40 overflow-hidden">
      <div className="flex items-center gap-4 mb-12 md:mb-16 max-w-6xl mx-auto px-4">
        <span className="text-slate-600 font-bold text-3xl">//</span>
        <h2 className="text-3xl md:text-4xl font-bold">Client Reviews</h2>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -100 * reviews.length]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }
          }}
        >
          {[...reviews, ...reviews].map((review, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 bg-slate-800/30 border border-slate-700 rounded-xl p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-300 mb-4 leading-relaxed">
                "{review.review}"
              </p>
              
              <div>
                <p className="font-semibold text-white">{review.name}</p>
                <p className="text-sm text-slate-400">
                  {review.role} at {review.company}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}