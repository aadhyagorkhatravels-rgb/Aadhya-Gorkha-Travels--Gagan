import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Compass, ArrowRight, MessageCircle, Mountain, CheckCircle2 } from "lucide-react";
import { DESTINATIONS, TOUR_PACKAGES, getWhatsAppUrl, Destination } from "../data/travelData";
import { BookingPrefill } from "../components/QuickEnquiryModal";

interface DestinationsPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onOpenBooking }) => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-[#123D32] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D6A84F]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg"
            alt="Himalayan peaks"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-widest">
            Aadhya Gorkha Travels · Destination Guide
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Himalayan Destinations
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            From the tea-terraced slopes of Darjeeling and sacred monasteries of Gangtok, to the high alpine snowscapes of North Sikkim, Bhutan, Nepal, and Northeast India.
          </p>
        </div>
      </section>

      {/* Grid of 12 Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest) => {
            const connectedPackages = TOUR_PACKAGES.filter((p) =>
              p.destinationsCovered.some(
                (d) =>
                  d.toLowerCase().includes(dest.name.toLowerCase()) ||
                  dest.name.toLowerCase().includes(d.toLowerCase())
              )
            );

            const whatsappUrl = getWhatsAppUrl(
              `Hello Aadhya Gorkha Travels, I am planning to visit ${dest.name} (${dest.stateOrCountry}). Please send me suitable tour packages and itinerary recommendations.`
            );

            return (
              <div
                key={dest.id}
                id={dest.slug}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 text-xs text-white/90 font-medium flex items-center gap-1 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>{dest.stateOrCountry}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h2 className="font-serif text-2xl font-bold">{dest.name}</h2>
                    <div className="text-xs text-white/80 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Mountain className="w-3.5 h-3.5 text-[#D6A84F]" />
                        {dest.altitude}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 space-y-4">
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {dest.longDescription}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-700 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                      <span>Best Time: {dest.bestTimeToVisit}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-neutral-100">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
                      Top Attractions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connected Packages or Direct Action */}
                  <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                    {connectedPackages.length > 0 ? (
                      <Link
                        to={`/packages/${connectedPackages[0].slug}`}
                        className="py-2 px-3 text-xs font-semibold text-[#123D32] bg-[#FAF8F2] hover:bg-[#123D32] hover:text-white border border-[#123D32]/20 rounded-md transition-colors flex items-center gap-1"
                      >
                        <span>View Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          onOpenBooking({
                            title: `Custom Tour: ${dest.name}`,
                            destination: dest.name,
                            type: "custom",
                          })
                        }
                        className="py-2 px-3 text-xs font-semibold text-[#123D32] bg-[#FAF8F2] hover:bg-[#123D32] hover:text-white border border-[#123D32]/20 rounded-md transition-colors"
                      >
                        Plan Custom Trip
                      </button>
                    )}

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
