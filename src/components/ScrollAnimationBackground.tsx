import React, { useEffect, useState } from 'react';

export const ScrollAnimationBackground: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Full opacity at top, fades to 0.85 over the first 800px of scroll
      const newOpacity = Math.max(0.85, 1 - (scrollY / 800) * 0.3);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none flex items-end justify-end"
      style={{ opacity }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
      <img
        src="/Bg.png"
        alt="Avatar"
        className="max-w-full max-h-full object-contain"
        style={{ animation: 'float 4s ease-in-out infinite' }}
        draggable={false}
      />
    </div>
  );
};
