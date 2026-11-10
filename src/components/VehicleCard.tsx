import React from "react";
import { Users, Briefcase, Compass, ShieldCheck, MessageCircle } from "lucide-react";
import { Vehicle, getWhatsAppUrl } from "../data/travelData";

interface VehicleCardProps {
  vehicle: Vehicle;
  onBook?: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onBook }) => {
  const whatsappMsg = `Hello Aadhya Gorkha Travels, I would like to enquire about renting a ${vehicle.name} (${vehicle.capacity}) for our upcoming mountain trip. Please share the rates and availability.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMsg);

  return (
    <div className="group bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Vehicle Photograph */}
      <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/src/assets/images/himalayan_taxi_suv_1794309511238.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-3 text-white">
          <span className="text-[11px] font-semibold text-[#D6A84F] tracking-wider uppercase block">
            {vehicle.category}
          </span>
          <h3 className="font-serif text-lg font-bold text-white drop-shadow-sm">
            {vehicle.name}
          </h3>
        </div>
      </div>

      {/* Specifications */}
      <div className="p-4 flex flex-col flex-1">
        {/* Specs Row */}
        <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 mb-3 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#D6A84F] shrink-0" />
            <span className="font-medium text-neutral-800">{vehicle.capacity}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#D6A84F] shrink-0" />
            <span>{vehicle.luggage}</span>
          </div>
        </div>

        {/* Suitable Travel Type */}
        <div className="mb-3 space-y-1">
          <div className="text-[11px] text-neutral-500 font-medium">Suitable Travel Type:</div>
          <p className="text-xs font-semibold text-[#123D32] leading-tight">
            {vehicle.terrainSuitability}
          </p>
          <p className="text-[11px] text-neutral-600 italic">
            Best for: {vehicle.bestFor}
          </p>
        </div>

        {/* Feature Points */}
        <div className="mt-auto mb-4 space-y-1">
          {vehicle.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-neutral-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-neutral-100 grid grid-cols-2 gap-2">
          <button
            onClick={() => onBook?.(vehicle)}
            className="py-2 px-3 text-xs font-semibold text-[#123D32] bg-[#FAF8F2] hover:bg-[#123D32] hover:text-white border border-[#123D32]/20 rounded-md transition-colors flex items-center justify-center gap-1"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors flex items-center justify-center gap-1 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
