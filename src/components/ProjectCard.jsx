import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
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

const ProjectCard = ({ project, isDarkMode, isExtra = false }) => {
  const { title, description, tags, category, highlights, github, live, type, image } = project;
  
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for high-fidelity interactive tilt
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 220, damping: 22 });

  // Pixel coordinates tracking inside the card for background spotlight glow
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    
    x.set(mouseX);
    y.set(mouseY);
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 35, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, z: 15 }}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: 'preserve-3d', 
        perspective: 1000 
      }}
      className={`group flex flex-col justify-between p-6 rounded-2xl glass-panel border transition-all duration-300 relative overflow-hidden ${
        isDarkMode ? 'border-white/5' : 'border-emerald-500/10'
      } ${getHoverBorderColor()}`}
    >
      {/* Dynamic Cursor Spotlight Glow background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl z-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(280px circle at ${gx}px ${gy}px, ${
              type === 'ml' 
                ? 'rgba(16,185,129,0.06)' 
                : 'rgba(6,182,212,0.06)'
            }, transparent 80%)`
          )
        }}
      />

      <div className="z-10" style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}>
        {/* Image slot — only for featured (non-extra) cards */}
        {!isExtra && image && !imgError && (
          <div 
            style={{ transform: 'translateZ(30px)' }}
            className="relative w-full h-44 mb-4 overflow-hidden rounded-xl border border-black/10 dark:border-white/5 bg-slate-950/20 shadow-md"
          >
            <img 
              src={image} 
              alt={`${title} Interface`}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Placeholder when image is unavailable (non-extra, errored) */}
        {!isExtra && (!image || imgError) && (
          <div
            style={{ transform: 'translateZ(30px)' }}
            className={`relative w-full h-44 mb-4 overflow-hidden rounded-xl border flex items-center justify-center ${
              isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-emerald-500/10 bg-slate-100'
            }`}
          >
            <div className="text-center space-y-2 pointer-events-none">
              <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center ${
                type === 'ml' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-cyan-500/10 text-cyan-500'
              }`}>
                {getCategoryIcon()}
              </div>
              <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">// {type === 'ml' ? 'ML Model' : 'Web App'}</p>
            </div>
            <div className={`absolute inset-0 bg-gradient-to-br opacity-30 ${
              type === 'ml' ? 'from-emerald-900/20 to-transparent' : 'from-cyan-900/20 to-transparent'
            } pointer-events-none`} />
          </div>
        )}

        {/* Extra (show-more) cards: prominent GitHub link banner instead of image */}
        {isExtra && github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            style={{ transform: 'translateZ(30px)' }}
            className={`group/repo relative w-full h-14 mb-4 flex items-center gap-3 px-4 rounded-xl border transition-all duration-300 overflow-hidden ${
              isDarkMode
                ? 'bg-white/[0.03] border-white/8 hover:border-emerald-500/40 hover:bg-emerald-500/5'
                : 'bg-slate-100 border-slate-200 hover:border-emerald-500/40 hover:bg-emerald-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 shrink-0 transition-colors ${
              isDarkMode ? 'text-gray-400 group-hover/repo:text-emerald-400' : 'text-slate-500 group-hover/repo:text-emerald-600'
            }`}>
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <div className="flex flex-col min-w-0">
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${
                isDarkMode ? 'text-gray-500' : 'text-slate-400'
              }`}>// REPOSITORY</span>
              <span className={`text-xs font-mono truncate transition-colors ${
                isDarkMode ? 'text-gray-300 group-hover/repo:text-emerald-400' : 'text-slate-700 group-hover/repo:text-emerald-600'
              }`}>{github.replace('https://github.com/', '')}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-3.5 h-3.5 ml-auto shrink-0 opacity-0 group-hover/repo:opacity-100 transition-all duration-200 group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5 ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              <path d="M7 7h10v10" /><path d="M7 17 17 7" />
            </svg>
          </a>
        )}

        {/* Top Header */}
        <div style={{ transform: 'translateZ(20px)' }} className="flex justify-between items-center mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono border rounded-full ${getBadgeColor()}`}>
            {getCategoryIcon()}
            {category}
          </span>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            {type === 'ml' ? 'DATA SCIENCE' : 'FULL STACK'}
          </span>
        </div>

        {/* Title */}
        <h3 
          style={{ transform: 'translateZ(25px)' }}
          className={`text-xl font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          style={{ transform: 'translateZ(18px)' }}
          className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-slate-650'
          }`}
        >
          {description}
        </p>

        {/* Technical Highlights */}
        {highlights && highlights.length > 0 && (
          <ul style={{ transform: 'translateZ(12px)' }} className="space-y-1.5 mb-6">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start text-xs text-gray-450">
                <span className="text-emerald-500 mr-2 mt-0.5">•</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="z-10" style={{ transform: 'translateZ(10px)' }}>
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ 
                scale: 1.05, 
                y: -1, 
                borderColor: type === 'ml' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(6, 182, 212, 0.4)',
                backgroundColor: type === 'ml' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(6, 182, 212, 0.08)'
              }}
              className={`text-[10px] font-mono px-2 py-0.5 border rounded transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-[#08121e] border-white/5 text-gray-300' 
                  : 'bg-emerald-500/5 border-emerald-500/10 text-slate-700'
              }`}
            >
              {tag}
            </motion.span>
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
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors group/btn"
            >
              Explore Vercel
              <ExternalLink size={12} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
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
