import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SALONS } from '../data/products';

export default function SalonBookingModal() {
  const { isBookingOpen, setIsBookingOpen, bookingCity, showToast } = useCart();
  const [selectedCity, setSelectedCity] = useState(bookingCity || 'Firenze');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('2025-11-15');
  const [appointmentTime, setAppointmentTime] = useState('14:30');
  const [interest, setInterest] = useState("Il Baule D'Oro Bespoke Acquisition");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isBookingOpen) return null;

  const activeSalon = SALONS.find(s => s.city.toLowerCase() === selectedCity.toLowerCase()) || SALONS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    showToast(`Private salon appointment confirmed at ${activeSalon.name}`);
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setBookingConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fade-in">
      <div className="bg-surface max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-secondary/50 shadow-2xl relative my-auto">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 md:p-8 bg-primary-container text-surface flex items-center justify-between border-b border-secondary/40 sticky top-0 z-10">
          <div>
            <span className="font-label-caps-sm text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-secondary-fixed block">
              Maison Lucci • Concierge
            </span>
            <h3 className="font-headline-lg text-xl sm:text-2xl text-surface font-normal">
              Private Salon Appointment
            </h3>
          </div>
          <button 
            onClick={handleClose}
            className="text-surface/80 hover:text-surface transition-colors p-1 cursor-pointer"
            aria-label="Close Modal"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {bookingConfirmed ? (
          <div className="p-6 sm:p-8 md:p-10 space-y-4 sm:space-y-6 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-secondary bg-surface-container flex items-center justify-center mx-auto text-secondary">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">done_all</span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <span className="font-label-caps-sm text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-secondary font-semibold">
                Salon Invitation Issued
              </span>
              <h4 className="font-headline-lg text-xl sm:text-2xl text-primary font-normal">
                {activeSalon.name} • {activeSalon.city}
              </h4>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto font-light leading-relaxed">
                Dear {clientName || 'Valued Client'}, your private salon suite is reserved for {appointmentDate} at {appointmentTime}. A personal couturier has been assigned.
              </p>
            </div>

            <div className="bg-surface-container-low p-4 sm:p-6 border border-outline-variant/50 text-left space-y-2.5 font-body-sm text-xs">
              <div className="flex flex-col sm:flex-row justify-between border-b border-outline-variant/30 pb-2 gap-1">
                <span className="text-on-surface-variant font-label-caps-sm uppercase text-[10px]">Salon Address</span>
                <span className="font-medium text-primary sm:text-right">{activeSalon.address}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                <span className="text-on-surface-variant font-label-caps-sm uppercase text-[10px]">Concierge Line</span>
                <span className="font-medium text-secondary">{activeSalon.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-label-caps-sm uppercase text-[10px]">Private Suite</span>
                <span className="font-medium text-primary">{activeSalon.suites[0]}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 sm:py-4 bg-primary text-surface font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-secondary transition-colors cursor-pointer"
            >
              Complete Reservation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* City Selector Tabs */}
            <div>
              <label className="block font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-on-surface-variant mb-2">
                Select Salon Destination
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
                {SALONS.map((salon) => (
                  <button
                    key={salon.city}
                    type="button"
                    onClick={() => setSelectedCity(salon.city)}
                    className={`py-2 px-2 text-center border font-label-caps-sm text-[9.5px] tracking-wider uppercase transition-all cursor-pointer ${
                      selectedCity.toLowerCase() === salon.city.toLowerCase()
                        ? 'border-primary bg-primary text-surface font-semibold shadow-sm'
                        : 'border-outline-variant/60 hover:border-primary text-on-surface-variant'
                    }`}
                  >
                    {salon.city}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Salon Card Banner */}
            <div className="bg-surface-container-low p-3 sm:p-4 border border-outline-variant/40 flex justify-between items-center text-xs">
              <div>
                <span className="font-headline-sm text-sm text-primary font-medium block">{activeSalon.name}</span>
                <span className="font-body-sm text-[10px] sm:text-[11px] text-on-surface-variant line-clamp-1">{activeSalon.address}</span>
              </div>
              <span className="font-label-caps-sm text-[8.5px] sm:text-[9px] uppercase tracking-wider text-secondary font-semibold shrink-0 ml-2">
                Private Access
              </span>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-outline mb-1">
                  Full Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Contessa Elena Rinaldi"
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline focus:border-secondary focus:ring-0 text-sm py-2 px-2 text-primary"
                />
              </div>

              <div>
                <label className="block font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-outline mb-1">
                  Client Email *
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@luxury.eu"
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline focus:border-secondary focus:ring-0 text-sm py-2 px-2 text-primary"
                />
              </div>

              <div>
                <label className="block font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-outline mb-1">
                  Encrypted Telephone *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+39 333 000 0000"
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline focus:border-secondary focus:ring-0 text-sm py-2 px-2 text-primary"
                />
              </div>

              <div>
                <label className="block font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-outline mb-1">
                  Wardrobe Focus
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline focus:border-secondary focus:ring-0 text-xs py-2 px-2 text-primary"
                >
                  <option value="Il Baule D'Oro Bespoke Acquisition">Il Baule D'Oro Bespoke Acquisition</option>
                  <option value="Autumn / Winter Runway Fitting">Autumn / Winter Runway Fitting</option>
                  <option value="Private Archival Trunk Preview">Private Archival Trunk Preview</option>
                  <option value="Bespoke 24k Gold Foil Monogramming">Bespoke 24k Gold Foil Monogramming</option>
                </select>
              </div>

              <div>
                <label className="block font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-outline mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline focus:border-secondary focus:ring-0 text-xs py-2 px-2 text-primary"
                />
              </div>

              <div>
                <label className="block font-label-caps-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-outline mb-1">
                  Preferred Hour
                </label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline focus:border-secondary focus:ring-0 text-xs py-2 px-2 text-primary"
                >
                  <option value="11:00">11:00 — Morning Salotto</option>
                  <option value="14:30">14:30 — Afternoon Fitting</option>
                  <option value="17:00">17:00 — Twilight Aperitivo</option>
                  <option value="19:30">19:30 — Confidential Night</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 bg-primary text-surface font-label-caps-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-secondary transition-colors duration-500 border border-secondary/40 shadow-lg cursor-pointer"
              >
                Request Private Salon Invitation
              </button>
              <p className="font-label-caps-sm text-[8px] sm:text-[9px] text-center text-outline uppercase tracking-[0.18em] pt-2 sm:pt-3">
                Appointments are subject to salon chamber availability and client confirmation.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
