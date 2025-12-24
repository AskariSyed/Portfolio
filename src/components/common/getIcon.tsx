import React from 'react';
import { SiSharp, SiDotnet, SiFlutter, SiFirebase, SiReact, SiVite, SiTailwindcss, SiPostgresql, SiOracle, SiMysql, SiJavascript, SiPhp } from 'react-icons/si';

export function getIcon(tech: string): React.JSX.Element | null {
  const iconMap: { [key: string]: React.JSX.Element } = {
    'C#': <SiSharp style={{ color: '#239120' }} />,
    '.NET': <SiDotnet style={{ color: '#512BD4' }} />,
    'ASP.NET Core': <SiDotnet style={{ color: '#512BD4' }} />,
    'ASP.NET Web API': <SiDotnet style={{ color: '#512BD4' }} />,
    'Entity Framework Core': <SiDotnet style={{ color: '#512BD4' }} />,
    'Flutter': <SiFlutter style={{ color: '#02569B' }} />,
    'Firebase': <SiFirebase style={{ color: '#FFCA28' }} />,
    'Firestore': <SiFirebase style={{ color: '#FFCA28' }} />,
    'FCM': <SiFirebase style={{ color: '#FFCA28' }} />,
    'React': <SiReact style={{ color: '#61DAFB' }} />,
    'Vite': <SiVite style={{ color: '#646CFF' }} />,
    'Tailwind CSS': <SiTailwindcss style={{ color: '#06B6D4' }} />,
    'PostgreSQL': <SiPostgresql style={{ color: '#336791' }} />,
    'Oracle Database': <SiOracle style={{ color: '#F80000' }} />,
    'SQL': <SiPostgresql style={{ color: '#336791' }} />,
    'MySQL': <SiMysql style={{ color: '#4479A1' }} />,
    'JavaScript': <SiJavascript style={{ color: '#F7DF1E' }} />,
    'PHP': <SiPhp style={{ color: '#777BB4' }} />,
  };
  return iconMap[tech] || null;
}
