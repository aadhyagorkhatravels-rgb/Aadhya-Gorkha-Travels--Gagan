import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, ShieldCheck, Clock, Folder } from "lucide-react";
import { COMPANY_INFO, getWhatsAppUrl, DESTINATIONS } from "../data/travelData";
import { BrandLogo } from "./BrandLogo";

export const Footer: React.FC = () => {
  const defaultWhatsAppMsg =
    "Hello Aadhya Gorkha Travels, I would like to enquire about your Sikkim & Darjeeling tour packages.";

  return (
    <footer className="bg-himalayan-navy text-white/90 border-t-2 border-[#E2A829]/60 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block group" title="Aadhya Gorkha Travels">
              <BrandLogo variant="footer" />
            </Link>

            <p className="text-sm text-white/80 leading-relaxed">
              Your trusted Siliguri-based travel agency specializing in Sikkim, Darjeeling, Bhutan, Nepal, and Northeast India tour packages, reliable taxi rentals, and customized mountain journeys.
            </p>

            <div className="pt-2 space-y-2 text-xs text-white/85">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F3C853] shrink-0 mt-0.5" />
                <span>
                  Ward No. 42 of SMC, Jila Parishad Road, East, Salugara, Siliguri, West Bengal – 734008, India.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F3C853] shrink-0" />
                <span>Monday – Sunday: 7:00 AM – 10:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F3C853] shrink-0" />
                <span>Authorized Local Travel Specialist & Fleet Provider</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F3C853] mb-4 tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2A829]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2A829]" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2A829]" />
                  <span>Tour Packages</span>
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2A829]" />
                  <span>Popular Destinations</span>
                </Link>
              </li>
              <li>
                <Link to="/taxi-services" className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2A829]" />
                  <span>Taxi & Car Rentals</span>
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2A829]" />
                  <span>Hotels & Mountain Resorts</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2A829]" />
                  <span>Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/drive-docs" className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-[#E2A829]" />
                  <span>Trip Documents (Google Drive)</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2A829]" />
                  <span>Contact & Map Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Destinations */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F3C853] mb-4 tracking-wide uppercase">
              Popular Circuits
            </h3>
            <ul className="space-y-2.5 text-sm">
              {DESTINATIONS.slice(0, 8).map((dest) => (
                <li key={dest.id}>
                  <Link
                    to={`/destinations#${dest.slug}`}
                    className="text-white/80 hover:text-[#F3C853] transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#E2A829]" />
                    <span>{dest.name} Tours</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Direct Booking */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-[#F3C853] mb-4 tracking-wide uppercase">
              Connect With Us
            </h3>
            <p className="text-xs text-white/80">
              Planning your trip? Reach out to our Siliguri travel desk for instant itineraries, permit advice, and customized quotes.
            </p>

            <div className="space-y-2">
              <a
                href="tel:+918670374242"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 transition-colors text-white"
              >
                <div className="p-2 rounded bg-[#13469E] text-[#F3C853]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-white/65">Primary Booking Desk</div>
                  <div className="text-sm font-semibold">+91 8670374242</div>
                </div>
              </a>

              <a
                href="tel:+918899505665"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 transition-colors text-white"
              >
                <div className="p-2 rounded bg-[#13469E] text-[#F3C853]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-white/65">Secondary Line</div>
                  <div className="text-sm font-semibold">+91 8899505665</div>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 transition-colors text-white"
              >
                <div className="p-2 rounded bg-[#13469E] text-[#F3C853]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-white/65">Official Email</div>
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-4">
          <p>© 2026 Aadhya Gorkha Travels. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-white/60">Siliguri, West Bengal – 734008</span>
            <span>·</span>
            <Link to="/contact" className="hover:text-[#F3C853] transition-colors">
              Permits & Helpdesk
            </Link>
            <span>·</span>
            <a
              href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I would like to request customized travel assistance.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F3C853] hover:underline"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
