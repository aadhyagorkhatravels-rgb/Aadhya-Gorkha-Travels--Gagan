import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  ArrowRight,
  MessageCircle,
  Mountain,
  CheckCircle2,
  X,
} from "lucide-react";
import { DESTINATIONS, getWhatsAppUrl, Destination } from "../data/travelData";
import { TourCoverageMap } from "../components/TourCoverageMap";
import { BookingPrefill } from "../components/QuickEnquiryModal";

interface DestinationsPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onOpenBooking }) => {
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [selectedDestModal, setSelectedDestModal] = useState<Destination | null>(null);

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    if (regionFilter === "sikkim") {
      return (
        dest.stateOrCountry.includes("Sikkim") ||
        ["gangtok", "north-sikkim", "pelling", "lachung", "yumthang-valley", "ravangla"].includes(dest.id)
      );
    }
    if (regionFilter === "bengal") {
      return dest.stateOrCountry.includes("West Bengal");
    }
    if (regionFilter === "international") {
      return ["bhutan", "nepal"].includes(dest.id);
    }
    if (regionFilter === "northeast") {
      return ["meghalaya", "arunachal-pradesh"].includes(dest.id);
    }
    return true;
  });

  return (
    <div className="w-full bg-[#F6F9FC] min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-himalayan-navy text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E2A829]/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg"
            alt="Himalayan peaks"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-[#F3C853] uppercase tracking-widest">
            Aadhya Gorkha Travels · Destination Guide
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Himalayan Destinations
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            From the tea-terraced slopes of Darjeeling and sacred monasteries of Gangtok, to the high alpine snowscapes of North Sikkim, Bhutan, Nepal, and Northeast India.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenBooking({ type: "custom" })}
              className="px-5 py-2.5 bg-metallic-gold text-[#071F4D] font-bold text-xs sm:text-sm rounded-lg shadow-md transition-colors"
            >
              Plan Custom Himalayan Itinerary
            </button>
            <a
              href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I would like to enquire about Himalayan destinations.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm rounded-lg shadow-md transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Tour Coverage Map */}
      <TourCoverageMap onOpenBooking={onOpenBooking} variant="destinations" />

      {/* Region Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-xl shadow-xs border border-slate-200">
          <button
            onClick={() => setRegionFilter("all")}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              regionFilter === "all"
                ? "bg-[#0A2D6E] text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-[#0A2D6E]"
            }`}
          >
            All Destinations (12)
          </button>
          <button
            onClick={() => setRegionFilter("sikkim")}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              regionFilter === "sikkim"
                ? "bg-[#0A2D6E] text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-[#0A2D6E]"
            }`}
          >
            Sikkim (Gangtok, North Sikkim, Pelling)
          </button>
          <button
            onClick={() => setRegionFilter("bengal")}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              regionFilter === "bengal"
                ? "bg-[#0A2D6E] text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-[#0A2D6E]"
            }`}
          >
            Darjeeling & Kalimpong
          </button>
          <button
            onClick={() => setRegionFilter("international")}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              regionFilter === "international"
                ? "bg-[#0A2D6E] text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-[#0A2D6E]"
            }`}
          >
            Bhutan & Nepal
          </button>
          <button
            onClick={() => setRegionFilter("northeast")}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              regionFilter === "northeast"
                ? "bg-[#0A2D6E] text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-[#0A2D6E]"
            }`}
          >
            Meghalaya & Arunachal
          </button>
        </div>
      </section>

      {/* Grid of Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => {
            const whatsappUrl = getWhatsAppUrl(
              `Hello Aadhya Gorkha Travels, I am planning to visit ${dest.name} (${dest.stateOrCountry}). Please send me suitable tour packages and itinerary recommendations.`
            );

            return (
              <div
                key={dest.id}
                id={dest.slug}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#E2A829]/50 transition-all duration-300 flex flex-col scroll-mt-28"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071F4D]/85 via-[#071F4D]/25 to-transparent" />
                  <div className="absolute top-3 left-3 text-xs text-white/95 font-medium flex items-center gap-1 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#F3C853]" />
                    <span>{dest.stateOrCountry}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h2 className="font-serif text-2xl font-bold">{dest.name}</h2>
                    <div className="text-xs text-white/85 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Mountain className="w-3.5 h-3.5 text-[#F3C853]" />
                        {dest.altitude}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {dest.shortDescription}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#E2A829]" />
                      <span>Best Time: {dest.bestTimeToVisit}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Top Attractions:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {dest.highlights.join(" · ")}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedDestModal(dest)}
                      className="py-2 px-3 text-xs font-semibold text-[#0A2D6E] bg-[#F6F9FC] hover:bg-[#0A2D6E] hover:text-white border border-[#0A2D6E]/20 rounded-md transition-colors flex items-center gap-1"
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

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

      {/* Destination Detailed Modal */}
      {selectedDestModal && (
        <div className="fixed inset-0 z-50 bg-[#071F4D]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-[#E2A829]/45 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-16/9 overflow-hidden bg-slate-900">
              <img
                src={selectedDestModal.image}
                alt={selectedDestModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F4D]/90 via-[#071F4D]/35 to-transparent" />
              <button
                onClick={() => setSelectedDestModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs text-[#F3C853] font-bold uppercase tracking-wider block">
                  {selectedDestModal.stateOrCountry}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  {selectedDestModal.name}
                </h3>
                <p className="text-xs text-white/85 mt-1">
                  Altitude: {selectedDestModal.altitude} · Best Time: {selectedDestModal.bestTimeToVisit}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-serif font-bold text-base text-[#0A2D6E] mb-1">
                  About {selectedDestModal.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedDestModal.longDescription}
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#0A2D6E] mb-2">
                  Key Attractions & Activities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDestModal.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-[#F6F9FC] rounded-lg border border-slate-200 text-xs text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#13469E] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Transfers coordinated from Bagdogra Airport & NJP
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const d = selectedDestModal;
                      setSelectedDestModal(null);
                      onOpenBooking({
                        title: `Custom Tour: ${d.name}`,
                        destination: d.name,
                        type: "custom",
                      });
                    }}
                    className="flex-1 sm:flex-initial py-2.5 px-4 bg-[#0A2D6E] hover:bg-[#13469E] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    Plan Trip Here
                  </button>

                  <a
                    href={getWhatsAppUrl(
                      `Hello Aadhya Gorkha Travels, I would like to plan a trip to ${selectedDestModal.name}. Please share customized options and best rates.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Quote</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
