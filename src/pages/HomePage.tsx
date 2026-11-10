import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Compass,
  ArrowRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  Car,
  Hotel,
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Star,
  Quote,
} from "lucide-react";
import {
  DESTINATIONS,
  TOUR_PACKAGES,
  VEHICLES,
  HOTELS,
  SAMPLE_TESTIMONIALS,
  COMPANY_INFO,
  getWhatsAppUrl,
  TourPackage,
  Vehicle,
} from "../data/travelData";
import { PackageCard } from "../components/PackageCard";
import { DestinationCard } from "../components/DestinationCard";
import { VehicleCard } from "../components/VehicleCard";
import { BookingPrefill } from "../components/QuickEnquiryModal";

interface HomePageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();

  // Floating Quick Booking Form State
  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [quickDestination, setQuickDestination] = useState("Darjeeling");
  const [quickDate, setQuickDate] = useState("");
  const [quickTravellers, setQuickTravellers] = useState("2 Adults");

  // Package Tab Filter
  const [activePackageTab, setActivePackageTab] = useState<"all" | "darjeeling" | "sikkim" | "other">("all");

  // Testimonial Carousel Index
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const filteredPackages =
    activePackageTab === "all"
      ? TOUR_PACKAGES.slice(0, 6)
      : TOUR_PACKAGES.filter((p) => p.category === activePackageTab);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickPhone.trim()) {
      alert("Please provide your name and phone number so we can send the itinerary.");
      return;
    }

    const message = [
      `*Himalayan Travel Enquiry - Aadhya Gorkha Travels*`,
      `*Name:* ${quickName}`,
      `*Phone:* ${quickPhone}`,
      quickEmail ? `*Email:* ${quickEmail}` : null,
      `*Destination:* ${quickDestination}`,
      quickDate ? `*Travel Date:* ${quickDate}` : null,
      `*Travellers:* ${quickTravellers}`,
      `Please send the best package rates and day-wise itinerary.`,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = getWhatsAppUrl(message);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % SAMPLE_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx(
      (prev) => (prev - 1 + SAMPLE_TESTIMONIALS.length) % SAMPLE_TESTIMONIALS.length
    );
  };

  return (
    <div className="w-full">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#123D32] overflow-hidden pt-12 pb-20">
        {/* Background Image with Layered Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg"
            alt="Mount Kanchenjunga Eastern Himalayas"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transform animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#123D32]/95 via-[#123D32]/80 to-[#123D32]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#123D32] via-transparent to-transparent opacity-90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-white text-left">
              <div className="inline-flex items-center gap-2 text-xs tracking-wider text-[#D6A84F] uppercase font-semibold">
                <Compass className="w-4 h-4 text-[#D6A84F]" />
                <span>Premier Himalayan Travel Agency · Salugara, Siliguri</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] text-balance">
                Discover the Magic of the Eastern Himalayas
              </h1>

              <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
                Explore breathtaking mountains, peaceful monasteries, beautiful valleys and unforgettable journeys with Aadhya Gorkha Travels.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/packages"
                  className="px-6 py-3.5 bg-[#D6A84F] hover:bg-[#c49740] text-[#123D32] font-semibold text-sm rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center gap-2"
                >
                  <span>Explore Tour Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm rounded-lg backdrop-blur-xs transition-all duration-200 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#D6A84F]" />
                  <span>Plan Your Journey</span>
                </button>

                <a
                  href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I would like to plan a trip to Sikkim & Darjeeling.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Quick Trust Markers */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15 text-xs text-white/80">
                <div>
                  <div className="font-serif text-lg font-bold text-[#D6A84F]">100%</div>
                  <div className="text-white/70">Customized Itineraries</div>
                </div>
                <div>
                  <div className="font-serif text-lg font-bold text-[#D6A84F]">Local</div>
                  <div className="text-white/70">Dedicated Fleet & Drivers</div>
                </div>
                <div>
                  <div className="font-serif text-lg font-bold text-[#D6A84F]">Siliguri</div>
                  <div className="text-white/70">Direct On-Ground Desk</div>
                </div>
              </div>
            </div>

            {/* Right Floating Booking Enquiry Form */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF8F2] border border-[#D6A84F]/40 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-[#123D32] uppercase tracking-wider block">
                    Instant Itinerary & Best Price Quote
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#123D32]">
                    Quick Travel Enquiry
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Get customized packages sent instantly to your WhatsApp
                  </p>
                </div>

                <form onSubmit={handleHeroSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={quickEmail}
                        onChange={(e) => setQuickEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Destination
                      </label>
                      <select
                        value={quickDestination}
                        onChange={(e) => setQuickDestination(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                      >
                        <option value="Darjeeling">Darjeeling</option>
                        <option value="Gangtok (Sikkim)">Gangtok (Sikkim)</option>
                        <option value="North Sikkim (Lachung/Yumthang)">North Sikkim</option>
                        <option value="Pelling (West Sikkim)">Pelling</option>
                        <option value="Gangtok & Darjeeling Combo">Gangtok & Darjeeling</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        value={quickDate}
                        onChange={(e) => setQuickDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Number of Travellers
                    </label>
                    <select
                      value={quickTravellers}
                      onChange={(e) => setQuickTravellers(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                    >
                      <option value="1 Adult (Solo)">1 Adult (Solo)</option>
                      <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                      <option value="3 to 4 (Family / Small Group)">3 to 4 (Family / Small Group)</option>
                      <option value="5 to 8 (Family Circle)">5 to 8 (Family Circle)</option>
                      <option value="8+ (Group Tour)">8+ (Group Tour)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#123D32] hover:bg-[#245B49] text-white font-semibold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D6A84F]" />
                    <span>Submit Enquiry on WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-center text-neutral-500">
                    Direct enquiry routed to +91 8670374242 · No spam guarantee
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REPUTATION & VALUE PROPOSITION STRIP */}
      <section className="bg-white border-y border-neutral-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/30 text-[#123D32]">
                <ShieldCheck className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-neutral-900">Verified Local Agency</h4>
                <p className="text-[11px] text-neutral-500">Salugara, Siliguri Head Office</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/30 text-[#123D32]">
                <Car className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-neutral-900">Private Taxi Fleet</h4>
                <p className="text-[11px] text-neutral-500">Innova, Dzire, Bolero & Travellers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/30 text-[#123D32]">
                <Hotel className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-neutral-900">Handpicked Stays</h4>
                <p className="text-[11px] text-neutral-500">Kanchenjunga View Hotels & Resorts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/30 text-[#123D32]">
                <Phone className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-neutral-900">24x7 Trip Support</h4>
                <p className="text-[11px] text-neutral-500">On-ground assistance throughout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS */}
      <section className="py-16 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
                Explore The Eastern Himalayas
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#123D32] mt-1">
                Popular Destinations
              </h2>
              <p className="text-sm text-neutral-600 mt-2 max-w-xl">
                From misty tea gardens in Darjeeling to holy alpine lakes in North Sikkim and the majestic fortress dzongs of Bhutan.
              </p>
            </div>
            <Link
              to="/destinations"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#123D32] hover:text-[#D6A84F] transition-colors"
            >
              <span>View All 12 Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.slice(0, 8).map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#123D32] hover:bg-[#245B49] text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs transition-colors"
            >
              <span>Explore All Destinations (Bhutan, Nepal, Meghalaya & Arunachal)</span>
              <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED TOUR PACKAGES */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Curated Himalayan Experiences
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#123D32] mt-1">
              Featured Tour Packages
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Every package is fully customizable. Complete with sanitized private vehicle, scenic accommodation, permits, and Siliguri local support.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1 bg-neutral-100 rounded-lg max-w-md mx-auto">
              <button
                onClick={() => setActivePackageTab("all")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activePackageTab === "all"
                    ? "bg-[#123D32] text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                All Packages
              </button>
              <button
                onClick={() => setActivePackageTab("sikkim")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activePackageTab === "sikkim"
                    ? "bg-[#123D32] text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Sikkim Tours
              </button>
              <button
                onClick={() => setActivePackageTab("darjeeling")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activePackageTab === "darjeeling"
                    ? "bg-[#123D32] text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Darjeeling Tours
              </button>
              <button
                onClick={() => setActivePackageTab("other")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activePackageTab === "other"
                    ? "bg-[#123D32] text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Bhutan & Northeast
              </button>
            </div>
          </div>

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

          <div className="mt-10 text-center">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF8F2] hover:bg-[#123D32] hover:text-white border border-[#123D32]/20 text-[#123D32] text-xs sm:text-sm font-semibold rounded-md transition-colors"
            >
              <span>View All 13+ Himalayan Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TAXI & CAR RENTAL FLEET SPOTLIGHT */}
      <section className="py-16 bg-[#123D32] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
                Reliable Himalayan Transportation
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                Premium Taxi & Car Rental Services
              </h2>
              <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
                Experience hassle-free pick-up and drops from Bagdogra Airport (IXB) and NJP Railway Station. Dedicated tourist-permitted vehicles with licensed mountain chauffeurs.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/taxi-services"
                className="py-3 px-5 bg-[#D6A84F] hover:bg-[#c49740] text-[#123D32] font-semibold text-xs sm:text-sm rounded-lg text-center transition-colors"
              >
                View Complete Fleet & Routes
              </Link>
              <a
                href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I need a taxi booking from Bagdogra Airport / NJP Railway Station.")}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-lg text-center transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Taxi Booking on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Vehicle Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VEHICLES.slice(0, 4).map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onBook={(v) =>
                  onOpenBooking({
                    title: `Taxi Booking: ${v.name}`,
                    type: "taxi",
                    vehicleName: v.name,
                  })
                }
              />
            ))}
          </div>

          {/* Transfer Highlights List */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-white/80">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-0.5">
                  Bagdogra Airport (IXB) Pickups
                </strong>
                Direct transfers to Darjeeling, Gangtok, Kalimpong, Pelling, and Bhutan border.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Car className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-0.5">
                  NJP Railway Station Transfers
                </strong>
                Punctual greeting right at the station exit with luggage assistance.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-0.5">
                  Permit Ready North Sikkim 4WD
                </strong>
                Heavy-duty vehicles for Lachen, Lachung, Yumthang & Gurudongmar Lake.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE AADHYA GORKHA TRAVELS */}
      <section className="py-16 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Local Excellence & Hospitality
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#123D32] mt-1">
              Why Choose Aadhya Gorkha Travels?
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Based at the foothills in Salugara, Siliguri, we serve as your direct gateway to Sikkim, Darjeeling, Bhutan, and the Northeast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#D6A84F] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-4">
                <Compass className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 mb-2">
                Personalized Travel Planning
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every holiday is tailored to your pacing, budget, family preferences, and desired mountain views.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#D6A84F] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-4">
                <Users className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 mb-2">
                Experienced Local Travel Assistance
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Native knowledge of mountain weather, road conditions, festivals, and authentic Himalayan cuisine.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#D6A84F] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-4">
                <Car className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 mb-2">
                Comfortable Transportation
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Well-maintained private fleet with trained hill chauffeurs committed to safety and comfort.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#D6A84F] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-4">
                <Sparkles className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 mb-2">
                Customized Tour Packages
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                From romantic honeymoons to adventurous North Sikkim road trips and Bhutan heritage circuits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#D6A84F] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-4">
                <ShieldCheck className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 mb-2">
                Transparent Pricing
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                No hidden charges. Clear inclusions, driver allowances, toll fees, and permit details provided upfront.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#D6A84F] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-4">
                <Phone className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 mb-2">
                Dedicated Customer Support
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                24x7 phone and WhatsApp coordination while you are on the road in Sikkim, Bengal, or Bhutan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#D6A84F] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-4">
                <MapPin className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 mb-2">
                Convenient Airport Transfers
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Punctual flight tracking and smooth pick-up at Bagdogra Airport and NJP Railway Station.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#D6A84F] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-4">
                <Award className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 mb-2">
                Memorable Himalayan Experiences
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We craft journeys filled with golden sunrises, peaceful monasteries, and authentic local memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS (Sample Experiences) */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              Traveler Feedback
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#123D32] mt-1">
              What Travelers Say
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Sample travel experiences shared by visitors to Sikkim & Darjeeling
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="bg-[#FAF8F2] border border-[#D6A84F]/30 rounded-2xl p-8 sm:p-10 shadow-xs relative">
            <Quote className="w-12 h-12 text-[#D6A84F]/25 absolute top-6 right-6" />

            <div className="flex items-center gap-1 mb-4">
              {[...Array(SAMPLE_TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D6A84F] text-[#D6A84F]" />
              ))}
            </div>

            <p className="font-serif italic text-base sm:text-lg text-neutral-800 leading-relaxed mb-6">
              "{SAMPLE_TESTIMONIALS[activeTestimonialIdx].feedback}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-neutral-200/80 pt-4 gap-3">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#123D32]">
                  {SAMPLE_TESTIMONIALS[activeTestimonialIdx].name}
                </h4>
                <div className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                  <span>{SAMPLE_TESTIMONIALS[activeTestimonialIdx].location}</span>
                  <span>·</span>
                  <span className="text-[#123D32] font-medium">
                    {SAMPLE_TESTIMONIALS[activeTestimonialIdx].destinationVisited}
                  </span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full border border-neutral-300 hover:bg-[#123D32] hover:text-white transition-colors text-neutral-700"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-neutral-500 font-mono">
                  {activeTestimonialIdx + 1} / {SAMPLE_TESTIMONIALS.length}
                </span>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full border border-neutral-300 hover:bg-[#123D32] hover:text-white transition-colors text-neutral-700"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION STRIP */}
      <section className="bg-gradient-to-r from-[#123D32] to-[#245B49] text-white py-14 border-t border-[#D6A84F]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-widest">
            Start Your Himalayan Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
            Ready to Explore Sikkim, Darjeeling or Bhutan?
          </h2>
          <p className="text-sm text-white/85 max-w-xl mx-auto leading-relaxed">
            Get personalized itineraries, hotel recommendations, and direct car rental quotes from our Siliguri travel experts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 bg-[#D6A84F] hover:bg-[#c49740] text-[#123D32] font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-all duration-200"
            >
              Plan Your Journey Now
            </button>

            <a
              href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I would like to talk with a travel specialist regarding my vacation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp (+91 8670374242)</span>
            </a>

            <a
              href="tel:+918670374242"
              className="px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D6A84F]" />
              <span>Call Us Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
