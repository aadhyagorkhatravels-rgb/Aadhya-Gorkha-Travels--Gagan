import React, { useState } from "react";
import {
  Car,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  MessageCircle,
  Phone,
  Check,
  Clock,
  ArrowRight,
  Plane,
  Train,
  CheckCircle2,
} from "lucide-react";
import {
  VEHICLES,
  POPULAR_TAXI_ROUTES,
  COMPANY_INFO,
  getWhatsAppUrl,
  Vehicle,
} from "../data/travelData";
import { VehicleCard } from "../components/VehicleCard";
import { BookingPrefill } from "../components/QuickEnquiryModal";

interface TaxiServicesPageProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
}

export const TaxiServicesPage: React.FC<TaxiServicesPageProps> = ({ onOpenBooking }) => {
  // Dedicated Taxi Booking Form State
  const [pickupLoc, setPickupLoc] = useState("Bagdogra Airport (IXB)");
  const [dropLoc, setDropLoc] = useState("Darjeeling");
  const [journeyDate, setJourneyDate] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("Toyota Innova Crysta");
  const [passengerCount, setPassengerCount] = useState("4 Passengers");
  const [tripType, setTripType] = useState("One Way Drop");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleTaxiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert("Please provide your name and contact phone number");
      return;
    }

    const message = [
      `*Taxi & Car Rental Booking - Aadhya Gorkha Travels*`,
      `------------------------------------------`,
      `*Name:* ${userName.trim()}`,
      `*Phone:* ${userPhone.trim()}`,
      `*Pickup Location:* ${pickupLoc}`,
      `*Drop Destination:* ${dropLoc}`,
      `*Trip Type:* ${tripType}`,
      `*Vehicle Preference:* ${selectedVehicle}`,
      `*Travel Date:* ${journeyDate || "Flexible"}`,
      `*Passengers:* ${passengerCount}`,
      specialNote.trim() ? `*Special Request:* ${specialNote.trim()}` : null,
      `------------------------------------------`,
      `Please provide the best fare quote and vehicle confirmation.`,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = getWhatsAppUrl(message);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-[#123D32] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D6A84F]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/images/himalayan_taxi_suv_1794309511238.jpg"
            alt="Himalayan Taxi SUV"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-widest">
            Aadhya Gorkha Travels · Siliguri Fleet
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Himalayan Taxi & Car Rental Services
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Reliable airport and railway station transfers, Darjeeling and Gangtok sightseeing, North Sikkim high-altitude 4WD safaris, and custom outstation private hires.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#book-taxi"
              className="px-5 py-2.5 bg-[#D6A84F] hover:bg-[#c49740] text-[#123D32] font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-colors"
            >
              Book Taxi Online
            </a>
            <a
              href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I need a taxi quotation for our Sikkim / Darjeeling tour.")}
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

      {/* Trust & Airport Hub Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FAF8F2] border border-[#D6A84F]/30 rounded-lg text-[#123D32] shrink-0">
              <Plane className="w-6 h-6 text-[#D6A84F]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-neutral-900">
                Bagdogra Airport (IXB) Hub
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Punctual flight tracking and terminal pickup with zero waiting charges for delayed flights.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FAF8F2] border border-[#D6A84F]/30 rounded-lg text-[#123D32] shrink-0">
              <Train className="w-6 h-6 text-[#D6A84F]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-neutral-900">
                NJP Railway Station Transfers
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Direct greeting outside the main station gate with luggage assistance to your hotel door.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FAF8F2] border border-[#D6A84F]/30 rounded-lg text-[#123D32] shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#D6A84F]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-neutral-900">
                Mountain-Experienced Drivers
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Trained hill drivers licensed for Sikkim hairpin bends, fog, steep ascents, and high-altitude permits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Vehicle Fleet Listing (8 Vehicles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
            Verified Fleet Categories
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#123D32] mt-1">
            Choose Your Vehicle
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            From budget-friendly city sedans to rugged luxury Innova Crystas and Force Tempo Travellers for large family circles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VEHICLES.map((vehicle) => (
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
      </section>

      {/* Popular Taxi Routes & Travel Times Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider block">
              Popular Mountain Routes
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123D32]">
              Route Distances & Travel Time Estimator
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Exact travel times can vary according to seasonal mountain road conditions and traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {POPULAR_TAXI_ROUTES.map((route) => (
              <div
                key={route.id}
                className="p-4 rounded-lg bg-[#FAF8F2] border border-neutral-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] text-[#D6A84F] font-bold uppercase tracking-wider">
                    {route.routeType}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#123D32] mt-1">
                    {route.from} → {route.to}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-snug">
                    {route.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span>Dist: {route.distance}</span>
                  <span className="text-[#123D32] font-semibold">{route.estimatedTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Taxi Booking Form */}
      <section id="book-taxi" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white border border-[#D6A84F]/40 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="text-center max-w-lg mx-auto mb-6">
            <span className="text-xs font-bold text-[#123D32] uppercase tracking-wider">
              Instant Dispatch System
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#123D32] mt-1">
              Book Your Taxi or Airport Transfer
            </h2>
            <p className="text-xs text-neutral-600 mt-1">
              Fill the details below to receive fixed transparent pricing directly on WhatsApp.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#123D32]">
                Taxi Request Dispatched!
              </h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                WhatsApp has been launched with your exact travel specifications. Our dispatch manager will confirm driver and vehicle allocation.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#123D32] underline pt-2"
              >
                Book another transfer
              </button>
            </div>
          ) : (
            <form onSubmit={handleTaxiSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Alok Verma"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    WhatsApp / Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Pickup Location
                  </label>
                  <select
                    value={pickupLoc}
                    onChange={(e) => setPickupLoc(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                  >
                    <option value="Bagdogra Airport (IXB)">Bagdogra Airport (IXB)</option>
                    <option value="NJP Railway Station">NJP Railway Station</option>
                    <option value="Siliguri Town / Salugara">Siliguri Town / Salugara</option>
                    <option value="Darjeeling Town">Darjeeling Town</option>
                    <option value="Gangtok Hotel">Gangtok Hotel</option>
                    <option value="Kalimpong">Kalimpong</option>
                    <option value="Pelling">Pelling</option>
                    <option value="Custom Location">Other Location</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Drop Destination
                  </label>
                  <select
                    value={dropLoc}
                    onChange={(e) => setDropLoc(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                  >
                    <option value="Darjeeling">Darjeeling</option>
                    <option value="Gangtok (East Sikkim)">Gangtok</option>
                    <option value="Kalimpong">Kalimpong</option>
                    <option value="Pelling (West Sikkim)">Pelling</option>
                    <option value="North Sikkim (Lachen / Lachung)">North Sikkim</option>
                    <option value="Bagdogra Airport (IXB)">Bagdogra Airport (IXB)</option>
                    <option value="NJP Railway Station">NJP Railway Station</option>
                    <option value="Phuentsholing (Bhutan Border)">Phuentsholing (Bhutan Border)</option>
                    <option value="Kakarbhitta (Nepal Border)">Kakarbhitta (Nepal Border)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Trip Type
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                  >
                    <option value="One Way Drop">One-Way Transfer</option>
                    <option value="Round Trip">Round Trip (Same Day)</option>
                    <option value="Full Day Sightseeing">Full Day Sightseeing</option>
                    <option value="Multi-day Complete Tour">Multi-day Dedicated Vehicle</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Preferred Vehicle
                  </label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.capacity})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Passenger Count
                  </label>
                  <select
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                  >
                    <option value="1 to 2 Passengers">1 to 2 Passengers</option>
                    <option value="3 to 4 Passengers">3 to 4 Passengers</option>
                    <option value="5 to 6 Passengers">5 to 6 Passengers</option>
                    <option value="7 to 8 Passengers">7 to 8 Passengers</option>
                    <option value="9+ Passengers (Group)">9+ Passengers (Group)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Flight / Train Number or Special Request (Optional)
                </label>
                <input
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. Flight 6E-204 arriving at 12:30 PM, need child seat..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F2] border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123D32]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get Fare Quote on WhatsApp (+91 8670374242)</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-neutral-500">
                Direct allocation from our Siliguri fleet desk · Transparent billing with no hidden tolls
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
