import { useRef } from 'react';
import { useInView, useReducedMotion, Variants } from 'framer-motion';

export interface ScrollObserverOptions {
  /**
   * Intersection threshold (0 to 1) or Framer Motion amount ('some', 'all', or number)
   * Defaults to 0.15
   */
  amount?: 'some' | 'all' | number;
  /**
   * Margin around the root. Defaults to '-60px 0px' for natural viewport entry
   */
  margin?: string;
  /**
   * Trigger animation only once upon first entering viewport.
   * Defaults to true
   */
  once?: boolean;
  /**
   * Stagger delay between child elements in seconds.
   * Defaults to 0.12
   */
  staggerDelay?: number;
  /**
   * Initial delay before animation begins in seconds.
   * Defaults to 0.05
   */
  delayChildren?: number;
}

export function useScrollObserver<T extends HTMLElement = HTMLDivElement>(
  options: ScrollObserverOptions = {}
) {
  const {
    amount = 0.15,
    margin = '-60px 0px -40px 0px',
    once = true,
    staggerDelay = 0.12,
    delayChildren = 0.05,
  } = options;

  const ref = useRef<T>(null);
  const isInView = useInView(ref, {
    amount,
    margin: margin as any,
    once,
  });
  const prefersReducedMotion = useReducedMotion();

  // Stagger container variants
  const containerVariants: Variants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : delayChildren,
      },
    },
  };

  // Staggered child item variants (subtle translation + opacity fade)
  const itemVariants: Variants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 28,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.65,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth bespoke ease
      },
    },
  };

  // Section Heading variants (subtle rise and fade)
  const headingVariants: Variants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Card reveal variant with soft scale
  const cardVariants: Variants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 36,
      scale: prefersReducedMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants,
    headingVariants,
    cardVariants,
    prefersReducedMotion,
  };
}
