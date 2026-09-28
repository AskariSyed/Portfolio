import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useScrollObserver, ScrollObserverOptions } from '../hooks/useScrollObserver';

interface ScrollRevealSectionProps extends ScrollObserverOptions {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
}

/**
 * ScrollRevealSection wraps any section or content block and coordinates
 * staggered scroll-driven entry animations using Framer Motion's useInView
 * while strictly respecting the 'prefers-reduced-motion' user preference.
 */
export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  id,
  as = 'section',
  amount = 0.15,
  margin = '-60px 0px -40px 0px',
  once = true,
  staggerDelay = 0.12,
  delayChildren = 0.05,
}) => {
  const { ref, isInView, containerVariants } = useScrollObserver<HTMLElement>({
    amount,
    margin,
    once,
    staggerDelay,
    delayChildren,
  });

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      id={id}
      ref={ref as any}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: 'div' | 'article' | 'li' | 'p' | 'span';
}

/**
 * ScrollRevealItem is a child of ScrollRevealSection that receives the parent's
 * staggered trigger and animates upward into position, or renders immediately
 * if prefers-reduced-motion is active.
 */
export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  children,
  className = '',
  variants,
  as = 'div',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const defaultVariants: Variants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  const MotionElement = motion[as];

  return (
    <MotionElement variants={variants || defaultVariants} className={className}>
      {children}
    </MotionElement>
  );
};
