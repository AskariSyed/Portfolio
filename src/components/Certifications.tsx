import { SiGoogle } from 'react-icons/si'
import { certifications } from '../data'

type CertificationsProps = {
  isDark: boolean;
};

function Certifications({ isDark }: CertificationsProps) {
  return (
    <section id="certifications" className="space-y-8">
      <div className="text-center space-y-4">
        <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Credentials</div>
        <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Certifications</h2>
        <div className={`w-24 h-1 mx-auto rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {certifications.map((cert) => (
          <div key={cert.name} className={`rounded-xl border p-6 flex justify-between items-start gap-4 ${isDark ? 'bg-[#181f2e]/80 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-3">
              {cert.issuer.includes('Google') && (
                <SiGoogle size={24} className={isDark ? 'text-slate-300' : 'text-slate-600'} />
              )}
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cert.name}</h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>{cert.issuer}</p>
              </div>
            </div>
            <span className={`px-3 py-1 text-xs rounded-full ${isDark ? 'bg-slate-700/50 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>{cert.date}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Certifications