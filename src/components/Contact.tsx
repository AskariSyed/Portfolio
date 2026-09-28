import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { useScrollObserver } from '../hooks/useScrollObserver';
import { usePrivacyModal } from '../context/PrivacyModalContext';
import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check, Shield } from 'lucide-react';

export const Contact: React.FC = () => {
  const { personal } = portfolioData;
  const { openPrivacy } = usePrivacyModal();
  const [copied, setCopied] = useState(false);
  const [subjectTopic, setSubjectTopic] = useState('Junior / Graduate Role Opportunity');

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${subjectTopic} — Muhammad Hassan Askari`
  )}&body=${encodeURIComponent(
    `Hi Askari,\n\nI reviewed your portfolio and would like to discuss an opportunity regarding ${subjectTopic}.\n\nBest regards,\n`
  )}`;

  const { ref, isInView, containerVariants, itemVariants, cardVariants } =
    useScrollObserver<HTMLDivElement>({
      amount: 0.15,
      margin: '-60px 0px -40px 0px',
      staggerDelay: 0.12,
    });

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Animated Section Header */}
      <SectionHeader
        kicker="Get In Touch"
        title="Let's Connect"
        badge={
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Responding within 24 hours</span>
          </div>
        }
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        {/* Left: Big Email Callout & Direct Links (7 columns) */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8">
          <div>
            <p className="text-xs font-mono uppercase text-zinc-600 dark:text-zinc-400 mb-2">
              Direct Inquiries
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={mailtoUrl}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
              >
                {personal.email}
              </a>

              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
            Currently open to junior/graduate software engineering roles and freelance engineering contracts across Web, Mobile, Scalable Backends (C#/.NET, Python/FastAPI), and Applied AI systems. Feel free to reach out directly.
          </p>

          {/* Social Profiles */}
          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-mono text-zinc-800 dark:text-zinc-200 transition-all shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-mono text-zinc-800 dark:text-zinc-200 transition-all shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-blue-500" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        </motion.div>

        {/* Right: Quick Mailto Composer (5 columns) with card scale entrance */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm hover:shadow-md"
        >
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Quick Contact Launcher
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Select an inquiry type to pre-fill your email client directly.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase text-zinc-600 dark:text-zinc-400">
              Topic of Interest
            </label>
            <div className="space-y-2">
              {[
                'Freelance: Web, Mobile, Backend & Scalable AI',
                'Junior / Graduate Role Opportunity',
                'Scalable Backend & Cloud (.NET / FastAPI / AWS)',
                'Applied AI & RAG Pipeline Engineering',
                'General Inquiries & Chat',
              ].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSubjectTopic(topic)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                    subjectTopic === topic
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700/60'
                  }`}
                >
                  <span>{topic}</span>
                  {subjectTopic === topic && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <a
            href={mailtoUrl}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-wide transition-all shadow-md active:scale-[0.98]"
          >
            <Mail className="w-4 h-4" />
            <span>Launch Email Client</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <div className="text-center space-y-1.5 pt-1">
            <span className="block text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
              No backend forms · Direct client-to-client communication
            </span>
            <button
              type="button"
              onClick={openPrivacy}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 hover:text-blue-500 dark:hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>Zero-tracking Privacy Policy</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
