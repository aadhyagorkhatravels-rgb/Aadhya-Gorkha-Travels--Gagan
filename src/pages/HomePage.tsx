import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  CheckCircle2,
  Mail,
} from "lucide-react";
import {
  DESTINATIONS,
  TOUR_PACKAGES,
  VEHICLES,
  COMPANY_INFO,
  getWhatsAppUrl,
} from "../data/travelData";
import { PackageCard } from "../components/PackageCard";
import { DestinationCard } from "../components/DestinationCard";
import { VehicleCard } from "../components/VehicleCard";
import { TourCoverageMap } from "../components/TourCoverageMap";
import { ClientTestimonials } from "../components/ClientTestimonials";
import { LiveTravelAdvisory } from "../components/LiveTravelAdvisory";
import { BookingPrefill } from "../components/QuickEnquiryModal";

interface HomePageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  // Floating Quick Booking Form State
  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [quickDestination, setQuickDestination] = useState("Darjeeling");
  const [quickDate, setQuickDate] = useState("");
  const [quickTravellers, setQuickTravellers] = useState("2 Adults");
  const [formError, setFormError] = useState("");
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroGeneratedMsg, setHeroGeneratedMsg] = useState("");

  // Package Tab Filter
  const [activePackageTab, setActivePackageTab] = useState<"all" | "darjeeling" | "sikkim" | "other">("all");

  const filteredPackages =
    activePackageTab === "all"
      ? TOUR_PACKAGES.slice(0, 6)
      : TOUR_PACKAGES.filter((p) => p.category === activePackageTab);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickPhone.trim()) {
      setFormError("Please enter your name and contact phone number.");
      return;
    }
    setFormError("");

    const message = [
      `*Himalayan Travel Enquiry - Aadhya Gorkha Travels*`,
      `*Name:* ${quickName.trim()}`,
      `*Phone:* ${quickPhone.trim()}`,
      quickEmail.trim() ? `*Email:* ${quickEmail.trim()}` : null,
      `*Destination:* ${quickDestination}`,
      quickDate ? `*Travel Date:* ${quickDate}` : null,
      `*Travellers:* ${quickTravellers}`,
      `Please send the best package rates and day-wise itinerary.`,
    ]
      .filter(Boolean)
      .join("\n");

    setHeroGeneratedMsg(message);
    setHeroSubmitted(true);
    const waUrl = getWhatsAppUrl(message);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full bg-white">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center justify-center bg-[#071F4D] overflow-hidden pt-12 pb-20">
        {/* Background Image with Royal Navy & Golden Horizon Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg"
            alt="Mount Kanchenjunga Eastern Himalayas"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transform animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071F4D]/94 via-[#0A2D6E]/78 to-[#0A2D6E]/55" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 82% 18%, rgba(226, 168, 41, 0.22) 0%, transparent 48%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071F4D] via-transparent to-transparent opacity-90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-white text-left">
              <div className="inline-flex items-center gap-2 text-xs tracking-wider text-[#F3C853] uppercase font-semibold">
                <Compass className="w-4 h-4 text-[#F3C853]" />
                <span>Premier Himalayan Travel Agency · Salugara, Siliguri</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] text-balance">
                Discover the Magic of the{" "}
                <span className="italic text-[#F3C853]">Eastern Himalayas</span>
              </h1>

              {/* Signature Gold Spear Divider Accent inspired by Logo */}
              <div className="flex items-center gap-3 max-w-sm">
                <div className="flex-1 gold-spear-line-left" />
                <span className="font-serif italic text-xs text-[#F3C853] tracking-widest uppercase">
                  Aadhya Gorkha Travels
                </span>
                <div className="flex-1 gold-spear-line-right" />
              </div>

              <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
                Explore breathtaking mountains, peaceful monasteries, scenic valleys and seamless road journeys with Aadhya Gorkha Travels.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/packages"
                  className="px-6 py-3.5 bg-metallic-gold text-[#071F4D] font-bold text-sm rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center gap-2"
                >
                  <span>Explore Tour Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3.5 bg-white/12 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm rounded-lg backdrop-blur-xs transition-all duration-200 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#F3C853]" />
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
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15 text-xs text-white/85">
                <div>
                  <div className="font-serif text-lg font-bold text-[#F3C853]">100%</div>
                  <div className="text-white/75">Customized Itineraries</div>
                </div>
                <div>
                  <div className="font-serif text-lg font-bold text-[#F3C853]">Local</div>
                  <div className="text-white/75">Dedicated Fleet & Drivers</div>
                </div>
                <div>
                  <div className="font-serif text-lg font-bold text-[#F3C853]">Siliguri</div>
                  <div className="text-white/75">Direct On-Ground Desk</div>
                </div>
              </div>
            </div>

            {/* Right Floating Booking Enquiry Form */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E2A829]/45 rounded-2xl p-6 sm:p-7 shadow-2xl">
                <div className="mb-4 pb-3 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-[#E2A829] uppercase tracking-wider block">
                    Instant Itinerary & Best Price Quote
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#0A2D6E]">
                    Quick Travel Enquiry
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Get customized packages sent instantly to your WhatsApp
                  </p>
                </div>

                {heroSubmitted ? (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#0A2D6E]">
                        Enquiry Ready for Dispatch!
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                        Your travel inquiry for {quickDestination} has been prepared. Use the buttons below to connect with our Siliguri desk:
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <a
                        href={getWhatsAppUrl(heroGeneratedMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg shadow-md flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Open WhatsApp (+91 8670374242)</span>
                      </a>

                      <a
                        href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Travel Enquiry: ${quickDestination} (${quickName})`)}&body=${encodeURIComponent(heroGeneratedMsg)}`}
                        className="w-full py-2.5 px-4 bg-[#F6F9FC] border border-slate-300 hover:bg-slate-100 text-[#0A2D6E] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-xs"
                      >
                        <Mail className="w-4 h-4 text-[#E2A829]" />
                        <span>Send via Email</span>
                      </a>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-500">
                      Need urgent assistance? Call our Siliguri office:{" "}
                      <a href="tel:+918670374242" className="text-[#0A2D6E] font-bold underline">
                        +91 8670374242
                      </a>
                    </div>

                    <button
                      onClick={() => setHeroSubmitted(false)}
                      className="text-xs text-[#0A2D6E] underline pt-1 block mx-auto"
                    >
                      Edit or submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHeroSubmit} className="space-y-3.5">
                    {formError && (
                      <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                        {formError}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={quickName}
                        onChange={(e) => {
                          setQuickName(e.target.value);
                          if (formError) setFormError("");
                        }}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 py-2 bg-[#F6F9FC] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2D6E] focus:border-[#0A2D6E]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={quickPhone}
                          onChange={(e) => {
                            setQuickPhone(e.target.value);
                            if (formError) setFormError("");
                          }}
                          placeholder="+91 9876543210"
                          className="w-full px-3 py-2 bg-[#F6F9FC] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2D6E] focus:border-[#0A2D6E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={quickEmail}
                          onChange={(e) => setQuickEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="w-full px-3 py-2 bg-[#F6F9FC] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2D6E] focus:border-[#0A2D6E]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Destination
                        </label>
                        <select
                          value={quickDestination}
                          onChange={(e) => setQuickDestination(e.target.value)}
                          className="w-full px-3 py-2 bg-[#F6F9FC] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
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
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Travel Date
                        </label>
                        <input
                          type="date"
                          value={quickDate}
                          onChange={(e) => setQuickDate(e.target.value)}
                          className="w-full px-3 py-2 bg-[#F6F9FC] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Number of Travellers
                      </label>
                      <select
                        value={quickTravellers}
                        onChange={(e) => setQuickTravellers(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F6F9FC] border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
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
                      className="w-full py-3 bg-[#0A2D6E] hover:bg-[#13469E] text-white font-semibold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-[#F3C853]" />
                      <span>Submit Enquiry on WhatsApp</span>
                    </button>

                    <p className="text-[11px] text-center text-slate-500">
                      Direct enquiry routed to +91 8670374242 · No spam guarantee
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REPUTATION & VALUE PROPOSITION STRIP */}
      <section className="bg-white border-y border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/40 text-[#0A2D6E]">
                <ShieldCheck className="w-5 h-5 text-[#E2A829]" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-[#0F1E3A]">Verified Local Agency</h4>
                <p className="text-[11px] text-slate-500">Salugara, Siliguri Head Office</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/40 text-[#0A2D6E]">
                <Car className="w-5 h-5 text-[#E2A829]" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-[#0F1E3A]">Private Taxi Fleet</h4>
                <p className="text-[11px] text-slate-500">Innova, Dzire, Bolero & Travellers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/40 text-[#0A2D6E]">
                <Hotel className="w-5 h-5 text-[#E2A829]" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-[#0F1E3A]">Handpicked Stays</h4>
                <p className="text-[11px] text-slate-500">Kanchenjunga View Hotels & Resorts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/40 text-[#0A2D6E]">
                <Phone className="w-5 h-5 text-[#E2A829]" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-[#0F1E3A]">24x7 Trip Support</h4>
                <p className="text-[11px] text-slate-500">On-ground assistance throughout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-[#E2A829] uppercase tracking-wider">
                Explore The Eastern Himalayas
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A2D6E] mt-1">
                Popular Destinations
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                From misty tea gardens in Darjeeling to holy alpine lakes in North Sikkim and the majestic fortress dzongs of Bhutan.
              </p>
            </div>
            <Link
              to="/destinations"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2D6E] hover:text-[#E2A829] transition-colors"
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A2D6E] hover:bg-[#13469E] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              <span>Explore All Destinations (Bhutan, Nepal, Meghalaya & Arunachal)</span>
              <ArrowRight className="w-4 h-4 text-[#F3C853]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3B. INTERACTIVE TOUR COVERAGE MAP */}
      <TourCoverageMap onOpenBooking={onOpenBooking} variant="home" />

      {/* 4. FEATURED TOUR PACKAGES */}
      <section className="py-16 bg-[#F6F9FC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#E2A829] uppercase tracking-wider">
              Curated Himalayan Experiences
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A2D6E] mt-1">
              Featured Tour Packages
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every package is fully customizable. Complete with sanitized private vehicle, scenic accommodation, permits, and Siliguri local support.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1 bg-[#F6F9FC] border border-slate-200 rounded-lg max-w-md mx-auto">
              <button
                onClick={() => setActivePackageTab("all")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activePackageTab === "all"
                    ? "bg-[#0A2D6E] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#0A2D6E]"
                }`}
              >
                All Packages
              </button>
              <button
                onClick={() => setActivePackageTab("sikkim")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activePackageTab === "sikkim"
                    ? "bg-[#0A2D6E] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#0A2D6E]"
                }`}
              >
                Sikkim Tours
              </button>
              <button
                onClick={() => setActivePackageTab("darjeeling")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activePackageTab === "darjeeling"
                    ? "bg-[#0A2D6E] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#0A2D6E]"
                }`}
              >
                Darjeeling Tours
              </button>
              <button
                onClick={() => setActivePackageTab("other")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activePackageTab === "other"
                    ? "bg-[#0A2D6E] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#0A2D6E]"
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F6F9FC] hover:bg-[#0A2D6E] hover:text-white border border-[#0A2D6E]/25 text-[#0A2D6E] text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              <span>View All 13+ Himalayan Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TAXI & CAR RENTAL FLEET SPOTLIGHT */}
      <section className="py-16 bg-himalayan-navy text-white border-y border-[#E2A829]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-[#F3C853] uppercase tracking-wider">
                Reliable Himalayan Transportation
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                Premium Taxi & Car Rental Services
              </h2>
              <p className="text-sm text-white/85 max-w-2xl leading-relaxed">
                Experience hassle-free pick-up and drops from Bagdogra Airport (IXB) and NJP Railway Station. Dedicated tourist-permitted vehicles with licensed mountain chauffeurs.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/taxi-services"
                className="py-3 px-5 bg-metallic-gold text-[#071F4D] font-bold text-xs sm:text-sm rounded-lg text-center transition-all shadow-md"
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
          <div className="mt-12 bg-white/8 border border-white/15 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-white/85">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#F3C853] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-0.5">
                  Bagdogra Airport (IXB) Pickups
                </strong>
                Direct transfers to Darjeeling, Gangtok, Kalimpong, Pelling, and Bhutan border.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Car className="w-4 h-4 text-[#F3C853] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-0.5">
                  NJP Railway Station Transfers
                </strong>
                Punctual greeting right at the station exit with luggage assistance.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#F3C853] shrink-0 mt-0.5" />
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
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#E2A829] uppercase tracking-wider">
              Local Excellence & Hospitality
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A2D6E] mt-1">
              Why Choose Aadhya Gorkha Travels?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Based at the foothills in Salugara, Siliguri, we serve as your direct gateway to Sikkim, Darjeeling, Bhutan, and the Northeast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-[#E2A829] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/45 flex items-center justify-center text-[#0A2D6E] mb-4">
                <Compass className="w-5 h-5 text-[#E2A829]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#0F1E3A] mb-2">
                Personalized Travel Planning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every holiday is tailored to your pacing, budget, family preferences, and desired mountain views.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-[#E2A829] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/45 flex items-center justify-center text-[#0A2D6E] mb-4">
                <Users className="w-5 h-5 text-[#E2A829]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#0F1E3A] mb-2">
                Experienced Local Travel Assistance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Native knowledge of mountain weather, road conditions, festivals, and authentic Himalayan cuisine.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-[#E2A829] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/45 flex items-center justify-center text-[#0A2D6E] mb-4">
                <Car className="w-5 h-5 text-[#E2A829]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#0F1E3A] mb-2">
                Comfortable Transportation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Well-maintained private fleet with trained hill chauffeurs committed to safety and comfort.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-[#E2A829] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/45 flex items-center justify-center text-[#0A2D6E] mb-4">
                <Sparkles className="w-5 h-5 text-[#E2A829]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#0F1E3A] mb-2">
                Customized Tour Packages
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From romantic honeymoons to adventurous North Sikkim road trips and Bhutan heritage circuits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-[#E2A829] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/45 flex items-center justify-center text-[#0A2D6E] mb-4">
                <ShieldCheck className="w-5 h-5 text-[#E2A829]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#0F1E3A] mb-2">
                Transparent Pricing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No hidden charges. Clear inclusions, driver allowances, toll fees, and permit details provided upfront.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-[#E2A829] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/45 flex items-center justify-center text-[#0A2D6E] mb-4">
                <Phone className="w-5 h-5 text-[#E2A829]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#0F1E3A] mb-2">
                Dedicated Customer Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                24x7 phone and WhatsApp coordination while you are on the road in Sikkim, Bengal, or Bhutan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-[#E2A829] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/45 flex items-center justify-center text-[#0A2D6E] mb-4">
                <MapPin className="w-5 h-5 text-[#E2A829]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#0F1E3A] mb-2">
                Convenient Airport Transfers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Punctual flight tracking and smooth pick-up at Bagdogra Airport and NJP Railway Station.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-[#E2A829] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/45 flex items-center justify-center text-[#0A2D6E] mb-4">
                <Award className="w-5 h-5 text-[#E2A829]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#0F1E3A] mb-2">
                Memorable Himalayan Experiences
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We craft journeys filled with golden sunrises, peaceful monasteries, and authentic local memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS CAROUSEL */}
      <ClientTestimonials />

      {/* 8. LIVE GOOGLE SEARCH GROUNDED TRAVEL ADVISORY */}
      <LiveTravelAdvisory />

      {/* 9. CALL TO ACTION STRIP */}
      <section className="bg-himalayan-navy text-white py-14 border-t border-[#E2A829]/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs font-bold text-[#F3C853] uppercase tracking-widest">
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
              className="px-6 py-3 bg-metallic-gold text-[#071F4D] font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all duration-200"
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
              className="px-5 py-3 bg-white/12 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F3C853]" />
              <span>Call Us Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
