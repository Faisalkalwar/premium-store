import React from 'react';
import { ArrowRight, Crown, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FeaturedCollection: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleShopCollection = () => {
    setSelectedCategory('shirts');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0a0a0a] text-white border-b border-neutral-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-950 border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
          {/* LEFT: EDITORIAL IMAGE WITH GRAFFITI LOGO */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[500px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
              alt="Featured Collection Editorial"
              className="w-full h-full object-cover object-center filter grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute top-6 left-6 z-10">
              <span className="bg-[#00e65c] text-black font-syne font-extrabold text-[11px] uppercase tracking-wider px-3 py-1">
                LIMITED EDITORIAL CAPSULE
              </span>
            </div>

            <div className="absolute bottom-8 left-6 right-6 z-10">
              <span className="font-graffiti text-3xl sm:text-5xl text-[#00e65c] transform -rotate-2 inline-block glow-green mb-1">
                METROPOLIS &apos;26
              </span>
              <p className="font-syne font-extrabold text-xl sm:text-2xl text-white uppercase tracking-wider">
                RAW GRAFFITI & HEAVYWEIGHT CUTS
              </p>
            </div>
          </div>

          {/* RIGHT: DETAILS & SPECS */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[#0e0e0e]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#00e65c] uppercase tracking-widest mb-4">
                <Crown size={16} />
                THE GRAIL COLLECTION
              </div>

              <h2 className="font-syne font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-white mb-4 leading-none">
                URBAN STREETWEAR ARCHIVE
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                Inspired by brutalist concrete architecture and underground spray art culture. Engineered using heavyweight 450GSM organic French terry and 14oz rigid Japanese denim.
              </p>

              <div className="space-y-3 font-mono text-xs text-neutral-400 mb-8 border-t border-neutral-800 pt-4">
                <div className="flex items-center justify-between">
                  <span>FABRIC WEIGHT</span>
                  <span className="text-white font-bold">450 GSM / 14OZ DENIM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>FIT PROFILE</span>
                  <span className="text-white font-bold">BOXY OVERSIZED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>COLORWAYS</span>
                  <span className="text-[#00e65c] font-bold">PITCH BLACK / NEON ACCENT</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleShopCollection}
              className="w-full bg-[#00e65c] text-black hover:bg-[#00ff66] font-syne font-extrabold py-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              SHOP METROPOLIS CAPSULE
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
