import React, { useState, useMemo } from "react";
import { Search, Filter, Compass, MessageCircle, MapPin, Calendar } from "lucide-react";
import { TOUR_PACKAGES, getWhatsAppUrl, TourPackage } from "../data/travelData";
import { PackageCard } from "../components/PackageCard";
import { BookingPrefill } from "../components/QuickEnquiryModal";

interface TourPackagesPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const TourPackagesPage: React.FC<TourPackagesPageProps> = ({ onOpenBooking }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");

  const filteredPackages = useMemo(() => {
    return TOUR_PACKAGES.filter((pkg) => {
      // Category filter
      if (selectedCategory !== "all" && pkg.category !== selectedCategory) {
        return false;
      }

      // Duration filter
      if (selectedDuration === "short" && !pkg.duration.includes("2") && !pkg.duration.includes("3 Nights")) {
        return false;
      }
      if (selectedDuration === "medium" && !pkg.duration.includes("4") && !pkg.duration.includes("5 Nights")) {
        return false;
      }
      if (selectedDuration === "long" && !pkg.duration.includes("7") && !pkg.duration.includes("8 Days")) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = pkg.title.toLowerCase().includes(query);
        const matchesDest = pkg.destinationsCovered.some((d) => d.toLowerCase().includes(query));
        const matchesOverview = pkg.overview.toLowerCase().includes(query);
        return matchesTitle || matchesDest || matchesOverview;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedDuration]);

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-20">
      {/* Page Header Banner */}
      <section className="bg-[#123D32] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D6A84F]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg"
            alt="Himalayan hills"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-widest">
            Aadhya Gorkha Travels · Siliguri
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Himalayan Tour Packages
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Carefully curated itineraries across Sikkim, Darjeeling, Bhutan, Nepal, and Northeast India. All packages feature private sanitized transport, scenic stays, and personalized pacing.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => onOpenBooking({ type: "custom" })}
              className="px-5 py-2.5 bg-[#D6A84F] hover:bg-[#c49740] text-[#123D32] font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-colors"
            >
              Request Custom Itinerary
            </button>
            <a
              href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I would like to get quotes for Sikkim & Darjeeling holiday packages.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm rounded-lg shadow-md transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-4 sm:p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by destination (e.g. Tiger Hill, Yumthang, Bhutan)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
              />
            </div>

            {/* Region / Category Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32] text-neutral-800"
              >
                <option value="all">All Regions (Sikkim, Darjeeling, Bhutan, Nepal)</option>
                <option value="sikkim">Sikkim Tour Packages (Gangtok, North Sikkim, Pelling)</option>
                <option value="darjeeling">Darjeeling Tour Packages (Tiger Hill, Mirik)</option>
                <option value="other">Bhutan, Nepal & Northeast Circuits</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32] text-neutral-800"
              >
                <option value="all">Any Duration</option>
                <option value="short">Short Breaks (2–3 Nights)</option>
                <option value="medium">Standard Holidays (4–5 Nights)</option>
                <option value="long">Grand Expeditions (7+ Nights)</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Tag Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-800">Popular Quick Filters:</span>
            <button
              onClick={() => {
                setSelectedCategory("darjeeling");
                setSearchTerm("");
              }}
              className="px-2.5 py-1 bg-neutral-100 hover:bg-[#123D32] hover:text-white rounded text-[11px] transition-colors"
            >
              Darjeeling (2N, 3N, 4N)
            </button>
            <button
              onClick={() => {
                setSelectedCategory("sikkim");
                setSearchTerm("");
              }}
              className="px-2.5 py-1 bg-neutral-100 hover:bg-[#123D32] hover:text-white rounded text-[11px] transition-colors"
            >
              Sikkim & Tsomgo Lake
            </button>
            <button
              onClick={() => {
                setSelectedCategory("sikkim");
                setSearchTerm("Lachung");
              }}
              className="px-2.5 py-1 bg-neutral-100 hover:bg-[#123D32] hover:text-white rounded text-[11px] transition-colors"
            >
              North Sikkim (Snow Valleys)
            </button>
            <button
              onClick={() => {
                setSelectedCategory("other");
                setSearchTerm("Bhutan");
              }}
              className="px-2.5 py-1 bg-neutral-100 hover:bg-[#123D32] hover:text-white rounded text-[11px] transition-colors"
            >
              Bhutan from Siliguri
            </button>
            {(searchTerm || selectedCategory !== "all" || selectedDuration !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedDuration("all");
                }}
                className="text-xs text-red-600 hover:underline ml-auto font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm text-neutral-600">
            Showing <strong className="text-[#123D32]">{filteredPackages.length}</strong> verified tour packages
          </p>
          <span className="text-xs text-neutral-500 hidden sm:inline">
            Direct pricing upon enquiry · No hidden markups
          </span>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center space-y-3">
            <Compass className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-neutral-800">
              No packages matching your criteria
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              We specialize in custom itineraries. Tell us where you want to go and our Siliguri team will build the perfect plan for you.
            </p>
            <button
              onClick={() => onOpenBooking({ type: "custom" })}
              className="mt-2 px-4 py-2 bg-[#123D32] text-white text-xs font-semibold rounded-md"
            >
              Plan Custom Itinerary
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onEnquire={(p) =>
                  onOpenBooking({
                    title: p.title,
                    destination: p.destinationsCovered[0] || "Sikkim",
                    type: "package",
                    packageId: p.id,
                  })
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Helpful Himalayan Travel Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#123D32] text-white rounded-xl p-6 sm:p-8 border border-[#D6A84F]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs text-[#D6A84F] font-semibold uppercase tracking-wider">
              Traveler Information
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Planning a Family Holiday or Honeymoon?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
              We offer personalized hotel choices, private SUV upgrades (Innova Crysta), baby seats, elderly-friendly pacing, and hassle-free permit paperwork for restricted border areas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking({ type: "custom" })}
              className="px-5 py-3 bg-[#D6A84F] hover:bg-[#c49740] text-[#123D32] font-semibold text-xs sm:text-sm rounded-lg shadow-sm whitespace-nowrap"
            >
              Get Custom Quote
            </button>
            <a
              href="tel:+918670374242"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm rounded-lg text-center whitespace-nowrap"
            >
              Call +91 8670374242
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
