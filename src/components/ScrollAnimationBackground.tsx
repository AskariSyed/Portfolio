import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const TOTAL_FRAMES = 120;

export const ScrollAnimationBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cache loaded HTMLImageElements by theme: { light: Map, dark: Map }
  const imagesCache = useRef<{
    light: Map<number, HTMLImageElement>;
    dark: Map<number, HTMLImageElement>;
  }>({
    light: new Map(),
    dark: new Map(),
  });

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const lastDrawnThemeRef = useRef<string>('');
  const rafIdRef = useRef<number | null>(null);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);

  // Dimensions tracking
  const viewportRef = useRef({ width: 0, height: 0, dpr: 1 });

  // Helper to format frame URL
  const getFrameUrl = useCallback((mode: 'light' | 'dark', index: number) => {
    const padded = String(index).padStart(3, '0');
    return `/frames/${mode}mode-frames/ezgif-frame-${padded}.jpg`;
  }, []);

  // Helper to load a single frame
  const loadFrame = useCallback(
    (mode: 'light' | 'dark', index: number): Promise<HTMLImageElement> => {
      const cache = imagesCache.current[mode];
      if (cache.has(index)) {
        return Promise.resolve(cache.get(index)!);
      }
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = getFrameUrl(mode, index);
        img.onload = () => {
          cache.set(index, img);
          resolve(img);
        };
        img.onerror = reject;
      });
    },
    [getFrameUrl]
  );

  // Draw a frame image with zoomed-out scale and bottom-aligned framing
  const drawImageToCanvas = useCallback(
    (img: HTMLImageElement, activeTheme: 'light' | 'dark') => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const { width, height, dpr } = viewportRef.current;
      if (width === 0 || height === 0) return;

      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      ctx.save();
      // Scale canvas context by DPR for razor-sharp rendering on Retina/HiDPI screens
      ctx.scale(dpr, dpr);

      // Enable high-quality image smoothing to eliminate blur
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Fill canvas background with exact matching theme color so edges blend seamlessly
      const isDark = activeTheme === 'dark';
      ctx.fillStyle = isDark ? '#131718' : '#f5f5f5';
      ctx.fillRect(0, 0, width, height);

      // Zoomed-out scaling calculation:
      // Ensure the frame is scaled down so everything is smaller and character feet are never cut off
      const isMobile = width < 768;
      let scale: number;
      let bottomPadding: number;

      if (isMobile) {
        // Mobile: comfortable width fit, preventing any vertical cut
        scale = Math.min((width * 0.96) / iw, (height * 0.78) / ih);
        bottomPadding = Math.max(20, height * 0.05);
      } else {
        // Desktop / Laptop / Tablet:
        // Scaled to ~82% of viewport height & 86% of width so the character is smaller,
        // crisp (no over-magnification blur), and comfortably framed
        const maxHScale = (height * 0.82) / ih;
        const maxWScale = (width * 0.86) / iw;
        scale = Math.min(maxWScale, maxHScale);
        bottomPadding = Math.max(28, height * 0.055);
      }

      const drawW = iw * scale;
      const drawH = ih * scale;

      // Center horizontally
      const offX = (width - drawW) / 2;

      // Bottom-align with breathing room so the feet (which are at 96.7% height) are completely visible
      const offY = Math.max(16, height - drawH - bottomPadding);

      ctx.drawImage(img, offX, offY, drawW, drawH);
      ctx.restore();
    },
    []
  );

  // Find exact or nearest loaded frame to avoid flickering
  const getBestFrameImage = useCallback(
    (mode: 'light' | 'dark', targetIndex: number): HTMLImageElement | null => {
      const cache = imagesCache.current[mode];
      if (cache.has(targetIndex)) {
        return cache.get(targetIndex)!;
      }

      // Find nearest loaded frame
      let nearest: HTMLImageElement | null = null;
      let minDiff = Infinity;
      for (const [idx, img] of cache.entries()) {
        const diff = Math.abs(idx - targetIndex);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = img;
        }
      }
      return nearest;
    },
    []
  );

  // Render loop
  const renderLoop = useCallback(() => {
    // Lerp current frame towards target frame for silky smooth animation
    const diff = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(diff) > 0.01) {
      currentFrameRef.current += diff * 0.18;
    } else {
      currentFrameRef.current = targetFrameRef.current;
    }

    const frameToDraw = Math.round(
      Math.min(TOTAL_FRAMES, Math.max(1, currentFrameRef.current))
    );

    const activeTheme = theme === 'dark' ? 'dark' : 'light';

    // Redraw if frame or theme changed
    if (
      frameToDraw !== lastDrawnFrameRef.current ||
      activeTheme !== lastDrawnThemeRef.current
    ) {
      const img = getBestFrameImage(activeTheme, frameToDraw);
      if (img) {
        drawImageToCanvas(img, activeTheme);
        lastDrawnFrameRef.current = frameToDraw;
        lastDrawnThemeRef.current = activeTheme;
      }
    }

    rafIdRef.current = requestAnimationFrame(renderLoop);
  }, [theme, getBestFrameImage, drawImageToCanvas]);

  // Handle Resize and DPR
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    viewportRef.current = { width, height, dpr };

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // Force redraw on next frame
    lastDrawnFrameRef.current = -1;
  }, []);

  // Update target frame from scroll
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    if (maxScroll <= 0) {
      targetFrameRef.current = 1;
      return;
    }

    const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
    const target = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
    );
    targetFrameRef.current = target;
  }, []);

  // Initialize canvas size, scroll listener and render loop
  useEffect(() => {
    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleResize, handleScroll, renderLoop]);

  // Load first frame immediately for quick display, then progressive preload
  useEffect(() => {
    const activeMode = theme === 'dark' ? 'dark' : 'light';
    const otherMode = activeMode === 'dark' ? 'light' : 'dark';

    // 1. Instantly load initial frame of active theme
    loadFrame(activeMode, 1).then((img) => {
      setInitialFrameLoaded(true);
      drawImageToCanvas(img, activeMode);
      lastDrawnFrameRef.current = 1;
      lastDrawnThemeRef.current = activeMode;
    });

    // 2. Preload first frame of opposite theme so instant toggle is ready
    loadFrame(otherMode, 1);

    // 3. Progressively preload all remaining frames of current theme in batches
    let isCancelled = false;

    const preloadBatch = async () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        await loadFrame(activeMode, i).catch(() => {});
        if (i % 5 === 0) {
          await new Promise((r) => setTimeout(r, 10));
        }
      }

      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        await loadFrame(otherMode, i).catch(() => {});
        if (i % 5 === 0) {
          await new Promise((r) => setTimeout(r, 20));
        }
      }
    };

    preloadBatch();

    return () => {
      isCancelled = true;
    };
  }, [theme, loadFrame, drawImageToCanvas]);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-500 ${
          initialFrameLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
    </div>
  );
};
