import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Destination } from "../data/travelData";

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="group bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
        <img
          src={destination.image}
          alt={destination.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 text-white text-xs font-medium tracking-wide">
          <span className="text-white/90 drop-shadow-sm flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
            {destination.stateOrCountry}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-serif text-xl font-bold text-white tracking-wide">
            {destination.name}
          </h3>
          <div className="text-[11px] text-white/80 font-medium mt-0.5">
            Altitude: {destination.altitude}
          </div>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
          {destination.shortDescription}
        </p>

        {/* Highlights Preview */}
        <div className="mt-auto pt-2 border-t border-neutral-100 mb-3 text-[11px] text-neutral-500">
          <span className="font-medium text-neutral-700">Top Highlights: </span>
          <span>{destination.highlights.slice(0, 2).join(" · ")}</span>
        </div>

        <Link
          to={`/destinations#${destination.slug}`}
          className="py-2 px-3 text-xs font-semibold text-[#123D32] hover:text-white bg-[#FAF8F2] hover:bg-[#123D32] border border-[#123D32]/20 rounded-md transition-all flex items-center justify-between"
        >
          <span>Explore Destination</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
