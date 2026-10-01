import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, SALONS } from '../data/products';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, navigateTo, openQuickView, formatPrice } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const handleClose = () => {
    setIsSearchOpen(false);
    setQuery('');
  };

  const filteredProducts = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSalons = SALONS.filter(s =>
    s.city.toLowerCase().includes(query.toLowerCase()) ||
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/75 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-6 md:px-8 animate-fade-in">
      <div className="bg-surface max-w-3xl w-full border border-secondary/50 shadow-2xl overflow-hidden my-4">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 md:p-8 bg-surface-container-low border-b border-outline-variant/40 flex items-center gap-3 sm:gap-4">
          <span className="material-symbols-outlined text-xl sm:text-2xl text-secondary shrink-0">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, leather goods, or salons..."
            className="w-full bg-transparent border-none text-sm sm:text-base md:text-lg font-headline-sm text-primary placeholder:text-outline/60 focus:ring-0 focus:outline-none"
          />
          <button
            onClick={handleClose}
            className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer shrink-0"
            aria-label="Close Search"
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="p-3 sm:p-4 px-4 sm:px-8 bg-surface border-b border-outline-variant/20 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
          <span className="font-label-caps-sm text-[8.5px] sm:text-[9px] uppercase tracking-widest text-outline">Quick Filters:</span>
          {["Il Baule D'Oro", "Velvet Trench", "Como Silk", "Firenze", "Milano", "Palazzo Pant"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-surface-container hover:bg-secondary-fixed/20 border border-outline-variant/40 font-label-caps-sm text-[8.5px] sm:text-[9px] uppercase tracking-wider text-primary transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {query.trim() === '' ? (
            <div className="space-y-4 sm:space-y-6">
              <span className="font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-secondary font-semibold block">
                Featured Archival Allocations
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {PRODUCTS.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      handleClose();
                      openQuickView(product);
                    }}
                    className="flex gap-3 p-2.5 sm:p-3 bg-surface-container-low hover:border-secondary border border-outline-variant/30 transition-all cursor-pointer group"
                  >
                    <div className="w-14 sm:w-16 h-18 sm:h-20 bg-surface-container overflow-hidden shrink-0">
                      <img src={product.heroImage} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="font-label-caps-sm text-[8px] uppercase tracking-wider text-secondary font-semibold block">{product.edition}</span>
                        <h5 className="font-headline-sm text-xs sm:text-sm text-primary font-medium">{product.title}</h5>
                      </div>
                      <span className="font-body-md text-xs font-semibold text-primary">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  <span className="font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-secondary font-semibold block">
                    Couture &amp; Leather Masterworks ({filteredProducts.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          handleClose();
                          openQuickView(product);
                        }}
                        className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 bg-surface-container-low hover:border-secondary border border-outline-variant/30 transition-all cursor-pointer group"
                      >
                        <div className="w-16 sm:w-20 h-20 sm:h-24 bg-surface-container overflow-hidden shrink-0">
                          <img src={product.heroImage} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex flex-col justify-between">
                          <div>
                            <span className="font-label-caps-sm text-[8px] uppercase tracking-wider text-secondary font-semibold block">{product.edition}</span>
                            <h5 className="font-headline-sm text-xs sm:text-sm text-primary font-medium group-hover:text-secondary transition-colors">{product.title}</h5>
                            <p className="font-body-sm text-[10px] sm:text-[11px] text-on-surface-variant line-clamp-1">{product.tagline}</p>
                          </div>
                          <span className="font-body-md text-xs font-semibold text-primary">{formatPrice(product.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredSalons.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-outline-variant/30">
                  <span className="font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-secondary font-semibold block">
                    Maison Salons ({filteredSalons.length})
                  </span>
                  <div className="space-y-2">
                    {filteredSalons.map((salon) => (
                      <div
                        key={salon.city}
                        onClick={() => {
                          handleClose();
                          navigateTo('home');
                          setTimeout(() => {
                            const el = document.getElementById('maison');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }}
                        className="p-2.5 sm:p-3 bg-surface-container-low border border-outline-variant/30 flex justify-between items-center cursor-pointer hover:border-primary"
                      >
                        <div>
                          <h6 className="font-headline-sm text-xs sm:text-sm text-primary font-medium">{salon.name} • {salon.city}</h6>
                          <p className="font-body-sm text-[11px] sm:text-xs text-on-surface-variant font-light">{salon.address}</p>
                        </div>
                        <span className="font-label-caps-sm text-[8.5px] sm:text-[9px] uppercase tracking-widest text-secondary font-semibold">
                          View →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 && filteredSalons.length === 0 && (
                <div className="py-12 text-center space-y-2">
                  <p className="font-headline-sm text-base sm:text-lg text-primary">No archival matches found</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">Try searching for "velvet", "trench", "bag", "silk", or "firenze"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
