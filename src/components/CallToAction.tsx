import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  FileText,
  ArrowRight,
  Eye,
  Sparkles,
  CheckCircle2,
  Shield,
  Globe,
  Smartphone,
  Server,
  Cpu,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useResumeModal } from '../context/ResumeModalContext';
import { useScrollObserver } from '../hooks/useScrollObserver';

export const CallToAction: React.FC = () => {
  const { personal } = portfolioData;
  const { openResume } = useResumeModal();

  const { ref, isInView, containerVariants, itemVariants } = useScrollObserver<HTMLDivElement>({
    amount: 0.15,
    margin: '-40px 0px -40px 0px',
  });

  const capabilities = [
    {
      icon: Globe,
      title: 'Web Engineering',
      desc: 'Modern SPAs & SSR applications using Next.js, React, TypeScript, and responsive design systems.',
      badge: 'Freelance & Contract',
      accent: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      desc: 'Native-feel cross-platform mobile apps for iOS & Android built with Flutter, Dart & Firebase.',
      badge: 'Cross-Platform',
      accent: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      icon: Server,
      title: 'Scalable Backends',
      desc: 'High-throughput APIs & microservices with C#, ASP.NET Core 8, Python FastAPI & PostgreSQL.',
      badge: 'High Concurrency',
      accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Cpu,
      title: 'Scalable AI Systems',
      desc: 'Production RAG pipelines, pgvector vector search, LLM integrations & OpenCV/YOLO vision.',
      badge: 'Applied AI & RAG',
      accent: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14 border border-blue-500/20 bg-gradient-to-br from-blue-950/30 via-zinc-900/90 to-zinc-950 shadow-2xl backdrop-blur-sm space-y-8"
      >
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Kicker badge */}
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for Full-Time Roles &amp; Freelance Engineering</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]"
          >
            Let's build scalable Web, Mobile, Backend &amp; AI solutions.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl"
          >
            Whether you need a full-cycle freelance engineer to architect a high-throughput backend, build a cross-platform mobile app, design an intuitive web frontend, or deploy an applied AI system — I deliver clean, production-grade code.
          </motion.p>
        </div>

        {/* 4 Pillars Grid: Web · Mobile · Backend · Scalable AI */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {capabilities.map((pillar) => (
            <div
              key={pillar.title}
              className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3 backdrop-blur-sm group hover:-translate-y-0.5 duration-200"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${pillar.accent} group-hover:scale-110 transition-transform`}>
                  <pillar.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-full border border-zinc-700/60">
                  {pillar.badge}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white tracking-tight">{pillar.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Action CTAs */}
        <div className="relative z-10 pt-2 space-y-6">
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98]"
            >
              <Mail className="w-4 h-4" />
              <span>Start a Freelance Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              type="button"
              onClick={openResume}
              className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/80 hover:border-zinc-600 text-sm font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <Eye className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Preview Resume</span>
            </button>

            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Muhammad_Hassan_Askari_CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-transparent hover:bg-zinc-800/40 text-zinc-300 hover:text-white border border-zinc-700/50 text-sm font-medium transition-all"
              title="Download PDF directly"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>Download PDF</span>
            </a>
          </motion.div>

          {/* Trust proof points */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-zinc-400"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Under 24h Response</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Web · Mobile · Backend · Scalable AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Full-Time &amp; Freelance Contracts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-zinc-500" />
              <span>Confidential NDA Ready</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
