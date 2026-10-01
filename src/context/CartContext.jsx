import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext();

const CURRENCIES = {
  EUR: { symbol: "€", rate: 1, label: "EUR / €" },
  USD: { symbol: "$", rate: 1.08, label: "USD / $" },
  GBP: { symbol: "£", rate: 0.85, label: "GBP / £" },
  JPY: { symbol: "¥", rate: 164.5, label: "JPY / ¥" }
};

export function CartProvider({ children }) {
  // Prepopulate initial cart with 2 authentic items matching Stitch screenshot (counter "2" in bag)
  const [cart, setCart] = useState([
    {
      id: "il-baule-doro-default",
      productId: "il-baule-doro",
      title: "Il Baule D'Oro",
      edition: "Maison Masterpiece No. 04",
      price: 5400,
      image: PRODUCTS[0].heroImage,
      colorway: "Tuscan Forest Green & Oxblood Burgundy",
      monogram: "G.L.",
      quantity: 1
    },
    {
      id: "the-fiorentina-trench-default",
      productId: "the-fiorentina-trench",
      title: "The Fiorentina Trench Coat",
      edition: "LOOK 01",
      price: 4200,
      image: PRODUCTS[1].heroImage,
      colorway: "Tuscan Forest Velvet",
      monogram: null,
      quantity: 1
    }
  ]);

  const [activePage, setActivePage] = useState('home'); // 'home' | 'pdp'
  const [selectedProductId, setSelectedProductId] = useState('il-baule-doro');
  const [currency, setCurrency] = useState('EUR');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingCity, setBookingCity] = useState('Firenze');
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isRunwayOpen, setIsRunwayOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const navigateTo = (page, productId = 'il-baule-doro') => {
    setActivePage(page);
    if (productId) setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, options = {}) => {
    const { colorway = "Archival Classic", monogram = null, quantity = 1 } = options;
    const cartItemId = `${product.id}-${colorway}-${monogram || 'none'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          title: product.title,
          edition: product.edition || "Couture Folio",
          price: product.price,
          image: product.heroImage,
          colorway,
          monogram,
          quantity
        }
      ];
    });

    showToast(`Archival allocation reserved: ${product.title}`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (eurAmount) => {
    const curr = CURRENCIES[currency] || CURRENCIES.EUR;
    const converted = Math.round(eurAmount * curr.rate);
    return `${curr.symbol} ${converted.toLocaleString()}`;
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const openSalonBooking = (city = 'Firenze') => {
    setBookingCity(city);
    setIsBookingOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalCount,
        subtotal,
        formatPrice,
        currency,
        setCurrency,
        currencies: CURRENCIES,
        activePage,
        selectedProductId,
        navigateTo,
        isCartOpen,
        setIsCartOpen,
        isBookingOpen,
        setIsBookingOpen,
        bookingCity,
        openSalonBooking,
        isQuickViewOpen,
        setIsQuickViewOpen,
        quickViewProduct,
        openQuickView,
        isRunwayOpen,
        setIsRunwayOpen,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
