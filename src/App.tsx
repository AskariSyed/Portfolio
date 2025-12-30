import React, { Suspense, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
const Navbar = React.lazy(() => import('./components/Navbar'));
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const Skills = React.lazy(() => import('./components/Skills'));
const Education = React.lazy(() => import('./components/Education'));
const Publications = React.lazy(() => import('./components/Publications'));
const Certifications = React.lazy(() => import('./components/Certifications'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

function App() {
      // Rate limiting for particle push (onClick)
      const [lastParticlePush, setLastParticlePush] = useState(0);
      const PARTICLE_PUSH_INTERVAL = 500; // ms

      // Custom handler to limit node creation
      const handleParticlesClick = useCallback((event) => {
        const now = Date.now();
        if (now - lastParticlePush > PARTICLE_PUSH_INTERVAL) {
          setLastParticlePush(now);
          return true; // allow push
        }
        return false; // block push
      }, [lastParticlePush]);
    // Initialize tsparticles engine with loadSlim
    const particlesInit = useCallback(async (engine: any) => {
      await loadSlim(engine);
    }, []);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : true;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: isDark ? "#090c16" : "#fff" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse"
              },
              onClick: {
                enable: true,
                mode: "push",
                // Custom handler for rate limiting
                // This is a workaround: react-tsparticles does not support direct event handler injection,
                // so we use a workaround by limiting the push mode quantity below
              },
              resize: true
            },
            modes: {
              repulse: {
                distance: 120,
                duration: 0.4
              },
              push: {
                // Only allow push if rate limit passes, else push 0
                quantity: handleParticlesClick() ? 4 : 0
              }
            }
          },
          particles: {
            color: { value: isDark ? ["#38bdf8", "#0ea5e9", "#6366f1", "#818cf8"] : ["#0ea5e9", "#6366f1", "#818cf8", "#38bdf8"] },
            links: {
              enable: true,
              color: isDark ? "#38bdf8" : "#6366f1",
              distance: 120,
              opacity: 0.5,
              width: 2,
              triangles: {
                enable: true,
                color: isDark ? "#818cf8" : "#6366f1",
                opacity: 0.1
              }
            },
            move: { enable: true, speed: 2, direction: "none", outModes: { default: "bounce" } },
            number: { value: 60, density: { enable: true, area: 800 } },
            opacity: { value: 0.8 },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 5 } },
          },
          detectRetina: true,
        }}
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0 }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>
      <div className={`min-h-screen ${isDark ? 'text-white' : 'text-slate-900'} transition-colors duration-500 text-sm md:text-base`} style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <Suspense fallback={<div className="w-full text-center py-10">Loading...</div>}>
          <Navbar
            isDark={isDark}
            toggleTheme={toggleTheme}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </Suspense>
        <main id="main-content" className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 md:py-20 space-y-20 sm:space-y-24 md:space-y-28">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="w-full text-center py-10">Loading...</div>}>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <Hero isDark={isDark} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
                <About isDark={isDark} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
                <Experience isDark={isDark} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
                <Projects isDark={isDark} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
                <Skills isDark={isDark} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} viewport={{ once: true }}>
                <Education isDark={isDark} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} viewport={{ once: true }}>
                <Publications isDark={isDark} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} viewport={{ once: true }}>
                <Certifications isDark={isDark} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} viewport={{ once: true }}>
                <Contact isDark={isDark} />
              </motion.div>
            </Suspense>
          </div>
        </main>
        <Suspense fallback={<div className="w-full text-center py-10">Loading...</div>}>
          <Footer isDark={isDark} />
        </Suspense>
      </div>
    </div>
  );
}

export default App