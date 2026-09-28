import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { ProjectGraphic } from './ProjectGraphic';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Globe } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Project Specification
            </span>
            {project.badge && (
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {project.badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
          {/* Visual Canvas */}
          <div className="w-full h-64 sm:h-72">
            <ProjectGraphic project={project} />
          </div>

          {/* Title & Hook */}
          <div className="space-y-2">
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {project.hook}
            </p>
          </div>

          {/* Structured Problem -> Built -> Outcome */}
          {project.problemSolution && (
            <div className="grid gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <span className="text-xs font-mono uppercase text-rose-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  The Problem
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.problemSolution.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <span className="text-xs font-mono uppercase text-blue-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  What I Built &amp; Architecture
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.problemSolution.built}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Outcome &amp; Results
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.problemSolution.outcome}
                </p>
              </div>
            </div>
          )}

          {/* Tech Stack List */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Technologies Used
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono text-zinc-300 bg-zinc-800/80 border border-zinc-700/60 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="text-xs font-mono text-zinc-400">
            {project.note ? (
              <span className="text-amber-400">{project.note}</span>
            ) : (
              <span>Muhammad Hassan Askari · Applied AI &amp; Full-Stack</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {project.link ? (
              <a
                href={project.link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition-colors shadow-sm"
              >
                {project.link.url.includes('github.com') ? (
                  <Github className="w-4 h-4" />
                ) : (
                  <Globe className="w-4 h-4 text-emerald-600" />
                )}
                <span>{project.link.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
