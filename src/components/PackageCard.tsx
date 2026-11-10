import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Clock, MapPin, ArrowRight } from "lucide-react";
import { TourPackage, getWhatsAppUrl } from "../data/travelData";

interface PackageCardProps {
  pkg: TourPackage;
  onEnquire?: (pkg: TourPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onEnquire }) => {
  const whatsappMsg = `Hello Aadhya Gorkha Travels, I am interested in your tour package "${pkg.title}" (${pkg.duration}). Please share the day-wise itinerary and best price.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMsg);

  return (
    <div className="group bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container with Fallback */}
      <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
        <img
          src={pkg.bannerImage}
          alt={pkg.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Graceful fallback to mountain photo
            (e.target as HTMLImageElement).src =
              "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Clean Unboxed Overlay Info */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-2 text-xs font-medium text-white/90">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D6A84F]" />
              {pkg.duration}
            </span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-[#D6A84F] font-semibold">{pkg.categoryLabel}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-[#123D32] transition-colors line-clamp-1 mb-2">
          <Link to={`/packages/${pkg.slug}`}>{pkg.title}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
          {pkg.shortDescription}
        </p>

        {/* Destinations Covered (Unboxed with typographic separator) */}
        <div className="mt-auto pt-3 border-t border-neutral-100 mb-4">
          <div className="text-[11px] text-neutral-500 mb-1 flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3 text-[#D6A84F]" />
            <span>Destinations Covered:</span>
          </div>
          <p className="text-xs text-neutral-700 font-medium line-clamp-1">
            {pkg.destinationsCovered.join(" · ")}
          </p>
        </div>

        {/* Pricing Indicator & Buttons */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-neutral-400 block uppercase tracking-wider font-semibold">
              Package Cost
            </span>
            <span className="text-sm font-bold text-[#123D32] font-serif">
              Get Best Price
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/packages/${pkg.slug}`}
              className="py-2 px-3 text-xs font-semibold text-[#123D32] bg-[#FAF8F2] hover:bg-[#123D32] hover:text-white border border-[#123D32]/20 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap"
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
