import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Briefcase, Trophy, Users, MapPin } from "lucide-react";

export default function Experience() {
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasEntered) {
          setHasEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasEntered]);

  const experiences = [
    {
      type: "work",
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      period: "2023 - Present",
      description: "Leading development of scalable web applications using React, Node.js, and cloud technologies."
    },
    {
      type: "work", 
      title: "Frontend Developer",
      company: "Digital Agency",
      location: "New York, NY",
      period: "2022 - 2023",
      description: "Built responsive web applications and improved user experience for client projects."
    }
  ];

  const competitions = [
    {
      title: "Hackathon Winner",
      event: "TechCrunch Disrupt 2023",
      achievement: "1st Place",
      description: "Built an AI-powered productivity app in 48 hours"
    },
    {
      title: "Coding Competition",
      event: "Google Code Jam",
      achievement: "Top 100",
      description: "Solved complex algorithmic problems under time pressure"
    }
  ];

  const volunteer = [
    {
      role: "Tech Mentor",
      organization: "Code for Good",
      period: "2022 - Present",
      description: "Mentoring underprivileged students in programming and web development"
    },
    {
      role: "Event Organizer",
      organization: "Local Dev Community",
      period: "2021 - Present", 
      description: "Organizing monthly meetups and workshops for local developers"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 }
    })
  };

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      className="mb-24 md:mb-40 max-w-6xl mx-auto px-4"
      initial={hasEntered ? false : "hidden"}
      animate={hasEntered ? false : "show"}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
      }}
    >
      <div className="flex items-center gap-4 mb-12 md:mb-16">
        <span className="text-slate-600 text-3xl">//</span>
        <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
      </div>

      {/* Work Experience */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="w-6 h-6 text-cyan-400" />
          <h3 className="text-2xl font-semibold">Work Experience</h3>
        </div>
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial={hasEntered ? false : "hidden"}
              animate={hasEntered ? undefined : "show"}
              className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 backdrop-blur-xl"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div>
                  <h4 className="text-xl font-semibold text-white">{exp.title}</h4>
                  <p className="text-cyan-400 font-medium">{exp.company}</p>
                </div>
                <div className="text-slate-400 text-sm mt-2 md:mt-0">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </div>
                  <div>{exp.period}</div>
                </div>
              </div>
              <p className="text-slate-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Competitions */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <Trophy className="w-6 h-6 text-cyan-400" />
          <h3 className="text-2xl font-semibold">Competitions Won</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {competitions.map((comp, idx) => (
            <motion.div
              key={idx}
              custom={idx + experiences.length}
              variants={cardVariants}
              initial={hasEntered ? false : "hidden"}
              animate={hasEntered ? undefined : "show"}
              className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-semibold text-white">{comp.title}</h4>
                <span className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                  {comp.achievement}
                </span>
              </div>
              <p className="text-cyan-400 font-medium mb-2">{comp.event}</p>
              <p className="text-slate-300 text-sm">{comp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Volunteer Work */}
      <div>
        <div className="flex items-center gap-2 mb-8">
          <Users className="w-6 h-6 text-cyan-400" />
          <h3 className="text-2xl font-semibold">Volunteer Work</h3>
        </div>
        <div className="space-y-6">
          {volunteer.map((vol, idx) => (
            <motion.div
              key={idx}
              custom={idx + experiences.length + competitions.length}
              variants={cardVariants}
              initial={hasEntered ? false : "hidden"}
              animate={hasEntered ? undefined : "show"}
              className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 backdrop-blur-xl"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div>
                  <h4 className="text-xl font-semibold text-white">{vol.role}</h4>
                  <p className="text-cyan-400 font-medium">{vol.organization}</p>
                </div>
                <div className="text-slate-400 text-sm mt-2 md:mt-0">
                  {vol.period}
                </div>
              </div>
              <p className="text-slate-300">{vol.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}