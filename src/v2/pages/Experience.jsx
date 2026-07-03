import { motion } from 'framer-motion';
import { Briefcase, Cpu, Code, Calendar } from 'lucide-react';
import { cmsContent } from '../data/content';

const Experience = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-4xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <Briefcase size={12} />
          <span>CAREER TIMELINE</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Experience</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Timeline track */}
      <div className="relative border-l border-emerald-500/25 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12 py-4">
        {cmsContent.experience.map((exp, index) => {
          const isML = exp.role.includes("Machine Learning");
          return (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Glowing node connector dot */}
              <span className="absolute -left-[45px] sm:-left-[61px] top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-10 text-emerald-400">
                {isML ? <Cpu size={14} /> : <Code size={14} />}
              </span>

              {/* Glassmorphic timeline card */}
              <div className="glass-panel border rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(16,185,129,0.03)] hover:border-emerald-500/30">
                {/* Visual scanline grid detail */}
                <div className="absolute inset-0 bg-scanlines opacity-[0.015] pointer-events-none" />

                {/* Card Header details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className={`text-lg font-bold font-mono tracking-wide ${
                      isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      {exp.role}
                    </h3>
                    <p className="text-sm text-emerald-500 font-mono font-semibold">{exp.provider}</p>
                  </div>

                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0 self-start sm:self-center border ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/5 text-gray-400' 
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}>
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {exp.description}
                </p>

                {/* Highlights checklist */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start text-xs font-mono">
                        <span className="text-emerald-500 mr-2.5 mt-0.5">•</span>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
