import React, { useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { SAMPLE_TESTIMONIALS, Testimonial } from "../data/travelData";

interface ClientTestimonialsProps {
  testimonials?: Testimonial[];
}

export const ClientTestimonials: React.FC<ClientTestimonialsProps> = ({
  testimonials = SAMPLE_TESTIMONIALS,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Sync visible slides per viewport width (1 mobile, 2 tablet, 3 desktop)
  useEffect(() => {
    const updateViewport = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Clamp index if window resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Subtle auto-rotation paused on hover/focus
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, handleNext]);

  const getInitials = (name: string): string => {
    const clean = name.replace(/&|Dr\./gi, "").trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "AG";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const totalStops = maxIndex + 1;

  return (
    <section
      className="relative py-20 bg-[#F6F9FC] border-t border-slate-200 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Client Testimonials"
    >
      {/* Subtle Background Texture: Alpine Dot Grid + Faint Sun-Gold Horizon Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10, 45, 110, 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 85% 10%, rgba(226, 168, 41, 0.11) 0%, transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(10, 45, 110, 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 max-w-xs mb-2">
              <span className="text-xs font-bold text-[#E2A829] uppercase tracking-widest whitespace-nowrap">
                Verified Traveler Stories
              </span>
              <div className="flex-1 gold-spear-line-right" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A2D6E] tracking-tight">
              Client Testimonials
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Genuine experiences shared by families, couples, and expedition groups exploring Darjeeling, Sikkim, Bhutan, and Northeast India with our Siliguri desk.
            </p>
          </div>

          {/* Desktop Carousel Arrow Controls */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <div className="text-xs font-medium text-slate-500 mr-1 hidden sm:flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-[#E2A829] text-[#E2A829]"
                  />
                ))}
              </div>
              <span className="text-[#0A2D6E] font-bold">5.0</span>
              <span>Rated Service</span>
            </div>

            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#E2A829] hover:bg-[#0A2D6E] hover:text-white text-[#0A2D6E] flex items-center justify-center shadow-xs transition-all duration-200"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#E2A829] hover:bg-[#0A2D6E] hover:text-white text-[#0A2D6E] flex items-center justify-center shadow-xs transition-all duration-200"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="shrink-0 px-2.5 sm:px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <article className="h-full bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#E2A829]/60 transition-all duration-300 flex flex-col relative">
                  {/* Subtle Quote Watermark */}
                  <Quote className="w-10 h-10 text-[#E2A829]/15 absolute top-5 right-5 pointer-events-none" />

                  {/* Gold Star Rating Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${item.rating} out of 5 stars`}
                    >
                      {[...Array(item.rating)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-4 h-4 fill-[#E2A829] text-[#E2A829] drop-shadow-2xs"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {item.tripType}
                    </span>
                  </div>

                  {/* Review Quote */}
                  <blockquote className="font-serif italic text-sm sm:text-[15px] text-slate-700 leading-relaxed mb-6 flex-1">
                    “{item.feedback}”
                  </blockquote>

                  {/* Tapered Gold Divider */}
                  <div className="w-16 gold-spear-line-right mb-4 opacity-70" />

                  {/* Traveler Identity & Trip Details */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0A2D6E] border border-[#E2A829]/60 text-[#F3C853] font-serif font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {getInitials(item.name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif font-bold text-sm text-[#0A2D6E] truncate">
                          {item.name}
                        </h3>
                        <ShieldCheck
                          className="w-3.5 h-3.5 text-[#E2A829] shrink-0"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5 mt-0.5">
                        <span>{item.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.reviewDate}</span>
                      </div>

                      <div className="text-[11px] font-medium text-[#13469E] flex items-center gap-1 mt-1.5 truncate">
                        <MapPin className="w-3 h-3 text-[#E2A829] shrink-0" />
                        <span className="truncate">{item.destinationVisited}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Indicators */}
        {totalStops > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalStops }).map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-gradient-to-r from-[#E2A829] to-[#F3C853]"
                      : "w-2 bg-slate-300 hover:bg-[#0A2D6E]/40"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
