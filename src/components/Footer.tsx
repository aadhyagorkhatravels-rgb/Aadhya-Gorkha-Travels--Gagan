import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { COMPANY_INFO, getWhatsAppUrl, DESTINATIONS, TOUR_PACKAGES } from "../data/travelData";

export const Footer: React.FC = () => {
  const defaultWhatsAppMsg = "Hello Aadhya Gorkha Travels, I would like to enquire about your Sikkim & Darjeeling tour packages.";

  return (
    <footer className="bg-[#123D32] text-white/90 border-t border-[#D6A84F]/30 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#245B49] border border-[#D6A84F]/50 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#D6A84F]" fill="currentColor">
                  <path d="M6 32L18 10L24 20L28 14L36 32H6Z" />
                  <path d="M18 10L21 16L15 22L18 10Z" fill="#FAF8F2" opacity="0.9" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-white tracking-tight">
                  AADHYA GORKHA
                </span>
                <span className="text-[10px] tracking-widest text-[#D6A84F] font-semibold uppercase">
                  TRAVELS · SILIGURI
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/75 leading-relaxed">
              Your trusted Siliguri-based travel agency specializing in Sikkim, Darjeeling, Bhutan, Nepal, and Northeast India tour packages, reliable taxi rentals, and customized mountain journeys.
            </p>

            <div className="pt-2 space-y-2 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                <span>
                  Ward No. 42 of SMC, Jila Parishad Road, East, Salugara, Siliguri, West Bengal – 734008, India.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <span>Monday – Sunday: 7:00 AM – 10:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <span>Authorized Local Travel Specialist & Fleet Provider</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-base font-semibold text-[#D6A84F] mb-4 tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-white/75 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]/60" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/75 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]/60" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-white/75 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]/60" />
                  <span>Tour Packages</span>
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-white/75 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]/60" />
                  <span>Popular Destinations</span>
                </Link>
              </li>
              <li>
                <Link to="/taxi-services" className="text-white/75 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]/60" />
                  <span>Taxi & Car Rentals</span>
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-white/75 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]/60" />
                  <span>Hotels & Mountain Resorts</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/75 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]/60" />
                  <span>Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/75 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]/60" />
                  <span>Contact & Map Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Destinations */}
          <div>
            <h3 className="font-serif text-base font-semibold text-[#D6A84F] mb-4 tracking-wide uppercase">
              Popular Circuits
            </h3>
            <ul className="space-y-2.5 text-sm">
              {DESTINATIONS.slice(0, 8).map((dest) => (
                <li key={dest.id}>
                  <Link
                    to={`/destinations#${dest.slug}`}
                    className="text-white/75 hover:text-[#D6A84F] transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]/60" />
                    <span>{dest.name} Tours</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Direct Booking */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#D6A84F] mb-4 tracking-wide uppercase">
              Connect With Us
            </h3>
            <p className="text-xs text-white/75">
              Planning your trip? Reach out to our Siliguri travel desk for instant itineraries, permit advice, and customized quotes.
            </p>

            <div className="space-y-2">
              <a
                href="tel:+918670374242"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
              >
                <div className="p-2 rounded bg-[#245B49] text-[#D6A84F]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-white/60">Primary Booking Desk</div>
                  <div className="text-sm font-semibold">+91 8670374242</div>
                </div>
              </a>

              <a
                href="tel:+918899505665"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
              >
                <div className="p-2 rounded bg-[#245B49] text-[#D6A84F]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-white/60">Secondary Line</div>
                  <div className="text-sm font-semibold">+91 8899505665</div>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
              >
                <div className="p-2 rounded bg-[#245B49] text-[#D6A84F]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-white/60">Official Email</div>
                  <div className="text-xs font-semibold truncate max-w-[190px]">{COMPANY_INFO.email}</div>
                </div>
              </a>

              <a
                href={getWhatsAppUrl(defaultWhatsAppMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 8670374242)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© 2026 Aadhya Gorkha Travels. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-white/50">Siliguri, West Bengal – 734008</span>
            <span>·</span>
            <Link to="/contact" className="hover:text-[#D6A84F] transition-colors">
              Permits & Helpdesk
            </Link>
            <span>·</span>
            <a
              href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I would like to request customized travel assistance.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D6A84F] hover:underline"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
