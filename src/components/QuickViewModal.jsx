import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function QuickViewModal() {
  const {
    isQuickViewOpen,
    setIsQuickViewOpen,
    quickViewProduct,
    addToCart,
    formatPrice,
    navigateTo
  } = useCart();

  const [quantity, setQuantity] = useState(1);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const handleClose = () => {
    setIsQuickViewOpen(false);
  };

  const handleReserve = () => {
    addToCart(quickViewProduct, {
      colorway: quickViewProduct.provenanceTag || "Atelier Classic",
      quantity
    });
    handleClose();
  };

  const handleViewFull = () => {
    handleClose();
    navigateTo('pdp', quickViewProduct.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fade-in">
      <div className="bg-surface max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-secondary/40 shadow-2xl relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-1.5 sm:p-2 text-primary hover:text-secondary bg-surface/90 rounded-full transition-colors cursor-pointer shadow-md"
          aria-label="Close Preview"
        >
          <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-full bg-surface-container-low overflow-hidden">
            <img
              src={quickViewProduct.heroImage}
              alt={quickViewProduct.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary text-surface px-2.5 sm:px-3 py-1 font-label-caps-sm text-[8.5px] sm:text-[9px] uppercase tracking-widest">
              {quickViewProduct.edition || 'ATELIER EDITION'}
            </div>
          </div>

          {/* Details Side */}
          <div className="p-5 sm:p-8 md:p-10 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <span className="font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-secondary font-semibold block mb-1">
                  {quickViewProduct.collection || "Maison Lucci Firenze"}
                </span>
                <h3 className="font-headline-lg text-xl sm:text-2xl md:text-3xl text-primary font-normal leading-tight">
                  {quickViewProduct.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="font-headline-sm text-xl sm:text-2xl text-primary font-medium">
                  {formatPrice(quickViewProduct.price)}
                </span>
                <span className="font-label-caps-sm text-[8.5px] sm:text-[9px] uppercase tracking-wider text-outline">
                  White-Glove Courier Included
                </span>
              </div>

              <div className="w-12 sm:w-16 h-[1px] bg-secondary/40 my-1 sm:my-2"></div>

              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                {quickViewProduct.longDescription || quickViewProduct.description}
              </p>

              {quickViewProduct.specs && (
                <div className="space-y-1 pt-2 border-t border-outline-variant/30 text-xs">
                  {quickViewProduct.specs.slice(0, 3).map((s, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-outline-variant/20">
                      <span className="font-label-caps-sm text-[9px] sm:text-[10px] text-primary uppercase">{s.label}</span>
                      <span className="text-on-surface-variant font-light text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center justify-center border border-outline-variant/60 bg-surface-container-lowest shrink-0 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-medium text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleReserve}
                  className="flex-1 py-3 px-4 sm:px-6 bg-primary text-surface font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-tertiary transition-colors flex items-center justify-center space-x-2 border border-secondary/30 text-center"
                >
                  <span>Reserve Salon Allocation</span>
                  <span className="material-symbols-outlined text-sm text-secondary-fixed">arrow_forward</span>
                </button>
              </div>

              <button
                onClick={handleViewFull}
                className="w-full py-2.5 sm:py-3 border border-secondary text-primary font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] hover:bg-secondary/10 transition-colors text-center"
              >
                Inspect Archival Dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
