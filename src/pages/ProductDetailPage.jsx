import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function ProductDetailPage() {
  const {
    addToCart,
    openSalonBooking,
    openQuickView,
    formatPrice,
    navigateTo,
    showToast
  } = useCart();

  // The Masterpiece Product
  const product = PRODUCTS[0]; // Il Baule D'Oro

  // Active View & Gallery Switcher
  const [activeImageKey, setActiveImageKey] = useState('travertine');
  const [selectedColorway, setSelectedColorway] = useState(product.colorways[0]);
  const [monogramText, setMonogramText] = useState('L.M.');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Curated complementary ensemble
  const ensembleItems = PRODUCTS.slice(1, 4);

  const activeImageData = product.gallery.find(g => g.id === activeImageKey) || product.gallery[0];

  const handleMonogramChange = (e) => {
    const val = e.target.value.toUpperCase().slice(0, 3);
    setMonogramText(val);
  };

  const handleAcquire = () => {
    addToCart(product, {
      colorway: selectedColorway.name,
      monogram: monogramText || null,
      quantity: 1
    });
  };

  return (
    <div className="bg-background text-on-surface antialiased archival-grain min-h-screen">
      {/* ================= BREADCRUMB & SALON EDITION BANNER ================= */}
      {/* Safe padding-top to avoid fixed header overlap on mobile, tablet, and desktop */}
      <section className="border-b border-outline-variant/30 bg-surface-container-low pt-24 sm:pt-28 md:pt-32 pb-3 sm:pb-4 px-4 sm:px-8 md:px-16">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-3 text-on-surface-variant font-label-caps-sm text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em]">
            <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors cursor-pointer">
              Maison Lucci
            </button>
            <span className="text-outline-variant">/</span>
            <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors cursor-pointer">
              Leather Goods
            </button>
            <span className="text-outline-variant">/</span>
            <span>Masterpiece No. 04</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Autumn-Winter Salon</span>
          </div>

          {/* Archival Status Badge */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
            <span className="font-label-caps-sm text-[9px] sm:text-xs tracking-[0.22em] sm:tracking-[0.3em] uppercase text-secondary font-medium">
              Limited to 75 Numbered Pieces — Florence
            </span>
          </div>
        </div>
      </section>

      {/* ================= MAIN PDP GALLERY & SPECIFICATION GRID ================= */}
      <main className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16 pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 xl:gap-20 items-start">
          
          {/* ================= LEFT COLUMN: PHOTOGRAPHIC EDITORIAL SALON (60% / 7 Cols) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-10">
            {/* Main Master Display (Travertine Studio Pillar) */}
            <div className="relative bg-surface-container-lowest border border-outline-variant/30 overflow-hidden group">
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden flex items-center justify-center bg-surface-container-low cursor-zoom-in"
              >
                <img
                  id="primaryHeroImage"
                  src={activeImageData.image}
                  alt={activeImageData.alt}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Archival Folio Stamp Overlay */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none border border-secondary/40 bg-surface/90 px-2.5 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-sm">
                  <span className="font-label-caps-sm text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary font-semibold">
                    Planimetry Ref. 04-A
                  </span>
                </div>

                {/* Zoom Hint */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/70 text-surface p-2 backdrop-blur-sm text-xs font-label-caps-sm tracking-widest uppercase flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                  <span>Inspect Detail</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Selector / Architectural Gallery Rail */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
              {product.gallery.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveImageKey(view.id)}
                  className={`relative pb-2 sm:pb-3 text-left focus:outline-none transition-all duration-300 cursor-pointer ${
                    activeImageKey === view.id
                      ? 'border-b-2 border-secondary'
                      : 'border-b-2 border-transparent hover:border-outline-variant'
                  }`}
                >
                  <div className="aspect-[4/5] bg-surface-container-low overflow-hidden border border-outline-variant/30 mb-1.5 sm:mb-2">
                    <img
                      src={view.image}
                      alt={view.alt}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <span className={`block font-label-caps-sm text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] truncate ${
                    activeImageKey === view.id ? 'text-primary font-semibold' : 'text-on-surface-variant'
                  }`}>
                    {view.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Editorial Quote Card / Atmospheric Story */}
            <div className="border-l-2 border-secondary pl-4 sm:pl-8 py-4 sm:py-6 my-2 sm:my-4 bg-surface-container-low/50">
              <blockquote className="font-headline-sm text-base sm:text-lg md:text-xl italic text-primary font-normal leading-relaxed">
                "{product.curatorQuote}"
              </blockquote>
              <p className="mt-3 sm:mt-4 font-label-caps-sm text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-on-surface-variant font-medium">
                {product.curatorAuthor}
              </p>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PRODUCT ACQUISITION DOSSIER (40% / 5 Cols) ================= */}
          {/* Sticky only on desktop (lg:) so mobile/tablet can scroll naturally */}
          <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8 lg:sticky lg:top-28">
            {/* Identity & Archival Register */}
            <div className="border-b border-outline-variant/30 pb-4 sm:pb-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="font-label-caps-sm text-[9px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-secondary font-semibold">
                  {product.edition}
                </span>
                <span className="font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-tertiary bg-tertiary-fixed/40 px-2 sm:px-2.5 py-0.5 border border-tertiary/20 font-medium">
                  Only {product.salonsLeft} Salons Left
                </span>
              </div>

              <h1 className="font-headline-xl text-2xl sm:text-3xl md:text-headline-xl text-primary font-normal leading-tight tracking-tight">
                {product.title}
              </h1>

              <p className="font-body-md text-xs sm:text-sm md:text-base text-on-surface-variant mt-2 font-light leading-relaxed">
                {product.longDescription}
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-baseline gap-2 sm:gap-4">
                <span className="font-headline-md text-2xl sm:text-3xl text-primary font-medium">
                  {formatPrice(product.price)}
                </span>
                <span className="font-label-caps-sm text-[8.5px] sm:text-[9.5px] text-on-surface-variant tracking-[0.18em] uppercase">
                  EUR VAT &amp; White-Glove Courier Included
                </span>
              </div>
            </div>

            {/* Bespoke Colorway Palette Selector */}
            <div>
              <label className="block font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary mb-2 sm:mb-3">
                Atelier Colorway: <span className="text-secondary font-semibold">{selectedColorway.name}</span>
              </label>

              <div className="flex items-center space-x-3 sm:space-x-4">
                {product.colorways.map((cw) => {
                  const isSelected = selectedColorway.id === cw.id;
                  return (
                    <button
                      key={cw.id}
                      onClick={() => setSelectedColorway(cw)}
                      className={`relative p-1 transition-all cursor-pointer ${
                        isSelected ? 'border-2 border-primary' : 'border border-outline-variant/60 hover:border-primary'
                      }`}
                      title={cw.name}
                    >
                      <div className="w-8 h-8 flex overflow-hidden">
                        {cw.swatchColors.map((color, idx) => (
                          <div
                            key={idx}
                            style={{ backgroundColor: color, width: `${100 / cw.swatchColors.length}%` }}
                            className="h-full"
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bespoke Monogramming Customizer (24k Hot-Stamping) */}
            <div className="bg-surface-container-low border border-outline-variant/40 p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-secondary text-lg sm:text-xl">edit_note</span>
                  <span className="font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary font-semibold">
                    Bespoke Gold Foil Monogram
                  </span>
                </div>
                <span className="font-label-caps-sm text-[9px] sm:text-xs uppercase tracking-[0.2em] text-secondary font-medium">
                  Complimentary
                </span>
              </div>

              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed font-light">
                Personalize your leather key clochette with up to three hand-pressed 24k gold leaf Roman serif initials in our Florence atelier.
              </p>

              <div className="flex items-center gap-3 sm:gap-4 pt-1">
                <input
                  type="text"
                  maxLength={3}
                  value={monogramText}
                  onChange={handleMonogramChange}
                  placeholder="L.M."
                  className="w-20 sm:w-24 bg-surface border-0 border-b border-outline focus:border-secondary focus:ring-0 text-center font-headline-sm text-lg sm:text-xl uppercase text-primary placeholder:text-outline-variant/60 py-1.5 sm:py-2 tracking-widest shrink-0"
                />

                <div className="flex items-center gap-2 sm:gap-3 border-l border-outline-variant/40 pl-3 sm:pl-4 overflow-hidden">
                  <span className="font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-on-surface-variant shrink-0">
                    Live Clochette:
                  </span>
                  {/* Leather clochette mockup tag */}
                  <div className="w-10 h-12 sm:w-12 sm:h-14 bg-primary-container border border-secondary flex flex-col items-center justify-center shadow-md relative shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-fixed mb-1 opacity-70"></div>
                    <span className="font-serif gold-foil-emboss text-xs sm:text-sm font-semibold tracking-widest">
                      {monogramText || 'L.M.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Acquisition Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAcquire}
                className="w-full bg-primary-container text-surface py-4 sm:py-5 px-4 sm:px-8 font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-tertiary transition-colors duration-500 ease-out flex items-center justify-center space-x-2 sm:space-x-3 border border-secondary/40 shadow-[0_20px_48px_-12px_rgba(13,32,21,0.18)] cursor-pointer text-center"
              >
                <span>Acquire Masterpiece — Reserve Allocation</span>
                <span className="material-symbols-outlined text-secondary-fixed text-sm">arrow_forward</span>
              </button>

              <button
                onClick={() => openSalonBooking('Firenze')}
                className="w-full bg-transparent border border-outline text-primary py-3.5 sm:py-4 px-4 sm:px-8 font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-surface-variant/40 transition-colors duration-500 ease-out flex items-center justify-center space-x-2 cursor-pointer text-center"
              >
                <span>Book Private Salon Fitting &amp; Consultation</span>
              </button>

              <div className="pt-2 text-center">
                <button
                  onClick={() => openSalonBooking('Firenze')}
                  className="inline-flex items-center space-x-2 text-on-surface-variant hover:text-secondary font-label-caps-sm text-[9px] sm:text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">support_agent</span>
                  <span>Speak with Private Client Concierge (Florence +39 055 839 2000)</span>
                </button>
              </div>
            </div>

            {/* Quick Provenance Dossier Accordion */}
            <div className="border-t border-outline-variant/40 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
              <details className="group py-2 border-b border-outline-variant/30" open>
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-label-caps-md text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                    Materials &amp; Provenance
                  </span>
                  <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant pt-2.5 leading-relaxed font-light">
                  Full-grain Tuscan calfskin from Santa Croce sull'Arno, aged 18 months in chestnut tannins. Hand-shaped flame-bent Japanese bamboo top-handle with smoke-burnished nodes.
                </p>
              </details>

              <details className="group py-2 border-b border-outline-variant/30">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-label-caps-md text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                    Hardware &amp; Bullion Inscription
                  </span>
                  <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant pt-2.5 leading-relaxed font-light">
                  Solid milled Florentine brass turn-lock clasp triple-dipped in 24-karat gold bullion. Each piece bears an individually engraved archival edition number on the interior suede plaque.
                </p>
              </details>

              <details className="group py-2 border-b border-outline-variant/30">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-label-caps-md text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                    Dimensions &amp; Compartments
                  </span>
                  <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="font-body-md text-xs sm:text-sm text-on-surface-variant pt-2.5 space-y-1.5 font-light">
                  <p>• Width: 28 cm (11.0 in) | Height: 21 cm (8.2 in) | Depth: 12 cm (4.7 in)</p>
                  <p>• Handle Drop: 11 cm (4.3 in)</p>
                  <p>• Includes detachable burgundy leather shoulder strap (adjustable 98–114 cm)</p>
                  <p>• Interior zipped partition with twin silk-lined slip pockets and key clochette</p>
                </div>
              </details>
            </div>

          </div>
        </div>
      </main>

      {/* ================= THE ANATOMY OF MASTERY ================= */}
      <section className="bg-surface-container py-16 sm:py-24 border-y border-outline-variant/30">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="font-label-caps-sm text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-secondary font-semibold">
              Florence Atelier Heritage
            </span>
            <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-primary font-normal">
              The Anatomy of Mastery
            </h2>
            <div className="w-12 h-px bg-secondary mx-auto mt-3"></div>
            <p className="font-body-md text-xs sm:text-sm md:text-base text-on-surface-variant font-light">
              Each Baule D'Oro demands over seventy-two discrete steps performed by three master artisans inside our historic Oltrarno workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="bg-surface p-6 sm:p-8 border border-outline-variant/40 space-y-4 sm:space-y-6 flex flex-col justify-between hover:border-secondary transition-colors duration-500">
              <div className="space-y-3 sm:space-y-4">
                <span className="font-headline-lg text-2xl sm:text-3xl text-secondary/60 font-light block">01</span>
                <h3 className="font-headline-sm text-base sm:text-lg text-primary font-medium">Santa Croce Tannery</h3>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light">
                  Selected from slow-growth Tuscan hides steeped for 18 months in organic chestnut and mimosa tannins. The leather yields a velvet tactile firmness that gracefully deepens in color with age.
                </p>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-outline-variant/30 flex items-center justify-between text-secondary">
                <span className="font-label-caps-sm text-[8.5px] sm:text-[9.5px] tracking-[0.2em] uppercase font-semibold">Chestnut Tannin Bath</span>
                <span className="material-symbols-outlined text-sm">eco</span>
              </div>
            </div>

            <div className="bg-surface p-6 sm:p-8 border border-outline-variant/40 space-y-4 sm:space-y-6 flex flex-col justify-between hover:border-secondary transition-colors duration-500">
              <div className="space-y-3 sm:space-y-4">
                <span className="font-headline-lg text-2xl sm:text-3xl text-secondary/60 font-light block">02</span>
                <h3 className="font-headline-sm text-base sm:text-lg text-primary font-medium">Florentine Flame-Bending</h3>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light">
                  Japanese bamboo canes are individually selected for nodular symmetry, softened over open fire, and hand-bent around wooden mandrels. Smoke-burnishing imparts an unrepeatable marbled amber luster.
                </p>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-outline-variant/30 flex items-center justify-between text-secondary">
                <span className="font-label-caps-sm text-[8.5px] sm:text-[9.5px] tracking-[0.2em] uppercase font-semibold">Fire Mandrel Method</span>
                <span className="material-symbols-outlined text-sm">local_fire_department</span>
              </div>
            </div>

            <div className="bg-surface p-6 sm:p-8 border border-outline-variant/40 space-y-4 sm:space-y-6 flex flex-col justify-between hover:border-secondary transition-colors duration-500">
              <div className="space-y-3 sm:space-y-4">
                <span className="font-headline-lg text-2xl sm:text-3xl text-secondary/60 font-light block">03</span>
                <h3 className="font-headline-sm text-base sm:text-lg text-primary font-medium">36 Hours of Hand-Stitching</h3>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light">
                  Double-needle saddle stitch executed in heavy beeswax-coated linen cord. Each stitch is drawn tight under constant human tension, guaranteeing structural permanence that machine seams cannot achieve.
                </p>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-outline-variant/30 flex items-center justify-between text-secondary">
                <span className="font-label-caps-sm text-[8.5px] sm:text-[9.5px] tracking-[0.2em] uppercase font-semibold">Saddle Stitch Gauge 7</span>
                <span className="material-symbols-outlined text-sm">handshake</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARCHIVAL CERTIFICATE & NFC PROVENANCE ================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16 py-16 sm:py-24">
        <div className="bg-primary text-surface p-6 sm:p-10 md:p-16 border border-secondary/40 relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 opacity-5 pointer-events-none text-[200px] sm:text-[300px] font-serif select-none">
            L
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-2.5 sm:space-x-3 text-secondary-fixed">
                <span className="material-symbols-outlined text-xl sm:text-2xl">verified</span>
                <span className="font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold">
                  Permanent Provenance Guarantee
                </span>
              </div>

              <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-surface font-normal">
                Hand-Inscribed Parchment &amp; Encrypted NFC Register
              </h2>

              <p className="font-body-lg text-sm sm:text-base text-surface-variant/90 max-w-2xl font-light leading-relaxed">
                Every edition of Il Baule D'Oro is delivered with a wax-sealed certificate inscribed with the artisan's signature, date of completion, and exact hide registry. Concealed within the lining sits an encrypted microchip granting unforgeable digital title on the Lucci Archival Ledger.
              </p>

              <div className="pt-2 sm:pt-4 flex flex-wrap gap-4 sm:gap-8 text-surface-variant">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="material-symbols-outlined text-secondary-fixed">nfc</span>
                  <span className="font-label-caps-sm text-[9px] sm:text-xs uppercase tracking-[0.18em]">
                    Contactless Vault Verification
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="material-symbols-outlined text-secondary-fixed">history_edu</span>
                  <span className="font-label-caps-sm text-[9px] sm:text-xs uppercase tracking-[0.18em]">
                    Archival Ledger Book Inscription
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Preview Card - Centered on Mobile */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-56 sm:w-64 h-72 sm:h-80 bg-surface-container-lowest text-primary p-5 sm:p-6 shadow-2xl border-2 border-secondary relative flex flex-col justify-between">
                <div className="text-center space-y-1 sm:space-y-2 border-b border-outline-variant/40 pb-3 sm:pb-4">
                  <span className="font-headline-sm text-lg sm:text-xl tracking-[0.2em] font-normal block uppercase">
                    LUCCI
                  </span>
                  <span className="font-label-caps-sm text-[8px] uppercase tracking-[0.25em] text-secondary">
                    Firenze Atelier
                  </span>
                </div>

                <div className="space-y-1.5 sm:space-y-2 text-center py-2 sm:py-4">
                  <span className="font-label-caps-sm text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] text-on-surface-variant block">
                    Certificate of Authenticity
                  </span>
                  <span className="font-headline-sm text-primary italic font-serif block text-base sm:text-lg">
                    Il Baule D'Oro
                  </span>
                  <span className="font-label-caps-sm text-[10px] sm:text-xs text-secondary font-bold block">
                    Folio No. 04 / 75
                  </span>
                </div>

                <div className="border-t border-outline-variant/40 pt-2.5 sm:pt-3 text-center">
                  <span className="font-label-caps-sm text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.18em] text-outline block">
                    Cryptographic Hash Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CURATED ENSEMBLE ================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16 py-12 sm:py-16 border-t border-outline-variant/30">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <span className="font-label-caps-sm text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-secondary font-semibold block mb-1 sm:mb-2">
              Curated Ensemble
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-normal">
              Designed to Accompany Il Baule D'Oro
            </h2>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary hover:text-secondary border-b border-primary hover:border-secondary pb-1 transition-all duration-300 cursor-pointer text-left w-fit"
          >
            Explore Runway Wardrobe →
          </button>
        </div>

        {/* 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {ensembleItems.map((item) => (
            <div key={item.id} className="group">
              <div 
                onClick={() => openQuickView(item)}
                className="aspect-[3/4] bg-surface-container-low overflow-hidden border border-outline-variant/30 mb-3 sm:mb-5 relative cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={item.heroImage}
                  alt={item.title}
                />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(item);
                    }}
                    className="w-full bg-primary/95 text-surface py-2.5 sm:py-3 font-label-caps-sm text-[9px] sm:text-xs tracking-[0.2em] uppercase hover:bg-tertiary transition-colors shadow-lg cursor-pointer"
                  >
                    Quick Reserve
                  </button>
                </div>
              </div>

              <h3 
                onClick={() => openQuickView(item)}
                className="font-body-md text-sm sm:text-base text-primary font-medium cursor-pointer hover:text-secondary transition-colors"
              >
                {item.title}
              </h3>
              <p className="font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-on-surface-variant mt-0.5 sm:mt-1">
                {item.provenanceTag}
              </p>
              <p className="font-body-md text-sm sm:text-base font-semibold text-primary mt-1.5 sm:mt-2">
                {formatPrice(item.price)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LUXURY CLIENT GUARANTEES (Burgundy Ribbon) ================= */}
      <section className="bg-tertiary text-on-tertiary py-10 sm:py-12 px-4 sm:px-8 md:px-16 border-y border-outline/20">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 sm:gap-4">
            <span className="material-symbols-outlined text-secondary-fixed text-2xl sm:text-3xl">local_shipping</span>
            <div>
              <h4 className="font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-surface font-semibold">
                White-Glove Courier Delivery
              </h4>
              <p className="font-body-sm text-xs text-tertiary-fixed-dim/80 mt-1 font-light leading-relaxed">
                Armored, climate-regulated private transport directly to your residence or private yacht.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 sm:gap-4">
            <span className="material-symbols-outlined text-secondary-fixed text-2xl sm:text-3xl">auto_fix_high</span>
            <div>
              <h4 className="font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-surface font-semibold">
                Lifetime Archival Restoration
              </h4>
              <p className="font-body-sm text-xs text-tertiary-fixed-dim/80 mt-1 font-light leading-relaxed">
                Complimentary bi-annual nourishment, edge re-lacquering, and seam inspection in Florence.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 sm:gap-4">
            <span className="material-symbols-outlined text-secondary-fixed text-2xl sm:text-3xl">concierge</span>
            <div>
              <h4 className="font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-surface font-semibold">
                Dedicated Atelier Concierge
              </h4>
              <p className="font-body-sm text-xs text-tertiary-fixed-dim/80 mt-1 font-light leading-relaxed">
                24/7 direct encrypted line to your personal maison client advisor for salon appointments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <img
            src={activeImageData.image}
            alt={activeImageData.alt}
            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
          />
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-2xl sm:text-3xl p-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
