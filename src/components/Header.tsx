import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useResumeModal } from '../context/ResumeModalContext';
import { Moon, Sun, Menu, X, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { openResume } = useResumeModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
    { name: 'Stack', href: '#stack' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/80 dark:bg-zinc-950/80 light:bg-white/80 backdrop-blur-md border-b border-zinc-800/60 dark:border-zinc-800/60 py-3.5 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Brand title (one line wordmark) */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          <span>{portfolioData.personal.name}</span>
        </a>

        {/* Zone 2: Navigation Links (Clean desktop navigation) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-zinc-950 dark:after:bg-zinc-100 after:origin-bottom-right hover:after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (Theme Toggle & Contact CTA) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          <button
            type="button"
            onClick={openResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-zinc-300 dark:border-zinc-800 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
            title="Preview CV / Resume"
          >
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-sm"
          >
            Get in touch
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 dark:bg-zinc-950/95 light:bg-white/95 backdrop-blur-lg border-b border-zinc-800 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-zinc-300 dark:text-zinc-300 light:text-zinc-800 hover:text-white dark:hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-800/50 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openResume();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-center text-xs font-semibold rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-900"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Preview Resume</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center text-xs font-semibold rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
