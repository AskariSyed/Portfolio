import { Mail, Phone } from 'lucide-react'
import { profile } from '../data'

type ContactProps = {
  isDark: boolean;
};

function Contact({ isDark }: ContactProps) {
  return (
    <section id="contact" className="text-center space-y-8 py-16" style={{ background: isDark ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '2rem', marginTop: '4rem' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Let’s build</div>
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Need backend, mobile, or web development?</h2>
        <p className={`text-xl leading-relaxed mb-8 text-justify ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          I build robust backend systems with .NET and SQL, cross-platform mobile apps with Flutter and Firebase, and responsive web applications. Let's create something amazing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`mailto:${profile.email}`} className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50' : 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg hover:shadow-slate-800/50'}`}>
            <Mail size={20} /> Contact me
          </a>
          <a href="tel:+923355552845" className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all transform hover:scale-105 ${isDark ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900' : 'border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'}`}>
            <Phone size={20} /> Call
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact