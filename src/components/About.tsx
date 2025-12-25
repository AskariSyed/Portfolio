import { profile } from '../data';

interface AboutProps {
  isDark: boolean;
}

const BOX_SHADOW_DARK = '0 8px 40px 0 rgba(0,0,0,0.55)';
const BOX_SHADOW_LIGHT = '0 8px 40px 0 rgba(160,200,255,0.2)';

/**
 * About section with animated name and profile description.
 */
function About({ isDark }: AboutProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 lg:py-12 mb-12 mx-auto"
      style={{
        background: isDark ? 'rgba(20, 20, 30, 0.55)' : 'rgba(255,255,255,0.55)',
        boxShadow: isDark ? BOX_SHADOW_DARK : BOX_SHADOW_LIGHT,
        border: isDark ? '1px solid #22223b' : '1px solid #e0e7ef',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-60 animate-gradientMove" />
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300">Profile</div>
        <h2 id="about-heading" className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-slate-900'} drop-shadow-lg`}>About</h2>
        <div
          className="select-none font-extrabold text-center text-transparent bg-clip-text text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6 animate-gradientMove cursor-pointer"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(90deg, #f0fdfa 0%, #67e8f9 30%, #818cf8 60%, #f472b6 100%)'
              : 'linear-gradient(90deg, #67e8f9 0%, #60a5fa 30%, #a78bfa 60%, #f472b6 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            transition: 'background-position 0.4s cubic-bezier(.4,0,.2,1)',
            backgroundSize: '200% 200%',
          }}
          id="animated-name"
        >
          {profile.name}
        </div>
        <p className={`max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-justify ${isDark ? 'text-white/90' : 'text-slate-700'} drop-shadow-md text-center px-2 sm:px-0`}>
          {profile.about}
        </p>
      </div>
    </section>
  );
}

export default About;