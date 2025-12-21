import { Moon, Sun, Menu } from 'lucide-react'
import { profile } from '../data'

type NavbarProps = {
  isDark: boolean;
  toggleTheme: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

function Navbar({ isDark, toggleTheme, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  return (
    <nav className={`sticky top-0 z-50 ${isDark ? 'bg-[#101624]/90' : 'bg-white/80'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} backdrop-blur-md transition-colors duration-500`}>
      <div className="w-full px-6 py-4 flex justify-between items-center h-16">
        <div className={`font-bold text-lg ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
          {profile.name.split(' ')[2]}
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#about" className={`text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded ${isDark ? 'text-slate-100 hover:text-cyan-400' : 'text-slate-900 hover:text-cyan-600'}`}>About</a>
          <a href="#experience" className={`text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded ${isDark ? 'text-slate-100 hover:text-cyan-400' : 'text-slate-900 hover:text-cyan-600'}`}>Experience</a>
          <a href="#projects" className={`text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded ${isDark ? 'text-slate-100 hover:text-cyan-400' : 'text-slate-900 hover:text-cyan-600'}`}>Projects</a>
          <a href="#skills" className={`text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded ${isDark ? 'text-slate-100 hover:text-cyan-400' : 'text-slate-900 hover:text-cyan-600'}`}>Skills</a>
          <a href="#contact" className={`text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded ${isDark ? 'text-slate-100 hover:text-cyan-400' : 'text-slate-900 hover:text-cyan-600'}`}>Contact</a>
        </div>

        {/* Nav Actions */}
        <div className="flex gap-3 items-center">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${isDark ? 'border-slate-700 hover:border-cyan-400' : 'border-slate-300 hover:border-cyan-600'}`}
            title="Toggle theme"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} className="text-cyan-400" /> : <Moon size={20} className="text-cyan-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 ${isDark ? 'border-slate-700' : 'border-slate-300'}`}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
        
            <Menu size={20} className={isDark ? 'text-slate-100' : 'text-slate-900'} />
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-slate-900' : 'bg-white'} border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <a href="#about" className={`block px-6 py-3 text-base font-medium ${isDark ? 'text-slate-100 hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-50'}`}>About</a>
          <a href="#experience" className={`block px-6 py-3 text-base font-medium ${isDark ? 'text-slate-100 hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-50'}`}>Experience</a>
          <a href="#projects" className={`block px-6 py-3 text-base font-medium ${isDark ? 'text-slate-100 hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-50'}`}>Projects</a>
          <a href="#skills" className={`block px-6 py-3 text-base font-medium ${isDark ? 'text-slate-100 hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-50'}`}>Skills</a>
          <a href="#contact" className={`block px-6 py-3 text-base font-medium ${isDark ? 'text-slate-100 hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-50'}`}>Contact</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar