import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Sparkles, FileText, Send, ArrowRight } from 'lucide-react';
import { cmsContent } from '../data/content';
import NextPageButton from '../../components/NextPageButton';

const Landing = ({ isDarkMode }) => {
  const heroX = useMotionValue(0.5);
  const heroY = useMotionValue(0.5);
  
  const heroRotateX = useSpring(useTransform(heroY, [0, 1], [10, -10]), { stiffness: 120, damping: 20 });
  const heroRotateY = useSpring(useTransform(heroX, [0, 1], [-10, 10]), { stiffness: 120, damping: 20 });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width;
    const yVal = (e.clientY - rect.top) / rect.height;
    heroX.set(xVal);
    heroY.set(yVal);
  };

  const handleHeroMouseLeave = () => {
    heroX.set(0.5);
    heroY.set(0.5);
  };

  return (
    <div 
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-12 px-6 overflow-hidden max-w-7xl mx-auto"
      style={{ perspective: 1200 }}
    >
      {/* Volumetric background watermark */}
      <img
        aria-hidden="true"
        src={cmsContent.profile.profilePhoto}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
        style={{
          zIndex: -1,
          opacity: isDarkMode ? 0.05 : 0.03,
          filter: 'blur(60px) saturate(0.5) brightness(0.8)',
        }}
      />

      <div className="grid lg:grid-cols-12 gap-12 items-center w-full z-10">
        
        {/* Left Column: Greeting & Info */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono"
          >
            <Sparkles size={12} className="animate-spin" />
            <span>{cmsContent.profile.subtitle}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none font-sans transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {cmsContent.profile.firstName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">{cmsContent.profile.lastName}</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl sm:text-2xl font-mono h-12 flex items-center justify-center lg:justify-start transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-slate-600'
            }`}
          >
            <span className="text-emerald-500 mr-2">&gt; </span>
            <Typewriter
              words={[
                'Data Science Specialist', 
                'Java Backend Architect', 
                'Optimization Systems Designer', 
                'Full-Stack Developer'
              ]}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-base leading-relaxed max-w-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-slate-600'
            }`}
          >
            {cmsContent.profile.bio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start items-center gap-4 pt-4"
          >
            <a 
              href="#/projects" 
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black rounded-xl font-bold font-mono tracking-wide flex items-center gap-2 hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:scale-105 transition-all duration-300 cursor-none"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </a>

            <a 
              href={cmsContent.resume.path}
              download
              className={`px-6 py-3 rounded-xl font-bold font-mono tracking-wide flex items-center gap-2 border transition-all duration-300 hover:scale-105 cursor-none ${
                isDarkMode 
                  ? 'border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 text-white' 
                  : 'border-slate-200 hover:border-emerald-500/30 hover:bg-emerald-500/5 text-slate-700'
              }`}
            >
              <FileText size={16} className="text-emerald-500" />
              <span>Resume PDF</span>
            </a>

            <a 
              href="#/contact" 
              className={`px-6 py-3 rounded-xl font-bold font-mono tracking-wide flex items-center gap-2 border transition-all duration-300 hover:scale-105 cursor-none ${
                isDarkMode 
                  ? 'border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 text-white' 
                  : 'border-slate-200 hover:border-cyan-500/30 hover:bg-cyan-500/5 text-slate-700'
              }`}
            >
              <Send size={16} className="text-cyan-500" />
              <span>Establish Contact</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D Portal Portrait */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            style={{ 
              rotateX: heroRotateX, 
              rotateY: heroRotateY,
              transformStyle: "preserve-3d"
            }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
            className={`relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border flex items-center justify-center shadow-2xl transition-all duration-500 group hero-portrait-hole ${
              isDarkMode ? 'border-emerald-500/10' : 'border-emerald-500/20'
            }`}
          >
            {/* Spinning Ambient Orbit ring */}
            <div 
              style={{ transform: "translateZ(15px)" }}
              className="absolute inset-[-14px] rounded-full border border-dashed border-emerald-500/25 animate-[spin_50s_linear_infinite] group-hover:border-emerald-500/55 transition-colors duration-500 pointer-events-none"
            />
            {/* Counter-spinning Dashed Orbit ring */}
            <div 
              style={{ transform: "translateZ(30px)" }}
              className="absolute inset-[-4px] rounded-full border border-dashed border-cyan-500/20 animate-[spin_35s_linear_infinite_reverse] group-hover:border-cyan-500/50 transition-colors duration-500 pointer-events-none"
            />

            {/* Inset portal page cutout */}
            <div className="hero-portrait-window">
              <img 
                src={cmsContent.profile.officePhoto} 
                alt={cmsContent.profile.name} 
                className="hero-portrait-img filter saturate-[0.85] contrast-[1.05] brightness-95 group-hover:scale-110 transition-all duration-700 pointer-events-none select-none"
              />
            </div>
          </motion.div>
        </div>

      </div>
      <NextPageButton to="#/about" label="About" isDarkMode={isDarkMode} />
    </div>
  );
};

export default Landing;
