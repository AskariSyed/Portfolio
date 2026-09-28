import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, Project } from '../data/portfolioData';
import { ProjectGraphic } from './ProjectGraphic';
import { ProjectDetailModal } from './ProjectDetailModal';
import { SectionHeader } from './SectionHeader';
import { useScrollObserver } from '../hooks/useScrollObserver';
import { MagneticProjectCard } from './MagneticProjectCard';
import { ArrowUpRight, Github, Lock, Layers, Globe } from 'lucide-react';

type FilterCategory = 'all' | 'ai' | 'fullstack' | 'mobile' | 'tools';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filterTabs: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Projects', count: projects.length },
    {
      id: 'ai',
      label: 'AI & Vision',
      count: projects.filter((p) => p.category === 'ai').length,
    },
    {
      id: 'fullstack',
      label: 'Full-Stack',
      count: projects.filter((p) => p.category === 'fullstack').length,
    },
    {
      id: 'mobile',
      label: 'Mobile & Freelance',
      count: projects.filter((p) => p.category === 'mobile').length,
    },
    {
      id: 'tools',
      label: 'Systems & Tools',
      count: projects.filter((p) => p.category === 'tools').length,
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Animated Section Header */}
      <SectionHeader
        kicker="Selected Work"
        title="Featured Projects"
        description="Production systems, applied RAG pipelines, computer vision benchmarks, and shipped client applications."
      />

      {/* Filter Tabs / Segmented Controls */}
      <div className="mb-14 flex items-center justify-start overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] ${
                    isActive
                      ? 'text-zinc-300 dark:text-zinc-600'
                      : 'text-zinc-400 dark:text-zinc-600'
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List with Generous Spacing and Staggered Scroll Observer */}
      <motion.div layout className="space-y-24 sm:space-y-32">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCardItem
                project={project}
                index={index}
                onSelect={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal for Detailed Breakdown */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

interface ProjectCardItemProps {
  project: Project;
  index: number;
  onSelect: () => void;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({ project, index, onSelect }) => {
  const isEven = index % 2 === 1;

  const { ref, isInView, containerVariants, cardVariants, itemVariants } =
    useScrollObserver<HTMLElement>({
      amount: 0.15,
      margin: '-70px 0px -40px 0px',
      staggerDelay: 0.14,
      delayChildren: 0.05,
    });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
    >
      {/* Visual Card / Screenshot Container (7 columns on desktop) with magnetic hover & glowing border */}
      <motion.div
        variants={cardVariants}
        className={`lg:col-span-7 ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <MagneticProjectCard project={project} onClick={onSelect}>
          <div className="relative w-full h-full">
            <ProjectGraphic project={project} />

            {/* Hover Overlay Hint */}
            <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-zinc-950/90 border border-zinc-700 text-xs font-mono text-zinc-200 backdrop-blur-md flex items-center gap-1.5 shadow-xl">
                <Layers className="w-3.5 h-3.5" />
                Click for architecture breakdown
              </span>
            </div>
          </div>
        </MagneticProjectCard>
      </motion.div>

      {/* Text & Metadata Container (5 columns on desktop) */}
      <motion.div
        variants={itemVariants}
        className={`lg:col-span-5 space-y-5 ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        {/* Header row: Project number + Badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 font-medium">
            0{index + 1}.
          </span>
          {project.badge && (
            <span className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              {project.badge}
            </span>
          )}
          {project.note && (
            <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 dark:text-zinc-400">
              <Lock className="w-3 h-3" />
              {project.note}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={onSelect}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {project.title}
        </h3>

        {/* One-line Hook */}
        <p className="text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300">
          {project.hook}
        </p>

        {/* 2-3 Line Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {/* Stack Tags (Clean minimal typographic tags) */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            {project.tags.map((tag, tagIdx) => (
              <React.Fragment key={tag}>
                <span className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  {tag}
                </span>
                {tagIdx < project.tags.length - 1 && (
                  <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Actions & Links */}
        <div className="pt-3 flex items-center gap-4">
          {project.link && (
            <a
              href={project.link.url}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
            >
              {project.link.url.includes('github.com') ? (
                <Github className="w-4 h-4" />
              ) : (
                <Globe className="w-4 h-4 text-emerald-500" />
              )}
              <span>{project.link.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          )}

          <button
            onClick={onSelect}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors underline underline-offset-4"
          >
            <span>View deep dive</span>
          </button>
        </div>
      </motion.div>
    </motion.article>
  );
};
