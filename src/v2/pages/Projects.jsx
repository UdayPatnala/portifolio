import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Layers, Terminal, Layout } from 'lucide-react';
import { cmsContent } from '../data/content';
import ProjectCard from '../../components/ProjectCard';

const Projects = ({ isDarkMode }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProjects = selectedFilter === 'all'
    ? cmsContent.projects
    : cmsContent.projects.filter(p => p.type === selectedFilter);

  const filterButtons = [
    { label: 'All Systems', value: 'all', icon: <Layers size={14} /> },
    { label: 'Full-Stack & Web', value: 'web', icon: <Layout size={14} /> },
    { label: 'Data Science & ML', value: 'ml', icon: <Terminal size={14} /> }
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-6xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <Briefcase size={12} />
          <span>PRODUCTION MATRIX</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Projects</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Filter Toolbar */}
      <div className="flex justify-center items-center gap-3 flex-wrap mb-12 text-sm font-mono">
        {filterButtons.map(btn => {
          const isActive = selectedFilter === btn.value;
          return (
            <button
              key={btn.value}
              onClick={() => setSelectedFilter(btn.value)}
              className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-2 transition-all duration-300 cursor-none ${
                isActive 
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : isDarkMode
                    ? 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            // Determine if this project is not in the top 3 featured to use compact "extra" styling
            const isExtra = index >= 3;
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} isDarkMode={isDarkMode} isExtra={isExtra} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Projects;
