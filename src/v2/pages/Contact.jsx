import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin, Terminal, User, Award, Cpu, BookOpen, Shield, AlertCircle } from 'lucide-react';
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
  // Minimized personal data collection: Name, Email, Message
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [consentGiven, setConsentGiven] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | consent_required | validation_error | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const lastSubmitTimeRef = useRef(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formStatus === 'validation_error') {
      setFormStatus('idle');
      setErrorMessage('');
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Silent honeypot bot trap
    if (honeypot.trim() !== '') {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setConsentGiven(false);
      return;
    }

    // Rate-limit spam protection: minimum 3 seconds between requests
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < 3000) {
      setFormStatus('validation_error');
      setErrorMessage('Please wait a moment before sending another message.');
      return;
    }

    // Input sanitization & minimization validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      setFormStatus('validation_error');
      setErrorMessage('Please enter a valid name (2 to 100 characters).');
      return;
    }

    if (!trimmedEmail || !validateEmail(trimmedEmail) || trimmedEmail.length > 150) {
      setFormStatus('validation_error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 5 || trimmedMessage.length > 3000) {
      setFormStatus('validation_error');
      setErrorMessage('Please enter a message between 5 and 3000 characters.');
      return;
    }

    // Explicit consent validation (DPDP Act 2023 Section 6)
    if (!consentGiven) {
      setFormStatus('consent_required');
      setErrorMessage('Consent required: Please check the consent statement below before transmitting your message.');
      return;
    }

    setFormStatus('submitting');
    lastSubmitTimeRef.current = now;

    try {
      // Secure transmission via FormSubmit.co HTTPS endpoint
      const response = await fetch(`https://formsubmit.co/ajax/${cmsContent.socials.email}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          _subject: `New Portfolio Enquiry from ${trimmedName}`,
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setFormStatus('success');
        // Clear all personal data immediately from component state
        setFormData({ name: '', email: '', message: '' });
        setConsentGiven(false);
        setErrorMessage('');
      } else {
        setFormStatus('error');
        setErrorMessage('Unable to deliver message through the relay service. Please try again or email directly.');
      }
    } catch {
      setFormStatus('error');
      setErrorMessage('Network transmission error. Please check your connection or contact directly via email.');
    }

    setTimeout(() => {
      setFormStatus(prev => (prev === 'submitting' ? prev : 'idle'));
    }, 7000);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-5xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <Terminal size={12} />
          <span>CONTACT &amp; ENQUIRIES</span>
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
              &gt; Contact &amp; Privacy
            </h3>
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Have a software engineering opportunity, question, or technical enquiry? Send a direct message below. Communications are encrypted in transit via HTTPS and handled with strict confidentiality.
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
                linkedin.com/in/patnala-uday-kumar
              </a>
            </div>
          </div>

          {/* Direct Privacy & Data Rights Note */}
          <div className={`p-4 rounded-xl border text-xs font-sans space-y-2 transition-colors ${
            isDarkMode ? 'bg-white/[0.02] border-white/5 text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <div className="flex items-center gap-2 font-mono font-bold text-[11px] text-cyan-500 uppercase tracking-wider">
              <Shield size={13} />
              <span>Data Rights &amp; Redressal</span>
            </div>
            <p className="leading-relaxed">
              Under India&apos;s DPDP Act 2023, you retain full rights to access, review, correct, or request deletion of your personal data, or withdraw consent at any time without friction.
            </p>
            <p className="leading-relaxed">
              Privacy contact:{' '}
              <a 
                href={`mailto:${cmsContent.socials.email}?subject=%5BPrivacy%20Request%5D%20Data%20Principal%20Inquiry`} 
                className="text-emerald-500 underline hover:text-emerald-400 font-mono text-[11px]"
              >
                {cmsContent.socials.email}
              </a>
            </p>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-7 glass-panel border rounded-2xl p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-scanlines opacity-[0.015] pointer-events-none" />

          <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
            {/* Silent bot honeypot field (hidden from genuine users) */}
            <input
              type="text"
              name="_gotcha"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">
                  NAME <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/[0.08] transition-all cursor-none ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/5 text-white placeholder:text-gray-600' 
                      : 'bg-slate-100 border-slate-200 text-slate-800 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">
                  EMAIL ADDRESS <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={150}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/[0.08] transition-all cursor-none ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/5 text-white placeholder:text-gray-600' 
                      : 'bg-slate-100 border-slate-200 text-slate-800 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">
                MESSAGE <span className="text-emerald-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={3000}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your enquiry or project details here..."
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/[0.08] transition-all cursor-none resize-none ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/5 text-white placeholder:text-gray-600' 
                    : 'bg-slate-100 border-slate-200 text-slate-800 placeholder:text-slate-400'
                }`}
              />
            </div>

            {/* Standalone Pre-Submission Privacy Notice */}
            <div className={`p-4 rounded-xl border text-xs font-sans space-y-2 transition-colors ${
              isDarkMode ? 'bg-white/[0.02] border-white/10 text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <div className="flex items-center gap-2 font-mono font-bold text-[11px] text-emerald-500 uppercase tracking-wider">
                <Shield size={13} />
                <span>Notice of Data Processing (DPDP Act 2023)</span>
              </div>
              <p className="leading-relaxed">
                <strong className={isDarkMode ? 'text-gray-200' : 'text-slate-800'}>Data Collected:</strong> Name, email address, and message text.
              </p>
              <p className="leading-relaxed">
                <strong className={isDarkMode ? 'text-gray-200' : 'text-slate-800'}>Purpose &amp; Processing:</strong> Collected solely to review and respond to your enquiry. Form submissions are transmitted via FormSubmit.co over encrypted HTTPS directly to my inbox ({cmsContent.socials.email}). Data is never sold, marketed, or shared with unauthorized third parties.
              </p>
              <p className="leading-relaxed">
                <strong className={isDarkMode ? 'text-gray-200' : 'text-slate-800'}>Retention &amp; Rights:</strong> Retained for up to 90 days or until our discussion concludes, then deleted. You may request data correction, erasure, or withdraw consent anytime by emailing{' '}
                <a href={`mailto:${cmsContent.socials.email}?subject=%5BConsent%20Withdrawal%5D`} className="text-emerald-500 underline hover:text-emerald-400">
                  {cmsContent.socials.email}
                </a>.
              </p>
            </div>

            {/* Unchecked Explicit Consent Checkbox */}
            <div className="pt-1">
              <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentGiven}
                  onChange={(e) => {
                    setConsentGiven(e.target.checked);
                    if (formStatus === 'consent_required') {
                      setFormStatus('idle');
                      setErrorMessage('');
                    }
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-gray-400 text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500 cursor-pointer transition-colors"
                />
                <span className={`text-xs leading-relaxed transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-700'
                }`}>
                  I consent to the processing of the personal data provided in this form for the purpose of responding to my enquiry, as described in the{' '}
                  <a href="#/privacy" className="text-emerald-500 underline font-semibold hover:text-emerald-400 transition-colors">
                    Privacy Policy
                  </a>.
                </span>
              </label>
            </div>

            {/* Validation and Consent Alerts */}
            <AnimatePresence>
              {(formStatus === 'consent_required' || formStatus === 'validation_error' || formStatus === 'error') && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-mono text-xs"
                >
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage || 'Please check your inputs and try again.'}</span>
                </motion.div>
              )}

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-mono text-xs"
                >
                  <CheckCircle size={14} className="shrink-0" />
                  <span>Enquiry sent successfully to Patnala Uday Kumar! Thank you for reaching out.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black rounded-xl font-bold font-mono tracking-wide flex items-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 transition-all duration-300 cursor-none"
              >
                <span>{formStatus === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
                <Send size={14} className={formStatus === 'submitting' ? 'animate-ping' : ''} />
              </button>

              <div className="text-[11px] font-mono text-gray-500 flex items-center gap-2">
                <span>Encrypted in Transit (TLS 1.3)</span>
                <span>•</span>
                <a href="#/privacy" className="hover:text-emerald-400 transition-colors">Privacy</a>
              </div>
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
