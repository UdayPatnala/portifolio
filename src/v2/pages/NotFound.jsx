import { motion } from 'framer-motion';
import { AlertOctagon, ArrowLeft } from 'lucide-react';

const NotFound = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-md mx-auto flex flex-col justify-center items-center text-center space-y-6">
      {/* 404 Visual Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`w-20 h-20 rounded-2xl border flex items-center justify-center ${
          isDarkMode ? 'bg-white/5 border-red-500/30 text-red-400' : 'bg-slate-100 border-red-500/40 text-red-655'
        }`}
      >
        <AlertOctagon size={40} className="animate-pulse" />
      </motion.div>

      <div className="space-y-2">
        <span className="text-xs font-mono text-red-500 uppercase tracking-widest font-bold">ERROR 404 // ROUTE_FAILED</span>
        <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Out of Bounds
        </h2>
        <p className={`text-sm transition-colors duration-300 leading-relaxed ${
          isDarkMode ? 'text-gray-400' : 'text-slate-600'
        }`}>
          The system coordinate you requested does not exist or has been relocated outside the active repository.
        </p>
      </div>

      <a
        href="#/"
        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold font-mono text-sm rounded-xl flex items-center gap-2 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 cursor-none"
      >
        <ArrowLeft size={16} />
        <span>Return to Base</span>
      </a>
    </div>
  );
};

export default NotFound;
