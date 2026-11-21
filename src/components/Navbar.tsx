import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MessageCircle, Menu, X, MapPin, Mail, ChevronRight, Compass, Folder } from "lucide-react";
import { COMPANY_INFO, getWhatsAppUrl } from "../data/travelData";
import { BookingPrefill } from "./QuickEnquiryModal";
import { BrandLogo } from "./BrandLogo";

interface NavbarProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    { name: "Trip Docs", path: "/drive-docs" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const defaultWhatsAppMsg =
    "Hello Aadhya Gorkha Travels, I would like to enquire about tour packages and taxi services for Sikkim & Darjeeling.";

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar - Royal Himalayan Navy with Sun Gold Accents */}
      <div className="bg-[#071F4D] text-white/95 text-xs border-b border-[#E2A829]/30 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 min-w-0">
            <div className="flex items-center gap-1.5 text-white/85 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#E2A829] shrink-0" />
              <span className="truncate">Salugara, Siliguri, West Bengal – 734008</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-white/85 shrink-0">
              <Mail className="w-3.5 h-3.5 text-[#E2A829]" />
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="hover:text-[#F3C853] transition-colors"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="text-white/65 hidden md:inline">Siliguri Local Support:</span>
            <a
              href="tel:+918670374242"
              className="flex items-center gap-1 font-semibold text-white hover:text-[#F3C853] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#E2A829]" />
              +91 8670374242
            </a>
            <span className="text-white/30 hidden md:inline">|</span>
            <a
              href="tel:+918899505665"
              className="hidden md:flex items-center gap-1 font-semibold text-white hover:text-[#F3C853] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#E2A829]" />
              +91 8899505665
            </a>
            <a
              href={getWhatsAppUrl(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Pure Crisp White Canvas matching the official logo background */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/97 backdrop-blur-md shadow-md border-slate-200/90 py-2"
            : "bg-white border-slate-200 py-2.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Official Unaltered Brand Logo */}
          <Link to="/" className="group shrink-0" title="Aadhya Gorkha Travels - Siliguri">
            <BrandLogo variant="header" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-4 text-xs xl:text-[13px] font-semibold">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors py-1.5 relative whitespace-nowrap shrink-0 ${
                    isActive
                      ? "text-[#0A2D6E] font-bold"
                      : "text-slate-700 hover:text-[#0A2D6E]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#E2A829] via-[#F3C853] to-[#E2A829] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTA Area */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              to="/drive-docs"
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-[#F6F9FC] hover:bg-slate-100 text-[#0A2D6E] text-xs font-semibold border border-slate-200 transition-colors whitespace-nowrap shrink-0"
              title="Google Drive Travel Locker"
            >
              <Folder className="w-3.5 h-3.5 text-[#E2A829]" />
              <span className="hidden xl:inline">Drive Locker</span>
            </Link>

            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 xl:px-4 py-2 bg-[#0A2D6E] hover:bg-[#13469E] text-white font-semibold text-xs xl:text-sm rounded-lg shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-1.5 border border-[#0A2D6E]"
            >
              <Compass className="w-4 h-4 text-[#F3C853]" />
              <span>Book / Enquire</span>
            </button>
          </div>

          {/* Mobile Menu & Call Buttons (Visible on < lg screens) */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 bg-[#0A2D6E] hover:bg-[#13469E] text-white font-semibold text-xs rounded-md shadow-xs transition-colors whitespace-nowrap"
            >
              Book Now
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0A2D6E] hover:bg-[#F6F9FC] rounded-md transition-colors border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-2xl transition-all">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-[#0A2D6E] text-white font-semibold"
                        : "text-slate-700 hover:bg-[#F6F9FC] hover:text-[#0A2D6E] font-medium"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 ${isActive ? "text-[#F3C853]" : "text-slate-400"}`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E2A829]" />
                  Salugara, Siliguri, West Bengal – 734008
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#E2A829]" />
                  {COMPANY_INFO.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <a
                  href="tel:+918670374242"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#0A2D6E] hover:bg-[#13469E] text-white rounded-lg text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F3C853]" />
                  <span>Call Now</span>
                </a>
                <a
                  href={getWhatsAppUrl(defaultWhatsAppMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
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
