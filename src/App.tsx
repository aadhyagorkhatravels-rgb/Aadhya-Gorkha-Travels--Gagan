import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { QuickEnquiryModal, BookingPrefill } from "./components/QuickEnquiryModal";

// Pages
import { HomePage } from "./pages/HomePage";
import { TourPackagesPage } from "./pages/TourPackagesPage";
import { PackageDetailPage } from "./pages/PackageDetailPage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { TaxiServicesPage } from "./pages/TaxiServicesPage";
import { HotelsPage } from "./pages/HotelsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill | null>(null);

  const handleOpenBooking = (prefill?: BookingPrefill) => {
    setBookingPrefill(prefill || null);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingPrefill(null);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAF8F2] text-[#202923] selection:bg-[#D6A84F]/30 selection:text-[#123D32]">
        {/* Sticky Header Navigation */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Dynamic Page Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
            <Route path="/packages" element={<TourPackagesPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/packages/:slug" element={<PackageDetailPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/destinations" element={<DestinationsPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/taxi-services" element={<TaxiServicesPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/hotels" element={<HotelsPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<HomePage onOpenBooking={handleOpenBooking} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Action */}
        <FloatingWhatsApp />

        {/* Universal Quick Booking & Enquiry Modal */}
        <QuickEnquiryModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          prefill={bookingPrefill}
        />
      </div>
    </BrowserRouter>
  );
}
