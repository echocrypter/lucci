import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in pointer-events-none">
      <div className="bg-primary text-surface px-6 py-3.5 border border-secondary shadow-2xl flex items-center space-x-3">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
        <span className="font-label-caps-sm text-xs tracking-[0.2em] uppercase text-surface">
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
