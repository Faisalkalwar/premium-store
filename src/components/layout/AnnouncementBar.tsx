import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, Tag, ChevronLeft, ChevronRight, X } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    icon: Sparkles,
    text: 'NEW DROP LIVE: METROPOLIS \'26 URBAN STREETWEAR COLLECTION',
    linkText: 'EXPLORE DROP',
  },
  {
    icon: Truck,
    text: 'FREE EXPRESS SHIPPING ON ALL ORDERS OVER $75',
    linkText: 'DETAILS',
  },
  {
    icon: Tag,
    text: 'GET 15% OFF YOUR FIRST ORDER — USE CODE: PREMIUM15',
    linkText: 'COPY CODE',
  },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-[#0a0a0a] border-b border-neutral-800/80 text-xs text-neutral-300 py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left spacer for symmetry on desktop */}
        <div className="hidden lg:flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#00e65c] animate-pulse" />
          WORLDWIDE EXPRESS DELIVERY
        </div>

        {/* Center rotating announcement */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center font-medium">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
            className="text-neutral-500 hover:text-white transition-colors p-0.5"
            aria-label="Previous announcement"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex items-center gap-2 min-h-[20px]">
            <Icon size={14} className="text-[#00e65c] shrink-0" />
            <span className="tracking-wide text-[11px] sm:text-xs">
              {current.text}
            </span>
            <span className="hidden sm:inline-block font-bold text-[#00e65c] underline underline-offset-2 ml-1 cursor-pointer hover:text-white transition-colors">
              {current.linkText}
            </span>
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
            className="text-neutral-500 hover:text-white transition-colors p-0.5"
            aria-label="Next announcement"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Right currency / dismissal */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:block text-[11px] font-mono text-neutral-400">
            USD ($)
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
            title="Dismiss"
            aria-label="Close announcement bar"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
