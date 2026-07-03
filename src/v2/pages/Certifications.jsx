import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { cmsContent } from '../data/content';

const Certifications = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-5xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <ShieldCheck size={12} />
          <span>CREDENTIAL PORTAL</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Certifications</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Grid of Certifications */}
      <div className="grid md:grid-cols-3 gap-6">
        {cmsContent.certifications.map((cert, index) => {
          const isAWS = cert.provider.includes("Amazon") || cert.title.includes("AWS");
          const isNPTEL = cert.provider.includes("NPTEL");
          const accentColor = isAWS ? 'rgba(235, 140, 0, 0.4)' : isNPTEL ? 'rgba(16, 185, 129, 0.4)' : 'rgba(6, 182, 212, 0.4)';
          const hoverBorderClass = isAWS ? 'hover:border-amber-500/40 hover:shadow-[0_15px_30px_rgba(245,158,11,0.03)]' :
                                   isNPTEL ? 'hover:border-emerald-500/40 hover:shadow-[0_15px_30px_rgba(16,185,129,0.03)]' :
                                   'hover:border-cyan-500/40 hover:shadow-[0_15px_30px_rgba(6,182,212,0.03)]';

          return (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-panel border rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[220px] ${hoverBorderClass}`}
            >
              {/* Subtle background glow */}
              <div 
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-10 filter blur-xl transition-all duration-500 group-hover:scale-125"
                style={{ backgroundColor: accentColor }}
              />

              <div className="space-y-4 z-10">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDarkMode ? 'bg-white/5 border-white/5 text-emerald-400' : 'bg-slate-100 border-slate-200 text-emerald-600'
                }`}>
                  <Award size={20} />
                </div>

                <div className="space-y-1">
                  <h3 className={`text-base font-bold font-mono leading-snug ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono font-medium">{cert.provider}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-emerald-500/5 mt-4 z-10">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-500 hover:text-emerald-400 transition-colors cursor-none"
                >
                  <span>Verify Credentials</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Certifications;
