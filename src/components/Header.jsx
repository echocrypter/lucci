import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useCart } from '../context/CartContext';

export default function Header() {
  const {
    totalCount,
    setIsCartOpen,
    setIsSearchOpen,
    openSalonBooking,
    setIsRunwayOpen,
    activePage,
    navigateTo,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (sectionId, e) => {
    if (e) e.preventDefault();

    setMobileMenuOpen(false);

    if (sectionId === 'leather-goods') {
      navigateTo('pdp', 'il-baule-doro');
      return;
    }

    if (sectionId === 'runway') {
      setIsRunwayOpen(true);
      return;
    }

    if (activePage !== 'home') {
      navigateTo('home');

      window.setTimeout(() => {
        const element = document.getElementById(sectionId);

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { id: 'collections', label: 'Collections', page: 'home' },
    { id: 'leather-goods', label: 'Leather Goods', page: 'pdp' },
    { id: 'runway', label: 'Runway', page: null },
    { id: 'archive', label: 'The Archive', page: null },
    { id: 'maison', label: 'Maison', page: null },
  ];

  const mobileNavItems = [
    {
      id: 'collections',
      label: 'Collections',
      number: '01',
      badge: null,
    },
    {
      id: 'leather-goods',
      label: 'Leather Goods',
      number: '02',
      badge: "Il Baule D'Oro",
    },
    {
      id: 'runway',
      label: 'Runway',
      number: '03',
      badge: 'Défilé',
    },
    {
      id: 'archive',
      label: 'The Archive',
      number: '04',
      badge: 'Register',
    },
    {
      id: 'maison',
      label: 'Maison',
      number: '05',
      badge: 'Salons',
    },
  ];

  const iconColor = isScrolled
    ? 'text-primary hover:text-secondary'
    : 'text-white hover:text-[#e7cc8b]';

  return (
    <>
      {/* =========================================================
          MAIN HEADER
      ========================================================= */}

      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500 ease-out
          ${
            isScrolled
              ? `
                bg-[#fbf9f5]/92
                backdrop-blur-2xl
                backdrop-saturate-150
                border-b border-[#dcd8cf]/80
                shadow-[0_8px_35px_rgba(10,25,17,0.10)]
              `
              : `
                bg-[#07150f]/45
                backdrop-blur-xl
                backdrop-saturate-150
                border-b border-white/15
                shadow-[0_8px_35px_rgba(0,0,0,0.18)]
              `
          }
        `}
      >

        {/* subtle glass highlight */}
        <div
          className={`
            absolute left-0 right-0 bottom-0 h-px
            transition-opacity duration-500
            ${
              isScrolled
                ? 'bg-gradient-to-r from-transparent via-[#b49a5a]/40 to-transparent'
                : 'bg-gradient-to-r from-transparent via-white/25 to-transparent'
            }
          `}
        />

        <div
          className="
            relative
            w-full
            max-w-[1920px]
            mx-auto
            px-4
            sm:px-6
            md:px-8
            lg:px-12
            xl:px-16
            h-[68px]
            sm:h-[74px]
            md:h-[78px]
            lg:h-[76px]
            flex
            items-center
            justify-between
          "
        >

          {/* =====================================================
              LOGO
          ===================================================== */}

          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="
              flex
              items-center
              shrink-0
              group
              cursor-pointer
              relative
              z-10
            "
            aria-label="LUCCI Homepage"
          >
            <Logo
              className={`
                h-[27px]
                sm:h-[31px]
                md:h-[34px]
                lg:h-[35px]
                xl:h-[38px]
                w-auto
                max-w-[132px]
                sm:max-w-[150px]
                md:max-w-[165px]
                transition-all
                duration-500
                group-hover:opacity-75
                ${
                  isScrolled
                    ? 'opacity-95 filter-none'
                    : 'opacity-100 brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]'
                }
              `}
            />
          </button>


          {/* =====================================================
              DESKTOP NAVIGATION
              >= 1024px
          ===================================================== */}

          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 2xl:gap-10">

            {navItems.map(({ id, label, page }) => {
              const isActive = page && activePage === page;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={(e) => handleNavClick(id, e)}
                  className={`
                    relative
                    group
                    font-label-caps-md
                    text-[10px]
                    xl:text-[11px]
                    tracking-[0.19em]
                    xl:tracking-[0.23em]
                    uppercase
                    whitespace-nowrap
                    transition-all
                    duration-300
                    cursor-pointer
                    py-2
                    ${
                      isScrolled
                        ? isActive
                          ? 'text-primary'
                          : 'text-on-surface-variant hover:text-primary'
                        : isActive
                          ? 'text-white'
                          : 'text-white/90 hover:text-white'
                    }
                  `}
                >
                  {label}

                  <span
                    className={`
                      absolute
                      left-0
                      right-0
                      -bottom-[1px]
                      h-px
                      origin-center
                      transition-transform
                      duration-300
                      ${
                        isActive
                          ? 'scale-x-100 bg-[#b49a5a]'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }
                      ${
                        isScrolled
                          ? 'bg-[#b49a5a]'
                          : 'bg-[#e7cc8b]'
                      }
                    `}
                  />
                </button>
              );
            })}

          </nav>


          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="flex items-center shrink-0">

            {/* SEARCH */}

            <button
              type="button"
              aria-label="Search Archive"
              onClick={() => setIsSearchOpen(true)}
              className={`
                group
                flex
                items-center
                justify-center
                w-10
                h-10
                md:w-11
                md:h-11
                rounded-full
                transition-all
                duration-300
                cursor-pointer
                ${iconColor}
                ${
                  isScrolled
                    ? 'hover:bg-[#eeeae2]'
                    : 'hover:bg-white/10'
                }
              `}
              title="Search Archive"
            >
              <span
                className="
                  material-symbols-outlined
                  text-[21px]
                  md:text-[22px]
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              >
                search
              </span>
            </button>


            {/* ACCOUNT
                Desktop + tablet
            */}

            <button
              type="button"
              aria-label="Private Client Account"
              onClick={() => openSalonBooking('Firenze')}
              className={`
                hidden
                sm:flex
                group
                items-center
                justify-center
                w-10
                h-10
                md:w-11
                md:h-11
                rounded-full
                transition-all
                duration-300
                cursor-pointer
                ${iconColor}
                ${
                  isScrolled
                    ? 'hover:bg-[#eeeae2]'
                    : 'hover:bg-white/10'
                }
              `}
              title="Private Salon Account"
            >
              <span
                className="
                  material-symbols-outlined
                  text-[21px]
                  md:text-[22px]
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              >
                person
              </span>
            </button>


            {/* BAG */}

            <button
              type="button"
              aria-label="Salon Acquisition Bag"
              onClick={() => setIsCartOpen(true)}
              className={`
                relative
                group
                flex
                items-center
                justify-center
                w-10
                h-10
                md:w-11
                md:h-11
                rounded-full
                transition-all
                duration-300
                cursor-pointer
                ${iconColor}
                ${
                  isScrolled
                    ? 'hover:bg-[#eeeae2]'
                    : 'hover:bg-white/10'
                }
              `}
              title="Acquisition Bag"
            >
              <span
                className="
                  material-symbols-outlined
                  text-[21px]
                  md:text-[22px]
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              >
                shopping_bag
              </span>

              {totalCount > 0 && (
                <span
                  className="
                    absolute
                    top-0
                    right-0
                    min-w-[16px]
                    h-4
                    px-1
                    bg-[#8b2430]
                    text-white
                    text-[9px]
                    flex
                    items-center
                    justify-center
                    rounded-full
                    leading-none
                    font-bold
                    border
                    border-white/30
                  "
                >
                  {totalCount}
                </span>
              )}
            </button>


            {/* =================================================
                TABLET / MOBILE MENU
            ================================================= */}

            <button
              type="button"
              className={`
                lg:hidden
                ml-1
                sm:ml-2
                h-10
                md:h-11
                px-3
                sm:px-3.5
                md:px-4
                flex
                items-center
                justify-center
                gap-2
                border
                transition-all
                duration-300
                cursor-pointer
                ${
                  isScrolled
                    ? 'border-primary/20 text-primary hover:bg-primary/5'
                    : 'border-white/25 text-white hover:bg-white/10'
                }
              `}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={
                mobileMenuOpen
                  ? 'Close Navigation Menu'
                  : 'Open Navigation Menu'
              }
              aria-expanded={mobileMenuOpen}
            >

              <span
                className="
                  font-label-caps-sm
                  text-[9px]
                  sm:text-[10px]
                  tracking-[0.22em]
                  uppercase
                  hidden
                  xs:inline
                "
              >
                {mobileMenuOpen ? 'Close' : 'Menu'}
              </span>

              <span className="material-symbols-outlined text-[21px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>

            </button>

          </div>

        </div>
      </header>


      {/* =========================================================
          MOBILE / TABLET MENU
      ========================================================= */}

      {mobileMenuOpen && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            bg-[#07150f]/97
            backdrop-blur-2xl
            text-[#fbf9f5]
            flex
            flex-col
            overflow-y-auto
            lg:hidden
          "
          style={{
            paddingTop: 'calc(78px + env(safe-area-inset-top, 0px))',
          }}
        >

          {/* Decorative top line */}

          <div className="absolute top-[77px] left-4 right-4 sm:left-6 sm:right-6 h-px bg-white/10" />


          {/* =====================================================
              MENU HEADER
          ===================================================== */}

          <div className="px-5 sm:px-8 md:px-10 pt-5 sm:pt-7">

            <div className="flex items-center justify-between">

              <div>

                <span
                  className="
                    block
                    font-label-caps-sm
                    text-[9px]
                    sm:text-[10px]
                    tracking-[0.3em]
                    text-[#e7cc8b]
                    uppercase
                    font-semibold
                  "
                >
                  Maison Lucci
                </span>

                <span
                  className="
                    block
                    mt-1
                    text-[9px]
                    sm:text-[10px]
                    text-white/45
                    tracking-[0.22em]
                    uppercase
                  "
                >
                  Firenze • Est. 1952
                </span>

              </div>


              <span
                className="
                  hidden
                  sm:block
                  text-[9px]
                  tracking-[0.25em]
                  uppercase
                  text-white/40
                "
              >
                Navigation
              </span>

            </div>

          </div>


          {/* =====================================================
              MENU ITEMS
          ===================================================== */}

          <nav
            className="
              px-5
              sm:px-8
              md:px-10
              pt-8
              sm:pt-10
              md:pt-12
              flex-1
            "
          >

            <div className="border-t border-white/10">

              {mobileNavItems.map(({ id, label, number, badge }) => (
                <button
                  key={id}
                  type="button"
                  onClick={(e) => handleNavClick(id, e)}
                  className="
                    w-full
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    py-5
                    sm:py-6
                    md:py-7
                    border-b
                    border-white/10
                    text-left
                    cursor-pointer
                  "
                >

                  <div className="flex items-center gap-4 sm:gap-6">

                    <span
                      className="
                        text-[9px]
                        sm:text-[10px]
                        tracking-[0.2em]
                        text-[#e7cc8b]/60
                        font-light
                      "
                    >
                      {number}
                    </span>

                    <span
                      className="
                        font-headline-sm
                        text-[22px]
                        sm:text-[27px]
                        md:text-[31px]
                        font-normal
                        text-white
                        group-hover:text-[#e7cc8b]
                        transition-colors
                        duration-300
                      "
                    >
                      {label}
                    </span>

                  </div>


                  <div className="flex items-center gap-3 shrink-0">

                    {badge && (
                      <span
                        className="
                          hidden
                          sm:inline-flex
                          text-[8px]
                          md:text-[9px]
                          uppercase
                          tracking-[0.18em]
                          text-[#e7cc8b]
                          border
                          border-[#e7cc8b]/30
                          px-2.5
                          py-1.5
                        "
                      >
                        {badge}
                      </span>
                    )}

                    <span
                      className="
                        text-white/35
                        group-hover:text-[#e7cc8b]
                        transition-colors
                        text-lg
                      "
                    >
                      →
                    </span>

                  </div>

                </button>
              ))}

            </div>


            {/* =================================================
                PRIVATE APPOINTMENT
            ================================================= */}

            <div className="pt-7 sm:pt-9 md:pt-10">

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSalonBooking('Firenze');
                }}
                className="
                  w-full
                  py-4
                  sm:py-4.5
                  md:py-5
                  bg-[#e7cc8b]
                  text-[#092116]
                  font-label-caps-md
                  text-[9px]
                  sm:text-[10px]
                  uppercase
                  tracking-[0.22em]
                  font-semibold
                  hover:bg-[#fbf9f5]
                  transition-colors
                  duration-300
                  cursor-pointer
                "
              >
                Request Private Salon Appointment
              </button>

            </div>

          </nav>


          {/* =====================================================
              MENU FOOTER
          ===================================================== */}

          <div
            className="
              px-5
              sm:px-8
              md:px-10
              py-6
              sm:py-8
              mt-6
              border-t
              border-white/10
            "
          >

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
                text-[8px]
                sm:text-[9px]
                tracking-[0.18em]
                uppercase
                text-white/40
              "
            >

              <span>
                Firenze • Milano • Paris • Tokyo • New York
              </span>

              <span className="text-[#e7cc8b]/70">
                Private Client Services
              </span>

            </div>

          </div>

        </div>
      )}
    </>
  );
}