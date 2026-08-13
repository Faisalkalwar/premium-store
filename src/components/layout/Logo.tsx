import React from 'react';

interface LogoProps {
  className?: string;
  lightMode?: boolean;
  heightClass?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', lightMode = false }) => {
  return (
    <div className={`inline-flex flex-col items-start cursor-pointer group select-none shrink-0 ${className}`}>
      <div className="flex items-baseline gap-1.5 sm:gap-2 leading-none">
        {/* PREMIUM - Italicized Neon Green Streetwear Font */}
        <span
          className="font-black italic text-xl sm:text-2xl lg:text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-[#00e65c] to-[#00cc44] drop-shadow-[0_0_10px_rgba(0,255,102,0.45)] uppercase"
          style={{ fontFamily: "'Syne', 'Impact', 'Arial Black', sans-serif" }}
        >
          PREMIUM
        </span>

        {/* STORE - High-Contrast Bold Text */}
        <span
          className={`font-black text-lg sm:text-xl lg:text-2xl tracking-wider uppercase ${
            lightMode ? 'text-zinc-900' : 'text-white'
          }`}
          style={{ fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif" }}
        >
          STORE
        </span>
      </div>

      {/* Neon Spray Underline Accent */}
      <div className="w-full h-[3px] sm:h-[4px] mt-1 rounded-full bg-gradient-to-r from-[#00ff66] via-[#00e65c] to-transparent shadow-[0_0_8px_#00ff66] origin-left transition-transform duration-300 group-hover:scale-x-105" />
    </div>
  );
};
