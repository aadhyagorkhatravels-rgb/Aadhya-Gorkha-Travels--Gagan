import React, { useState, useEffect } from "react";
import { X, MessageCircle, Mail, CheckCircle2, Phone, Calendar, User, Users, MapPin } from "lucide-react";
import { COMPANY_INFO, getWhatsAppUrl, DESTINATIONS } from "../data/travelData";

export interface BookingPrefill {
  title?: string;
  destination?: string;
  type?: "package" | "taxi" | "hotel" | "custom" | "general";
  packageId?: string;
  vehicleName?: string;
  hotelName?: string;
}

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: BookingPrefill | null;
}

export const QuickEnquiryModal: React.FC<QuickEnquiryModalProps> = ({
  isOpen,
  onClose,
  prefill,
}) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [destination, setDestination] = useState("Darjeeling");
  const [travelDate, setTravelDate] = useState("");
  const [numberOfTravellers, setNumberOfTravellers] = useState("2 Adults");
  const [enquiryType, setEnquiryType] = useState<string>("Tour Package");
  const [remarks, setRemarks] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [lastGeneratedMessage, setLastGeneratedMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefill) {
      if (prefill.title) setRemarks(`Enquiry regarding: ${prefill.title}`);
      if (prefill.destination) setDestination(prefill.destination);
      if (prefill.type === "taxi") {
        setEnquiryType("Taxi / Car Rental");
        if (prefill.vehicleName) setRemarks(`Taxi Vehicle Requested: ${prefill.vehicleName}`);
      } else if (prefill.type === "hotel") {
        setEnquiryType("Hotel / Resort Booking");
        if (prefill.hotelName) setRemarks(`Accommodation: ${prefill.hotelName}`);
      } else if (prefill.type === "package") {
        setEnquiryType("Tour Package");
      }
    }
    setSubmitted(false);
    setErrors({});
  }, [prefill, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name";
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter your phone / WhatsApp number";
    } else if (phoneNumber.trim().length < 8) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!emailAddress.trim()) {
      newErrors.emailAddress = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }
    if (!travelDate.trim()) {
      newErrors.travelDate = "Please choose a tentative travel date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const constructFormattedMessage = (): string => {
    return [
      `*New Travel Enquiry - Aadhya Gorkha Travels*`,
      `---------------------------------------`,
      `*Name:* ${fullName.trim()}`,
      `*Phone:* ${phoneNumber.trim()}`,
      `*Email:* ${emailAddress.trim()}`,
      `*Type:* ${enquiryType}`,
      `*Destination:* ${destination}`,
      `*Tentative Travel Date:* ${travelDate}`,
      `*Travellers:* ${numberOfTravellers}`,
      remarks.trim() ? `*Additional Notes:* ${remarks.trim()}` : null,
      `---------------------------------------`,
      `Please provide the detailed itinerary and best price quote. Thank you!`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedMessage = constructFormattedMessage();
    setLastGeneratedMessage(formattedMessage);
    setSubmitted(true);

    const waUrl = getWhatsAppUrl(formattedMessage);
    // Open WhatsApp directly
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleEmailSubmit = () => {
    if (!validate()) return;
    const formattedMessage = constructFormattedMessage();
    const mailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
      `Travel Enquiry from ${fullName}: ${enquiryType} - ${destination}`
    )}&body=${encodeURIComponent(formattedMessage)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FAF8F2] border border-[#D6A84F]/40 rounded-xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#123D32] px-6 py-4 text-white flex items-center justify-between border-b border-[#D6A84F]/30">
          <div>
            <span className="text-[10px] tracking-wider font-semibold text-[#D6A84F] uppercase">
              Aadhya Gorkha Travels · Siliguri
            </span>
            <h3 className="font-serif text-lg font-semibold text-white">
              {prefill?.title ? prefill.title : "Plan Your Himalayan Journey"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#123D32]">
                Enquiry Details Prepared!
              </h4>
              <p className="text-sm text-neutral-700 max-w-sm mx-auto leading-relaxed">
                Your enquiry has been formatted for instant dispatch to our Siliguri travel team.
                If WhatsApp did not open automatically, you can click below:
              </p>

              <div className="flex flex-col gap-2 pt-2 max-w-xs mx-auto">
                <a
                  href={getWhatsAppUrl(lastGeneratedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 8670374242)</span>
                </a>

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="w-full py-2.5 px-4 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-medium rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#D6A84F]" />
                  <span>Send via Email ({COMPANY_INFO.email})</span>
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-500">
                Need urgent assistance? Call us directly at{" "}
                <a href="tel:+918670374242" className="text-[#123D32] font-semibold underline">
                  +91 8670374242
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-neutral-600 hover:text-neutral-900 underline"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <p className="text-xs text-neutral-600">
                Fill in your travel preferences below to receive a customized day-wise itinerary and the best rate quote directly on WhatsApp or Email.
              </p>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#D6A84F]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>WhatsApp / Phone *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                  />
                  {errors.emailAddress && (
                    <p className="text-xs text-red-600 mt-1">{errors.emailAddress}</p>
                  )}
                </div>
              </div>

              {/* Destination & Service Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Destination *</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.stateOrCountry})
                      </option>
                    ))}
                    <option value="Sikkim & Darjeeling Combo">Sikkim & Darjeeling Combo</option>
                    <option value="Custom Himalayan Circuit">Custom Himalayan Circuit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Enquiry Type
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                  >
                    <option value="Tour Package">Complete Tour Package</option>
                    <option value="Taxi / Car Rental">Taxi / Car Rental</option>
                    <option value="Hotel / Resort Booking">Hotel / Resort Booking</option>
                    <option value="Custom Family Holiday">Custom Family Holiday</option>
                    <option value="Honeymoon Package">Honeymoon Package</option>
                    <option value="General Enquiry">General Travel Enquiry</option>
                  </select>
                </div>
              </div>

              {/* Travel Date & Travellers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Approx. Travel Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                  />
                  {errors.travelDate && (
                    <p className="text-xs text-red-600 mt-1">{errors.travelDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Number of Travellers</span>
                  </label>
                  <select
                    value={numberOfTravellers}
                    onChange={(e) => setNumberOfTravellers(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                  >
                    <option value="1 Adult (Solo)">1 Adult (Solo)</option>
                    <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                    <option value="3-4 Adults (Family / Friends)">3–4 Adults (Family / Friends)</option>
                    <option value="5-7 Adults (Large Family)">5–7 Adults (Large Family)</option>
                    <option value="8+ Adults (Group / Corporate)">8+ Adults (Group / Corporate)</option>
                  </select>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Specific Requests or Itinerary Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Need Innova Crysta, Kanchenjunga view room, Nathula pass permit, etc."
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#123D32] focus:border-[#123D32]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md text-sm flex items-center justify-center gap-2 shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Submit via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="py-2.5 px-4 bg-[#123D32] hover:bg-[#245B49] text-white font-semibold rounded-md text-sm flex items-center justify-center gap-2 shadow transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D6A84F]" />
                  <span>Send Email</span>
                </button>
              </div>

              <div className="text-[11px] text-neutral-500 text-center pt-1">
                Direct assistance from our registered office at Salugara, Siliguri. No automated spam.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
