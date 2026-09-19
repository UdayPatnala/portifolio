import { ShieldCheck, Lock, Mail, RefreshCw, Trash2, HelpCircle, ArrowRight } from 'lucide-react';
import { cmsContent } from '../data/content';

const Privacy = ({ isDarkMode }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-16 px-6 max-w-4xl mx-auto flex flex-col justify-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono">
          <ShieldCheck size={12} />
          <span>DATA PROTECTION &amp; PRIVACY</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Privacy &amp; Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Protection</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
        <p className={`text-xs font-mono max-w-xl transition-colors ${
          isDarkMode ? 'text-gray-400' : 'text-slate-600'
        }`}>
          Information practices, data flows, and Data Principal rights for the portfolio of Patnala Uday Kumar under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) and DPDP Rules 2025.
        </p>
      </div>

      {/* Main Document Body */}
      <div className="glass-panel border rounded-2xl p-6 sm:p-10 space-y-8 font-sans text-sm relative overflow-hidden leading-relaxed">
        <div className="absolute inset-0 bg-scanlines opacity-[0.015] pointer-events-none" />

        {/* Section 1: Overview & Data Fiduciary */}
        <section className="space-y-3 border-b border-emerald-500/10 pb-6">
          <div className="flex items-center gap-2.5 text-emerald-500 font-mono font-bold uppercase text-xs">
            <Lock size={15} />
            <span>1. Data Fiduciary &amp; Overview</span>
          </div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>
            This website is a personal engineering portfolio published by <strong>Patnala Uday Kumar</strong> (&ldquo;Data Fiduciary&rdquo;), resident in Visakhapatnam, Andhra Pradesh, India.
          </p>
          <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
            This portfolio is purely an informational, professional presentation. It does not operate user accounts, membership portals, commerce gateways, targeted advertising, behavioral analytics, or automated profiling.
          </p>
        </section>

        {/* Section 2: Personal Data Collected & Purpose */}
        <section className="space-y-4 border-b border-emerald-500/10 pb-6">
          <div className="flex items-center gap-2.5 text-emerald-500 font-mono font-bold uppercase text-xs">
            <Lock size={15} />
            <span>2. Personal Data Collected &amp; Purpose of Processing</span>
          </div>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl border transition-colors ${
              isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className={`font-mono font-bold text-xs uppercase mb-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                A. Contact Form Enquiries (Voluntarily Submitted)
              </h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>
                <strong>Items:</strong> Full Name, Email Address, Message content.
              </p>
              <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
                <strong>Purpose:</strong> Exclusively to review, evaluate, and respond to your professional enquiries, project collaborations, or recruitment opportunities.
              </p>
              <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
                <strong>Legal Basis:</strong> Explicit Consent given by actively checking the consent statement prior to submission (Section 6, DPDP Act 2023).
              </p>
            </div>

            <div className={`p-4 rounded-xl border transition-colors ${
              isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className={`font-mono font-bold text-xs uppercase mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>
                B. Network &amp; Technical Request Data
              </h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>
                <strong>Items:</strong> IP address, user-agent string, and HTTP request headers.
              </p>
              <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
                <strong>Purpose:</strong> Automatically processed in transit at edge servers by hosting infrastructure (GitHub Pages / Vercel) and FormSubmit.co for content delivery, TLS encryption, and anti-DDoS security. Not linked to identities or persisted by this portfolio.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Third-Party Data Processors */}
        <section className="space-y-3 border-b border-emerald-500/10 pb-6">
          <div className="flex items-center gap-2.5 text-emerald-500 font-mono font-bold uppercase text-xs">
            <Lock size={15} />
            <span>3. Third-Party Services &amp; Processors</span>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
            To operate this static portfolio securely, the following external services act as data processors:
          </p>
          <ul className={`list-disc list-inside space-y-2 text-xs font-mono ${
            isDarkMode ? 'text-gray-300' : 'text-slate-700'
          }`}>
            <li>
              <strong>FormSubmit.co:</strong> Form dispatch processor that receives contact form payloads over HTTPS and forwards them directly to the recipient inbox. Does not store permanent marketing databases.
            </li>
            <li>
              <strong>Google Workspace / Gmail:</strong> Mailbox hosting provider receiving transmitted contact messages under enterprise-grade TLS security protocols.
            </li>
            <li>
              <strong>Google Fonts CDN:</strong> Delivers typography stylesheets (Inter, Outfit, Fira Code) directly to user browsers via CDN.
            </li>
            <li>
              <strong>GitHub Pages &amp; Vercel:</strong> Static hosting providers serving application assets with HTTPS encryption.
            </li>
          </ul>
        </section>

        {/* Section 4: Cookies & Client Storage */}
        <section className="space-y-3 border-b border-emerald-500/10 pb-6">
          <div className="flex items-center gap-2.5 text-emerald-500 font-mono font-bold uppercase text-xs">
            <Lock size={15} />
            <span>4. Cookies &amp; Browser Storage Policy</span>
          </div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>
            <strong>Zero Cookies:</strong> This portfolio sets <strong>no first-party or third-party cookies</strong>. There are no tracking scripts, Google Analytics tags, Facebook pixels, or fingerprinting beacons.
          </p>
          <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
            <strong>Browser LocalStorage:</strong> Used exclusively to remember your visual theme preference (<code className="text-emerald-500">portfolio_theme</code>: &lsquo;light&rsquo;, &lsquo;dark&rsquo;, or &lsquo;system&rsquo;). Absolutely no personal data, messages, or contact submissions are persisted in your browser&apos;s localStorage or sessionStorage.
          </p>
        </section>

        {/* Section 5: Data Retention & Erasure */}
        <section className="space-y-3 border-b border-emerald-500/10 pb-6">
          <div className="flex items-center gap-2.5 text-emerald-500 font-mono font-bold uppercase text-xs">
            <Lock size={15} />
            <span>5. Retention &amp; Erasure Schedule</span>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
            Enquiries received through the contact form are retained in the recipient mailbox for <strong>up to 90 days</strong> or until our professional discussion has concluded, after which they are permanently deleted during routine inbox hygiene.
          </p>
          <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
            If you wish for your message or details to be erased sooner, you may submit an erasure request at any time, and your records will be purged promptly.
          </p>
        </section>

        {/* Section 6: Data Principal Rights under DPDP Act 2023 */}
        <section className="space-y-4 border-b border-emerald-500/10 pb-6" id="rights">
          <div className="flex items-center gap-2.5 text-emerald-500 font-mono font-bold uppercase text-xs">
            <ShieldCheck size={15} />
            <span>6. Your Rights as a Data Principal (DPDP Act 2023)</span>
          </div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>
            In accordance with Sections 11, 12, and 13 of the Digital Personal Data Protection Act, 2023, you have the following enforceable rights regarding your personal data:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${
              isDarkMode ? 'bg-white/[0.02] border-white/5 text-gray-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <strong className="block text-emerald-500 font-mono mb-1">Right to Access (Sec 11)</strong>
              Request a summary of your personal data processed and confirmation of processing activities.
            </div>
            <div className={`p-3 rounded-xl border ${
              isDarkMode ? 'bg-white/[0.02] border-white/5 text-gray-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <strong className="block text-emerald-500 font-mono mb-1">Right to Correction (Sec 12)</strong>
              Request correction, completion, or updating of any inaccurate personal data.
            </div>
            <div className={`p-3 rounded-xl border ${
              isDarkMode ? 'bg-white/[0.02] border-white/5 text-gray-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <strong className="block text-emerald-500 font-mono mb-1">Right to Erasure (Sec 12)</strong>
              Request the deletion of personal data when no longer necessary for the specified purpose.
            </div>
            <div className={`p-3 rounded-xl border ${
              isDarkMode ? 'bg-white/[0.02] border-white/5 text-gray-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <strong className="block text-emerald-500 font-mono mb-1">Grievance Redressal (Sec 13)</strong>
              Raise a privacy-related concern or grievance with a prompt resolution mechanism.
            </div>
          </div>
        </section>

        {/* Section 7: Frictionless Consent Withdrawal */}
        <section className="space-y-3 border-b border-emerald-500/10 pb-6">
          <div className="flex items-center gap-2.5 text-emerald-500 font-mono font-bold uppercase text-xs">
            <RefreshCw size={15} />
            <span>7. Frictionless Consent Withdrawal</span>
          </div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>
            Under Section 6(4) of the DPDP Act 2023, you may withdraw your consent at any time. The process of withdrawing consent must be as effortless as giving it.
          </p>
          <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
            To withdraw consent, simply send an email with the subject line <strong>[Consent Withdrawal]</strong> to{' '}
            <a href={`mailto:${cmsContent.socials.email}?subject=%5BConsent%20Withdrawal%5D`} className="text-emerald-500 underline hover:text-emerald-400 font-mono">
              {cmsContent.socials.email}
            </a>. Upon receipt, your previous messages and contact details will be purged from the inbox.
          </p>
        </section>

        {/* Section 8: Interactive Data Rights Redressal Console */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-cyan-500 font-mono font-bold uppercase text-xs">
            <Mail size={15} />
            <span>8. Data Rights &amp; Redressal Console</span>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>
            Click any pre-formatted request button below to initiate an inquiry or grievance directly via your email client:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            <a
              href={`mailto:${cmsContent.socials.email}?subject=%5BDPDP%20Request%5D%20Data%20Erasure%20Request&body=Hello%20Uday,%0A%0APlease%20permanently%20erase%20my%20contact%20submission%20and%20associated%20email%20records%20from%20your%20inbox.%0A%0AEmail%20used%20in%20submission:%20`}
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all group ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-red-500/40 text-gray-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 hover:border-red-500/40 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Trash2 size={15} className="text-red-400 group-hover:scale-110 transition-transform" />
                <span>Request Data Erasure</span>
              </div>
              <ArrowRight size={13} className="text-gray-500 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={`mailto:${cmsContent.socials.email}?subject=%5BDPDP%20Request%5D%20Consent%20Withdrawal&body=Hello%20Uday,%0A%0AI%20hereby%20withdraw%20my%20consent%20for%20the%20processing%20of%20my%20contact%20information.%0A%0AEmail:%20`}
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all group ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-amber-500/40 text-gray-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 hover:border-amber-500/40 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <RefreshCw size={15} className="text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Withdraw Consent</span>
              </div>
              <ArrowRight size={13} className="text-gray-500 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={`mailto:${cmsContent.socials.email}?subject=%5BDPDP%20Request%5D%20Information%20/%20Access%20Request&body=Hello%20Uday,%0A%0APlease%20provide%20a%20summary%20of%20any%20personal%20data%20retained%20regarding%20my%20prior%20enquiry.%0A%0AEmail:%20`}
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all group ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 hover:border-cyan-500/40 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={15} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Request Data Summary</span>
              </div>
              <ArrowRight size={13} className="text-gray-500 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={`mailto:${cmsContent.socials.email}?subject=%5BPrivacy%20Grievance%5D%20Data%20Protection%20Concern&body=Hello%20Uday,%0A%0AI%20am%20writing%20regarding%20the%20following%20privacy%20concern%20or%20grievance:%0A%0ADetails:%20`}
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all group ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-purple-500/40 text-gray-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 hover:border-purple-500/40 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle size={15} className="text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Privacy Grievance Redressal</span>
              </div>
              <ArrowRight size={13} className="text-gray-500 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
