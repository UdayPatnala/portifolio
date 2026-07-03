import { ShieldCheck, Lock } from 'lucide-react';

const Privacy = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-3xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <ShieldCheck size={12} />
          <span>SECURITY POLICY</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Statement</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Content */}
      <div className="glass-panel border rounded-2xl p-6 sm:p-8 space-y-6 font-sans text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-scanlines opacity-[0.015] pointer-events-none" />

        <div className="flex items-center gap-2.5 text-emerald-500 font-mono font-bold uppercase border-b border-emerald-500/5 pb-3">
          <Lock size={16} />
          <span>Information Protocols</span>
        </div>

        <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
          This portfolio is a static presentation built for professional demonstration.
        </p>

        <div className="space-y-4">
          <h3 className={`text-base font-bold font-mono ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            1. Data Ingestion
          </h3>
          <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            No tracking coordinates, analytic software, or server-side cookies are mapped during your browsing session.
          </p>

          <h3 className={`text-base font-bold font-mono ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            2. Contact Form Dispatch
          </h3>
          <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            Any text coordinates provided through the contact form are dispatched directly via formsubmit.co endpoints. No local databases record or catalog inputs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
