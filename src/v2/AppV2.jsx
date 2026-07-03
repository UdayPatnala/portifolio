import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowUp 
} from 'lucide-react';

// Data Science & CMS Ingestion
import { cmsContent } from './data/content';

// Import Pages
import Landing from './pages/Landing';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Certifications from './pages/Certifications';
import Achievements from './pages/Achievements';
import Resume from './pages/Resume';
import Journey from './pages/Journey';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// Import Shared Components
import ParticleBackground from '../components/ParticleBackground';
import CustomCursor from '../components/CustomCursor';
import CommandPalette from '../components/CommandPalette';

// SVG Components
const Logo = ({ size = 28, className = "" }) => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    fill="none"
    width={size}
    height={size}
    className={className}
    whileHover={{ scale: 1.1, rotate: 8 }}
    transition={{ type: "spring", stiffness: 400, damping: 12 }}
  >
    <defs>
      <linearGradient id="logo-u-grad-v2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <linearGradient id="logo-k-grad-v2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    
    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-25" />
    <motion.path 
      d="M 28 25 L 28 58 A 12 12 0 0 0 52 58 L 52 25" 
      stroke="url(#logo-u-grad-v2)" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    />
    <motion.path 
      d="M 52 43 L 72 23 M 52 43 L 72 63" 
      stroke="url(#logo-k-grad-v2)" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.25 }}
    />
  </motion.svg>
);

