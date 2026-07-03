import { Eye, Terminal, Sparkles } from 'lucide-react';
import DataScienceVisualizer from '../../components/DataScienceVisualizer';

const Gallery = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-5xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <Eye size={12} />
          <span>VISUAL LABORATORY</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Visualizer</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Visualizer card container */}
      <div className="glass-panel border rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(16,185,129,0.02)]">
        <div className="absolute inset-0 bg-scanlines opacity-[0.015] pointer-events-none" />

        <div className="flex items-center gap-2.5 mb-6 border-b border-emerald-500/5 pb-4">
          <Terminal size={14} className="text-emerald-400 animate-pulse" />
          <h3 className={`text-sm font-mono font-bold tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>
            SGD_LOSS_LANDSCAPE_3D
          </h3>
          <span className="ml-auto text-[10px] font-mono text-gray-500 hidden sm:inline">// Drag inside canvas to rotate surface</span>
        </div>

        {/* The Math Canvas Visualizer */}
        <div className="w-full flex justify-center items-center rounded-xl bg-slate-950/40 p-4 border border-emerald-500/5 relative">
          <DataScienceVisualizer isDarkMode={isDarkMode} />
        </div>

        <div className="mt-6 space-y-2 font-sans">
          <div className="flex items-center gap-1.5 text-emerald-500 font-mono text-xs font-bold uppercase">
            <Sparkles size={14} />
            <span>Mathematical Model Parameters</span>
          </div>
          <p className={`text-xs leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-slate-600'
          }`}>
            This canvas simulates the optimization loss space of a deep learning model. The saddle points and gradient descent pathways demonstrate Stochastic Gradient Descent (SGD) with momentum, adjusting vectors to minimize model weights. Drag to view coordinate changes in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
