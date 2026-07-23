import { motion } from 'framer-motion';
import { Compass, Terminal, Code, Award } from 'lucide-react';
import NextPageButton from '../../components/NextPageButton';

const Journey = ({ isDarkMode }) => {
  const steps = [
    {
      year: "2019 - 2020",
      title: "Flawless Beginnings",
      description: "Achieved a perfect 10/10 GPA in Bobbili district school finals, establishing a strong foundation in analytical and logical reasoning.",
      icon: <Award size={16} className="text-amber-500" />
    },
    {
      year: "2020 - 2022",
      title: "Mathematical Foundations",
      description: "Excelled in Narayana Junior College (Score: 910/1000) focusing heavily on mathematics, physics, and computational thinking.",
      icon: <Compass size={16} className="text-cyan-500" />
    },
    {
      year: "2022 - Present",
      title: "Computer Science & Data Science Major",
      description: "Joined Raghu Institute of Technology to study B.Tech in CSE (Data Science). Immersed myself in data structures, algorithms, SQL databases, and machine learning models.",
      icon: <Terminal size={16} className="text-emerald-500" />
    },
    {
      year: "2024",
      title: "Full-Stack System Engineering",
      description: "Advanced into building complete, production-grade applications. Created systems like Music Mirror and Nebula Gallery, integrating React, Node proxies, APIs, and persistent databases.",
      icon: <Code size={16} className="text-purple-400" />
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-4xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <Compass size={12} />
          <span>NARRATIVE PROTOCOL</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          My Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Journey</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Grid structure or timeline for the steps */}
      <div className="space-y-8 relative border-l border-emerald-500/15 pl-6 sm:pl-10 ml-4">
        {steps.map((step, index) => {
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connected chronological node */}
              <span className="absolute -left-[39px] sm:-left-[55px] top-1.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-slate-950 border border-emerald-500/30 text-emerald-400 shadow-md">
                {step.icon}
              </span>

              <div className="glass-panel border rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:border-emerald-500/20 hover:shadow-[0_15px_30px_rgba(16,185,129,0.02)]">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/15 font-bold">
                    {step.year}
                  </span>
                  <h3 className={`text-base font-bold font-mono ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {step.title}
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-655'
                }`}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <NextPageButton to="#/projects" label="Projects" isDarkMode={isDarkMode} />
    </div>
  );
};

export default Journey;
