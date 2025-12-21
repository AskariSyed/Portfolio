import { ExternalLink } from 'lucide-react'
import { experience } from '../data'
import ptaLogo from '../assets/pta-logo.png'
import hblLogo from '../assets/hbl-logo.png'

type ExperienceProps = {
  isDark: boolean;
};

function Experience({ isDark }: ExperienceProps) {
  return (
    <section id="experience" className="space-y-8">
      <div className="text-center space-y-4">
        <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Roles</div>
        <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Experience</h2>
        <div className={`w-24 h-1 mx-auto rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div>
      </div>
      <div className="grid gap-6">
        {experience.map((item) => (
          <div key={item.company} className={`rounded-xl border p-6 ${isDark ? 'bg-[#181f2e]/80 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex justify-between items-start gap-4 mb-3">
              <div>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>{item.period}</p>
                <h3 className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.role}</h3>
                <p className={isDark ? 'text-slate-200' : 'text-slate-600'}>{item.company}</p>
              </div>
              <div className="flex items-center gap-3">
                {item.company.includes('PTA') && (
                  <img src={ptaLogo} alt="PTA Logo" className="w-10 h-10 object-contain rounded" />
                )}
                {item.company.includes('HBL') && (
                  <img src={hblLogo} alt="HBL Logo" className="w-10 h-10 object-contain rounded" />
                )}
                <a href={item.link} target="_blank" rel="noreferrer" className={`p-2 rounded-lg border transition-all ${isDark ? 'border-slate-700 hover:text-cyan-400 hover:border-cyan-400/50' : 'border-slate-300 hover:text-cyan-600 hover:border-cyan-600'}`}>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>{item.location}</p>
            <ul className={`space-y-2 text-sm ml-4 text-justify ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              {item.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience