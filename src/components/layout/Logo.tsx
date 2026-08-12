import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  lightMode?: boolean;
  heightClass?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', heightClass = 'h-8 sm:h-10 lg:h-11' }) => {
  const [imgStage, setImgStage] = useState<number>(0);

  const handleImgError = () => {
    setImgStage((prev) => prev + 1);
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {imgStage === 0 && (
        <img
          src="/images/premium-store-logo.png"
          alt="PREMIUM STORE"
          className={`${heightClass} w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-transform duration-300 hover:scale-105 shrink-0`}
          onError={handleImgError}
        />
      )}
      {imgStage === 1 && (
        <img
          src="/logo.png"
          alt="PREMIUM STORE"
          className={`${heightClass} w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-transform duration-300 hover:scale-105 shrink-0`}
          onError={handleImgError}
        />
      )}
      {imgStage === 2 && (
        <img
          src="/logo.svg"
          alt="PREMIUM STORE"
          className={`${heightClass} w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-transform duration-300 hover:scale-105 shrink-0`}
          onError={handleImgError}
        />
      )}
      {imgStage >= 3 && (
        <div className={`flex items-center font-black tracking-tight ${heightClass} hover:scale-105 transition-transform`}>
          <span className="text-[#00e65c] font-black italic text-xl sm:text-2xl tracking-wider mr-1.5 drop-shadow-[0_0_8px_rgba(0,230,92,0.4)]">
            PREMIUM
          </span>
          <span className="text-white font-black text-lg sm:text-xl tracking-wide">
            STORE
          </span>
        </div>
      )}
    </div>
  );
};




