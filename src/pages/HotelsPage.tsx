import React, { useState } from "react";
import { Hotel, Star, MapPin, Check, MessageCircle, Phone, Filter } from "lucide-react";
import { HOTELS, getWhatsAppUrl, HotelListing } from "../data/travelData";
import { BookingPrefill } from "../components/QuickEnquiryModal";

interface HotelsPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");

  const filteredHotels = HOTELS.filter((hotel) => {
    if (selectedCategory !== "all" && hotel.category !== selectedCategory) return false;
    if (
      selectedDestination !== "all" &&
      !hotel.destination.toLowerCase().includes(selectedDestination.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-[#123D32] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D6A84F]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg"
            alt="Mountain stays"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-widest">
            Aadhya Gorkha Travels · Stays & Hospitality
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Hotels & Mountain Resorts
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Handpicked accommodations across Darjeeling, Gangtok, Pelling, Lachung, and Kalimpong. From luxury Kanchenjunga view suites to warm traditional mountain homestays.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenBooking({ type: "hotel" })}
              className="px-5 py-2.5 bg-[#D6A84F] hover:bg-[#c49740] text-[#123D32] font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-colors"
            >
              Enquire for Hotel Stay
            </button>
            <a
              href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I would like to book a hotel / resort in Sikkim or Darjeeling.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm rounded-lg shadow-md transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Booking (+91 8670374242)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Filter Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-4 sm:p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
              >
                <option value="all">All Categories (Luxury, Resorts, Boutique, Homestays)</option>
                <option value="Luxury">Luxury Hotels</option>
                <option value="Resort">Mountain Spa Resorts</option>
                <option value="Boutique">Boutique Heritage Stays</option>
                <option value="Homestay">Authentic Himalayan Homestays</option>
                <option value="Budget">Comfortable Budget Inns</option>
              </select>
            </div>

            {/* Destination Filter */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Filter by Destination
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
              >
                <option value="all">All Destinations (Darjeeling, Gangtok, Pelling, Lachung)</option>
                <option value="Darjeeling">Darjeeling</option>
                <option value="Gangtok">Gangtok</option>
                <option value="Pelling">Pelling</option>
                <option value="Lachung">Lachung (North Sikkim)</option>
                <option value="Kalimpong">Kalimpong</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => {
            const whatsappUrl = getWhatsAppUrl(
              `Hello Aadhya Gorkha Travels, I am interested in booking accommodation at ${hotel.name} in ${hotel.destination}. Please share tariff rates and availability.`
            );

            return (
              <div
                key={hotel.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 text-xs text-white/90 font-medium flex items-center gap-1 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>{hotel.destination}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-[#123D32]/85 text-[#D6A84F] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-xs">
                    {hotel.category}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(hotel.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D6A84F] text-[#D6A84F]" />
                      ))}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white drop-shadow">
                      {hotel.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 space-y-4">
                  <div className="text-xs font-semibold text-[#123D32]">
                    View Type: <span className="font-normal text-neutral-700">{hotel.viewType}</span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Amenities */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                      Amenities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing / Booking Button */}
                  <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">
                        Tariff Rate
                      </span>
                      <span className="text-sm font-bold text-[#123D32] font-serif">
                        Get Best Price
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onOpenBooking({
                            title: `Hotel Booking: ${hotel.name}`,
                            destination: hotel.destination,
                            type: "hotel",
                            hotelName: hotel.name,
                          })
                        }
                        className="py-2 px-3 text-xs font-semibold text-[#123D32] bg-[#FAF8F2] hover:bg-[#123D32] hover:text-white border border-[#123D32]/20 rounded-md transition-colors"
                      >
                        Enquire
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
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
