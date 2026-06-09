import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Cpu, Database, Layout } from 'lucide-react';

const Github = ({ size = 18, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    width={size}
    height={size}
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectCard = ({ project, isDarkMode }) => {
  const { title, description, tags, category, highlights, github, live, type, image } = project;

  // Icon mapping depending on type
  const getCategoryIcon = () => {
    switch (type) {
      case 'ml':
        return <Cpu className="text-emerald-500" size={18} />;
      case 'web':
        return <Layout className="text-cyan-500" size={18} />;
      default:
        return <Database className="text-amber-500" size={18} />;
    }
  };

  // Border hover neon classes
  const getHoverBorderColor = () => {
    switch (type) {
      case 'ml':
        return isDarkMode 
          ? 'hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]'
          : 'hover:border-emerald-500/70 hover:shadow-[0_0_25px_rgba(16,185,129,0.12)]';
      case 'web':
        return isDarkMode
          ? 'hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,245,212,0.15)]'
          : 'hover:border-cyan-500/70 hover:shadow-[0_0_25px_rgba(0,245,212,0.12)]';
      default:
        return isDarkMode
          ? 'hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]'
          : 'hover:border-amber-500/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.12)]';
    }
  };

  const getBadgeColor = () => {
    switch (type) {
      case 'ml':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'web':
        return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400';
      default:
        return 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-450';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -10, 
        rotateX: 3, 
        rotateY: -3, 
        z: 15 
      }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`group flex flex-col justify-between p-6 rounded-2xl glass-panel border transition-all duration-300 ${
        isDarkMode ? 'border-white/5' : 'border-emerald-500/10'
      } ${getHoverBorderColor()}`}
    >
      <div style={{ transform: 'translateZ(10px)' }}>
        {/* Project Screenshot */}
        {image && (
          <div className="relative w-full h-44 mb-4 overflow-hidden rounded-xl border border-black/10 dark:border-white/5 bg-slate-950/20">
            <img 
              src={image} 
              alt={`${title} Interface`}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Top Header */}
        <div className="flex justify-between items-center mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono border rounded-full ${getBadgeColor()}`}>
            {getCategoryIcon()}
            {category}
          </span>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            {type === 'ml' ? 'DATA SCIENCE' : type === 'web' ? 'FULL STACK' : 'SYSTEMS'}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {title}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-slate-600'
        }`}>
          {description}
        </p>

        {/* Technical Highlights */}
        {highlights && highlights.length > 0 && (
          <ul className="space-y-1.5 mb-6">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start text-xs text-gray-450">
                <span className="text-emerald-500 mr-2 mt-0.5">•</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ transform: 'translateZ(5px)' }}>
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-mono px-2 py-0.5 border rounded transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-[#08121e] border-white/5 text-gray-300' 
                  : 'bg-emerald-500/5 border-emerald-500/10 text-slate-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className={`flex justify-between items-center pt-3 border-t transition-colors duration-300 ${
          isDarkMode ? 'border-white/5' : 'border-emerald-500/10'
        }`}>
          {github && github !== '#' ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Github size={14} />
              Repository
            </a>
          ) : (
            <span className={`text-[10px] font-mono ${isDarkMode ? 'text-gray-650' : 'text-slate-400'}`}>Local Workspace</span>
          )}

          {live && live !== '#' ? (
            <a
              href={live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Explore Vercel
              <ExternalLink size={12} />
            </a>
          ) : (
            <span className={`text-[10px] font-mono ${isDarkMode ? 'text-gray-650' : 'text-slate-400'}`}>In Development</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
