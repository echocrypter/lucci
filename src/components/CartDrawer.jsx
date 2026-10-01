import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    formatPrice,
    openSalonBooking
  } = useCart();

  const [isReservedSuccess, setIsReservedSuccess] = useState(false);
  const [allocationRef, setAllocationRef] = useState('');

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    const refCode = `LUC-${Math.floor(100000 + Math.random() * 900000)}`;
    setAllocationRef(refCode);
    setIsReservedSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a059', '#1a3323', '#5c1d24', '#ffdea5']
      });
    } catch {
      // ignore
    }
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setIsReservedSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm transition-opacity duration-500"
      />

      {/* Drawer Plane - Full width on mobile, max-w-md on tablet, max-w-lg on desktop */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md md:max-w-lg bg-surface border-l border-outline-variant/40 shadow-2xl flex flex-col justify-between animate-slide-left">
          
          {/* Header */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
            <div>
              <span className="font-label-caps-sm text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-secondary block">
                Acquisition Register
              </span>
              <h2 className="font-headline-md text-lg sm:text-xl md:text-2xl text-primary font-normal">
                Salon Allocations ({cart.length})
              </h2>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              aria-label="Close Drawer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {isReservedSuccess ? (
              <div className="space-y-4 sm:space-y-6 text-center py-6 sm:py-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full border-2 border-secondary flex items-center justify-center bg-primary-container text-secondary-fixed">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">verified</span>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <span className="font-label-caps-sm text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-secondary font-semibold">
                    Reservation Confirmed
                  </span>
                  <h3 className="font-headline-lg text-xl sm:text-2xl text-primary font-normal">
                    Archival Folio Allocated
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant font-light max-w-xs mx-auto">
                    Your pieces have been vaulted under private allocation. A client couturier will contact you within 2 business hours.
                  </p>
                </div>

                {/* Archival Folio Card */}
                <div className="bg-surface-container p-4 sm:p-6 border border-secondary/40 text-left space-y-2.5 sm:space-y-3 shadow-inner">
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span className="font-label-caps-sm text-[8.5px] sm:text-[9px] uppercase tracking-widest text-outline">Allocation Reference</span>
                    <span className="font-mono text-xs font-bold text-primary">{allocationRef}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span className="font-label-caps-sm text-[8.5px] sm:text-[9px] uppercase tracking-widest text-outline">Dispatch Method</span>
                    <span className="font-body-sm text-xs text-primary">Bonded Armored Courier</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps-sm text-[8.5px] sm:text-[9px] uppercase tracking-widest text-outline">Vault Status</span>
                    <span className="font-label-caps-sm text-[9px] sm:text-[10px] text-secondary font-semibold tracking-wider uppercase">Secured in Florence</span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
                  <button
                    onClick={() => {
                      handleClose();
                      openSalonBooking('Firenze');
                    }}
                    className="w-full py-3.5 sm:py-4 bg-primary text-surface font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-tertiary transition-colors"
                  >
                    Schedule Private Fitting
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full py-3 border border-outline text-primary font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] hover:bg-surface-variant/30 transition-colors"
                  >
                    Return to Atelier
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 sm:py-20 text-center space-y-4">
                <span className="material-symbols-outlined text-4xl sm:text-5xl text-outline/40">
                  shopping_bag
                </span>
                <p className="font-headline-sm text-base sm:text-lg text-primary font-normal">
                  Your acquisition register is empty
                </p>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-xs mx-auto">
                  Explore our Autumn / Winter collection and reserve numbered atelier masterworks.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 sm:px-8 py-3 bg-primary text-surface font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-secondary transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6 divide-y divide-outline-variant/30">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 sm:pt-6 first:pt-0 flex gap-3 sm:gap-4">
                    {/* Item Thumbnail */}
                    <div className="w-20 sm:w-24 h-28 sm:h-32 shrink-0 bg-surface-container-low border border-outline-variant/30 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <span className="font-label-caps-sm text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-secondary font-semibold">
                            {item.edition}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-on-surface-variant hover:text-tertiary transition-colors p-1"
                            title="Remove Piece"
                          >
                            <span className="material-symbols-outlined text-base sm:text-lg">delete</span>
                          </button>
                        </div>
                        <h4 className="font-headline-sm text-sm sm:text-base text-primary font-medium mt-0.5">
                          {item.title}
                        </h4>
                        <p className="font-body-sm text-[11px] sm:text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                          {item.colorway}
                        </p>
                        
                        {item.monogram && (
                          <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-primary-container border border-secondary/40 text-[8.5px] sm:text-[9px] font-label-caps-sm uppercase tracking-wider text-secondary-fixed">
                            <span>24k Monogram:</span>
                            <span className="font-bold underline">{item.monogram}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-outline-variant/20 mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-outline-variant/60 bg-surface-container-lowest">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-on-surface-variant hover:text-primary transition-colors text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 sm:px-2.5 text-xs font-medium text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-on-surface-variant hover:text-primary transition-colors text-xs"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-body-md text-xs sm:text-sm font-semibold text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & CTA */}
          {!isReservedSuccess && cart.length > 0 && (
            <div className="p-4 sm:p-6 md:p-8 bg-surface-container-low border-t border-outline-variant/30 space-y-3 sm:space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="font-label-caps-sm text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-on-surface-variant">
                    Estimated Subtotal
                  </span>
                  <span className="font-headline-sm text-lg sm:text-xl text-primary font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] sm:text-xs text-on-surface-variant">
                  <span className="font-light">White-Glove Courier Delivery</span>
                  <span className="text-secondary font-medium uppercase tracking-wider text-[9px] sm:text-[10px]">Complimentary</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 sm:py-4 bg-primary text-surface font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-tertiary transition-colors duration-500 flex items-center justify-center space-x-2 border border-secondary/40 shadow-lg cursor-pointer"
              >
                <span>Confirm Salon Allocation</span>
                <span className="material-symbols-outlined text-sm text-secondary-fixed">arrow_forward</span>
              </button>

              <p className="font-label-caps-sm text-[8px] sm:text-[9px] text-center text-outline uppercase tracking-[0.18em]">
                Strict confidentiality. Bonded insurance included on all shipments.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
