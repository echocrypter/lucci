import React from 'react';
import Logo from './Logo';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const { navigateTo, openSalonBooking, setIsRunwayOpen } = useCart();

  return (
    <footer className="w-full bg-primary text-surface dark:bg-inverse-surface dark:text-inverse-on-surface border-t border-outline/20">
      <div className="w-full px-6 md:px-16 py-20 mx-auto max-w-[1920px] flex flex-col justify-between">
        {/* Upper Folio Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-outline/20">
          {/* Column 1: Brand & Logo Integration */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center">
              <Logo className="h-10 w-auto filter brightness-200 contrast-125" dark={true} />
            </div>
            
            <p className="font-body-md text-body-md text-surface/80 max-w-sm font-light leading-relaxed">
              Founded in Florence in 1952. Preserving the supreme traditions of Italian sartorial construction, noble materials, and enduring design integrity.
            </p>
            
            <div className="space-y-1 pt-2">
              <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-[0.3em] text-secondary-fixed block">
                FLAGSHIP SALONS:
              </span>
              <p className="font-label-caps-sm text-label-caps-sm uppercase tracking-[0.25em] text-surface/70">
                Firenze • Milano • Paris • London • Tokyo • New York
              </p>
            </div>
          </div>

          {/* Column 2: The Collections */}
          <div className="space-y-4">
            <h4 className="font-headline-sm text-headline-sm text-surface font-normal">Collections</h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="text-surface-variant/80 font-label-caps-sm text-label-caps-sm tracking-[0.3em] uppercase hover:text-surface transition-colors duration-300 text-left cursor-pointer"
                >
                  Haute Couture Autumn '25
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('pdp', 'il-baule-doro')} 
                  className="text-surface-variant/80 font-label-caps-sm text-label-caps-sm tracking-[0.3em] uppercase hover:text-surface transition-colors duration-300 text-left cursor-pointer"
                >
                  Artisanal Leather Bags
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsRunwayOpen(true)} 
                  className="text-surface-variant/80 font-label-caps-sm text-label-caps-sm tracking-[0.3em] uppercase hover:text-surface transition-colors duration-300 text-left cursor-pointer"
                >
                  The Milan Runway
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="text-surface-variant/80 font-label-caps-sm text-label-caps-sm tracking-[0.3em] uppercase hover:text-surface transition-colors duration-300 text-left cursor-pointer"
                >
                  The Vintage Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Maison Links verbatim from Shared JSON */}
          <div className="space-y-4">
            <h4 className="font-headline-sm text-headline-sm text-surface font-normal">Client Services</h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => openSalonBooking('Firenze')} 
                  className="text-surface-variant/80 font-label-caps-sm text-label-caps-sm tracking-[0.3em] uppercase hover:text-surface transition-colors duration-300 text-left cursor-pointer"
                >
                  Concierge &amp; Appointments
                </button>
              </li>
              <li>
                <span className="text-surface-variant/80 font-label-caps-sm text-label-caps-sm tracking-[0.3em] uppercase block">
                  Sustainability &amp; Provenance
                </span>
              </li>
              <li>
                <button 
                  onClick={() => openSalonBooking('Milano')} 
                  className="text-surface-variant/80 font-label-caps-sm text-label-caps-sm tracking-[0.3em] uppercase hover:text-surface transition-colors duration-300 text-left cursor-pointer"
                >
                  Private Salons
                </button>
              </li>
              <li>
                <span className="text-secondary-fixed font-label-caps-sm text-label-caps-sm tracking-[0.3em] uppercase block">
                  The Archive Register
                </span>
              </li>
              <li>
                <span className="text-surface-variant/80 font-label-caps-sm text-label-caps-sm tracking-[0.3em] uppercase block">
                  Legal &amp; Client Discretion
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Atelier Headquarters */}
          <div className="space-y-4">
            <h4 className="font-headline-sm text-headline-sm text-surface font-normal">Headquarters</h4>
            <address className="not-italic font-body-sm text-body-sm text-surface/80 space-y-2 font-light">
              <p className="font-medium text-surface">Palazzo Frescobaldi</p>
              <p>Via Santo Spirito 11</p>
              <p>50125 Firenze, Italia</p>
              <p className="pt-2 text-secondary-fixed font-label-caps-sm text-label-caps-sm tracking-[0.2em]">
                +39 055 839 2000
              </p>
            </address>
          </div>
        </div>

        {/* Lower Folio Strip: Copyright verbatim from JSON */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="font-body-sm text-body-sm text-surface/70 font-light">
            © 2025 LUCCI ATELIER. ALL RIGHTS RESERVED. ARCHIVAL PRESERVATION &amp; HAUTE COUTURE.
          </p>
          <div className="flex items-center space-x-6 md:space-x-8 text-surface/60 font-label-caps-sm text-label-caps-sm uppercase tracking-[0.25em]">
            <span>Client Discretion</span>
            <span className="text-secondary-fixed">•</span>
            <span>Tuscan Provenance</span>
            <span className="text-secondary-fixed">•</span>
            <span>Ethics &amp; Craft</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
