import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import newHeroImage from '../assets/lucci-new-hero.png';

export default function HomePage() {
  const {
    addToCart,
    openQuickView,
    openSalonBooking,
    setIsRunwayOpen,
    navigateTo,
    formatPrice,
    showToast
  } = useCart();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    showToast(`Private register invitation dispatched to ${newsletterEmail}`);
  };

  // Hero product is Il Baule D'Oro
  const heroMasterpiece = PRODUCTS[0];

  // 4 curated looks
  const curatedLooks = PRODUCTS.slice(1, 5);

  return (
    <main className="overflow-hidden">

      {/* ================= 1. GRAND EDITORIAL HERO SECTION ================= */}
      <section className="relative w-full min-h-[92vh] sm:min-h-[95vh] md:min-h-screen flex items-end justify-start bg-primary-container">

        {/* Full Bleed Editorial Visual */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">

         <img
  src={newHeroImage}
  alt="LUCCI woman wearing an elegant dark forest coat in a classical Italian garden"
  className="
    absolute
    left-0
    top-[92px]
    w-full
    h-[calc(100%-92px)]
    object-cover
    object-[center_top]
    filter
    brightness-[0.96]
    contrast-[1.04]
    scale-[1.02]
    transition-transform
    duration-[1200ms]
    ease-out
  "
/>

          {/* Subtle luxury readability overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent"></div>

          <div className="absolute inset-0 bg-gradient-to-r from-primary/55 via-transparent to-transparent"></div>

        </div>

        {/* Hero Typography Framing */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16 pb-12 sm:pb-16 md:pb-24 pt-24 sm:pt-32 md:pt-40 flex flex-col justify-end">

          <div className="max-w-3xl space-y-4 sm:space-y-6">

            {/* Category Monogram Tag */}
            <div className="inline-flex items-center space-x-2.5 sm:space-x-3 px-3 sm:px-4 py-1 sm:py-1.5 border border-secondary-fixed/50 bg-primary/60 backdrop-blur-md">

              <span className="w-1.5 h-1.5 bg-secondary-fixed rounded-full shrink-0"></span>

              <span className="font-label-caps-md text-[9px] sm:text-[10px] md:text-label-caps-md tracking-[0.25em] sm:tracking-[0.3em] uppercase text-surface font-light">
                AUTUMN / WINTER 2025 SALON
              </span>

            </div>

            {/* Hero Headline */}
            <h1 className="font-display-hero text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-surface leading-[1.08] tracking-tight font-normal">

              COLLECTION NO. IX:
              <br />

              <span className="italic font-normal text-secondary-fixed">
                L'Archivio
              </span>{' '}
              di Firenze

            </h1>

            <p className="font-body-lg text-sm sm:text-base md:text-lg text-surface-container-high max-w-xl font-light leading-relaxed">
              Sculpted deep forest velvets, disciplined oxblood calfskin, and architectural Tuscan silhouettes tailored for the modern nobility.
            </p>

            {/* Divider Rule */}
            <div className="w-16 sm:w-24 h-[1px] bg-secondary-fixed/60 my-4 sm:my-6"></div>

            {/* Action Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 pt-1 sm:pt-2">

              <a
                href="#collections"
                className="inline-flex items-center justify-center px-6 sm:px-10 py-3.5 sm:py-4 bg-surface text-primary font-label-caps-md text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-secondary-fixed transition-colors duration-500 font-medium text-center"
              >
                Discover the Campaign
              </a>

              <button
                onClick={() => navigateTo('pdp', 'il-baule-doro')}
                className="inline-flex items-center justify-center px-6 sm:px-10 py-3.5 sm:py-4 border border-secondary-fixed/60 text-surface font-label-caps-md text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-secondary-fixed/10 transition-colors duration-500 font-medium cursor-pointer text-center"
              >
                Explore Il Baule D'Oro
              </button>

            </div>

          </div>

        </div>

        {/* Editorial Bottom Metadata Strip */}
        <div className="hidden lg:flex absolute bottom-6 right-16 z-10 items-center space-x-8 xl:space-x-12 text-surface/80 font-label-caps-sm text-[10px] tracking-[0.3em] uppercase">

          <span>Villa Guicciardini, Fiesole</span>

          <span className="text-secondary-fixed">•</span>

          <span>Silhouettes 01 — 28</span>

          <span className="text-secondary-fixed">•</span>

          <span>Atelier Edition 2025</span>

        </div>

      </section>


      {/* ================= 2. EDITORIAL PROVENANCE / QUOTE TRACK ================= */}
      <section className="py-16 sm:py-24 md:py-32 bg-surface border-b border-outline-variant/30">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">

          <span className="font-label-caps-sm text-xs tracking-[0.3em] sm:tracking-[0.35em] uppercase text-secondary font-semibold">
            The Archival Manifesto
          </span>

          <blockquote className="font-headline-xl text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-normal leading-relaxed">
            "True luxury does not clamor for attention. It commands presence through deliberate restraint, century-aged patina, and uncompromising form."
          </blockquote>

          <div className="flex items-center justify-center space-x-4">

            <div className="h-[1px] w-8 sm:w-12 bg-secondary/40"></div>

            <span className="font-label-caps-md text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-on-surface-variant font-medium">
              MAISON LUCCI • FIRENZE
            </span>

            <div className="h-[1px] w-8 sm:w-12 bg-secondary/40"></div>

          </div>

        </div>

      </section>


      {/* ================= 3. CURATED LOOKBOOK CAPSULE ================= */}
      <section
        className="py-16 sm:py-24 md:py-32 max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16"
        id="collections"
      >

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">

          <div className="space-y-2 sm:space-y-3">

            <div className="flex items-center space-x-2">

              <span className="w-2 h-[1px] bg-secondary"></span>

              <span className="font-label-caps-sm text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-secondary font-semibold">
                Haute Couture Autumn '25
              </span>

            </div>

            <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-primary font-normal">
              Selected Runway Silhouettes
            </h2>

          </div>

          <div className="flex items-center space-x-6">

            <button
              onClick={() => setIsRunwayOpen(true)}
              className="font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary hover:text-secondary pb-1 border-b border-primary/40 hover:border-secondary transition-all duration-300 cursor-pointer"
            >
              View Complete Folio (28 Looks) →
            </button>

          </div>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 xl:gap-10">

          {curatedLooks.map((look) => (

            <article
              key={look.id}
              className="group flex flex-col bg-surface-container-low border border-outline-variant/30 transition-all duration-500 hover:border-secondary/50 shadow-sm"
            >

              <div
                onClick={() => openQuickView(look)}
                className="relative aspect-[4/5] overflow-hidden bg-surface-container cursor-pointer"
              >

                <img
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  src={look.heroImage}
                  alt={look.title}
                />

                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 font-label-caps-sm text-[9px] bg-primary text-surface px-2.5 py-1 tracking-[0.2em] uppercase">
                  {look.edition}
                </span>

                <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center p-6">

                  <span className="bg-surface text-primary px-6 py-2.5 font-label-caps-sm text-xs uppercase tracking-[0.25em] shadow-lg">
                    Quick Salon View
                  </span>

                </div>

                <div className="sm:hidden absolute bottom-3 right-3 bg-surface/90 text-primary px-2.5 py-1 text-[9px] font-label-caps-sm uppercase tracking-wider shadow">
                  Tap to Inspect
                </div>

              </div>


              <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow space-y-3 sm:space-y-4">

                <div>

                  <span className="font-label-caps-sm text-[9px] tracking-[0.2em] uppercase text-outline block">
                    {look.tagline}
                  </span>

                  <h3
                    onClick={() => openQuickView(look)}
                    className="font-headline-sm text-base sm:text-lg text-primary mt-1 group-hover:text-secondary transition-colors duration-300 cursor-pointer font-medium"
                  >
                    {look.title}
                  </h3>

                </div>


                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-outline-variant/20">

                  <span className="font-body-md text-sm sm:text-base text-on-surface font-semibold">
                    {formatPrice(look.price)}
                  </span>

                  <button
                    onClick={() =>
                      addToCart(look, {
                        colorway: look.provenanceTag,
                        quantity: 1
                      })
                    }
                    className="font-label-caps-sm text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-secondary hover:text-primary transition-colors cursor-pointer font-medium py-1 px-1"
                  >
                    Reserve →
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ================= 4. SPLIT FEATURE ================= */}
      <section
        className="bg-surface-container-low py-16 sm:py-24 md:py-32 border-y border-outline-variant/30"
        id="leather-goods"
      >

        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

            <div className="lg:col-span-7 relative">

              <div className="relative bg-surface p-3 sm:p-6 md:p-8 border border-secondary/30 shadow-[0_20px_48px_-12px_rgba(13,32,21,0.08)]">

                <div
                  onClick={() => navigateTo('pdp', heroMasterpiece.id)}
                  className="relative aspect-[3/4] max-h-[820px] w-full overflow-hidden bg-surface-container cursor-pointer group"
                >

                  <img
                    alt="Artisanal LUCCI structured leather handbag with bamboo handle"
                    className="w-full h-full object-cover object-center filter contrast-[1.02] group-hover:scale-105 transition-transform duration-1000 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr9ssGwS8cECb1ejof2JWwCdfPvQm-Kz0a2nbR9rjhi6ApdqAi9rNkAo6MU_aYICxmgGD7GYhVZZ_9Qkwd0UcLoSFQ6hvtyg550J3vIAeEl2ZNaIQQvHnzJxCNQdoU_r4N1xgZr6zZ9DGoMFQ8fIdu500S326Faul-mkHRggkvMVB-1g3yACmR2xX1TNprv7cjXhod6KNN8z36XIkz6ELb6yOC7B9KM_gXfoTVQ2UiajQIu01QbAIt"
                  />

                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">

                    <span className="bg-surface text-primary px-6 sm:px-8 py-3 font-label-caps-md text-[10px] sm:text-xs uppercase tracking-widest shadow-xl text-center">
                      Inspect Masterpiece Dossier →
                    </span>

                  </div>

                </div>


                <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-primary text-surface p-4 sm:p-6 border border-secondary/40 shadow-xl sm:max-w-xs">

                  <span className="font-label-caps-sm text-[9px] sm:text-xs uppercase tracking-[0.25em] text-secondary-fixed block mb-1.5 font-semibold">
                    TUSCAN HERITAGE
                  </span>

                  <p className="font-body-sm text-xs sm:text-sm text-surface/90 font-light leading-relaxed">
                    Curated with kiln-fired bamboo handle, vegetable-tanned full-grain leather, and brushed brass key lock.
                  </p>

                </div>

              </div>

            </div>


            <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:pl-6 pt-4 lg:pt-0">

              <div className="space-y-2 sm:space-y-3">

                <span className="font-label-caps-sm text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-secondary block font-semibold">
                  Maison Masterpiece No. 04
                </span>

                <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-primary leading-tight font-normal">

                  Il Baule D'Oro:
                  <br />

                  <span className="italic font-normal">
                    Sartorial Leathercraft
                  </span>

                </h2>

              </div>

              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant font-light leading-relaxed">
                Conceived in the venerable tanneries of Santa Croce sull’Arno, each Baule D’Oro requires thirty-six hours of unhurried manual assembly. Dual-tone pairing of deep spruce calfskin and oxblood saddle trim pays homage to Renaissance equestrian luggage.
              </p>


              <div className="space-y-4">

                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">

                  <span className="font-label-caps-sm text-[10px] uppercase tracking-[0.2em] text-outline">
                    Construction
                  </span>

                  <span className="font-body-sm text-sm text-primary">
                    Hand-assembled
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">

                  <span className="font-label-caps-sm text-[10px] uppercase tracking-[0.2em] text-outline">
                    Leather
                  </span>

                  <span className="font-body-sm text-sm text-primary">
                    Full-grain calfskin
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">

                  <span className="font-label-caps-sm text-[10px] uppercase tracking-[0.2em] text-outline">
                    Edition
                  </span>

                  <span className="font-body-sm text-sm text-primary">
                    Archival No. 04
                  </span>

                </div>

              </div>


              <button
                onClick={() => navigateTo('pdp', heroMasterpiece.id)}
                className="inline-flex items-center px-7 py-3.5 bg-primary text-surface font-label-caps-md text-[10px] uppercase tracking-[0.22em] hover:bg-secondary transition-colors duration-500 cursor-pointer"
              >
                View Masterpiece →
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= 5. ATELIER / CRAFT ================= */}
      <section className="py-16 sm:py-24 md:py-32 bg-surface">

        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            <div className="lg:col-span-5 space-y-6">

              <span className="font-label-caps-sm text-[10px] sm:text-xs uppercase tracking-[0.3em] text-secondary font-semibold">
                The Archival Salons
              </span>

              <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-primary font-normal">
                Private Appointment &amp; Provenance
              </h2>

              <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed font-light">
                Maison LUCCI operates dedicated private salons in Florence, Paris, New York, and Tokyo. Clients are welcomed into discreet residential settings where the complete seasonal wardrobe and vintage archival pieces may be tailored directly to individual measurements.
              </p>


              <div className="pt-2 sm:pt-4 space-y-4 sm:space-y-5">

                <div className="flex items-start space-x-3 sm:space-x-4">

                  <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">
                    door_open
                  </span>

                  <div>

                    <h4 className="font-headline-sm text-base sm:text-lg text-primary font-medium">
                      Private Salon Salotto
                    </h4>

                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant font-light">
                      Confidential fitting suites overlooking historical private courtyards with personal couturier consultation.
                    </p>

                  </div>

                </div>


                <div className="flex items-start space-x-3 sm:space-x-4">

                  <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">
                    verified_user
                  </span>

                  <div>

                    <h4 className="font-headline-sm text-base sm:text-lg text-primary font-medium">
                      Archival Certificate &amp; NFC Seal
                    </h4>

                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant font-light">
                      Every leather garment and bespoke luggage piece is accompanied by a hand-inscribed parchment folio of provenance.
                    </p>

                  </div>

                </div>

              </div>


              <div className="pt-4 sm:pt-6">

                <button
                  onClick={() => openSalonBooking('Firenze')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-surface font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.22em] hover:bg-secondary transition-colors duration-500 cursor-pointer font-medium text-center"
                >
                  Request Private Salon Fitting
                </button>

              </div>

            </div>


            {/* Atelier Images */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 lg:pt-0">

              <div className="space-y-2 sm:space-y-4">

                <div className="aspect-[3/4] bg-surface-container overflow-hidden border border-outline-variant/30">

                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    alt="Secluded luxury private salon interior in Florence"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAohtbcyIARFOeK_5d6g4MZJUmrd5pgtt0A0L3rbqNPAyeljSFN1iI2a0NRm7nutnisRAzBV65RuQYDcv7CasEGSpsXVNF4OKotIQVXNN28kelOiEzt7DfbIUe9EI0Szb4xikbBaSmeTQVEYlnIUSq0K6yfFskV2NZmBJ74_3UVDidsm7893E_SyAQHDMutjQOWsEANAdyCynIYHBRN3-i9wKjVYkavSCaFFyj7X_98vZGyfBBGtvU1"
                  />

                </div>

                <div className="text-right">

                  <span className="font-label-caps-sm text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-outline">
                    SALONE FIRENZE • VIA DE' TORNABUONI
                  </span>

                </div>

              </div>


              <div className="space-y-2 sm:space-y-4 sm:pt-10 md:pt-16">

                <div className="aspect-[3/4] bg-surface-container overflow-hidden border border-outline-variant/30">

                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    alt="Italian master leather artisan hand-stitching calfskin"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1vcdIYbIceSwieJrYr-7NiGG2vDGIM1ogZowGyI-FdL80wbmxmqZvOSzIK2NiQvMWlRdIn57fcW6t6lb1SYGSHYumtv6XbXYlx-T0erEkmMICdaqJYGRgKXRSIDR_Fr19no2_WHRMr2cOTnGin1hWwK6vX1DRrADWcwxTSuTua7g55mMoun3ZRE0OtI2eLgTdhA3wUzuC2fD_-FPKFDCtmB0JVCZAExC7gbCAHjaA-YsL9es4og_t"
                  />

                </div>

                <div>

                  <span className="font-label-caps-sm text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-outline">
                    ATELIER DI CUCITURA A MANO • EST. 1952
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= 6. PRIVATE CLIENT SERVICES ================= */}
      <section className="bg-tertiary-container text-surface py-12 sm:py-16 px-4 sm:px-8 md:px-16 border-y border-outline/20">

        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-outline/30">

          <div className="flex flex-col items-center md:items-start md:px-8 first:pl-0 space-y-2 pt-4 sm:pt-6 md:pt-0">

            <span className="material-symbols-outlined text-secondary-fixed text-2xl sm:text-3xl">
              flight_takeoff
            </span>

            <h4 className="font-headline-sm text-base sm:text-lg text-surface font-normal">
              White-Glove Courier Delivery
            </h4>

            <p className="font-body-sm text-xs sm:text-sm text-surface/80 font-light leading-relaxed">
              Direct delivery by bonded maison envoy across the European Union, United States, and Japan.
            </p>

          </div>


          <div className="flex flex-col items-center md:items-start md:px-8 space-y-2 pt-4 sm:pt-6 md:pt-0">

            <span className="material-symbols-outlined text-secondary-fixed text-2xl sm:text-3xl">
              fingerprint
            </span>

            <h4 className="font-headline-sm text-base sm:text-lg text-surface font-normal">
              Bespoke Hot-Stamping &amp; Tailoring
            </h4>

            <p className="font-body-sm text-xs sm:text-sm text-surface/80 font-light leading-relaxed">
              Personalize leather goods with historic gold-leaf typography cast by Florentine metalsmiths.
            </p>

          </div>


          <div className="flex flex-col items-center md:items-start md:px-8 last:pr-0 space-y-2 pt-4 sm:pt-6 md:pt-0">

            <span className="material-symbols-outlined text-secondary-fixed text-2xl sm:text-3xl">
              lock_reset
            </span>

            <h4 className="font-headline-sm text-base sm:text-lg text-surface font-normal">
              Lifetime Archival Restoration
            </h4>

            <p className="font-body-sm text-xs sm:text-sm text-surface/80 font-light leading-relaxed">
              Every authentic piece enjoys complimentary annual nourishment and leather restoration in our Florence workshop.
            </p>

          </div>

        </div>

      </section>


      {/* ================= 7. NEWSLETTER SALON DISPATCH ================= */}
      <section className="py-16 sm:py-24 md:py-32 bg-surface text-center">

        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6">

          <span className="font-label-caps-sm text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-secondary font-semibold">
            The Private Register
          </span>

          <h3 className="font-headline-lg text-2xl sm:text-3xl text-primary font-normal">
            The Gazette di LUCCI
          </h3>

          <p className="font-body-md text-sm sm:text-base text-on-surface-variant font-light leading-relaxed">
            Receive confidential invitations to seasonal salon previews, runway showcases, and private allocations of archival leather goods.
          </p>


          {newsletterSubscribed ? (

            <div className="p-6 bg-surface-container border border-secondary/40 max-w-lg mx-auto space-y-2">

              <span className="material-symbols-outlined text-secondary text-3xl">
                mail
              </span>

              <h5 className="font-headline-sm text-primary text-lg">
                Inscribed to Private Register
              </h5>

              <p className="font-body-sm text-xs text-on-surface-variant font-light">
                A welcome dispatch has been prepared for {newsletterEmail}. Discretion assured.
              </p>

            </div>

          ) : (

            <form
              onSubmit={handleNewsletterSubmit}
              className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-lg mx-auto w-full"
            >

              <input
                required
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your client email address"
                className="w-full bg-transparent border-0 border-b border-on-surface/30 focus:border-secondary focus:ring-0 text-primary placeholder-on-surface-variant/60 font-body-md text-sm py-3 px-1 transition-colors"
              />

              <button
                type="submit"
                className="shrink-0 px-6 sm:px-8 py-3.5 bg-primary text-surface font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-secondary transition-colors duration-500 cursor-pointer font-medium text-center"
              >
                Subscribe
              </button>

            </form>

          )}


          <p className="font-label-caps-sm text-[8.5px] sm:text-[9.5px] text-outline uppercase tracking-[0.18em] sm:tracking-[0.2em] pt-2 sm:pt-4">
            Strict confidentiality. No marketing frequency. Client discretion guaranteed.
          </p>

        </div>

      </section>

    </main>
  );
}