import React from 'react'
import { SiDotnet, SiFlutter, SiFirebase, SiPostgresql, SiMysql, SiOracle, SiJavascript, SiHtml5, SiCss3, SiBootstrap, SiGithub } from 'react-icons/si'
import { FaBrain } from 'react-icons/fa'

type SkillBlockProps = {
  isDark: boolean;
  title: string;
  items: string[];
};

function SkillBlock({ isDark, title, items }: SkillBlockProps) {
  const getIcon = (skill: string) => {
    const iconMap: { [key: string]: React.JSX.Element } = {
      '.NET': <SiDotnet size={14} style={{ color: '#512bd4' }} />,
      'Flutter': <SiFlutter size={14} style={{ color: '#02569b' }} />,
      'Firebase Auth': <SiFirebase size={14} style={{ color: '#ffca28' }} />,
      'Firestore': <SiFirebase size={14} style={{ color: '#ffca28' }} />,
      'PostgreSQL': <SiPostgresql size={14} style={{ color: '#336791' }} />,
      'MySQL': <SiMysql size={14} style={{ color: '#4479a1' }} />,
      'Oracle': <SiOracle size={14} style={{ color: '#f80000' }} />,
      'JavaScript': <SiJavascript size={14} style={{ color: '#f7df1e' }} />,
      'HTML': <SiHtml5 size={14} style={{ color: '#e34f26' }} />,
      'CSS': <SiCss3 size={14} style={{ color: '#1572b6' }} />,
      'Bootstrap': <SiBootstrap size={14} style={{ color: '#7952b3' }} />,
      'Git/GitHub': <SiGithub size={14} style={{ color: '#181717' }} />,
      'AI': <FaBrain size={14} style={{ color: '#ff6b6b' }} />,
      'Machine Learning': <FaBrain size={14} style={{ color: '#4ecdc4' }} />,
      'Deep Learning': <FaBrain size={14} style={{ color: '#45b7d1' }} />,
      'Computer Vision': <FaBrain size={14} style={{ color: '#96ceb4' }} />,
    }
    return iconMap[skill] || null
  }

  return (
    <div className={`rounded-xl border p-4 md:p-6 text-center ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
      <h3 className={`font-bold mb-3 ${isDark ? 'text-cyan-100' : 'text-slate-900'}`}>{title}</h3>
      <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
        {items.map((item) => (
          <span key={item} className={`px-2 py-1 md:px-3 md:py-1 text-xs rounded-full flex items-center gap-1 ${isDark ? 'bg-gray-700/70 text-cyan-200' : 'bg-slate-100 text-slate-700'}`}>
            {getIcon(item)}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillBlock