import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  Eye,
  CheckCircle2,
  Car,
  Hotel,
  Mountain,
  Users,
  MessageCircle,
} from "lucide-react";
import { COMPANY_INFO, getWhatsAppUrl } from "../data/travelData";
import { BookingPrefill } from "../components/QuickEnquiryModal";

interface AboutPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-[#123D32] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D6A84F]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg"
            alt="Darjeeling Hills"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-widest">
            Aadhya Gorkha Travels · Siliguri, West Bengal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Your Trusted Travel Partner for Exploring the Himalayas
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Headquartered at the strategic gateway of Siliguri, we craft authentic, comfortable, and memorable journeys across Sikkim, Darjeeling, Bhutan, Nepal, and Northeast India.
          </p>
        </div>
      </section>

      {/* Main Story & Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider block">
              About Our Company
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#123D32] leading-tight">
              Rooted in the Foothills, Dedicated to the Heights
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              <strong>Aadhya Gorkha Travels</strong> was established with a clear objective: to offer travelers genuine, transparent, and seamless holiday and transport services throughout the Eastern Himalayan belt.
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Operating out of Salugara in Siliguri—the true crossroads where railways, airways (Bagdogra), and mountain highways converge—our team provides dedicated local assistance at every leg of your travel. Whether you need an early morning pickup from NJP Railway Station, permits for high-altitude Gurudongmar Lake, or a peaceful tea garden stay in Darjeeling, we ensure you travel with complete peace of mind.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-medium text-neutral-800">
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated Local Travel Experts</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Private Sanitized Vehicles</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent Upfront Pricing</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full Permit Coordination</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200">
              <img
                src="/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg"
                alt="Himalayan Majesty"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs text-[#D6A84F] font-bold uppercase tracking-wider block">
                  Our Himalayan Heritage
                </span>
                <p className="font-serif text-lg font-semibold drop-shadow-sm mt-1">
                  "Every mountain path has a story, and every traveler deserves to experience it with comfort and respect."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Travel Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-xs hover:border-[#D6A84F] transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-5">
              <Heart className="w-6 h-6 text-[#D6A84F]" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#123D32] mb-3">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              To deliver dependable, safe, and deeply enriching travel experiences across the Himalayas by combining genuine local hospitality, well-maintained vehicles, and ethical travel practices.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-xs hover:border-[#D6A84F] transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-5">
              <Eye className="w-6 h-6 text-[#D6A84F]" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#123D32] mb-3">
              Our Vision
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              To be the most trusted and hospitable travel partner in Eastern India, celebrated for personalized mountain itineraries, honest guidance, and seamless customer care.
            </p>
          </div>

          {/* Philosophy */}
          <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-xs hover:border-[#D6A84F] transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#FAF8F2] border border-[#D6A84F]/40 flex items-center justify-center text-[#123D32] mb-5">
              <Compass className="w-6 h-6 text-[#D6A84F]" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#123D32] mb-3">
              Travel Philosophy
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We treat every traveler not as a booking, but as our personal mountain guest. We prioritize unhurried sightseeing, comfortable rest stops, and authentic cultural encounters.
            </p>
          </div>
        </div>
      </section>

      {/* Services Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#123D32] text-white rounded-2xl p-8 sm:p-12 border border-[#D6A84F]/30">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider block">
              Comprehensive Travel Portfolio
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              What We Offer at Aadhya Gorkha Travels
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-2">
              From our operational base in Siliguri, we coordinate all facets of your journey:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <Mountain className="w-5 h-5 text-[#D6A84F]" />
              <h4 className="font-serif font-bold text-sm text-white">
                Sikkim & Darjeeling Tour Packages
              </h4>
              <p className="text-xs text-white/70">
                Curated itineraries for couples, families, and leisure seekers covering Tiger Hill, Tsomgo Lake, and Yumthang.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <Car className="w-5 h-5 text-[#D6A84F]" />
              <h4 className="font-serif font-bold text-sm text-white">
                Airport & Railway Station Taxi Transfers
              </h4>
              <p className="text-xs text-white/70">
                Punctual, sanitized pickup and drop services from Bagdogra Airport (IXB) and NJP Railway Station.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <Compass className="w-5 h-5 text-[#D6A84F]" />
              <h4 className="font-serif font-bold text-sm text-white">
                Bhutan & Nepal Cross-Border Tours
              </h4>
              <p className="text-xs text-white/70">
                Complete immigration and road transit packages starting seamlessly from Siliguri / border crossings.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <Hotel className="w-5 h-5 text-[#D6A84F]" />
              <h4 className="font-serif font-bold text-sm text-white">
                Hotel & Mountain Resort Bookings
              </h4>
              <p className="text-xs text-white/70">
                Handpicked boutique properties, luxury hotels with Kanchenjunga views, and traditional mountain homestays.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <Users className="w-5 h-5 text-[#D6A84F]" />
              <h4 className="font-serif font-bold text-sm text-white">
                Custom Family & Honeymoon Vacations
              </h4>
              <p className="text-xs text-white/70">
                Thoughtfully paced itineraries with room decorations, special candlelight dinners, and flexible timing.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <ShieldCheck className="w-5 h-5 text-[#D6A84F]" />
              <h4 className="font-serif font-bold text-sm text-white">
                North Sikkim Permits & High-Altitude Fleets
              </h4>
              <p className="text-xs text-white/70">
                Official permit processing for restricted regions like Gurudongmar Lake, Zero Point, and Nathula Pass.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Company Office Information Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider block">
                Official Head Office
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#123D32]">
                AADHYA GORKHA TRAVELS
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                  <span>
                    Ward No. 42 of SMC, Jila Parishad Road, East, Salugara, Siliguri, West Bengal – 734008, India.
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <span>+91 8670374242 / +91 8899505665</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-[#123D32] hover:bg-[#245B49] text-white text-xs font-semibold rounded-md transition-colors"
                >
                  Visit Contact Page & Map
                </Link>
                <a
                  href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I would like to connect with your office.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-neutral-200">
              <img
                src="/src/assets/images/sikkim_glacier_lake_1794309511944.jpg"
                alt="Pristine mountain nature"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
