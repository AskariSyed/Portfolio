import { Github, Mail, Phone, Heart, ArrowUp } from 'lucide-react'
import { profile } from '../data'

type FooterProps = {
  isDark: boolean;
};

function Footer({ isDark }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'} border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-500'} blur-3xl`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} blur-3xl`}></div>
      </div>

      <div className="relative z-10 px-4 py-8 md:px-12 md:py-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8 text-center">
            {/* Brand section */}
            <div className="space-y-3 md:space-y-4 text-center">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {profile.name.split(' ')[2]}
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {profile.title}
              </p>
              <p className={`text-xs md:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Building reliable backend systems, cross-platform mobile apps, and responsive web applications with passion and precision.
              </p>
            </div>

            {/* Quick links */}
            <div className="space-y-3 md:space-y-4 text-center">
              <h3 className={`text-base md:text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Quick Links
              </h3>
              <div className="space-y-2">
                {[
                  { href: '#about', label: 'About' },
                  { href: '#experience', label: 'Experience' },
                  { href: '#projects', label: 'Projects' },
                  { href: '#contact', label: 'Contact' }
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`block text-sm transition-colors hover:text-cyan-400 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                    title={`Go to ${link.label} section`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div className="space-y-3 md:space-y-4 text-center">
              <h3 className={`text-base md:text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Get In Touch
              </h3>
              <div className="space-y-2 md:space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className={`flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm transition-all hover:scale-105 ${isDark ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'}`}
                  title="Send me an email"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  <span className="break-all text-center">{profile.email}</span>
                </a>
                <a
                  href="tel:+923355552845"
                  className={`flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm transition-all hover:scale-105 ${isDark ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'}`}
                  title="Call me"
                >
                  <Phone size={14} className="flex-shrink-0" />
                  <span>+92 335 555 2845</span>
                </a>
                <div className="flex flex-col items-center gap-1 md:gap-3">
                  <span className={`text-xs md:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Location:</span>
                  <span className={`text-xs md:text-sm text-center ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{profile.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 md:gap-6 mb-6 md:mb-8">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className={`p-2 md:p-3 rounded-full border transition-all hover:scale-110 hover:shadow-lg ${isDark ? 'border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-cyan-400/20' : 'border-slate-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-500 hover:shadow-cyan-500/20'}`}
              aria-label="GitHub Profile"
              title="Visit my GitHub profile"
            >
              <Github size={18} className="md:w-5 md:h-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className={`p-2 md:p-3 rounded-full border transition-all hover:scale-110 hover:shadow-lg ${isDark ? 'border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-cyan-400/20' : 'border-slate-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-500 hover:shadow-cyan-500/20'}`}
              aria-label="Send Email"
              title="Send me an email"
            >
              <Mail size={18} className="md:w-5 md:h-5" />
            </a>
            <a
              href="tel:+923355552845"
              className={`p-2 md:p-3 rounded-full border transition-all hover:scale-110 hover:shadow-lg ${isDark ? 'border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-cyan-400/20' : 'border-slate-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-500 hover:shadow-cyan-500/20'}`}
              aria-label="Call Phone"
              title="Call me"
            >
              <Phone size={18} className="md:w-5 md:h-5" />
            </a>
          </div>

          {/* Bottom section */}
          <div className={`flex flex-col justify-center items-center pt-6 md:pt-8 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className={`text-xs md:text-sm mb-3 md:mb-4 text-center px-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              © {new Date().getFullYear()} {profile.name}. Built with <Heart size={12} className="inline text-red-500 mx-1" /> using React & TypeScript.
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full transition-all hover:scale-105 text-xs md:text-sm ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400' : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-cyan-600'} shadow-lg`}
              aria-label="Back to top"
            >
              <ArrowUp size={14} className="md:w-4 md:h-4" />
              <span className="font-medium">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer