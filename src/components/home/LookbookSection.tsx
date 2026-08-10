import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../../data/lookbook';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { Camera, Plus, ShoppingBag, Eye, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';

export const LookbookSection: React.FC = () => {
  const { setQuickViewProduct, addToCart } = useShop();
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activeHotspotProduct, setActiveHotspotProduct] = useState<Product | null>(null);

  const currentLook = LOOKBOOK_ITEMS[activeLookIndex];

  const handleHotspotClick = (productId: string) => {
    const found = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setActiveHotspotProduct(found);
    }
  };

  return (
    <section id="lookbook-section" className="py-16 sm:py-24 bg-[#070707] text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00e65c] uppercase tracking-widest mb-2">
              <Camera size={14} />
              EDITORIAL STREETWEAR LOOKBOOK
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
              SHOP THE <span className="text-[#00e65c]">LOOK</span>
            </h2>
          </div>

          {/* LOOKBOOK SWITCHER TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {LOOKBOOK_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveLookIndex(idx);
                  setActiveHotspotProduct(null);
                }}
                className={`px-4 py-2 font-syne font-bold text-xs uppercase transition-all whitespace-nowrap border ${
                  activeLookIndex === idx
                    ? 'bg-[#00e65c] text-black border-[#00e65c]'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                {item.season}
              </button>
            ))}
          </div>
        </div>

        {/* LOOKBOOK DISPLAY STAGE */}
        <div className="relative bg-neutral-950 border border-neutral-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[600px]">
          {/* IMAGE WITH HOTSPOTS */}
          <div className="lg:col-span-8 relative aspect-[4/5] lg:aspect-auto w-full bg-neutral-900 overflow-hidden">
            <img
              src={currentLook.image}
              alt={currentLook.title}
              className="w-full h-full object-cover object-center filter grayscale contrast-110"
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* HOTSPOT PINS */}
            {currentLook.hotspots.map((hs) => {
              const product = MOCK_PRODUCTS.find((p) => p.id === hs.productId);
              if (!product) return null;
              const isSelected = activeHotspotProduct?.id === product.id;

              return (
                <div
                  key={hs.id}
                  className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${hs.topPercent}%`, left: `${hs.leftPercent}%` }}
                >
                  <button
                    onClick={() => handleHotspotClick(hs.productId)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#00e65c] text-black scale-125 shadow-[0_0_15px_#00e65c]'
                        : 'bg-black/80 text-[#00e65c] hover:bg-[#00e65c] hover:text-black border border-[#00e65c] backdrop-blur-md'
                    }`}
                    title={`Tag: ${product.name}`}
                  >
                    <Plus size={16} className="animate-pulse" />
                  </button>
                </div>
              );
            })}

            {/* OVERLAY LOOK TITLE */}
            <div className="absolute bottom-6 left-6 z-10">
              <p className="text-xs font-mono text-[#00e65c] uppercase mb-1">
                {currentLook.season}
              </p>
              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-wider">
                {currentLook.title}
              </h3>
            </div>
          </div>

          {/* RIGHT SIDE: FEATURED HOTSPOT PREVIEW PANEL */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-[#0a0a0a] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-800">
            <div>
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1">
                FEATURED LOOKBOOK ITEMS
              </p>
              <h4 className="font-syne font-bold text-lg text-white uppercase mb-6">
                CLICK + PINS ON IMAGE TO SHOP
              </h4>

              {activeHotspotProduct ? (
                <div className="bg-[#111111] border border-[#00e65c] p-4 relative animate-fadeIn">
                  <button
                    onClick={() => setActiveHotspotProduct(null)}
                    className="absolute top-2 right-2 text-neutral-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>

                  <div className="flex gap-4 items-center mb-4">
                    <img
                      src={activeHotspotProduct.image}
                      alt={activeHotspotProduct.name}
                      className="w-20 h-24 object-cover bg-neutral-900"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-[#00e65c] uppercase">
                        TAGGED PRODUCT
                      </span>
                      <h5 className="font-syne font-bold text-sm text-white uppercase line-clamp-1">
                        {activeHotspotProduct.name}
                      </h5>
                      <span className="font-syne font-extrabold text-base text-[#00e65c]">
                        ${activeHotspotProduct.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuickViewProduct(activeHotspotProduct)}
                      className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-syne font-bold text-xs py-2 uppercase flex items-center justify-center gap-1"
                    >
                      <Eye size={14} />
                      QUICK VIEW
                    </button>
                    <button
                      onClick={() => addToCart(activeHotspotProduct)}
                      className="flex-1 bg-[#00e65c] text-black hover:bg-[#00ff66] font-syne font-extrabold text-xs py-2 uppercase flex items-center justify-center gap-1"
                    >
                      <ShoppingBag size={14} />
                      ADD TO BAG
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-mono text-neutral-400">
                    Articles in this shoot:
                  </p>
                  {currentLook.hotspots.map((hs) => {
                    const p = MOCK_PRODUCTS.find((item) => item.id === hs.productId);
                    if (!p) return null;
                    return (
                      <div
                        key={hs.id}
                        onClick={() => setActiveHotspotProduct(p)}
                        className="p-3 bg-neutral-900 border border-neutral-800 hover:border-[#00e65c] cursor-pointer flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <p className="font-syne font-bold text-xs text-white uppercase group-hover:text-[#00e65c]">
                            {p.name}
                          </p>
                          <span className="text-xs font-mono text-neutral-400">
                            ${p.price.toFixed(2)}
                          </span>
                        </div>
                        <Plus size={16} className="text-[#00e65c]" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <p className="text-[11px] font-mono text-neutral-500 mt-6 pt-4 border-t border-neutral-800">
              Photographed in Berlin & Tokyo. All garments available for immediate dispatch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
