import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MessageCircle, Menu, X, MapPin, Mail, ChevronRight, Compass } from "lucide-react";
import { COMPANY_INFO, getWhatsAppUrl } from "../data/travelData";
import { BookingPrefill } from "./QuickEnquiryModal";

interface NavbarProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tour Packages", path: "/packages" },
    { name: "Destinations", path: "/destinations" },
    { name: "Taxi Services", path: "/taxi-services" },
    { name: "Hotels", path: "/hotels" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const defaultWhatsAppMsg = "Hello Aadhya Gorkha Travels, I would like to enquire about tour packages and taxi services for Sikkim & Darjeeling.";

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#123D32] text-white/90 text-xs border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span className="truncate max-w-xs md:max-w-none">Salugara, Siliguri, West Bengal – 734008</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-white/80">
              <Mail className="w-3.5 h-3.5 text-[#D6A84F]" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#D6A84F] transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/60 hidden md:inline">Siliguri Local Support:</span>
            <a
              href="tel:+918670374242"
              className="flex items-center gap-1 font-semibold text-white hover:text-[#D6A84F] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D6A84F]" />
              +91 8670374242
            </a>
            <span className="text-white/30 hidden md:inline">|</span>
            <a
              href="tel:+918899505665"
              className="hidden md:flex items-center gap-1 font-semibold text-white hover:text-[#D6A84F] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D6A84F]" />
              +91 8899505665
            </a>
            <a
              href={getWhatsAppUrl(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#123D32]/98 backdrop-blur-md shadow-lg py-3 text-white"
            : "bg-[#123D32] text-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Mountain Monogram Emblem */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#245B49] to-[#123D32] border border-[#D6A84F]/40 flex items-center justify-center shadow-md group-hover:border-[#D6A84F] transition-colors shrink-0">
              <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#D6A84F]" fill="currentColor">
                <path d="M6 32L18 10L24 20L28 14L36 32H6Z" />
                <path d="M18 10L21 16L15 22L18 10Z" fill="#FAF8F2" opacity="0.9" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#D6A84F] transition-colors leading-tight">
                AADHYA GORKHA
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest text-[#D6A84F] font-semibold uppercase">
                TRAVELS · SILIGURI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors py-1 relative whitespace-nowrap ${
                    isActive
                      ? "text-[#D6A84F] font-semibold"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D6A84F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTA Area */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918670374242"
              className="hidden xl:flex items-center gap-2 text-xs text-white/90 hover:text-[#D6A84F] transition-colors px-2 py-1.5 border border-white/20 rounded-md"
              title="Call Siliguri Office"
            >
              <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span className="font-semibold">+91 8670374242</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-4 py-2 bg-[#D6A84F] hover:bg-[#c49740] text-[#123D32] font-semibold text-xs sm:text-sm rounded-md shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-[#123D32]" />
              <span>Book / Enquire</span>
            </button>
          </div>

          {/* Mobile Menu & Call Buttons */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 bg-[#D6A84F] text-[#123D32] font-semibold text-xs rounded shadow transition-colors"
            >
              Book Now
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#123D32] border-t border-white/10 px-4 pt-3 pb-6 shadow-2xl transition-all">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-[#245B49] text-[#D6A84F] font-semibold"
                        : "text-white/85 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex flex-col gap-1 text-xs text-white/70">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                  Salugara, Siliguri, West Bengal
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D6A84F]" />
                  {COMPANY_INFO.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <a
                  href="tel:+918670374242"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white/10 hover:bg-white/15 text-white rounded text-xs font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
                  <span>Call Now</span>
                </a>
                <a
                  href={getWhatsAppUrl(defaultWhatsAppMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
