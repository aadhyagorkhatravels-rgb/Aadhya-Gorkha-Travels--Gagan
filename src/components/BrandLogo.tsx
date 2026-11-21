import React from "react";

interface BrandLogoProps {
  variant?: "header" | "footer" | "mobile" | "modal" | "emblem" | "light";
  className?: string;
}

const OFFICIAL_LOGO_SRC = "/assets/aistudio/agt_7b43b583.jpeg?v=2";

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "header",
  className = "",
}) => {
  // Compact white badge wrapper for dark navy surfaces (footer / modal header)
  if (variant === "footer") {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white rounded-xl px-4 py-2.5 shadow-lg border border-[#E2A829]/45 transition-transform duration-200 group-hover:scale-[1.02] ${className}`}
      >
        <img
          src={OFFICIAL_LOGO_SRC}
          alt="Aadhya Gorkha Travels"
          className="h-14 sm:h-16 w-auto max-w-[260px] object-contain select-none"
        />
      </div>
    );
  }

  if (variant === "modal" || variant === "emblem") {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white rounded-lg px-2.5 py-1.5 shadow-md border border-[#E2A829]/40 shrink-0 ${className}`}
      >
        <img
          src={OFFICIAL_LOGO_SRC}
          alt="Aadhya Gorkha Travels"
          className="h-9 sm:h-10 w-auto object-contain select-none"
        />
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={OFFICIAL_LOGO_SRC}
          alt="Aadhya Gorkha Travels"
          className="h-10 w-auto object-contain"
        />
      </div>
    );
  }

  // Default: Header / Light surface — seamless native white blend with zero distortion or cropping
  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src={OFFICIAL_LOGO_SRC}
        alt="Aadhya Gorkha Travels"
        className="h-11 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
      />
    </div>
  );
};
