import { FileText, Download, Briefcase, GraduationCap, Code } from 'lucide-react';
import { cmsContent } from '../data/content';

const Resume = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-4xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <FileText size={12} />
          <span>CURRICULUM VITAE</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Resume</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      {/* Main Container */}
      <div className="glass-panel border rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(16,185,129,0.02)]">
        <div className="absolute inset-0 bg-scanlines opacity-[0.015] pointer-events-none" />

        {/* Download Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-emerald-500/10 mb-8">
          <div>
            <h3 className={`text-lg font-bold font-mono ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              PATNALA UDAY KUMAR.pdf
            </h3>
            <p className="text-xs text-gray-500 font-mono">Size: ~160 KB | Format: PDF Document</p>
          </div>
          
          <a
            href={cmsContent.resume.path}
            download
            className="px-5 py-2.5 bg-emerald-500 text-black font-bold font-mono text-sm rounded-xl flex items-center gap-2 hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 cursor-none shrink-0"
          >
            <Download size={14} />
            <span>Download CV</span>
          </a>
        </div>

        {/* Overview highlights to read */}
        <div className="grid sm:grid-cols-3 gap-6 text-sm font-sans">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-500 font-mono font-bold">
              <Briefcase size={16} />
              <span>EXPERIENCE</span>
            </div>
            <ul className={`space-y-2 text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              <li>• Machine Learning Engineer (8 Weeks)</li>
              <li>• Software Engineer (4 Weeks)</li>
              <li>• Spring Boot REST Backend builder</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-500 font-mono font-bold">
              <GraduationCap size={16} />
              <span>EDUCATION</span>
            </div>
            <ul className={`space-y-2 text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              <li>• B.Tech in CSE (Data Science) @ RIT</li>
              <li>• Intermediatenarayana College</li>
              <li>• Flawless 10/10 SSC GPA</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-500 font-mono font-bold">
              <Code size={16} />
              <span>CORE ARSENAL</span>
            </div>
            <ul className={`space-y-2 text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              <li>• Java, Python, SQL, C Language</li>
              <li>• React.js, Tailwind, HTML5/CSS3</li>
              <li>• Spring Boot, Postgres, Git/GitHub</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
