import React, { useState } from 'react';
import { projects } from '../data';
import companiesList from '../assets/Mockups/FYP/MobileApp/Companies List-left.png';
import createAccount from '../assets/Mockups/FYP/MobileApp/CreateAccount-left.png';
import forgetPassword from '../assets/Mockups/FYP/MobileApp/Forget Password-portrait.png';
import jobs from '../assets/Mockups/FYP/MobileApp/jobs-left.png';
import notices from '../assets/Mockups/FYP/MobileApp/notices-portrait.png';
import profile from '../assets/Mockups/FYP/MobileApp/Profile-portrait.png';
import settings from '../assets/Mockups/FYP/MobileApp/Settings-left.png';
import web1 from '../assets/Mockups/FYP/WebAppStudent/Screenshot 2025-12-24 193122-front.png';
import web2 from '../assets/Mockups/FYP/WebAppStudent/Screenshot 2025-12-24 193132-front.png';
import web3 from '../assets/Mockups/FYP/WebAppStudent/Screenshot 2025-12-24 193156-front.png';
import web4 from '../assets/Mockups/FYP/WebAppStudent/Screenshot 2025-12-24 193209-front.png';
import web5 from '../assets/Mockups/FYP/WebAppStudent/Screenshot 2025-12-24 193233-front.png';
import web6 from '../assets/Mockups/FYP/WebAppStudent/Screenshot 2025-12-24 193245-front.png';
import web7 from '../assets/Mockups/FYP/WebAppStudent/Screenshot 2025-12-24 193252-front.png';
import web8 from '../assets/Mockups/FYP/WebAppStudent/Screenshot 2025-12-24 193303-front.png';
import web9 from '../assets/Mockups/FYP/WebAppStudent/Screenshot 2025-12-24 193324-front.png';
import { getIcon } from './common/getIcon';

type ProjectsProps = {
  isDark: boolean;
};

