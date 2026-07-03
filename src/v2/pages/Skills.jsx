import { motion } from 'framer-motion';
import { Terminal, Code, Database, Award, Cpu, Sparkles } from 'lucide-react';
import { cmsContent } from '../data/content';
import { getProjectCountForSkill } from '../utils/projectCount';

// Helper to resolve string icons from CMS
const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'Terminal': return <Terminal size={24} className="text-emerald-500" />;
    case 'Code': return <Code size={24} className="text-cyan-500" />;
    case 'Database': return <Database size={24} className="text-amber-500" />;
    case 'Award': return <Award size={24} className="text-emerald-500" />;
    default: return <Cpu size={24} className="text-emerald-500" />;
  }
};

const Skills = ({ isDarkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-6xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <Terminal size={12} />
          <span>TECHNICAL ARSENAL</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Inventory</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Grid containing categories */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-8"
      >
        {cmsContent.skills.map((category) => (
          <motion.div
            key={category.category}
            variants={itemVariants}
            className="glass-panel border rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(16,185,129,0.03)]"
          >
            {/* Ambient category glow corner */}
            <div 
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 filter blur-2xl transition-all duration-500 group-hover:scale-125"
              style={{ backgroundColor: category.color || 'rgba(16, 185, 129, 0.4)' }}
            />

            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl border ${
                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
              }`}>
                {getCategoryIcon(category.icon)}
              </div>
              <div>
                <h3 className={`text-lg font-bold font-mono tracking-wider ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {category.category}
                </h3>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Verified Arsenal Component</span>
              </div>
            </div>

            {/* List of items */}
            <div className="space-y-4">
              {category.items.map((skill) => {
                const count = getProjectCountForSkill(skill.name);
                return (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-mono">
                      <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>
                        {skill.name}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {/* Level badge */}
                        <span className="text-[10px] text-gray-500 uppercase">
                          {skill.level}
                        </span>

                        {/* Recruiter Evidence project count badge */}
                        {count > 0 ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 flex items-center gap-1 select-none">
                            <Sparkles size={8} className="animate-pulse" />
                            {count} {count === 1 ? 'system' : 'systems'}
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-500/5 text-gray-500 border border-gray-500/10 select-none">
                            Core knowledge
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress indicator bar */}
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-white/5' : 'bg-slate-200'
                    }`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ 
                          width: skill.level === 'Expert' ? '95%' : 
                                 skill.level === 'Advanced' ? '80%' : '60%' 
                        }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
