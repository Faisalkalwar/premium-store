import React from 'react';

interface LogoProps {
  className?: string;
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', lightMode = false }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      {/* Green graffiti style 'PREMIUM' */}
      <span className="font-graffiti text-2xl sm:text-3xl text-[#00e65c] tracking-wider transform -rotate-2 drop-shadow-[0_2px_10px_rgba(0,230,92,0.3)]">
        PREMIUM
      </span>
      {/* Bold 'STORE' */}
      <span
        className={`font-syne font-extrabold text-xl sm:text-2xl tracking-tighter uppercase ${
          lightMode ? 'text-black' : 'text-white'
        }`}
      >
        STORE
      </span>
    </div>
  );
};
