import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText, Eye } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useResumeModal } from '../context/ResumeModalContext';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;
  const { openResume } = useResumeModal();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 max-w-6xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-4xl space-y-8 my-auto"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="inline-flex">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/60 dark:bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Open for Roles &amp; Freelance (Web · Mobile · Backend · Scalable AI)</span>
          </div>
        </motion.div>

        {/* Role & Name Kicker */}
        <motion.div variants={itemVariants} className="space-y-3">
          <p className="text-sm sm:text-base font-mono tracking-wide text-zinc-400 uppercase">
            {personal.name} · {personal.location}
          </p>

          {/* Large Typographic Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08] text-balance">
            Software Developer crafting applied AI systems &amp; robust full-stack platforms.
          </h1>
        </motion.div>

        {/* Short Bio */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300/90 max-w-2xl font-normal leading-relaxed"
        >
          {personal.shortBio}
        </motion.p>

        {/* Actions & CTAs */}
        <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-md active:scale-[0.98]"
          >
            <span>View my work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <button
            type="button"
            onClick={openResume}
            className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 hover:border-blue-500/50 text-sm font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Preview CV</span>
          </button>

          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Muhammad_Hassan_Askari_CV.pdf"
            className="group inline-flex items-center gap-2 px-4 py-3.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 text-sm font-medium transition-all shadow-sm active:scale-[0.98]"
            title="Download PDF directly"
          >
            <FileText className="w-4 h-4 text-zinc-500 group-hover:scale-110 transition-transform" />
            <span>Download</span>
          </a>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 text-sm font-medium transition-all"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-zinc-100" />
          </a>
        </motion.div>
      </motion.div>

      {/* Subtle Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative z-10 pt-12 flex items-center justify-between border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs text-zinc-600 dark:text-zinc-400 font-mono"
      >
        <div className="flex items-center gap-4">
          <span>{personal.roleHeadline}</span>
        </div>
        <a
          href="#work"
          className="flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-200 transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};
