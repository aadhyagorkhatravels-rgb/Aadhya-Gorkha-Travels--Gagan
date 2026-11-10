import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  MapPin,
  Check,
  X as CloseIcon,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  Car,
  Hotel,
  Compass,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Info,
} from "lucide-react";
import {
  TOUR_PACKAGES,
  getWhatsAppUrl,
  COMPANY_INFO,
  TourPackage,
} from "../data/travelData";
import { BookingPrefill } from "../components/QuickEnquiryModal";
import { PackageCard } from "../components/PackageCard";

interface PackageDetailPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find the package from data
  const pkg = TOUR_PACKAGES.find((p) => p.slug === slug) || TOUR_PACKAGES[0];

  // Day accordion state
  const [openDay, setOpenDay] = useState<number | null>(1);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // In-page enquiry form state
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formGuests, setFormGuests] = useState("2 Adults");
  const [formNotes, setFormNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleDay = (dayNum: number) => {
    setOpenDay(openDay === dayNum ? null : dayNum);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleInpageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      alert("Please enter your name and phone number");
      return;
    }

    const message = [
      `*Package Booking Enquiry - Aadhya Gorkha Travels*`,
      `*Package:* ${pkg.title} (${pkg.duration})`,
      `*Name:* ${formName}`,
      `*Phone:* ${formPhone}`,
      formEmail ? `*Email:* ${formEmail}` : null,
      formDate ? `*Approx Travel Date:* ${formDate}` : null,
      `*Guests:* ${formGuests}`,
      formNotes.trim() ? `*Remarks:* ${formNotes.trim()}` : null,
      `Please provide the day-wise itinerary and best price quote.`,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = getWhatsAppUrl(message);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsSuccess(true);
  };

  const directWhatsAppUrl = getWhatsAppUrl(
    `Hello Aadhya Gorkha Travels, I am interested in your tour package "${pkg.title}" (${pkg.duration}). Please share the itinerary and best price.`
  );

  // Related tour packages (same category or others, excluding current)
  const relatedPackages = TOUR_PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-20">
      {/* 1. Large Destination Banner Header */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] bg-[#123D32] flex items-end text-white overflow-hidden pb-12 pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src={pkg.bannerImage}
            alt={pkg.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#123D32] via-[#123D32]/70 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-white/70 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/packages" className="hover:text-white transition-colors">
              Tour Packages
            </Link>
            <span>/</span>
            <span className="text-[#D6A84F] font-semibold truncate max-w-[200px] sm:max-w-none">
              {pkg.title}
            </span>
          </div>

          <div className="max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#D6A84F] tracking-wider uppercase">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#D6A84F]" />
                {pkg.duration}
              </span>
              <span aria-hidden="true">·</span>
              <span>{pkg.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-white/80">Pickup & Drop: {pkg.pickupDrop}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {pkg.title}
            </h1>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
              {pkg.shortDescription}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                onClick={() =>
                  onOpenBooking({
                    title: pkg.title,
                    destination: pkg.destinationsCovered[0],
                    type: "package",
                    packageId: pkg.id,
                  })
                }
                className="px-5 py-2.5 bg-[#D6A84F] hover:bg-[#c49740] text-[#123D32] font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-colors"
              >
                Get Best Price Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Sidebar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Itinerary, Places Covered, Stays, Inclusions, FAQ */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123D32] mb-3">
                Package Overview
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {pkg.overview}
              </p>

              {/* Destinations Tag Strip */}
              <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                  Destinations Covered:
                </span>
                <span className="text-xs font-medium text-neutral-800">
                  {pkg.destinationsCovered.join(" · ")}
                </span>
              </div>
            </div>

            {/* Day-Wise Detailed Itinerary */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider block">
                    Step-by-step
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123D32]">
                    Day-Wise Detailed Itinerary
                  </h2>
                </div>
                <button
                  onClick={() => setOpenDay(openDay === null ? 1 : null)}
                  className="text-xs text-[#123D32] hover:text-[#D6A84F] font-semibold"
                >
                  {openDay === null ? "Expand All" : "Collapse"}
                </button>
              </div>

              <div className="space-y-4">
                {pkg.itinerary.map((day) => {
                  const isOpen = openDay === day.day || openDay === null;
                  return (
                    <div
                      key={day.day}
                      className="border border-neutral-200 rounded-lg overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleDay(day.day)}
                        className="w-full text-left p-4 bg-neutral-50 hover:bg-[#FAF8F2] flex items-center justify-between gap-4 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-md bg-[#123D32] text-white font-serif font-bold text-xs flex items-center justify-center shrink-0">
                            D{day.day}
                          </span>
                          <span className="font-semibold text-sm text-neutral-900 leading-tight">
                            {day.title}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-5 bg-white space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed border-t border-neutral-200">
                          <p>{day.description}</p>
                          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-neutral-500">
                            <span className="flex items-center gap-1 font-medium text-neutral-700">
                              Meals: <span className="text-[#123D32] font-normal">{day.meal}</span>
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1 font-medium text-neutral-700">
                              Overnight Stay: <span className="text-[#123D32] font-normal">{day.stay}</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Places Covered List */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123D32] mb-4">
                Key Places & Sightseeing Points Covered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-800">
                {pkg.placesCovered.map((place, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF8F2] border border-neutral-200/60">
                    <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0" />
                    <span className="font-medium">{place}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation & Transportation Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 text-[#123D32] mb-3">
                  <Hotel className="w-5 h-5 text-[#D6A84F]" />
                  <h3 className="font-serif font-bold text-base text-neutral-900">
                    Hotel Accommodation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3">
                  {pkg.accommodation}
                </p>
                <div className="text-xs text-neutral-500">
                  Options for Standard, Deluxe 3-Star, and Luxury 4-Star boutique stays available with mountain views.
                </div>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 text-[#123D32] mb-3">
                  <Car className="w-5 h-5 text-[#D6A84F]" />
                  <h3 className="font-serif font-bold text-base text-neutral-900">
                    Transportation Details
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3">
                  {pkg.transportation}
                </p>
                <div className="text-xs text-neutral-500">
                  Dedicated private vehicle with fuel, driver allowance, tolls, and inter-state permits fully covered.
                </div>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123D32] mb-6">
                Package Inclusions & Exclusions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div className="space-y-3">
                  <div className="text-sm font-bold text-emerald-800 flex items-center gap-1.5 pb-2 border-b border-emerald-100">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>What is Included</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-neutral-700">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="space-y-3">
                  <div className="text-sm font-bold text-red-800 flex items-center gap-1.5 pb-2 border-b border-red-100">
                    <CloseIcon className="w-4 h-4 text-red-500" />
                    <span>What is Excluded</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-neutral-700">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Important Travel Information */}
            <div className="bg-[#FAF8F2] border border-[#D6A84F]/40 rounded-xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-[#D6A84F]" />
                <h3 className="font-serif font-bold text-lg text-[#123D32]">
                  Important Travel Information & Documents
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                {pkg.travelInfo.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#D6A84F] font-bold">·</span>
                    <span>{info}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="text-[#D6A84F] font-bold">·</span>
                  <span>
                    Border permits for Tsomgo Lake / Nathula Pass / North Sikkim require original Voter ID card or Passport + 4 passport-size photographs per person.
                  </span>
                </li>
              </ul>
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-[#D6A84F]" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123D32]">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {pkg.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border border-neutral-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 bg-neutral-50 hover:bg-[#FAF8F2] flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-neutral-900 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white text-xs sm:text-sm text-neutral-700 leading-relaxed border-t border-neutral-200">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Enquiry Form */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white border border-[#D6A84F]/40 rounded-xl p-6 shadow-xl">
              <div className="mb-4 pb-3 border-b border-neutral-100">
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                  Customized Package Quote
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <h3 className="font-serif text-2xl font-bold text-[#123D32]">
                    Get Best Price
                  </h3>
                  <span className="text-xs text-[#D6A84F] font-semibold">
                    {pkg.duration}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Private vehicle, hotel stays, permits & all transfers included.
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#123D32]">
                    Enquiry Sent on WhatsApp!
                  </h4>
                  <p className="text-xs text-neutral-600">
                    Our Siliguri travel team will respond with your personalized quote shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs text-[#123D32] underline pt-2"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInpageSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Deepak Roy"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Travellers
                      </label>
                      <select
                        value={formGuests}
                        onChange={(e) => setFormGuests(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                      >
                        <option value="2 Adults (Couple)">2 Adults</option>
                        <option value="3-4 Adults (Family)">3-4 Adults</option>
                        <option value="5-7 Adults (Group)">5-7 Adults</option>
                        <option value="8+ Adults (Large Group)">8+ Adults</option>
                        <option value="Solo Traveler">1 Solo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Notes / Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder="e.g. Prefer Innova Crysta, Kanchenjunga view room..."
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-md shadow transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Enquiry on WhatsApp</span>
                  </button>

                  <a
                    href="tel:+918670374242"
                    className="w-full py-2 bg-[#123D32] hover:bg-[#245B49] text-white font-semibold text-xs sm:text-sm rounded-md shadow transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Call Desk: +91 8670374242</span>
                  </a>
                </form>
              )}

              <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free cancellation up to 7 days before trip</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Guaranteed private sanitized vehicle</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>On-ground coordination in Siliguri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Related Tour Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-neutral-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
              More Itineraries
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#123D32] mt-1">
              Related Tour Packages
            </h2>
          </div>
          <Link
            to="/packages"
            className="text-xs sm:text-sm font-semibold text-[#123D32] hover:text-[#D6A84F] flex items-center gap-1"
          >
            <span>All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPackages.map((relPkg) => (
            <PackageCard
              key={relPkg.id}
              pkg={relPkg}
              onEnquire={(p) =>
                onOpenBooking({
                  title: p.title,
                  destination: p.destinationsCovered[0],
                  type: "package",
                  packageId: p.id,
                })
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};
