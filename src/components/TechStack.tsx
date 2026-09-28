import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { useScrollObserver } from '../hooks/useScrollObserver';
import { TechIcon } from './TechIcon';
import { Server, Layout, Cpu, Wrench, Cloud, Database, Activity } from 'lucide-react';

export const TechStack: React.FC = () => {
  const { skills } = portfolioData;

  const categoryIcons: Record<string, React.ReactNode> = {
    'DevOps & Cloud': <Cloud className="w-4 h-4 text-cyan-500" />,
    'Backend & Systems': <Server className="w-4 h-4 text-blue-500" />,
    'Databases & Storage': <Database className="w-4 h-4 text-emerald-500" />,
    'Frontend & Mobile': <Layout className="w-4 h-4 text-indigo-500" />,
    'AI & Computer Vision': <Cpu className="w-4 h-4 text-purple-500" />,
    'Observability & QA': <Activity className="w-4 h-4 text-amber-500" />,
  };

  const { ref, isInView, containerVariants, cardVariants } =
    useScrollObserver<HTMLDivElement>({
      amount: 0.15,
      margin: '-60px 0px -40px 0px',
      staggerDelay: 0.1,
    });

  return (
    <section id="stack" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Animated Section Header */}
      <SectionHeader
        kicker="Expertise & Capabilities"
        title="Tech Stack"
        description="Core toolchain spanning distributed backends, cloud DevOps, observability, and applied AI."
      />

      {/* 6 Clean Categories 2x3 Grid with Staggered Cascading Reveal */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skills.map((group) => (
          <motion.div
            key={group.category}
            variants={cardVariants}
            className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between shadow-sm hover:shadow-md group/card"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-zinc-200 dark:border-zinc-800">
                {categoryIcons[group.category] || <Wrench className="w-4 h-4 text-zinc-400" />}
                <h3 className="text-sm font-mono font-semibold tracking-wide text-zinc-900 dark:text-zinc-100 uppercase">
                  {group.category}
                </h3>
              </div>

              {/* Skill list with authentic tech logos */}
              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    <div className="p-1 rounded bg-zinc-200/60 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center shrink-0">
                      <TechIcon name={skill} size={15} />
                    </div>
                    <span className="font-medium text-[13px]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
              {group.skills.length} core competencies
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
