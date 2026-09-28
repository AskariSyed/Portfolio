import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { useScrollObserver } from '../hooks/useScrollObserver';
import { Briefcase, Calendar, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const { experiences } = portfolioData;

  const { ref, isInView, containerVariants, itemVariants } = useScrollObserver<HTMLDivElement>({
    amount: 0.15,
    margin: '-50px 0px',
    staggerDelay: 0.15,
  });

  return (
    <section id="experience" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      <SectionHeader
        kicker="Career Journey"
        title="Experience"
        description="Hands-on engineering in telecommunications & banking infrastructure."
        badge={
          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>2 Positions · Engineering &amp; SQA</span>
          </div>
        }
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="relative space-y-8"
      >
        {/* Subtle decorative vertical track on md+ screens */}
        <div className="hidden md:block absolute left-8 top-6 bottom-6 w-px bg-gradient-to-b from-blue-500/40 via-zinc-300 dark:via-zinc-800 to-transparent pointer-events-none" />

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            variants={itemVariants}
            className="relative md:pl-20 group"
          >
            {/* Timeline node icon */}
            <div className="hidden md:flex absolute left-5 top-7 -translate-x-1/2 w-7 h-7 rounded-full bg-white dark:bg-zinc-950 border-2 border-blue-500 text-blue-500 items-center justify-center shadow-md shadow-blue-500/10 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 z-10">
              <span className="w-2 h-2 rounded-full bg-current" />
            </div>

            {/* Experience Card */}
            <div className="relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-md p-6 sm:p-8 hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:bg-white/90 dark:hover:bg-zinc-900/80 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/5">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-zinc-200/60 dark:border-zinc-800/60">
                <div className="flex items-start gap-4">
                  {/* Company Logo or Icon */}
                  {exp.logo ? (
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 p-2 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-blue-500/30 transition-colors">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                        {exp.role}
                      </h3>
                      {exp.badge && (
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300/50 dark:border-zinc-700/50">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300">
                      {exp.company}
                    </p>
                  </div>
                </div>

                {/* Meta details & external link */}
                <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2.5 flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>

                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all hover:scale-105"
                        title={`Visit ${exp.company}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Bulleted Achievements */}
              <div className="pt-6 space-y-3">
                <ul className="space-y-2.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300/90 leading-relaxed">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies / Skills used */}
              {exp.skills && exp.skills.length > 0 && (
                <div className="pt-6 mt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase text-zinc-400 dark:text-zinc-500 mr-2">
                    Key Focus:
                  </span>
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
