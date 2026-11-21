import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Clock, MapPin, ArrowRight } from "lucide-react";
import { TourPackage, getWhatsAppUrl } from "../data/travelData";

interface PackageCardProps {
  pkg: TourPackage;
  onEnquire?: (pkg: TourPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const whatsappMsg = `Hello Aadhya Gorkha Travels, I am interested in your tour package "${pkg.title}" (${pkg.duration}). Please share the day-wise itinerary and best price.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMsg);

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#E2A829]/50 transition-all duration-300 flex flex-col h-full">
      {/* Image Container with Fallback */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={pkg.bannerImage}
          alt={pkg.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071F4D]/85 via-transparent to-transparent opacity-85" />

        {/* Clean Unboxed Overlay Info */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-2 text-xs font-medium text-white/95">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#F3C853]" />
              {pkg.duration}
            </span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-[#F3C853] font-semibold">{pkg.categoryLabel}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-[#0F1E3A] group-hover:text-[#0A2D6E] transition-colors line-clamp-1 mb-2">
          <Link to={`/packages/${pkg.slug}`}>{pkg.title}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {pkg.shortDescription}
        </p>

        {/* Destinations Covered (Unboxed with typographic separator) */}
        <div className="mt-auto pt-3 border-t border-slate-100 mb-4">
          <div className="text-[11px] text-slate-500 mb-1 flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3 text-[#E2A829]" />
            <span>Destinations Covered:</span>
          </div>
          <p className="text-xs text-slate-700 font-medium line-clamp-1">
            {pkg.destinationsCovered.join(" · ")}
          </p>
        </div>

        {/* Pricing Indicator & Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
              Package Cost
            </span>
            <span className="text-sm font-bold text-[#0A2D6E] font-serif">
              Get Best Price
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/packages/${pkg.slug}`}
              className="py-2 px-3 text-xs font-semibold text-[#0A2D6E] bg-[#F6F9FC] hover:bg-[#0A2D6E] hover:text-white border border-[#0A2D6E]/20 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors flex items-center gap-1 shadow-xs whitespace-nowrap"
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
