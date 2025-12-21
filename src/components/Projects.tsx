import { projects } from '../data'

type ProjectsProps = {
  isDark: boolean;
};

function Projects({ isDark }: ProjectsProps) {
  const fypProject = projects[0]; // Final Year Project
  const otherProjects = projects.slice(1); // Other projects

  return (
    <section id="projects" className="space-y-12">
      <div className="text-center space-y-4">
        <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Selected work</div>
        <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Projects</h2>
        <div className={`w-24 h-1 mx-auto rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div>
      </div>

      {/* Featured FYP Project */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Final Year Project</div>
          <div className={`px-3 py-1 text-xs font-bold rounded-full ${isDark ? 'bg-green-600/20 text-green-400 border border-green-400/30' : 'bg-green-100 text-green-700 border border-green-300'} animate-pulse`}>
            Currently Working
          </div>
        </div>
        <a href={fypProject.link} target="_blank" rel="noreferrer" className={`rounded-2xl border p-10 relative block ${isDark ? 'bg-gradient-to-br from-[#181f2e]/90 to-[#1e2533]/90 border-cyan-400/30 shadow-xl shadow-cyan-400/10 hover:shadow-2xl hover:shadow-cyan-400/20' : 'bg-gradient-to-br from-white to-slate-50 border-cyan-400/30 shadow-xl shadow-cyan-400/10 hover:shadow-2xl hover:shadow-cyan-400/20'} transition-all duration-300`}>
          <div className="text-center">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>{fypProject.name}</h3>
            <p className={`text-base leading-relaxed text-center mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{fypProject.description}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {fypProject.tech.map((t) => (
                <span key={t} className={`px-4 py-2 text-sm font-medium rounded-full border ${isDark ? 'bg-cyan-600/20 border-cyan-400/50 text-cyan-200' : 'bg-cyan-50 border-cyan-300 text-cyan-700'}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </a>
      </div>

      {/* Other Projects */}
      <div className="space-y-6">
        <div className={`text-sm font-bold uppercase tracking-wider text-center ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Other Projects</div>
        <div className="grid md:grid-cols-2 gap-8">
          {otherProjects.map((project) => (
            <a key={project.name} href={project.link} target="_blank" rel="noreferrer" className={`rounded-xl border p-8 relative block ${isDark ? 'bg-[#181f2e]/80 border-gray-800 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10' : 'bg-slate-50 border-slate-200 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10'} transition-all duration-300`}>
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-3 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.name}</h3>
                <p className={`text-sm leading-relaxed text-center mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {project.tech.map((t) => (
                  <span key={t} className={`px-3 py-1.5 text-xs font-medium rounded-full border ${isDark ? 'bg-slate-800/60 border-slate-600 text-slate-200' : 'bg-white border-slate-300 text-slate-700'}`}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects