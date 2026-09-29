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
    return `/frames/${mode}mode-frames/ezgif-frame-${padded}.webp`;
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

  // Find exact or nearest loaded frame
  const getBestFrameImage = useCallback(
    (mode: 'light' | 'dark', targetIndex: number): HTMLImageElement | null => {
      const cache = imagesCache.current[mode];
      if (cache.has(targetIndex)) {
        return cache.get(targetIndex)!;
      }

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

  // Draw two frames with alpha blending for buttery-smooth transition
  const drawBlendedFramesToCanvas = useCallback(
    (
      imgFloor: HTMLImageElement,
      imgCeil: HTMLImageElement | null,
      blendRatio: number,
      activeTheme: 'light' | 'dark'
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const { width, height, dpr } = viewportRef.current;
      if (width === 0 || height === 0) return;

      const iw = imgFloor.naturalWidth || 1920;
      const ih = imgFloor.naturalHeight || 1080;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Solid backdrop matching edge color
      const isDark = activeTheme === 'dark';
      ctx.fillStyle = isDark ? '#131718' : '#f5f5f5';
      ctx.fillRect(0, 0, width, height);

      // Scaled framing so the character is smaller and feet are never cut off
      const isMobile = width < 768;
      let scale: number;
      let bottomPadding: number;

      if (isMobile) {
        scale = Math.min((width * 0.96) / iw, (height * 0.78) / ih);
        bottomPadding = Math.max(20, height * 0.05);
      } else {
        const maxHScale = (height * 0.82) / ih;
        const maxWScale = (width * 0.86) / iw;
        scale = Math.min(maxWScale, maxHScale);
        bottomPadding = Math.max(28, height * 0.055);
      }

      const drawW = iw * scale;
      const drawH = ih * scale;
      const offX = (width - drawW) / 2;
      const offY = Math.max(16, height - drawH - bottomPadding);

      // 1. Draw base (floor) frame
      ctx.globalAlpha = 1.0;
      ctx.drawImage(imgFloor, offX, offY, drawW, drawH);

      // 2. Crossfade next (ceil) frame on top according to subframe decimal
      if (blendRatio > 0.008 && imgCeil && imgCeil !== imgFloor) {
        ctx.globalAlpha = blendRatio;
        ctx.drawImage(imgCeil, offX, offY, drawW, drawH);
      }

      ctx.restore();
    },
    []
  );

  // Render loop with fluid dampening and continuous crossfade
  const renderLoop = useCallback(() => {
    // Smoother lerping (0.09) eliminates discrete scroll jumps
    const diff = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(diff) > 0.001) {
      currentFrameRef.current += diff * 0.09;
    } else {
      currentFrameRef.current = targetFrameRef.current;
    }

    const currentPos = Math.min(
      TOTAL_FRAMES,
      Math.max(1, currentFrameRef.current)
    );

    const floorIndex = Math.floor(currentPos);
    const ceilIndex = Math.min(TOTAL_FRAMES, floorIndex + 1);
    const blendRatio = currentPos - floorIndex;

    const activeTheme = theme === 'dark' ? 'dark' : 'light';

    // Redraw whenever position shifts noticeably or theme changes
    const shouldDraw =
      Math.abs(currentPos - lastDrawnFrameRef.current) > 0.005 ||
      activeTheme !== lastDrawnThemeRef.current;

    if (shouldDraw) {
      const imgFloor = getBestFrameImage(activeTheme, floorIndex);
      const imgCeil =
        blendRatio > 0.008
          ? getBestFrameImage(activeTheme, ceilIndex)
          : null;

      if (imgFloor) {
        drawBlendedFramesToCanvas(imgFloor, imgCeil, blendRatio, activeTheme);
        lastDrawnFrameRef.current = currentPos;
        lastDrawnThemeRef.current = activeTheme;
      }
    }

    rafIdRef.current = requestAnimationFrame(renderLoop);
  }, [theme, getBestFrameImage, drawBlendedFramesToCanvas]);

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

    // Force redraw
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
    const target = 1 + progress * (TOTAL_FRAMES - 1);
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
      drawBlendedFramesToCanvas(img, null, 0, activeMode);
      lastDrawnFrameRef.current = 1;
      lastDrawnThemeRef.current = activeMode;
    });

    // 2. Preload first frame of opposite theme
    loadFrame(otherMode, 1);

    // 3. Progressively preload all remaining frames
    let isCancelled = false;

    const preloadBatch = async () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        await loadFrame(activeMode, i).catch(() => {});
        if (i % 6 === 0) {
          await new Promise((r) => setTimeout(r, 8));
        }
      }

      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        await loadFrame(otherMode, i).catch(() => {});
        if (i % 6 === 0) {
          await new Promise((r) => setTimeout(r, 16));
        }
      }
    };

    preloadBatch();

    return () => {
      isCancelled = true;
    };
  }, [theme, loadFrame, drawBlendedFramesToCanvas]);

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