const AppV2 = ({ setVersion }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Client-side routing state
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Synchronize route hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
      setMobileMenuOpen(false);
      window.scrollTo(0, 0); // Reset scroll to top on route change
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme syncer
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light-theme');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.add('light-theme');
    }
    try {
      localStorage.setItem('portfolio_theme', JSON.stringify(isDarkMode));
    } catch (e) {
      console.warn("Theme storage write error:", e);
    }
  }, [isDarkMode]);

  // Scroll to Top float button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Copy protection & security measures
  const isEditableTarget = (target) => {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest('input, textarea, select, [contenteditable="true"], .allow-copy'));
  };

  const preventContentCopy = (e) => {
    if (!isEditableTarget(e.target)) {
      e.preventDefault();
    }
  };

  const preventContentDrag = (e) => {
    if (!isEditableTarget(e.target)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const preventProtectedShortcuts = (e) => {
      if (isEditableTarget(e.target)) return;
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'p', 's', 'u', 'x'].includes(key)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', preventProtectedShortcuts);
    return () => window.removeEventListener('keydown', preventProtectedShortcuts);
  }, []);

  // Resolve active page component based on routing state
  const renderRouteContent = () => {
    switch (currentRoute) {
      case '#/':
      case '#':
        return <Landing isDarkMode={isDarkMode} />;
      case '#/about':
        return <About isDarkMode={isDarkMode} />;
      case '#/skills':
        return <Skills isDarkMode={isDarkMode} />;
      case '#/journey':
        return <Journey isDarkMode={isDarkMode} />;
      case '#/projects':
        return <Projects isDarkMode={isDarkMode} />;
      case '#/experience':
        return <Experience isDarkMode={isDarkMode} />;
      case '#/education':
        return <Education isDarkMode={isDarkMode} />;
      case '#/certifications':
        return <Certifications isDarkMode={isDarkMode} />;
      case '#/achievements':
        return <Achievements isDarkMode={isDarkMode} />;
      case '#/resume':
        return <Resume isDarkMode={isDarkMode} />;
      case '#/gallery':
        return <Gallery isDarkMode={isDarkMode} />;
      case '#/contact':
        return <Contact isDarkMode={isDarkMode} />;
      case '#/privacy':
        return <Privacy isDarkMode={isDarkMode} />;
      default:
        return <NotFound isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div 
      onCopy={preventContentCopy}
      onCut={preventContentCopy}
      onContextMenu={preventContentCopy}
      onDragStart={preventContentDrag}
      className={`read-only-interface relative min-h-screen transition-colors duration-300 overflow-x-hidden selection:bg-emerald-500/30 ${
        isDarkMode ? 'bg-[#03060a] text-gray-100 selection:text-white' : 'bg-[#f8fafc] text-slate-900 selection:text-emerald-950'
      }`}
    >
      {/* Background visual components */}
      <ParticleBackground isDarkMode={isDarkMode} />
      <CustomCursor />
      <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} isDarkMode={isDarkMode} />

      {/* --- HEADER --- */}
      <header className="sticky top-0 h-16 z-[45] glass-panel border-b transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          
          {/* Logo brand */}
          <a 
            href="#/" 
            className="flex items-center gap-2 font-bold tracking-widest text-lg font-mono text-emerald-500 group cursor-none"
          >
            <Logo size={28} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
            <span className={`text-sm tracking-wider font-extrabold ${isDarkMode ? 'text-white group-hover:text-emerald-400 transition-colors' : 'text-slate-900 group-hover:text-emerald-600 transition-colors'}`}>
              UDAY.V2
            </span>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono">
            {cmsContent.navigation.links.map((link) => {
              const isActive = currentRoute === link.hash;
              return (
                <a
                  key={link.label}
                  href={link.hash}
                  className={`transition-all duration-200 relative py-1 px-1.5 group cursor-none font-bold uppercase tracking-wider ${
                    isActive 
                      ? (isDarkMode ? 'text-emerald-400 font-bold' : 'text-emerald-600 font-bold')
                      : (isDarkMode ? 'text-gray-400 hover:text-emerald-300' : 'text-slate-600 hover:text-emerald-600')
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicatorV2" 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Version Switcher button */}
            <button
              onClick={() => {
                localStorage.setItem('portfolio_version', 'v1');
                setVersion('v1');
              }}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-500 dark:text-emerald-300 rounded-lg font-bold hover:from-emerald-500/30 hover:to-cyan-500/30 hover:border-emerald-400/50 transition-all duration-300 cursor-none mr-2"
              title="Return to Version 1"
            >
              V1 Legacy
            </button>

            {/* Dark mode switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-all duration-300 cursor-none overflow-hidden ${
                isDarkMode 
                  ? 'bg-white/5 border-white/5 text-emerald-400 hover:bg-white/10 hover:border-emerald-500/30' 
                  : 'bg-slate-100 border-slate-200 text-emerald-700 hover:bg-slate-200 hover:border-emerald-500/30'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? "dark" : "light"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </nav>

          {/* Mobile hamburger icons */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile dark mode switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-all duration-300 cursor-none ${
                isDarkMode ? 'bg-white/5 border-white/10 text-emerald-400' : 'bg-slate-100 border-slate-200 text-emerald-600'
              }`}
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-gray-400 p-2 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 inset-x-0 backdrop-blur-lg border-b z-40 py-6 px-8 flex flex-col gap-4 lg:hidden shadow-2xl transition-colors duration-300 ${
              isDarkMode ? 'bg-[#03070d]/95 border-emerald-500/10' : 'bg-white/95 border-emerald-500/10'
            }`}
          >
            {cmsContent.navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.hash}
                className={`text-left font-mono text-base py-1 border-b uppercase tracking-wider transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-emerald-400 border-white/5' 
                    : 'text-slate-700 hover:text-emerald-600 border-slate-100'
                }`}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                localStorage.setItem('portfolio_version', 'v1');
                setVersion('v1');
              }}
              className="w-full mt-2 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-bold font-mono tracking-wide rounded-xl shadow-lg text-sm"
            >
              Return to V1 Legacy
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN PAGE ROUTE CONTENT --- */}
      <main className="min-h-[calc(100vh-8rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {renderRouteContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      <footer className={`py-12 border-t text-center transition-colors duration-300 ${
        isDarkMode ? 'bg-[#020306] border-white/5' : 'bg-slate-100 border-emerald-500/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-gray-500">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>© 2026 Patnala Uday Kumar. All Rights Reserved.</p>
            <div className="flex gap-3 text-[10px] uppercase text-emerald-500/50 mt-1 md:mt-0 flex-wrap justify-center">
              <a href="#/education" className="hover:text-emerald-500 transition-colors">Education</a>
              <span>•</span>
              <a href="#/certifications" className="hover:text-emerald-500 transition-colors">Certifications</a>
              <span>•</span>
              <a href="#/gallery" className="hover:text-emerald-500 transition-colors">Visualizer Laboratory</a>
              <span>•</span>
              <a href="#/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
            </div>
          </div>
          
          <div className="flex gap-4">
            <span className="text-[10px] text-cyan-500/40 tracking-wider uppercase">PORTFOLIO V2 // MODULAR FRAMEWORK BUILD</span>
          </div>
        </div>
      </footer>

      {/* --- BACK TO TOP FLOAT --- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-3 bg-emerald-500 border border-emerald-400 rounded-full text-black hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] z-40 transition-all duration-300 cursor-none"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppV2;
