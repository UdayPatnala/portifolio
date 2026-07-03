import { motion } from 'framer-motion';
import { BookOpen, Calendar, Award } from 'lucide-react';
import { cmsContent } from '../data/content';

const Education = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-4xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <BookOpen size={12} />
          <span>ACADEMIC FOUNDATION</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">History</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Timeline track */}
      <div className="relative border-l border-emerald-500/25 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12 py-4">
        {cmsContent.education.map((edu, index) => {
          // Resolve border classes dynamically
          const borderClass = edu.color === 'border-emerald-500' ? 'hover:border-emerald-500/40' : 
                              edu.color === 'border-cyan-500' ? 'hover:border-cyan-500/40' : 'hover:border-amber-500/40';
          const nodeColorClass = edu.color === 'border-emerald-500' ? 'text-emerald-400 border-emerald-500/40' :
                                 edu.color === 'border-cyan-500' ? 'text-cyan-400 border-cyan-500/40' : 'text-amber-400 border-amber-500/40';

          return (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Connector Dot */}
              <span className={`absolute -left-[45px] sm:-left-[61px] top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 border shadow-lg z-10 ${nodeColorClass}`}>
                <Award size={14} />
              </span>

              {/* Layout Card */}
              <div className={`glass-panel border rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(16,185,129,0.02)] ${borderClass}`}>
                <div className="absolute inset-0 bg-scanlines opacity-[0.015] pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className={`text-lg font-bold font-mono tracking-wide ${
                      isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-emerald-500 font-mono font-semibold">{edu.institution}</p>
                  </div>

                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0 self-start sm:self-center border ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/5 text-gray-400' 
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}>
                    <Calendar size={12} />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-emerald-500/10">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">RECORD_GRADE:</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">{edu.grade}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
