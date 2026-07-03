import { motion } from 'framer-motion';
import { User, MapPin, Mail, Award, Cpu, BookOpen } from 'lucide-react';
import { cmsContent } from '../data/content';

const About = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-6xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <User size={12} />
          <span>IDENTITY ROOT</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          About My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Journey</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Profile Card Column */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 glass-panel rounded-2xl p-6 border transition-all duration-300 relative group overflow-hidden"
        >
          {/* Cyber scanner glow */}
          <div className="absolute inset-0 bg-scanlines opacity-[0.02] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30 animate-pulse" />

          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors duration-500">
              <img 
                src={cmsContent.profile.profilePhoto} 
                alt={cmsContent.profile.name} 
                className="w-full h-full object-cover filter contrast-[1.02] saturate-[0.95]"
              />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className={`text-xl font-bold font-sans ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {cmsContent.profile.name}
              </h3>
              <p className="text-xs font-mono text-emerald-500">{cmsContent.profile.title}</p>
            </div>

            <div className="w-full border-t border-emerald-500/10 my-4" />

            {/* Quick Details grid */}
            <div className="w-full space-y-3.5 text-sm font-mono">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-emerald-500" />
                <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
                  {cmsContent.profile.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-cyan-500" />
                <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
                  {cmsContent.socials.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={16} className="text-amber-500" />
                <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
                  B.Tech (CSE) 2022-2026
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Narrative bio column */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-7 space-y-6"
        >
          <div className="space-y-4">
            <h3 className={`text-2xl font-bold font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              &gt; Initializing Bio...
            </h3>
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              I am a final-year Computer Science Engineering student specializing in Data Science at Raghu Institute of Technology. I focus heavily on creating bridges between heavy data science tasks and web application systems.
            </p>
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              My training covers advanced backend structure using Java (Spring Boot) and database modeling (PostgreSQL/MySQL), alongside model deployment and evaluation workflows using Python. I design software with performance, clean modular design, and robust code verification criteria in mind.
            </p>
          </div>

          {/* Three pillars visual display */}
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <div className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors duration-300 ${
              isDarkMode ? 'bg-white/5 border-white/5 hover:border-emerald-500/20' : 'bg-slate-50 border-slate-200 hover:border-emerald-500/20'
            }`}>
              <Cpu className="text-emerald-500" size={24} />
              <div className="space-y-1">
                <h4 className={`text-xs font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>DATA SCIENCE</h4>
                <p className="text-[10px] text-gray-500 leading-normal">ML pipeline builds, feature engineering, and mathematical optimization models.</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors duration-300 ${
              isDarkMode ? 'bg-white/5 border-white/5 hover:border-cyan-500/20' : 'bg-slate-50 border-slate-200 hover:border-cyan-500/20'
            }`}>
              <BookOpen className="text-cyan-500" size={24} />
              <div className="space-y-1">
                <h4 className={`text-xs font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>BACKEND ENG</h4>
                <p className="text-[10px] text-gray-500 leading-normal">Spring Boot services, JDBC models, data persistence, and thread-safe caches.</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors duration-300 ${
              isDarkMode ? 'bg-white/5 border-white/5 hover:border-amber-500/20' : 'bg-slate-50 border-slate-200 hover:border-amber-500/20'
            }`}>
              <Award className="text-amber-500" size={24} />
              <div className="space-y-1">
                <h4 className={`text-xs font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>VERIFICATION</h4>
                <p className="text-[10px] text-gray-500 leading-normal">Functional evaluation, JUnit testing, schema checking, and linter-clean deployments.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
