import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { COMPANY_INFO, getWhatsAppUrl } from "../data/travelData";

export const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Tour Package Enquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [lastContactMsg, setLastContactMsg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name";
    if (!phone.trim()) errs.phone = "Please enter your phone number";
    if (!email.trim()) {
      errs.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Please enter a valid email";
    }
    if (!message.trim()) errs.message = "Please write your query";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formatted = [
      `*Contact Message - Aadhya Gorkha Travels Website*`,
      `*Name:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      `*Email:* ${email.trim()}`,
      `*Subject:* ${subject}`,
      `*Message:* ${message.trim()}`,
    ].join("\n");

    setLastContactMsg(formatted);
    const waUrl = getWhatsAppUrl(formatted);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const handleEmailDirect = () => {
    if (!validate()) return;
    const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`;
    setLastContactMsg(body);
    const mailto = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
      `Website Inquiry: ${subject} (${name})`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F6F9FC] min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-himalayan-navy text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E2A829]/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg"
            alt="Siliguri foothills"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-[#F3C853] uppercase tracking-widest">
            Reach Out To Our Siliguri Team
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Contact Aadhya Gorkha Travels
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            Have questions about Sikkim permits, Darjeeling itineraries, or airport cab bookings? Visit our Salugara office or contact us anytime.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Verified Business Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-[10px] text-[#E2A829] font-bold uppercase tracking-wider block">
                  Registered Travel Agency
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0A2D6E]">
                  AADHYA GORKHA TRAVELS
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Domestic & International Tours · Taxi Rental · Himalayan Holidays
                </p>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="p-2.5 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/40 text-[#0A2D6E] shrink-0">
                  <MapPin className="w-5 h-5 text-[#E2A829]" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#0F1E3A] uppercase tracking-wide">
                    Office Address
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    Ward No. 42 of SMC, Jila Parishad Road, East, Salugara, Siliguri, West Bengal – 734008, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/40 text-[#0A2D6E] shrink-0">
                  <Phone className="w-5 h-5 text-[#E2A829]" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#0F1E3A] uppercase tracking-wide">
                    Direct Phone Numbers
                  </h4>
                  <div className="space-y-1 mt-1 text-xs text-slate-800">
                    <p>
                      Primary:{" "}
                      <a
                        href="tel:+918670374242"
                        className="font-bold text-[#0A2D6E] hover:text-[#E2A829] transition-colors"
                      >
                        +91 8670374242
                      </a>
                    </p>
                    <p>
                      Secondary:{" "}
                      <a
                        href="tel:+918899505665"
                        className="font-bold text-[#0A2D6E] hover:text-[#E2A829] transition-colors"
                      >
                        +91 8899505665
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/40 text-[#0A2D6E] shrink-0">
                  <Mail className="w-5 h-5 text-[#E2A829]" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#0F1E3A] uppercase tracking-wide">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-xs text-[#0A2D6E] font-semibold hover:text-[#E2A829] transition-colors mt-1 block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/40 text-[#0A2D6E] shrink-0">
                  <Clock className="w-5 h-5 text-[#E2A829]" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#0F1E3A] uppercase tracking-wide">
                    Working Hours
                  </h4>
                  <p className="text-xs text-slate-700 mt-1">
                    Monday to Sunday: 7:00 AM – 10:00 PM IST
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    24x7 phone support for travelers currently on the road.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppUrl("Hello Aadhya Gorkha Travels, I would like to get travel assistance.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Chat (+91 8670374242)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-bold text-[#E2A829] uppercase tracking-wider block">
                  Send A Message
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A2D6E]">
                  General & Business Enquiry Form
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Fill out the details below and we will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-[#0A2D6E]">
                    Message Prepared!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. If your messaging client did not launch automatically, click below:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-sm mx-auto">
                    <a
                      href={getWhatsAppUrl(lastContactMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg shadow-md flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send on WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Website Message: ${subject} (${name})`)}&body=${encodeURIComponent(lastContactMsg)}`}
                      className="w-full sm:w-auto py-2.5 px-4 bg-[#F6F9FC] border border-slate-300 hover:bg-slate-100 text-[#0A2D6E] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Mail className="w-4 h-4 text-[#E2A829]" />
                      <span>Send via Email</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#0A2D6E] underline pt-2 block mx-auto"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Meenakshi Sundaram"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                      />
                      {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                      />
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                      />
                      {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject of Inquiry
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                      >
                        <option value="Tour Package Enquiry">Tour Package Enquiry</option>
                        <option value="Taxi / Cab Rental">Taxi / Cab Rental</option>
                        <option value="Hotel Booking">Hotel & Resort Booking</option>
                        <option value="Permit & Travel Advisory">Permits & Travel Advisory</option>
                        <option value="Business & Partnership">Travel Trade & Corporate</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message / Travel Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please let us know your travel dates, destinations of interest, number of guests, or any special requests..."
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F6F9FC] border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                    />
                    {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-md shadow transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleEmailDirect}
                      className="py-3 px-5 bg-[#0A2D6E] hover:bg-[#13469E] text-white font-semibold text-xs sm:text-sm rounded-md shadow transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-[#F3C853]" />
                      <span>Send via Email</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="mb-4">
            <span className="text-xs font-bold text-[#E2A829] uppercase tracking-wider block">
              Office Map Location
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A2D6E]">
              Visit Our Office in Salugara, Siliguri
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Conveniently located near Jila Parishad Road in Salugara, Siliguri. Easy road access from Bagdogra Airport and NJP.
            </p>
          </div>

          <div className="relative w-full h-[360px] rounded-lg overflow-hidden border border-slate-200">
            <iframe
              title="Aadhya Gorkha Travels Location"
              src="https://maps.google.com/maps?q=Salugara,%20Siliguri,%20West%20Bengal%20734008&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
};
