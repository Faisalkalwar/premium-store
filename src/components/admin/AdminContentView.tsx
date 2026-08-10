import React, { useState, useEffect } from 'react';
import { Save, FileText, Sparkles, Image as ImageIcon, Megaphone } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { AdminLayout } from './AdminLayout';
import { getSiteSettingsFromFirestore, saveSiteSettingsToFirestore } from '../../services/firebaseService';

export const AdminContentView: React.FC = () => {
  const { showToast } = useShop();

  const [saving, setSaving] = useState(false);
  const [announcementText, setAnnouncementText] = useState(
    'FREE SHIPPING ON ALL ORDERS OVER $150 — USE CODE "FREESHIP"'
  );
  const [heroTitle, setHeroTitle] = useState('RAW URBAN SILHOUETTES');
  const [heroSubtitle, setHeroSubtitle] = useState(
    'PREMIUM HEAVYWEIGHT COTTON, HAND-FINISHED WASHES, AND LIMITED-QUANTITY DROPS FOR THE MODERN ARCHIVE.'
  );
  const [heroCtaText, setHeroCtaText] = useState('EXPLORE COLLECTION');
  const [heroImage, setHeroImage] = useState(
    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1600&auto=format&fit=crop'
  );

  useEffect(() => {
    getSiteSettingsFromFirestore().then((settings) => {
      if (settings) {
        if (settings.announcementText) setAnnouncementText(settings.announcementText);
        if (settings.heroTitle) setHeroTitle(settings.heroTitle);
        if (settings.heroSubtitle) setHeroSubtitle(settings.heroSubtitle);
        if (settings.heroCtaText) setHeroCtaText(settings.heroCtaText);
        if (settings.heroImage) setHeroImage(settings.heroImage);
      }
    });
  }, []);

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const ok = await saveSiteSettingsToFirestore({
        announcementText,
        heroTitle,
        heroSubtitle,
        heroCtaText,
        heroImage,
      });
      if (ok) {
        showToast('Storefront content updated successfully!');
      } else {
        showToast('Error saving content settings.');
      }
    } catch (err) {
      console.error('Error saving content:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout activeSection="Storefront Content & Banners">
      <form onSubmit={handleSaveContent} className="space-y-8 max-w-4xl">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <h1 className="font-syne font-black text-2xl md:text-3xl uppercase tracking-tight text-white">
              STOREFRONT BANNERS & COPY
            </h1>
            <p className="font-mono text-xs text-neutral-400 mt-1">
              Customize hero headers, campaign taglines, and top announcement tickers.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-[#00e65c] text-black font-syne font-extrabold text-xs uppercase px-6 py-3.5 hover:bg-[#00ff66] transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <Save size={16} />
            <span>{saving ? 'SAVING...' : 'PUBLISH CHANGES'}</span>
          </button>
        </div>

        {/* ANNOUNCEMENT TICKER */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-[#00e65c] border-b border-neutral-800 pb-3">
            <Megaphone size={18} />
            <h3 className="font-syne font-bold text-sm uppercase text-white">
              TOP ANNOUNCEMENT BAR
            </h3>
          </div>

          <div className="font-mono text-xs space-y-2">
            <label className="block text-neutral-400">ANNOUNCEMENT TEXT</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="e.g. FREE SHIPPING ON ORDERS OVER $150"
              className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 focus:outline-none focus:border-[#00e65c]"
            />
            <p className="text-[10px] text-neutral-500">
              Appears as the scrolling black/green ticker at the very top of all store pages.
            </p>
          </div>
        </div>

        {/* HERO BANNER SECTION */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 space-y-6">
          <div className="flex items-center gap-2 text-[#00e65c] border-b border-neutral-800 pb-3">
            <ImageIcon size={18} />
            <h3 className="font-syne font-bold text-sm uppercase text-white">
              HOMEPAGE HERO CAMPAIGN BANNER
            </h3>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">MAIN HERO HEADLINE</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="RAW URBAN SILHOUETTES"
                className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 focus:outline-none focus:border-[#00e65c]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">HERO SUBTITLE / PARAGRAPH</label>
              <textarea
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="Campaign description text..."
                className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 focus:outline-none focus:border-[#00e65c]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 mb-1">CTA BUTTON LABEL</label>
                <input
                  type="text"
                  value={heroCtaText}
                  onChange={(e) => setHeroCtaText(e.target.value)}
                  placeholder="EXPLORE COLLECTION"
                  className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 focus:outline-none focus:border-[#00e65c]"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">HERO BACKGROUND IMAGE URL</label>
                <input
                  type="url"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 focus:outline-none focus:border-[#00e65c]"
                />
              </div>
            </div>

            {/* PREVIEW BOX */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                LIVE HERO PREVIEW:
              </p>
              <div className="relative h-48 bg-neutral-950 border border-neutral-800 overflow-hidden flex items-center justify-center p-6 text-center">
                <img
                  src={heroImage}
                  alt="Hero Preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 space-y-2 max-w-lg">
                  <h2 className="font-syne font-black text-xl text-white uppercase">{heroTitle}</h2>
                  <p className="font-mono text-[11px] text-neutral-300 line-clamp-2">
                    {heroSubtitle}
                  </p>
                  <span className="inline-block bg-[#00e65c] text-black font-syne font-black text-[10px] px-3 py-1 uppercase mt-1">
                    {heroCtaText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};
