import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { usePrivacyModal } from '../context/PrivacyModalContext';
import { ArrowUp, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openPrivacy } = usePrivacyModal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 py-12 px-6 sm:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-600 dark:text-zinc-400">
        {/* Copyright & Privacy Policy */}
        <div className="flex flex-wrap items-center gap-3">
          <span>&copy; 2026 {portfolioData.personal.name}. All rights reserved.</span>
          <span className="text-zinc-400 dark:text-zinc-600">·</span>
          <button
            type="button"
            onClick={openPrivacy}
            className="hover:text-blue-500 underline underline-offset-4 decoration-zinc-400 hover:decoration-blue-500 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Privacy Policy</span>
          </button>
        </div>

        {/* Status / Role */}
        <div className="hidden md:flex items-center gap-4">
          <span>Islamabad, Pakistan</span>
          <span>·</span>
          <span>Software Developer (AI &amp; Full-Stack)</span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors py-1 px-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Back to top of page"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
