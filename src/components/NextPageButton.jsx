import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NextPageButton = ({ to, label, isDarkMode }) => {
  return (
    <div className="w-full flex justify-end mt-12 mb-8">
      <motion.a
        href={to}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 font-mono text-sm tracking-wider uppercase font-bold
        ${isDarkMode 
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500' 
          : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-400'
        }`}
      >
        Next: {label}
        <ArrowRight size={16} />
      </motion.a>
    </div>
  );
};

export default NextPageButton;
