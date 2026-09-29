/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeProvider } from './context/ThemeContext';
import { ResumeModalProvider } from './context/ResumeModalContext';
import { PrivacyModalProvider } from './context/PrivacyModalContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { CallToAction } from './components/CallToAction';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InteractiveBackground } from './components/InteractiveBackground';
import { ScrollAnimationBackground } from './components/ScrollAnimationBackground';
import { ResumeModal } from './components/ResumeModal';
import { PrivacyModal } from './components/PrivacyModal';

export default function App() {
  return (
    <ThemeProvider>
      <ResumeModalProvider>
        <PrivacyModalProvider>
          <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-blue-600 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
            {/* Fixed Bg.png background — fades on scroll */}
            <ScrollAnimationBackground />
            {/* Interactive Mouse-following Grid Canvas */}
            <InteractiveBackground />

            {/* Sticky Minimal Navigation */}
            <Header />

            {/* Main Content Area */}
            <main className="relative">
              <Hero />
              <Projects />
              <Experience />
              <About />
              <TechStack />
              <CallToAction />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Modals */}
            <ResumeModal />
            <PrivacyModal />
          </div>
        </PrivacyModalProvider>
      </ResumeModalProvider>
      {/* Vercel Analytics — counts visitors & page views */}
      <Analytics />
      {/* Vercel Speed Insights — measures Core Web Vitals (LCP, FID, CLS) */}
      <SpeedInsights />
    </ThemeProvider>
  );
}
