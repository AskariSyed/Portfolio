import SkillBlock from './SkillBlock'
import { skills } from '../data'

type SkillsProps = {
  isDark: boolean;
};

function Skills({ isDark }: SkillsProps) {
  return (
    <section id="skills" className="space-y-8">
      <div className="text-center space-y-4">
        <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Toolbox</div>
        <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Skills</h2>
        <div className={`w-24 h-1 mx-auto rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <SkillBlock isDark={isDark} title="Backend" items={skills.backend} />
        <SkillBlock isDark={isDark} title="Databases" items={skills.databases} />
        <SkillBlock isDark={isDark} title="Mobile" items={skills.mobile} />
        <SkillBlock isDark={isDark} title="Frontend" items={skills.frontend} />
        <SkillBlock isDark={isDark} title="QA & Process" items={skills.qa} />
        <SkillBlock isDark={isDark} title="Tools & Methodology" items={skills.tools} />
        <SkillBlock isDark={isDark} title="Interests" items={skills.interests} />
      </div>
    </section>
  )
}

export default Skills