import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const Hero3DCard = ({ imgSrc }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 20 });

  const translateImgX = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 20 });
  const translateImgY = useSpring(useTransform(y, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 20 });

  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative flex items-center justify-center py-6 select-none"
      style={{ perspective: 1000 }}
    >
      {/* Dashed outer spinning border */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-72 h-72 md:w-80 md:h-80 border-2 border-dashed border-emerald-500/25 rounded-full pointer-events-none"
      />
      
      {/* Outer ambient green glow */}
      <div className="absolute w-56 h-56 md:w-64 md:h-64 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-full blur-[60px] opacity-25 animate-pulse pointer-events-none" />

      {/* Main Interactive Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden glass-panel border border-emerald-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-none"
      >
        {/* Glowing border outline */}
        <motion.div 
          animate={{
            borderColor: hovered ? 'rgba(16, 185, 129, 0.7)' : 'rgba(16, 185, 129, 0.12)'
          }}
          className="absolute inset-0 rounded-3xl border-2 pointer-events-none z-30 transition-colors duration-300"
        />

        {/* Content wrapper with depth */}
        <div 
          className="absolute inset-2 rounded-2xl overflow-hidden bg-[#050c14]/80"
          style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
        >
          {/* Image Layer with translation */}
          <motion.img 
            src={imgSrc} 
            alt="Patnala Uday Kumar" 
            style={{ 
              x: translateImgX, 
              y: translateImgY,
              transform: 'translateZ(20px) scale(1.08)'
            }}
            className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
          />

          {/* Glare Sheet Effect */}
          <motion.div 
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.09) 0%, transparent 65%)`,
              transform: 'translateZ(30px)'
            }}
            className="absolute inset-0 pointer-events-none z-20"
          />
          
          {/* Bottom Accent bar */}
          <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-[#020509]/95 to-transparent flex flex-col justify-end p-4 z-10">
            <span className="text-xs font-mono text-emerald-400 tracking-wider">CSE (DATA SCIENCE)</span>
            <span className="text-sm font-bold text-white tracking-wide">UDAY KUMAR</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero3DCard;
