import React from 'react';
import { ProductCard } from '../ui/ProductCard';
import { Zap, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const NewArrivalsSection: React.FC = () => {
  const { products, setSelectedCategory } = useShop();

  const newArrivals = products.filter((p) => p.isNew || p.category === 'new-arrivals').slice(0, 4);

  const handleViewAll = () => {
    setSelectedCategory('new-arrivals');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-black text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00e65c] uppercase tracking-widest mb-2">
              <Zap size={14} className="animate-bounce" />
              WEEKLY DROP 04
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
              NEW <span className="text-[#00e65c]">ARRIVALS</span>
            </h2>
          </div>

          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 font-syne font-extrabold text-xs text-[#00e65c] hover:text-white uppercase tracking-wider underline underline-offset-4 transition-colors"
          >
            VIEW ALL NEW DROPS ({products.filter((p) => p.isNew || p.category === 'new-arrivals').length})
            <ArrowRight size={14} />
          </button>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