function Projects({ isDark }: ProjectsProps) {
  const [showMockups, setShowMockups] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const fypProject = projects[0]; // Final Year Project
  const otherProjects = projects.slice(1); // Other projects

  // All mockup images in order
  const allMockups = [
    { src: companiesList, alt: 'Companies List' },
    { src: createAccount, alt: 'Create Account' },
    { src: forgetPassword, alt: 'Forget Password' },
    { src: jobs, alt: 'Jobs' },
    { src: notices, alt: 'Notices' },
    { src: profile, alt: 'Profile' },
    { src: settings, alt: 'Settings' },
    { src: web1, alt: 'Web App Screenshot 1' },
    { src: web2, alt: 'Web App Screenshot 2' },
    { src: web3, alt: 'Web App Screenshot 3' },
    { src: web4, alt: 'Web App Screenshot 4' },
    { src: web5, alt: 'Web App Screenshot 5' },
    { src: web6, alt: 'Web App Screenshot 6' },
    { src: web7, alt: 'Web App Screenshot 7' },
    { src: web8, alt: 'Web App Screenshot 8' },
    { src: web9, alt: 'Web App Screenshot 9' },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allMockups.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === allMockups.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // getIcon is now imported from common/getIcon

  return (
    <section id="projects" className="space-y-12 pt-12">
      <div className="text-center space-y-4" aria-label="Projects section header">
        <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Selected work</div>
        <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`} tabIndex={0}>Projects</h2>
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
        <div className={`rounded-2xl border p-6 md:p-10 relative block ${isDark ? 'bg-gradient-to-br from-[#181f2e]/90 to-[#1e2533]/90 border-cyan-400/30 shadow-xl shadow-cyan-400/10 hover:shadow-2xl hover:shadow-cyan-400/20' : 'bg-gradient-to-br from-white to-slate-50 border-cyan-400/30 shadow-xl shadow-cyan-400/10 hover:shadow-2xl hover:shadow-cyan-400/20'} transition-all duration-300`}>
          <div className="text-center">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>{fypProject.name}</h3>
            <p className={`text-base leading-relaxed text-center mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{fypProject.description}</p>
            <div className="flex flex-wrap gap-1.5 md:gap-3 justify-center">
              {fypProject.tech.map((t) => (
                <span key={t} className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-full border flex items-center gap-1 md:gap-2 flex-shrink-0 ${isDark ? 'bg-cyan-600/20 border-cyan-400/50 text-cyan-200' : 'bg-cyan-50 border-cyan-300 text-cyan-700'}`}>
                  {getIcon(t)} {t}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMockups(!showMockups);
                }}
                className={`px-4 py-2 text-lg font-semibold mb-4 rounded-lg transition-colors duration-200 cursor-pointer border ${isDark ? 'bg-cyan-600/20 border-cyan-400/50 text-cyan-200 hover:bg-cyan-600/30' : 'bg-cyan-50 border-cyan-300 text-cyan-700 hover:bg-cyan-100'}`}
              >
                {showMockups ? 'Hide mockups' : 'Show mockups'}
              </button>
              <div className={`p-4 rounded-lg transition-all duration-500 ease-in-out ${showMockups ? 'opacity-100 max-h-screen transform translate-y-0' : 'opacity-0 max-h-0 transform -translate-y-4 overflow-hidden'} ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'}`}
                style={{ maxWidth: '100%', overflowX: 'auto' }}>
                <div className="space-y-6">
                  <div>
                    <h5 className={`text-sm font-semibold mb-3 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>Mobile App Mockups</h5>
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-4 min-w-0 w-full max-w-full">
                      <img src={companiesList} alt="Mobile app mockup: Companies List screen" className="w-full h-auto max-w-full max-h-24 sm:max-h-32 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '0ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(0)} />
                      <img src={createAccount} alt="Mobile app mockup: Create Account screen" className="w-full h-auto max-w-full max-h-24 sm:max-h-32 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '100ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(1)} />
                      <img src={forgetPassword} alt="Mobile app mockup: Forget Password screen" className="w-full h-auto max-w-full max-h-24 sm:max-h-32 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '200ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(2)} />
                      <img src={jobs} alt="Mobile app mockup: Jobs screen" className="w-full h-auto max-w-full max-h-24 sm:max-h-32 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '300ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(3)} />
                      <img src={notices} alt="Mobile app mockup: Notices screen" className="w-full h-auto max-w-full max-h-24 sm:max-h-32 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '400ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(4)} />
                      <img src={profile} alt="Mobile app mockup: Profile screen" className="w-full h-auto max-w-full max-h-24 sm:max-h-32 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '500ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(5)} />
                      <img src={settings} alt="Mobile app mockup: Settings screen" className="w-full h-auto max-w-full max-h-24 sm:max-h-32 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '600ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(6)} />
                    </div>
                  </div>
                  <div>
                    <h5 className={`text-sm font-semibold mb-3 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>Web App Mockups</h5>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 min-w-0 w-full max-w-full">
                       <img src={web1} alt="Web app mockup: Screenshot 1" className="w-full h-auto max-w-full max-h-32 sm:max-h-48 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '0ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(7)} />
                       <img src={web2} alt="Web app mockup: Screenshot 2" className="w-full h-auto max-w-full max-h-32 sm:max-h-48 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '100ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(8)} />
                       <img src={web3} alt="Web app mockup: Screenshot 3" className="w-full h-auto max-w-full max-h-32 sm:max-h-48 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '200ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(9)} />
                       <img src={web4} alt="Web app mockup: Screenshot 4" className="w-full h-auto max-w-full max-h-32 sm:max-h-48 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '300ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(10)} />
                       <img src={web5} alt="Web app mockup: Screenshot 5" className="w-full h-auto max-w-full max-h-32 sm:max-h-48 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '400ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(11)} />
                       <img src={web6} alt="Web app mockup: Screenshot 6" className="w-full h-auto max-w-full max-h-32 sm:max-h-48 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '500ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(12)} />
                       <img src={web7} alt="Web app mockup: Screenshot 7" className="w-full h-auto max-w-full max-h-32 sm:max-h-48 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '600ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(13)} />
                       <img src={web8} alt="Web app mockup: Screenshot 8" className="w-full h-auto max-w-full max-h-32 sm:max-h-48 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '700ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(14)} />
                       <img src={web9} alt="Web app mockup: Screenshot 9" className="w-full h-auto max-w-full max-h-32 sm:max-h-48 object-contain rounded-lg transition-all duration-300 animate-fadeIn cursor-pointer hover:scale-105" style={{ animationDelay: '800ms', maxWidth: '100%' }} loading="lazy" onClick={() => openLightbox(15)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Projects */}
      <div className="space-y-6">
        <div className={`text-sm font-bold uppercase tracking-wider text-center ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Other Projects</div>
        <div className="grid gap-6 md:gap-8">
          {otherProjects.map((project) => (
            <a key={project.name} href={project.link} target="_blank" rel="noreferrer" className={`rounded-xl border p-6 md:p-8 relative block ${isDark ? 'bg-[#181f2e]/80 border-gray-800 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10' : 'bg-slate-50 border-slate-200 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10'} transition-all duration-300`}>
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-3 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.name}</h3>
                <p className={`text-sm leading-relaxed text-center mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {project.tech.map((t) => (
                  <span key={t} className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center gap-1 flex-shrink-0 ${isDark ? 'bg-slate-800/60 border-slate-600 text-slate-200' : 'bg-white border-slate-300 text-slate-700'}`}>
                    {getIcon(t)} {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 z-60 text-white hover:text-gray-300 transition-colors duration-200 p-2"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 z-60 text-white hover:text-gray-300 transition-colors duration-200 p-2"
            aria-label="Next image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main image */}
          <div className="flex items-center justify-center w-full h-full p-2 sm:p-4" style={{ maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <img
              src={allMockups[currentImageIndex].src}
              alt={allMockups[currentImageIndex].alt}
              className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
              style={{ display: 'block', margin: '0 auto' }}
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
            {currentImageIndex + 1} / {allMockups.length}
          </div>

          {/* Image caption */}
          <div className="absolute bottom-4 left-4 text-white text-lg font-medium bg-black bg-opacity-50 px-3 py-1 rounded">
            {allMockups[currentImageIndex].alt}
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects