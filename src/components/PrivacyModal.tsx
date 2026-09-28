import React, { useEffect } from 'react';
import { usePrivacyModal } from '../context/PrivacyModalContext';
import { portfolioData } from '../data/portfolioData';
import { X, ShieldCheck, Lock, EyeOff, Database, Mail } from 'lucide-react';

export const PrivacyModal: React.FC = () => {
  const { isOpen, closePrivacy } = usePrivacyModal();
  const { personal } = portfolioData;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePrivacy();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closePrivacy]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      onClick={closePrivacy}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 shadow-2xl flex flex-col my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-base font-bold text-white tracking-tight">
                Privacy Policy
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Last updated: September 2026 · {personal.name}
              </p>
            </div>
          </div>

          <button
            onClick={closePrivacy}
            aria-label="Close Privacy Policy"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-zinc-300 leading-relaxed font-normal">
          {/* Section 1: Overview */}
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Core Principle: Privacy First</span>
            </div>
            <p className="text-xs text-zinc-400">
              This portfolio is an independent personal showcase built to display the engineering work, skills, and experience of {personal.name}. We respect your digital privacy and adhere to the principle of minimal data footprint.
            </p>
          </div>

          {/* Section 2: No Tracking */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <EyeOff className="w-4 h-4 text-blue-400" />
              <span>1. Zero Analytics &amp; Tracking Cookies</span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm">
              This website does not use tracking cookies, Google Analytics, pixel tags, or third-party behavioral fingerprinting. Your browsing activity on this site is not monitored, profiled, or monetized in any way.
            </p>
          </div>

          {/* Section 3: Local Storage */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Database className="w-4 h-4 text-amber-400" />
              <span>2. Local Storage Usage</span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We only use your browser's local storage for a single functional preference:
            </p>
            <ul className="list-disc list-inside text-xs text-zinc-400 pl-2 space-y-1 font-mono">
              <li><strong className="text-zinc-200">portfolio-theme:</strong> stores either <code className="text-blue-400">"dark"</code> or <code className="text-blue-400">"light"</code> to preserve your preferred visual appearance across page refreshes.</li>
            </ul>
            <p className="text-zinc-500 text-xs">
              No personally identifiable information is ever placed into local storage or cookies.
            </p>
          </div>

          {/* Section 4: Email Inquiries */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Mail className="w-4 h-4 text-purple-400" />
              <span>3. Communications &amp; Direct Inquiries</span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm">
              When you contact {personal.name} via email (<span className="text-zinc-200 font-mono">{personal.email}</span>), any information you provide (such as your name, corporate email address, and project details) is used solely to respond to your specific inquiry or discuss professional employment and contracting opportunities. Your details are strictly confidential and will never be sold, leased, or shared with third parties.
            </p>
          </div>

          {/* Section 5: Third-Party Links */}
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-xs sm:text-sm">
              4. External Services &amp; Links
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              This site contains outbound links to external platforms including GitHub, LinkedIn, Vercel, and an academic research portfolio. Once you leave this site, you are subject to the privacy practices and policies of those external services.
            </p>
          </div>

          {/* Section 6: User Rights */}
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-xs sm:text-sm">
              5. Your Rights (GDPR &amp; CCPA Compliance)
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Under applicable data protection laws, you retain full rights to request the deletion or retrieval of any correspondence sent to us. If you wish to purge any past emails or communications, simply email <span className="text-zinc-200 font-mono">{personal.email}</span> with the subject line <em>"Data Privacy Request"</em>, and your request will be honored promptly within 48 hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/60">
          <span className="text-xs font-mono text-zinc-500">
            {personal.location}
          </span>
          <button
            onClick={closePrivacy}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
