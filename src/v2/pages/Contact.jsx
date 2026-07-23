import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin, Terminal, User, Award, Cpu, BookOpen } from 'lucide-react';
import { cmsContent } from '../data/content';

const Linkedin = ({ size = 18, className = "" }) => (
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

const Contact = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('submitting');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${cmsContent.socials.email}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio V2 Communication Link",
          message: formData.message,
          _captcha: "false"
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Form submission failure:", error);
      setFormStatus('error');
    }

    setTimeout(() => {
      setFormStatus('idle');
    }, 5000);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-5xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <Terminal size={12} />
          <span>CONTACT LINK</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Touch</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
      </div>

      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 space-y-8"
        >
          <div className="space-y-4">
            <h3 className={`text-2xl font-bold font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              &gt; Transmission Parameters
            </h3>
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Hiring managers or team leads looking to recruit can submit direct messages using the secure channel on the right.
            </p>
          </div>

          <div className="space-y-4 font-mono text-sm">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-emerald-500" />
              <a href={`mailto:${cmsContent.socials.email}`} className={`hover:text-emerald-500 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-slate-700'
              }`}>
                {cmsContent.socials.email}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-cyan-500" />
              <span className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>
                {cmsContent.socials.location}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Linkedin size={18} className="text-purple-400" />
              <a href={cmsContent.socials.linkedin} target="_blank" rel="noreferrer" className={`hover:text-purple-400 transition-colors truncate ${
                isDarkMode ? 'text-gray-300' : 'text-slate-700'
              }`}>
                linkedin.com/in/uday-patnala
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-7 glass-panel border rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-scanlines opacity-[0.015] pointer-events-none" />

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">SENDER NAME</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Hiring Manager"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/[0.08] transition-all cursor-none ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/5 text-white' 
                      : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">SENDER EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="manager@company.com"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/[0.08] transition-all cursor-none ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/5 text-white' 
                      : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">TRANSMISSION SUBJECT</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Software Engineer Role Opportunity"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/[0.08] transition-all cursor-none ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/5 text-white' 
                    : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">MESSAGE CONTENT</label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Let's build something amazing together..."
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/[0.08] transition-all cursor-none ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/5 text-white' 
                    : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black rounded-xl font-bold font-mono tracking-wide flex items-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 transition-all duration-300 cursor-none"
              >
                <span>{formStatus === 'submitting' ? 'Transmitting...' : 'Transmit Message'}</span>
                <Send size={14} className={formStatus === 'submitting' ? 'animate-ping' : ''} />
              </button>

              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs py-2 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                  >
                    <CheckCircle size={14} />
                    <span>Message successfully sent to Uday Kumar!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>

      {/* --- ABOUT DETAILS INJECTED HERE --- */}
      <div className="w-full border-t border-emerald-500/10 my-16" />

      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <User size={12} />
          <span>IDENTITY ROOT</span>
        </div>
        <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          About My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Journey</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Profile Card Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 glass-panel rounded-2xl p-6 border transition-all duration-300 relative group overflow-hidden"
        >
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
                  B.Tech (CSE) 2022-2026 (Graduated)
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Narrative bio column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              I am a graduated Computer Science Engineering student specializing in Data Science at Raghu Institute of Technology. I focus heavily on creating bridges between heavy data science tasks and web application systems.
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

export default Contact;
