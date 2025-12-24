import { publications } from '../data'

type PublicationsProps = {
  isDark: boolean;
};

function Publications({ isDark }: PublicationsProps) {
  return (
    <section id="publications" className="space-y-8 pt-12">
      <div className="text-center space-y-4">
        <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Research</div>
        <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Publications</h2>
        <div className={`w-24 h-1 mx-auto rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div>
      </div>
      <div className="grid gap-6">
        {publications.map((pub) => (
          <div key={pub.title} className={`rounded-xl border p-6 ${isDark ? 'bg-[#181f2e]/80 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{pub.title}</h3>
            <p className={`mt-2 ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>{pub.venue}</p>
            <p className={`mt-3 text-justify ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{pub.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Publications