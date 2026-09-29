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

  // Draw a frame image with object-fit: cover onto canvas
  const drawImageToCanvas = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      const canvasRatio = w / h;
      const imgRatio = iw / ih;

      let drawW = w;
      let drawH = h;
      let offX = 0;
      let offY = 0;

      if (canvasRatio > imgRatio) {
        drawH = w / imgRatio;
        offY = (h - drawH) / 2;
      } else {
        drawW = h * imgRatio;
        offX = (w - drawW) / 2;
      }

      ctx.drawImage(img, offX, offY, drawW, drawH);
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

    // Only draw if frame or theme changed
    if (
      frameToDraw !== lastDrawnFrameRef.current ||
      activeTheme !== lastDrawnThemeRef.current
    ) {
      const img = getBestFrameImage(activeTheme, frameToDraw);
      if (img) {
        drawImageToCanvas(img);
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

    canvas.width = width * dpr;
    canvas.height = height * dpr;

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
      drawImageToCanvas(img);
      lastDrawnFrameRef.current = 1;
      lastDrawnThemeRef.current = activeMode;
    });

    // 2. Preload first frame of opposite theme so instant toggle is ready
    loadFrame(otherMode, 1);

    // 3. Progressively preload all remaining frames of current theme in batches
    let isCancelled = false;

    const preloadBatch = async () => {
      // Prioritize active theme frames
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        await loadFrame(activeMode, i).catch(() => {});
        // Yield to browser main thread
        if (i % 5 === 0) {
          await new Promise((r) => setTimeout(r, 10));
        }
      }

      // Then preload the opposite theme frames when active is done
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
