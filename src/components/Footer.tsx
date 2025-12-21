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

      <div className="relative z-10 px-6 py-12 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8 text-center">
            {/* Brand section */}
            <div className="space-y-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {profile.name.split(' ')[2]}
              </div>
              <p className={`text-sm leading-relaxed text-justify ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {profile.title}
              </p>
              <p className={`text-sm text-justify ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Building reliable backend systems, cross-platform mobile apps, and responsive web applications with passion and precision.
              </p>
            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Get In Touch
              </h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className={`flex items-center gap-3 text-sm transition-all hover:scale-105 ${isDark ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'}`}
                  title="Send me an email"
                >
                  <Mail size={16} />
                  <span>{profile.email}</span>
                </a>
                <a
                  href="tel:+923355552845"
                  className={`flex items-center gap-3 text-sm transition-all hover:scale-105 ${isDark ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'}`}
                  title="Call me"
                >
                  <Phone size={16} />
                  <span>+92 335 555 2845</span>
                </a>
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Location:</span>
                  <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{profile.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className={`p-3 rounded-full border transition-all hover:scale-110 hover:shadow-lg ${isDark ? 'border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-cyan-400/20' : 'border-slate-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-500 hover:shadow-cyan-500/20'}`}
              aria-label="GitHub Profile"
              title="Visit my GitHub profile"
            >
              <Github size={20} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className={`p-3 rounded-full border transition-all hover:scale-110 hover:shadow-lg ${isDark ? 'border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-cyan-400/20' : 'border-slate-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-500 hover:shadow-cyan-500/20'}`}
              aria-label="Send Email"
              title="Send me an email"
            >
              <Mail size={20} />
            </a>
            <a
              href="tel:+923355552845"
              className={`p-3 rounded-full border transition-all hover:scale-110 hover:shadow-lg ${isDark ? 'border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-cyan-400/20' : 'border-slate-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-500 hover:shadow-cyan-500/20'}`}
              aria-label="Call Phone"
              title="Call me"
            >
              <Phone size={20} />
            </a>
          </div>

          {/* Bottom section */}
          <div className={`flex flex-col justify-center items-center pt-8 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className={`text-sm mb-4 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              © {new Date().getFullYear()} {profile.name}. Built with <Heart size={14} className="inline text-red-500 mx-1" /> using React & TypeScript.
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105 ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400' : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-cyan-600'} shadow-lg`}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
              <span className="text-sm font-medium">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer