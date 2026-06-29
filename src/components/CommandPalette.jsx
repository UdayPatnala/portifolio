import React, { useState, useEffect } from 'react';
import { Search, Folder, Mail, FileText } from 'lucide-react';

const Github = ({ size = 20, className = "" }) => (
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

const Linkedin = ({ size = 20, className = "" }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette = ({ isOpen, setIsOpen, isDarkMode }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setIsOpen]);

  if (!isOpen) return null;

  const commands = [
    { name: 'Projects', icon: <Folder size={16} />, action: () => { window.location.hash = 'projects'; setIsOpen(false); } },
    { name: 'Contact Me', icon: <Mail size={16} />, action: () => { window.location.hash = 'contact'; setIsOpen(false); } },
    { name: 'Download Resume', icon: <FileText size={16} />, action: () => { window.open('/PATNALA UDAY KUMAR.pdf'); setIsOpen(false); } },
    { name: 'GitHub', icon: <Github size={16} />, action: () => { window.open('https://github.com/UdayPatnala', '_blank'); setIsOpen(false); } },
    { name: 'LinkedIn', icon: <Linkedin size={16} />, action: () => { window.open('https://linkedin.com/in/udaypatnala', '_blank'); setIsOpen(false); } },
  ];

  const filteredCommands = commands.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[20vh] px-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className={`relative w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#111] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}
        >
          <div className="flex items-center px-4 py-3 border-b border-gray-500/20">
            <Search size={18} className="text-gray-400 mr-3" />
            <input 
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
            />
            <span className="text-[10px] bg-gray-500/20 px-1.5 py-0.5 rounded text-gray-400 ml-2">ESC</span>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredCommands.length > 0 ? filteredCommands.map((cmd, i) => (
              <button 
                key={i}
                onClick={cmd.action}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
              >
                <span className="text-gray-400">{cmd.icon}</span>
                {cmd.name}
              </button>
            )) : (
              <p className="text-center text-sm text-gray-500 py-6">No results found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
