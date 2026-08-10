import React from 'react';
import { Logo } from './Logo';
import { Instagram, Youtube, Twitter, ShieldCheck, Globe, ArrowUp } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCategory } from '../../types';

export const Footer: React.FC = () => {
  const { setSelectedCategory, navigateTo } = useShop();

  const handleCategoryClick = (category: ProductCategory | 'lookbook') => {
    if (category === 'lookbook') {
      const el = document.getElementById('lookbook-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedCategory(category);
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* TOP ROW: BRAND SUMMARY & QUICK NAVIGATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* BRAND INFO */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-xs font-mono text-neutral-400 max-w-sm leading-relaxed">
              PREMIUM STORE is an independent youth-focused streetwear label delivering high-vibe apparel, graphic oversized tees, unstructured caps, and raw baggy denim. Wear the best for less.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#00e65c] hover:border-[#00e65c] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#00e65c] hover:border-[#00e65c] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#00e65c] hover:border-[#00e65c] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* COLUMN 1: SHOP */}
          <div className="space-y-3">
            <p className="font-syne font-extrabold text-xs uppercase tracking-wider text-[#00e65c]">
              SHOP COLLECTION
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <button onClick={() => handleCategoryClick('shirts')} className="hover:text-white transition-colors">
                  Oversized Shirts
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('caps')} className="hover:text-white transition-colors">
                  Trucker Caps & Beanies
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('jeans')} className="hover:text-white transition-colors">
                  Baggy Jeans & Cargo Denim
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('new-arrivals')} className="hover:text-white transition-colors">
                  New Weekly Drops
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('best-sellers')} className="hover:text-white transition-colors">
                  Best Seller Grails
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('lookbook')} className="hover:text-white transition-colors">
                  Editorial Lookbook
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: CUSTOMER CARE */}
          <div className="space-y-3">
            <p className="font-syne font-extrabold text-xs uppercase tracking-wider text-[#00e65c]">
              CUSTOMER CARE
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  VIP Account & Profile
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('login')} className="hover:text-white transition-colors">
                  Sign In / Register
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  Track Your Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="text-[#00e65c] font-bold hover:underline transition-colors flex items-center gap-1"
                >
                  <ShieldCheck size={12} />
                  <span>Admin Portal</span>
                </button>
              </li>
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">
                  Worldwide Shipping Info
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors">
                  30-Day Easy Returns
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Help Center & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: ABOUT */}
          <div className="space-y-3">
            <p className="font-syne font-extrabold text-xs uppercase tracking-wider text-[#00e65c]">
              THE BRAND
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Our Story & Philosophy
                </a>
              </li>
              <li>
                <a href="#fabric" className="hover:text-white transition-colors">
                  Fabrics & Craftsmanship
                </a>
              </li>
              <li>
                <a href="#stores" className="hover:text-white transition-colors">
                  Flagship Store Locations
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-white transition-colors">
                  Organic Cotton Sourcing
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors">
                  Join the Crew / Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR: PAYMENT METHODS & COPYRIGHT */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Globe size={14} className="text-[#00e65c]" />
              <span>UNITED STATES (USD $)</span>
            </div>
            <span>© 2026 PREMIUM STORE INC. ALL RIGHTS RESERVED.</span>
          </div>

          {/* PAYMENT BADGES */}
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-400">
              VISA
            </span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-400">
              MASTERCARD
            </span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-400">
              AMEX
            </span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-[#00e65c]">
              APPLE PAY
            </span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-400">
              KLARNA
            </span>
          </div>

          {/* BACK TO TOP */}
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#00e65c] hover:border-[#00e65c] transition-colors"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
