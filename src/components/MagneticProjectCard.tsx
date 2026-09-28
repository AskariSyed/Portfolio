import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { Project } from '../data/portfolioData';

interface MagneticProjectCardProps {
  project: Project;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MagneticProjectCard: React.FC<MagneticProjectCardProps> = ({
  project,
  children,
  onClick,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mouse normalized coordinates: -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Exact pixel coordinates for the glowing border highlight
  const glowX = useMotionValue(-500);
  const glowY = useMotionValue(-500);

  // Spring physics for smooth magnetic attraction and gentle 3D tilt
  const springConfig = { damping: 22, stiffness: 260, mass: 0.6 };
  const magneticX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const magneticY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xCoord = e.clientX - rect.left;
    const yCoord = e.clientY - rect.top;

    const normX = xCoord / rect.width - 0.5;
    const normY = yCoord / rect.height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);
    glowX.set(xCoord);
    glowY.set(yCoord);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    glowX.set(-500);
    glowY.set(-500);
  };

  // Determine dynamic glowing accent colors based on project theme
  const getGlowColors = (type: string) => {
    switch (type) {
      case 'portal':
        return { primary: 'rgba(59, 130, 246, 0.75)', secondary: 'rgba(99, 102, 241, 0.45)' };
      case 'rag':
        return { primary: 'rgba(16, 185, 129, 0.75)', secondary: 'rgba(20, 184, 166, 0.45)' };
      case 'vision':
        return { primary: 'rgba(245, 158, 11, 0.75)', secondary: 'rgba(249, 115, 22, 0.45)' };
      case 'snow':
        return { primary: 'rgba(6, 182, 212, 0.75)', secondary: 'rgba(59, 130, 246, 0.45)' };
      case 'classifier':
        return { primary: 'rgba(168, 85, 247, 0.75)', secondary: 'rgba(139, 92, 246, 0.45)' };
      case 'tax':
        return { primary: 'rgba(16, 185, 129, 0.75)', secondary: 'rgba(5, 150, 105, 0.45)' };
      case 'parallel':
        return { primary: 'rgba(59, 130, 246, 0.75)', secondary: 'rgba(6, 182, 212, 0.45)' };
      case 'topaz':
        return { primary: 'rgba(245, 158, 11, 0.75)', secondary: 'rgba(16, 185, 129, 0.45)' };
      default:
        return { primary: 'rgba(59, 130, 246, 0.75)', secondary: 'rgba(16, 185, 129, 0.45)' };
    }
  };

  const colors = getGlowColors(project.wireframeType);

  // Dynamic radiant beam that hugs the perimeter under the cursor
  const dynamicBorderGlow = useMotionTemplate`radial-gradient(380px circle at ${glowX}px ${glowY}px, ${colors.primary}, ${colors.secondary} 45%, transparent 75%)`;

  return (
    <div className={`relative perspective-1000 ${className}`}>
      {/* Outer ambient blur aura */}
      <motion.div
        className="absolute -inset-2.5 rounded-3xl pointer-events-none blur-xl transition-opacity duration-500 -z-10"
        style={{
          opacity: isHovered && !prefersReducedMotion ? 0.35 : 0,
          background: dynamicBorderGlow,
        }}
        aria-hidden="true"
      />

      {/* Main Magnetic Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          x: prefersReducedMotion ? 0 : magneticX,
          y: prefersReducedMotion ? 0 : magneticY,
          rotateX: prefersReducedMotion ? 0 : tiltX,
          rotateY: prefersReducedMotion ? 0 : tiltY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: prefersReducedMotion ? 1 : 1.025,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 25,
          mass: 0.5,
        }}
        className="relative p-[1.5px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Dynamic Glowing Border Layer */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered && !prefersReducedMotion ? 1 : 0.25,
            background: isHovered && !prefersReducedMotion
              ? dynamicBorderGlow
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03))',
          }}
          aria-hidden="true"
        />

        {/* Inner Card Content */}
        <div className="relative z-10 w-full h-full rounded-[15px] overflow-hidden bg-zinc-900 dark:bg-zinc-950 border border-zinc-800/90 group/card">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
