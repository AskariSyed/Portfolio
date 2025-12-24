import React from 'react';

interface SocialButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode;
  children: React.ReactNode;
  ariaLabel: string;
}


const SocialButton: React.FC<SocialButtonProps> = ({ icon, children, ariaLabel, className = '', ...props }) => (
  <a
    aria-label={ariaLabel}
    className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-medium border transition-all text-center ${className}`.trim()}
    {...props}
  >
    {icon} {children}
  </a>
);

export default SocialButton;
