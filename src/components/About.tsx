import { profile } from '../data';

interface AboutProps {
  isDark: boolean;
}

const BG_GRADIENT_DARK = 'linear-gradient(120deg, #0a0f1a 0%, #111827 50%, #0a0f1a 100%)';
const BG_GRADIENT_LIGHT = 'linear-gradient(120deg, #f8fafc 0%, #a1c4fd 50%, #c2e9fb 100%)';
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
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-28 mb-8 sm:mb-12 mx-4 sm:mx-6 md:mx-0"
      style={{
        background: isDark ? BG_GRADIENT_DARK : BG_GRADIENT_LIGHT,
        boxShadow: isDark ? BOX_SHADOW_DARK : BOX_SHADOW_LIGHT,
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-60 animate-gradientMove" />
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300">Profile</div>
        <h2 id="about-heading" className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 ${isDark ? 'text-white' : 'text-slate-900'} drop-shadow-lg`}>About</h2>
        <div
          className="select-none font-extrabold text-center text-transparent bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 animate-gradientMove cursor-pointer"
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
        <p className={`max-w-3xl text-lg sm:text-xl md:text-2xl leading-relaxed text-justify ${isDark ? 'text-white/90' : 'text-slate-700'} drop-shadow-md text-center px-2 sm:px-0`}>
          {profile.about}
        </p>
      </div>
    </section>
  );
}

export default About;