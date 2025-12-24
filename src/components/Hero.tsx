import { Mail, Github, MapPin, Phone, ArrowUpRight, Sparkles, Download, Linkedin } from 'lucide-react';
import { profile } from '../data';
import profileImg from '../assets/IMG_7930_2.png';
import cvFile from '../assets/hassan_europass_cv-5.pdf';
import SocialButton from './common/SocialButton';

type HeroProps = {
  isDark: boolean;
};

const ANIMATION_DURATION = '1.2s';
const BUTTON_CLASS = (isDark: boolean) => `inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-medium border transition-all text-center ${isDark ? 'border-gray-700 text-cyan-100 hover:text-cyan-400 hover:border-cyan-400/50' : 'border-slate-300 text-slate-900 hover:text-cyan-600 hover:border-cyan-600'}`;

function Hero({ isDark }: HeroProps) {
  return (
    <header id="top" className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border ${isDark ? 'bg-[#131a26]/80 border-gray-800' : 'bg-white/40 border-gray-200'} backdrop-blur transition-all duration-700 animate-fadeIn`} style={{ animationDuration: ANIMATION_DURATION }}>
      <div className="space-y-6">
        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${isDark ? 'bg-cyan-600/30 text-white' : 'bg-cyan-500/10 text-cyan-600'} animate-slideIn`} style={{ animationDuration: ANIMATION_DURATION }}>
          Backend Engineering · AI-Curious
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700">
          Hi, I'm <span className={isDark ? 'text-white' : 'text-cyan-400'}>{profile.name}</span>
        </h1>
        <p className={`text-lg sm:text-xl leading-relaxed text-justify ${isDark ? 'text-white' : 'text-gray-700'} transition-all duration-700`}>
          {profile.summary}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 animate-fadeIn" style={{ animationDuration: '1.5s' }} aria-label="Contact and social links">
          <SocialButton
            href={`mailto:${profile.email}`}
            ariaLabel="Send email"
            className={BUTTON_CLASS(isDark)}
            icon={<Mail size={18} />}
          >
            Email
          </SocialButton>
          <SocialButton
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="GitHub profile"
            className={BUTTON_CLASS(isDark)}
            icon={<Github size={18} />}
          >
            GitHub <ArrowUpRight size={16} />
          </SocialButton>
          <SocialButton
            href="https://www.linkedin.com/in/syed-hassan-askari"
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="LinkedIn profile"
            className={BUTTON_CLASS(isDark)}
            icon={<Linkedin size={18} />}
          >
            LinkedIn <ArrowUpRight size={16} />
          </SocialButton>
          <SocialButton
            href={cvFile}
            download
            ariaLabel="Download CV as PDF"
            className={BUTTON_CLASS(isDark)}
            icon={<Download size={18} />}
          >
            Download CV
          </SocialButton>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
          <div className="flex items-center gap-3">
            <MapPin size={18} className={isDark ? 'text-cyan-300' : 'text-slate-600'} />
            <span className={isDark ? 'text-cyan-100' : 'text-slate-700'}>{profile.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className={isDark ? 'text-cyan-300' : 'text-slate-600'} />
            <a href="tel:+923355552845" className={`hover:underline ${isDark ? 'text-cyan-100 hover:text-cyan-400' : 'text-slate-800 hover:text-cyan-600'}`}>{profile.phone}</a>
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <Mail size={18} className={isDark ? 'text-cyan-300' : 'text-slate-600'} />
            <a href={`mailto:${profile.email}`} className={`hover:underline ${isDark ? 'text-cyan-100 hover:text-cyan-400' : 'text-slate-800 hover:text-cyan-600'}`}>{profile.email}</a>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className={`rounded-xl border p-4 sm:p-6 space-y-4 ${isDark ? 'bg-[#181f2e]/80 border-gray-700' : 'bg-slate-50 border-slate-200'} transition-all duration-700 animate-fadeIn`} style={{ animationDuration: '1.5s' }}>
        <img src={profileImg} alt="Profile photo of Muhammad Hassan Askari" className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 mx-auto rounded-lg border-2 border-cyan-400/30 object-cover" loading="lazy" />
        <div className="flex items-center justify-center gap-2">
          <Sparkles size={18} className="text-cyan-400" />
          <span className={`font-bold text-center ${isDark ? 'text-cyan-100' : 'text-slate-700'}`}>What I do</span>
        </div>
        <ul className={`space-y-2 text-sm text-justify text-center sm:text-left ${isDark ? 'text-cyan-100' : 'text-slate-700'}`}>
          <li>• Design APIs, data models, and services with C#/.NET.</li>
          <li>• Ship cross-platform apps with Flutter and Firebase.</li>
          <li>• Test, debug, and iterate quickly with Agile teams.</li>
        </ul>
        <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
          {['ASP.NET Web API', 'SQL', 'Entity Framework', 'Flutter'].map((tag) => (
            <span key={tag} className={`px-3 py-1 text-xs rounded-full border ${isDark ? 'bg-slate-700/50 border-slate-600 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-700'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Hero