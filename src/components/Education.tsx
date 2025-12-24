import { ArrowUpRight } from 'lucide-react'
import { education } from '../data'
import comsatsLogo from '../assets/comsats-logo.png'

type EducationProps = {
  isDark: boolean;
};

function Education({ isDark }: EducationProps) {
  return (
    <section id="education" className="space-y-8 mt-16">
      <div className="text-center space-y-4">
        <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Academic</div>
        <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Education</h2>
        <div className={`w-24 h-1 mx-auto rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div>
      </div>
      <div className={`rounded-xl border p-8 ${isDark ? 'bg-[#181f2e]/80 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex justify-between items-start gap-4 mb-3">
          <div>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>{education.period}</p>
            <h3 className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{education.degree}</h3>
            <p className={isDark ? 'text-slate-200' : 'text-slate-600'}>{education.school}</p>
          </div>
          <img src={comsatsLogo} alt="COMSATS University" className="w-12 h-12 object-contain rounded-lg border" />
        </div>
        <p className={`text-xs mb-4 ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>{education.location}</p>
        <div className="flex flex-wrap gap-2">
          {[education.grade, education.credits].map((t) => (
            <span key={t} className={`px-3 py-1 text-xs rounded-full ${isDark ? 'bg-slate-700/50 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
              {t}
            </span>
          ))}
          <a href={education.site} target="_blank" rel="noreferrer" className={`px-3 py-1 text-xs rounded-full border flex items-center gap-1 ${isDark ? 'border-slate-700 text-slate-200 hover:text-cyan-400 hover:border-cyan-400/50' : 'border-slate-300 text-slate-700 hover:text-cyan-600 hover:border-cyan-600'}`}>
            University site <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Education