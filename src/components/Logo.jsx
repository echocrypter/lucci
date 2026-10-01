import React from 'react';

export default function Logo({ className = "h-10 md:h-12 w-auto", dark = false }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 320 80" 
      className={className}
      aria-label="LUCCI Firenze Haute Couture Logo"
    >
      <text 
        x="160" 
        y="44" 
        fontFamily="'Playfair Display', serif" 
        fontWeight="700" 
        fontSize="32" 
        letterSpacing="0.35em" 
        fill={dark ? "#ffffff" : "#1A3323"} 
        textAnchor="middle"
      >
        LUCCI
      </text>
      <line 
        x1="110" 
        y1="53" 
        x2="210" 
        y2="53" 
        stroke="#C5A059" 
        strokeWidth="0.85" 
      />
      <text 
        x="160" 
        y="65" 
        fontFamily="'Montserrat', sans-serif" 
        fontSize="8.5" 
        fontWeight="500" 
        letterSpacing="0.45em" 
        fill="#C5A059" 
        textAnchor="middle"
      >
        FIRENZE • HAUTE COUTURE
      </text>
    </svg>
  );
}
