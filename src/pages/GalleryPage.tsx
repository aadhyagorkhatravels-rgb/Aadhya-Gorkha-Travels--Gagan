import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, MessageCircle, Maximize2 } from "lucide-react";
import { GALLERY_PHOTOS, getWhatsAppUrl, GalleryPhoto } from "../data/travelData";

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const openLightbox = (photoId: string) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <div className="w-full bg-[#FAF8F2] min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-[#123D32] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D6A84F]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg"
            alt="Himalayan vistas"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-widest">
            Aadhya Gorkha Travels · Visual Showcase
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Himalayan Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in high-altitude snow peaks, misty tea gardens, serene Buddhist monasteries, and roaring glacial rivers of the Eastern Himalayas.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-xl shadow-xs border border-neutral-200">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === "all"
                ? "bg-[#123D32] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            All Photos
          </button>
          <button
            onClick={() => setActiveCategory("kanchenjunga")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === "kanchenjunga"
                ? "bg-[#123D32] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Kanchenjunga Views
          </button>
          <button
            onClick={() => setActiveCategory("darjeeling")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === "darjeeling"
                ? "bg-[#123D32] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Darjeeling Landscapes
          </button>
          <button
            onClick={() => setActiveCategory("valleys")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === "valleys"
                ? "bg-[#123D32] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Sikkim Valleys
          </button>
          <button
            onClick={() => setActiveCategory("snow")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === "snow"
                ? "bg-[#123D32] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Snow Mountains
          </button>
          <button
            onClick={() => setActiveCategory("monasteries")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === "monasteries"
                ? "bg-[#123D32] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Monasteries
          </button>
          <button
            onClick={() => setActiveCategory("lakes")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === "lakes"
                ? "bg-[#123D32] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Lakes & Waterfalls
          </button>
          <button
            onClick={() => setActiveCategory("culture")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === "culture"
                ? "bg-[#123D32] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Himalayan Roads
          </button>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo.id)}
              className="group relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-200 shadow-xs hover:shadow-xl cursor-pointer transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] text-[#D6A84F] font-bold uppercase tracking-wider">
                  {photo.categoryLabel}
                </span>
                <h3 className="font-serif text-sm font-bold leading-snug drop-shadow-sm">
                  {photo.title}
                </h3>
                <p className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#D6A84F]" />
                  <span>{photo.location}</span>
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-[#D6A84F] font-semibold">
                  <Maximize2 className="w-3 h-3" />
                  <span>View High-Res Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="relative max-h-[75vh] overflow-hidden rounded-lg shadow-2xl">
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="mt-4 text-center text-white space-y-1 max-w-xl">
              <span className="text-[11px] text-[#D6A84F] font-bold uppercase tracking-wider">
                {currentPhoto.categoryLabel}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                {currentPhoto.title}
              </h3>
              <p className="text-xs text-white/70 flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>{currentPhoto.location}</span>
                <span>·</span>
                <span>{currentPhoto.description}</span>
              </p>

              <div className="pt-3 flex items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl(
                    `Hello Aadhya Gorkha Travels, I saw the photo of "${currentPhoto.title}" at ${currentPhoto.location} on your gallery. I would like to visit this destination!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire to Visit this Place</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
