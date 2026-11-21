import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
  ShieldCheck,
  Car,
  Hotel,
  Compass,
  ArrowRight,
  HelpCircle,
  Info,
  Folder,
} from "lucide-react";
import {
  TOUR_PACKAGES,
  getWhatsAppUrl,
  COMPANY_INFO,
} from "../data/travelData";
import { BookingPrefill } from "../components/QuickEnquiryModal";
import { PackageCard } from "../components/PackageCard";

interface PackageDetailPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();

  const pkg = TOUR_PACKAGES.find((p) => p.slug === slug);

  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formGuests, setFormGuests] = useState("2 Adults");
  const [formNotes, setFormNotes] = useState("");
  const [formError, setFormError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const toggleAllDays = () => {
    if (!pkg) return;
    if (expandedDays.length === pkg.itinerary.length) {
      setExpandedDays([]);
    } else {
      setExpandedDays(pkg.itinerary.map((d) => d.day));
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleInpageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg) return;
    if (!formName.trim() || !formPhone.trim()) {
      setFormError("Please enter your name and contact phone number");
      return;
    }
    setFormError("");

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

    setLastMessage(message);
    const waUrl = getWhatsAppUrl(message);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsSuccess(true);
  };

  useEffect(() => {
    if (pkg) {
      const originalTitle = document.title;
      document.title = `${pkg.title} (${pkg.duration}) | Aadhya Gorkha Travels Siliguri`;

      const metaDesc = document.querySelector('meta[name="description"]');
      const originalDesc = metaDesc ? metaDesc.getAttribute("content") : null;
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          `${pkg.title} - ${pkg.duration}. Covered: ${pkg.destinationsCovered.join(", ")}. ${pkg.overview.slice(0, 110)}... Book with Aadhya Gorkha Travels.`
        );
      }

      return () => {
        document.title = originalTitle;
        if (metaDesc && originalDesc) {
          metaDesc.setAttribute("content", originalDesc);
        }
      };
    }
  }, [pkg]);

  if (!pkg) {
    return (
      <div className="w-full bg-[#F6F9FC] min-h-screen py-24 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-md space-y-4">
          <Compass className="w-12 h-12 text-[#0A2D6E] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#0A2D6E]">
            Package Not Found
          </h2>
          <p className="text-xs text-slate-600">
            The tour package you requested may have been relocated or updated in our catalog.
          </p>
          <Link
            to="/packages"
            className="inline-block py-2.5 px-5 bg-[#0A2D6E] hover:bg-[#13469E] text-white font-semibold text-xs rounded-md"
          >
            Browse All Tour Packages
          </Link>
        </div>
      </div>
    );
  }

  const directWhatsAppUrl = getWhatsAppUrl(
    `Hello Aadhya Gorkha Travels, I am interested in your tour package "${pkg.title}" (${pkg.duration}). Please share the itinerary and best price.`
  );

  const relatedPackages = TOUR_PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pkg.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const touristTripStructuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": pkg.title,
    "description": pkg.overview,
    "touristType": ["Family", "Honeymoon", "Adventure", "Group"],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "0",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceCurrency": "INR",
        "name": "Customized Package Tariff (Get Best Price)",
      },
      "availability": "https://schema.org/InStock",
      "url": `https://aadhyagorkhatravels.com/packages/${pkg.slug}`,
    },
    "itinerary": {
      "@type": "ItemList",
      "numberOfItems": pkg.itinerary.length,
      "itemListElement": pkg.itinerary.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": `Day ${item.day}: ${item.title}`,
        "description": item.description,
      })),
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Aadhya Gorkha Travels",
      "telephone": "+91-8670374242",
      "email": "hello@aadhyagorkhatravels.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ward No. 42 of SMC, Jila Parishad Road, East, Salugara",
        "addressLocality": "Siliguri",
        "addressRegion": "West Bengal",
        "postalCode": "734008",
        "addressCountry": "IN",
      },
    },
  };

  return (
    <div className="w-full bg-[#F6F9FC] min-h-screen pb-20">
      {/* Schema.org JSON-LD FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {/* Schema.org JSON-LD TouristTrip Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripStructuredData) }}
      />

      {/* 1. Large Destination Banner Header */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] bg-[#071F4D] flex items-end text-white overflow-hidden pb-12 pt-16">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#071F4D] via-[#0A2D6E]/75 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-white/75 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/packages" className="hover:text-white transition-colors">
              Tour Packages
            </Link>
            <span>/</span>
            <span className="text-[#F3C853] font-semibold truncate max-w-[200px] sm:max-w-none">
              {pkg.title}
            </span>
          </div>

          <div className="max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#F3C853] tracking-wider uppercase">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#F3C853]" />
                {pkg.duration}
              </span>
              <span aria-hidden="true">·</span>
              <span>{pkg.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-white/85">Pickup & Drop: {pkg.pickupDrop}</span>
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
                className="px-5 py-2.5 bg-metallic-gold text-[#071F4D] font-bold text-xs sm:text-sm rounded-lg shadow-md transition-colors"
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
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A2D6E] mb-3">
                Package Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {pkg.overview}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E2A829]" />
                  Destinations Covered:
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {pkg.destinationsCovered.join(" · ")}
                </span>
              </div>
            </div>

            {/* Day-Wise Detailed Itinerary */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold text-[#E2A829] uppercase tracking-wider block">
                    Step-by-step
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A2D6E]">
                    Day-Wise Detailed Itinerary
                  </h2>
                </div>
                <button
                  onClick={toggleAllDays}
                  className="text-xs text-[#0A2D6E] hover:text-[#E2A829] font-semibold"
                >
                  {expandedDays.length === pkg.itinerary.length ? "Collapse All" : "Expand All"}
                </button>
              </div>

              <div className="space-y-4">
                {pkg.itinerary.map((day) => {
                  const isOpen = expandedDays.includes(day.day);
                  return (
                    <div
                      key={day.day}
                      className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleDay(day.day)}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-[#F6F9FC] flex items-center justify-between gap-4 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-md bg-[#0A2D6E] text-[#F3C853] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                            D{day.day}
                          </span>
                          <span className="font-semibold text-sm text-[#0F1E3A] leading-tight">
                            {day.title}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-5 bg-white space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200">
                          <p>{day.description}</p>
                          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
                            <span className="flex items-center gap-1 font-medium text-slate-700">
                              Meals: <span className="text-[#0A2D6E] font-normal">{day.meal}</span>
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1 font-medium text-slate-700">
                              Overnight Stay: <span className="text-[#0A2D6E] font-normal">{day.stay}</span>
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
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A2D6E] mb-4">
                Key Places & Sightseeing Points Covered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                {pkg.placesCovered.map((place, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F6F9FC] border border-slate-200/80">
                    <MapPin className="w-4 h-4 text-[#E2A829] shrink-0" />
                    <span className="font-medium">{place}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation & Transportation Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 text-[#0A2D6E] mb-3">
                  <Hotel className="w-5 h-5 text-[#E2A829]" />
                  <h3 className="font-serif font-bold text-base text-[#0F1E3A]">
                    Hotel Accommodation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  {pkg.accommodation}
                </p>
                <div className="text-xs text-slate-500">
                  Options for Standard, Deluxe 3-Star, and Luxury 4-Star boutique stays available with mountain views.
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 text-[#0A2D6E] mb-3">
                  <Car className="w-5 h-5 text-[#E2A829]" />
                  <h3 className="font-serif font-bold text-base text-[#0F1E3A]">
                    Transportation Details
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  {pkg.transportation}
                </p>
                <div className="text-xs text-slate-500">
                  Dedicated private vehicle with fuel, driver allowance, tolls, and inter-state permits fully covered.
                </div>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A2D6E] mb-6">
                Package Inclusions & Exclusions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="text-sm font-bold text-emerald-800 flex items-center gap-1.5 pb-2 border-b border-emerald-100">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>What is Included</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-bold text-red-800 flex items-center gap-1.5 pb-2 border-b border-red-100">
                    <CloseIcon className="w-4 h-4 text-red-500" />
                    <span>What is Excluded</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
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
            <div className="bg-white border border-[#E2A829]/45 rounded-xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-[#E2A829]" />
                <h3 className="font-serif font-bold text-lg text-[#0A2D6E]">
                  Important Travel Information & Documents
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {pkg.travelInfo.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#E2A829] font-bold">·</span>
                    <span>{info}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="text-[#E2A829] font-bold">·</span>
                  <span>
                    Border permits for Tsomgo Lake / Nathula Pass / North Sikkim require original Voter ID card or Passport + 4 passport-size photographs per person.
                  </span>
                </li>
              </ul>
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-[#E2A829]" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A2D6E]">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {pkg.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-[#F6F9FC] flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-[#0F1E3A] transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200">
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
            <div className="bg-white border border-[#E2A829]/45 rounded-xl p-6 shadow-xl">
              <div className="mb-4 pb-3 border-b border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Customized Package Quote
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <h3 className="font-serif text-2xl font-bold text-[#0A2D6E]">
                    Get Best Price
                  </h3>
                  <span className="text-xs text-[#E2A829] font-semibold">
                    {pkg.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Private vehicle, hotel stays, permits & all transfers included.
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#0A2D6E]">
                    Enquiry Formatted!
                  </h4>
                  <p className="text-xs text-slate-600">
                    If WhatsApp did not launch automatically, click below:
                  </p>
                  <div className="flex flex-col gap-2 pt-1">
                    <a
                      href={getWhatsAppUrl(lastMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send on WhatsApp (+91 8670374242)</span>
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Tour Package Enquiry: ${pkg.title}`)}&body=${encodeURIComponent(lastMessage)}`}
                      className="w-full py-2 px-3 bg-[#F6F9FC] border border-slate-300 hover:bg-slate-100 text-[#0A2D6E] rounded-md text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#E2A829]" />
                      <span>Send via Email</span>
                    </a>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs text-[#0A2D6E] underline pt-2 block mx-auto"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInpageSubmit} className="space-y-3.5">
                  {formError && (
                    <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                      {formError}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Deepak Roy"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Travellers
                      </label>
                      <select
                        value={formGuests}
                        onChange={(e) => setFormGuests(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Notes / Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder="e.g. Prefer Innova Crysta, Kanchenjunga view room..."
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
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
                    className="w-full py-2 bg-[#0A2D6E] hover:bg-[#13469E] text-white font-semibold text-xs sm:text-sm rounded-md shadow transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F3C853]" />
                    <span>Call Desk: +91 8670374242</span>
                  </a>

                  <Link
                    to="/drive-docs"
                    className="w-full py-2 bg-[#F6F9FC] hover:bg-slate-100 border border-slate-300 text-[#0A2D6E] font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Folder className="w-3.5 h-3.5 text-[#E2A829]" />
                    <span>Upload Permits to Google Drive</span>
                  </Link>
                </form>
              )}

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#13469E] shrink-0" />
                  <span>Free cancellation up to 7 days before trip</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#13469E] shrink-0" />
                  <span>Guaranteed private sanitized vehicle</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#13469E] shrink-0" />
                  <span>On-ground coordination in Siliguri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Related Tour Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#E2A829] uppercase tracking-wider">
              More Itineraries
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#0A2D6E] mt-1">
              Related Tour Packages
            </h2>
          </div>
          <Link
            to="/packages"
            className="text-xs sm:text-sm font-semibold text-[#0A2D6E] hover:text-[#E2A829] flex items-center gap-1"
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
