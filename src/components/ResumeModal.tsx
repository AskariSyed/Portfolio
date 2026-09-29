import React, { useEffect } from 'react';
import { useResumeModal } from '../context/ResumeModalContext';
import { portfolioData } from '../data/portfolioData';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { isOpen, closeResume } = useResumeModal();
  const { personal } = portfolioData;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeResume();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeResume]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={closeResume}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-zinc-800 bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="resume-modal-title" className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {personal.name} — Curriculum Vitae
                </h2>
                <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified PDF
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono hidden sm:block">
                Software Developer (AI & Full-Stack) · Remote Worldwide
              </p>
            </div>
          </div>

          {/* Action CTAs & Close Button */}
          <div className="flex items-center gap-2">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              title="Open full PDF in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Tab</span>
            </a>

            <a
              href={personal.resumeUrl}
              download="Muhammad_Hassan_Askari_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold font-mono transition-colors shadow-sm"
              title="Download PDF directly to your device"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              onClick={closeResume}
              aria-label="Close CV Preview"
              className="p-1.5 ml-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Frame Viewer */}
        <div className="flex-1 w-full h-full bg-zinc-950 relative overflow-hidden">
          <iframe
            src={`${personal.resumeUrl}#toolbar=0&navpanes=0`}
            title="Curriculum Vitae Preview"
            className="w-full h-full border-0"
          />

          {/* Mobile Fallback Overlay if embedded viewer isn't natively supported */}
          <div className="sm:hidden absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-900/90 backdrop-blur border border-zinc-700 flex items-center justify-between text-xs">
            <span className="text-zinc-300 font-mono">Viewing mobile preview</span>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline font-semibold"
            >
              Open Full Screen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
