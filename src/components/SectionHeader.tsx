import React from 'react';
import { motion } from 'framer-motion';
import { useScrollObserver } from '../hooks/useScrollObserver';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  badge?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  description,
  badge,
  className = '',
}) => {
  const { ref, isInView, containerVariants, headingVariants } = useScrollObserver<HTMLDivElement>({
    amount: 0.2,
    margin: '-40px 0px',
    staggerDelay: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4 ${className}`}
    >
      <div className="space-y-1">
        <motion.div variants={headingVariants} className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
            {kicker}
          </span>
        </motion.div>
        <motion.h2
          variants={headingVariants}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          {title}
        </motion.h2>
      </div>

      {(description || badge) && (
        <motion.div variants={headingVariants} className="flex items-center gap-4">
          {description && (
            <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
              {description}
            </p>
          )}
          {badge}
        </motion.div>
      )}
    </motion.div>
  );
};
