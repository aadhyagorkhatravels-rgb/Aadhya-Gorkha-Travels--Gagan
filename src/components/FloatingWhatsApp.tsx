import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppUrl } from "../data/travelData";

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = "Hello Aadhya Gorkha Travels, I am planning a trip to Sikkim / Darjeeling. Please assist me with tour packages and taxi rates.";
  const waUrl = getWhatsAppUrl(defaultMsg);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end flex-col gap-2">
      {/* Friendly Tooltip Card */}
      {showTooltip && (
        <div className="bg-white border border-neutral-200 shadow-xl rounded-xl p-3 max-w-xs text-xs text-neutral-800 relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 p-1 text-neutral-400 hover:text-neutral-700"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[#123D32]">Siliguri Travel Desk Online</span>
          </div>
          <p className="text-neutral-600 leading-snug">
            Need instant itinerary quotes or custom car rental rates? Chat directly with us on WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-emerald-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp with Aadhya Gorkha Travels"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white shrink-0" />
        <span className="hidden sm:inline font-semibold text-sm tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
