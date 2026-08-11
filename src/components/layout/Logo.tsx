import React from 'react';

interface LogoProps {
  className?: string;
  lightMode?: boolean;
  heightClass?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', heightClass = 'h-10 sm:h-12' }) => {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/images/premium-store-logo.png"
        alt="PREMIUM STORE - WEAR THE BEST. FOR LESS."
        className={`${heightClass} w-auto object-contain transition-transform duration-300 hover:scale-105 shrink-0`}
        onError={(e) => {
          // Fallback if path differs
          (e.currentTarget as HTMLImageElement).src = '/logo.png';
        }}
      />
    </div>
  );
};



