import { motion } from 'framer-motion';
import { Trophy, Star, Sparkles } from 'lucide-react';
import { cmsContent } from '../data/content';

const Achievements = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-5xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <Trophy size={12} />
          <span>ACADEMIC HONORS</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Achievements</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Grid of Achievements */}
      <div className="grid md:grid-cols-3 gap-6">
        {cmsContent.achievements.map((ach, index) => {
          return (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel border rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 flex flex-col justify-between hover:border-emerald-500/30 hover:shadow-[0_15px_30px_rgba(16,185,129,0.03)]"
            >
              <div className="space-y-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDarkMode ? 'bg-white/5 border-white/5 text-emerald-450' : 'bg-slate-100 border-slate-200 text-emerald-600'
                }`}>
                  {index === 0 ? <Trophy size={20} className="text-amber-500" /> : 
                   index === 1 ? <Sparkles size={20} className="text-emerald-400" /> : <Star size={20} className="text-cyan-400" />}
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">HONOR_RECORD</span>
                  <h3 className={`text-base font-bold font-mono leading-snug ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {ach.title}
                  </h3>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-655'
                  }`}>
                    {ach.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-emerald-500/5 mt-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase">ACQUIRED_DATE</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{ach.date}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
