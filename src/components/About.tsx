import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { useScrollObserver } from '../hooks/useScrollObserver';
import {
  MapPin,
  GraduationCap,
  Briefcase,
  Github,
  Linkedin,
  ArrowUpRight,
  Code2,
  Sparkles,
  Award,
  Terminal,
  FileText,
  BookOpen,
  Eye,
} from 'lucide-react';
import { useResumeModal } from '../context/ResumeModalContext';

export const About: React.FC = () => {
  const { personal } = portfolioData;
  const { openResume } = useResumeModal();

  const { ref, isInView, containerVariants, itemVariants, cardVariants } =
    useScrollObserver<HTMLDivElement>({
      amount: 0.15,
      margin: '-60px 0px -40px 0px',
      staggerDelay: 0.12,
    });

  return (
    <section id="about" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      <SectionHeader
        kicker="About Me"
        title="Background & Engineering Philosophy"
        badge={
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>{personal.location}</span>
          </div>
        }
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
      >
        {/* Left: Bio, Philosophy & Direct Links (7 columns) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                Hands-on builder who ships working software.
              </h3>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                {personal.shortBio}
              </p>
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-4 backdrop-blur-sm"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider">
                  Education &amp; Academic Merit
                </span>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {personal.education}
                </p>
                <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  CGPA: 3.65 / 4.00 · 133 Credit Hours · Head of Operations, Student Startup Business Society
                </p>
              </div>
            </motion.div>

            {/* Status & Opportunities Card */}
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-4 backdrop-blur-sm"
            >
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider">
                  Current Status &amp; Opportunities
                </span>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {personal.status}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Direct profiles */}
          <motion.div variants={itemVariants} className="pt-2 flex items-center gap-6">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors group"
            >
              <Github className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors group"
            >
              <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={openResume}
              className="inline-flex items-center gap-2 text-sm font-mono text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group font-semibold cursor-pointer"
            >
              <Eye className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
              <span>Preview CV</span>
            </button>

            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Muhammad_Hassan_Askari_CV.pdf"
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors group"
              title="Download PDF directly"
            >
              <FileText className="w-4 h-4 text-zinc-400 group-hover:scale-110 transition-transform" />
              <span>Download PDF</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://research-with-askari.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group font-semibold"
            >
              <BookOpen className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
              <span>Research Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right: Technical Focus & Highlights Card (5 columns) */}
        <motion.div variants={cardVariants} className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md p-6 sm:p-7 space-y-6 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <Terminal className="w-4 h-4 text-blue-500" />
                <span>CORE COMPETENCIES</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Full-Stack + AI
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  <span>Backend &amp; Distributed Systems</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Architecting concurrency-safe REST APIs in ASP.NET Core &amp; FastAPI, relational databases (SQL, PostgreSQL), and vector storage.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Applied AI &amp; Computer Vision</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Grounding LLMs with semantic pgvector RAG retrieval, image classification under weather degradation, and real-time YOLOv8 pipelines.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span>Production Impact &amp; Delivery</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Shipped university-wide recruitment portals, government workflow digitizations at PTA, and banking QA analytics at HBL.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <span>Ready for New Challenges</span>
              <a
                href="#contact"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
