import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mountain,
  Clock,
  Navigation,
  ArrowRight,
  Compass,
  Calendar,
  Car,
} from "lucide-react";
import { DESTINATIONS, TOUR_PACKAGES } from "../data/travelData";
import { BookingPrefill } from "./QuickEnquiryModal";

export type RegionKey = "all" | "sikkim" | "darjeeling" | "bhutan" | "nepal";

interface CoverageNode {
  id: string;
  name: string;
  region: Exclude<RegionKey, "all">;
  regionLabel: string;
  x: number;
  y: number;
  labelPos: "left" | "right" | "top" | "bottom";
  altitude: string;
  distanceFromSiliguri: string;
  driveTime: string;
  permitNote: string;
  summary: string;
  highlights: string[];
  bestTime: string;
  image: string;
  destinationSlug: string;
  packageCategory: "sikkim" | "darjeeling" | "other";
  routePathFromHub: string;
  isHub?: boolean;
}

const COVERAGE_NODES: CoverageNode[] = [
  {
    id: "siliguri",
    name: "Siliguri · Bagdogra (IXB)",
    region: "darjeeling",
    regionLabel: "Primary Operations Hub · West Bengal",
    x: 424,
    y: 434,
    labelPos: "bottom",
    altitude: "400 ft (122 m)",
    distanceFromSiliguri: "0 km (Base Office)",
    driveTime: "Airport / NJP Arrival",
    permitNote: "Salugara Head Office · Direct Dispatch",
    summary:
      "Our Salugara operations headquarters and primary arrival gateway at Bagdogra Airport (IXB) and New Jalpaiguri (NJP) Railway Station, connecting all four Himalayan regions.",
    highlights: [
      "Bagdogra Airport (IXB) Meet & Greet",
      "NJP Railway Station Transfers",
      "Sikkim & Bhutan Permit Assistance",
      "Private Fleet Dispatch",
    ],
    bestTime: "Open Year-Round",
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    destinationSlug: "darjeeling",
    packageCategory: "darjeeling",
    routePathFromHub: "M 424 434 L 424 434",
    isHub: true,
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    region: "darjeeling",
    regionLabel: "West Bengal, India",
    x: 376,
    y: 344,
    labelPos: "left",
    altitude: "6,700 ft (2,042 m)",
    distanceFromSiliguri: "70 km from Siliguri",
    driveTime: "~3 hrs scenic drive",
    permitNote: "No special permit required",
    summary:
      "The Queen of Hills famed for golden Tiger Hill sunrises over Mount Kanchenjunga, emerald tea estates, and the UNESCO World Heritage Himalayan Toy Train.",
    highlights: [
      "Tiger Hill Sunrise Viewpoint",
      "Batasia Loop & Ghoom Monastery",
      "Happy Valley Tea Estate",
      "Chowrasta Mall Road",
    ],
    bestTime: "March – June & Sept – Dec",
    image: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
    destinationSlug: "darjeeling",
    packageCategory: "darjeeling",
    routePathFromHub: "M 424 434 Q 394 396 376 344",
  },
  {
    id: "kalimpong",
    name: "Kalimpong",
    region: "darjeeling",
    regionLabel: "West Bengal, India",
    x: 462,
    y: 346,
    labelPos: "right",
    altitude: "4,100 ft (1,250 m)",
    distanceFromSiliguri: "68 km from Siliguri",
    driveTime: "~2.5 hrs via Teesta Valley",
    permitNote: "No special permit required",
    summary:
      "Peaceful hill station overlooking the Teesta River gorge, known for exotic orchid and cactus nurseries, Deolo Hill panoramas, and colonial heritage cottages.",
    highlights: [
      "Deolo Hill & Paragliding",
      "Pine View Cactus Nursery",
      "Zang Dhok Palri Monastery",
      "Morgan House Heritage",
    ],
    bestTime: "Throughout the year",
    image: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
    destinationSlug: "kalimpong",
    packageCategory: "darjeeling",
    routePathFromHub: "M 424 434 Q 448 392 462 346",
  },
  {
    id: "gangtok",
    name: "Gangtok & Nathula",
    region: "sikkim",
    regionLabel: "East Sikkim, India",
    x: 488,
    y: 236,
    labelPos: "right",
    altitude: "5,410 – 14,140 ft",
    distanceFromSiliguri: "120 km from Siliguri",
    driveTime: "~4.5 hrs along NH10",
    permitNote: "Tsomgo & Nathula Pass permits arranged by our desk",
    summary:
      "Sikkim's vibrant mountain capital and cultural heart, serving as the launchpad for glacial Tsomgo Lake, Baba Mandir, and the historic Nathula border pass.",
    highlights: [
      "MG Marg Promenade",
      "Tsomgo Lake & Nathula Pass",
      "Rumtek & Enchey Monasteries",
      "Tashi View Point",
    ],
    bestTime: "September – June",
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    destinationSlug: "gangtok",
    packageCategory: "sikkim",
    routePathFromHub: "M 424 434 Q 466 365 462 346 T 488 236",
  },
  {
    id: "pelling",
    name: "Pelling",
    region: "sikkim",
    regionLabel: "West Sikkim, India",
    x: 392,
    y: 246,
    labelPos: "left",
    altitude: "7,200 ft (2,150 m)",
    distanceFromSiliguri: "132 km from Siliguri",
    driveTime: "~5 hrs via Jorethang",
    permitNote: "No special permit for Indian citizens",
    summary:
      "Quiet alpine retreat offering the closest uninterrupted views of Mount Kanchenjunga, home to India's first Glass Skywalk, Pemayangtse Monastery, and sacred Khecheopalri Lake.",
    highlights: [
      "Pelling Glass Skywalk",
      "Pemayangtse Monastery",
      "Khecheopalri Sacred Lake",
      "Rabdentse Palace Ruins",
    ],
    bestTime: "September – May",
    image: "/src/assets/images/himalayan_luxury_resort_1794311636712.jpg",
    destinationSlug: "pelling",
    packageCategory: "sikkim",
    routePathFromHub: "M 424 434 Q 396 340 392 246",
  },
  {
    id: "ravangla",
    name: "Ravangla",
    region: "sikkim",
    regionLabel: "South Sikkim, India",
    x: 438,
    y: 272,
    labelPos: "bottom",
    altitude: "7,000 ft (2,133 m)",
    distanceFromSiliguri: "120 km from Siliguri",
    driveTime: "~4.5 hrs via Namchi",
    permitNote: "No special permit required",
    summary:
      "Serene South Sikkim ridge town crowned by the 130-foot Buddha Park monument, surrounded by organic Temi Tea gardens and panoramic mountain ranges.",
    highlights: [
      "Buddha Park (Tathagata Tsal)",
      "Temi Tea Estate",
      "Ralang Monastery",
      "Rayong Sunrise Point",
    ],
    bestTime: "September – May",
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    destinationSlug: "ravangla",
    packageCategory: "sikkim",
    routePathFromHub: "M 424 434 Q 425 352 438 272",
  },
  {
    id: "yumthang-valley",
    name: "Lachung & Yumthang",
    region: "sikkim",
    regionLabel: "North Sikkim, India",
    x: 514,
    y: 146,
    labelPos: "right",
    altitude: "8,610 – 11,693 ft",
    distanceFromSiliguri: "235 km (via Gangtok)",
    driveTime: "~5.5 hrs north from Gangtok",
    permitNote: "Protected Area Permit (PAP) included in tour",
    summary:
      "Fairy-tale mountain village of Lachung leading into Yumthang Valley of Flowers—blanketed in spring rhododendrons and winter snow—plus Zero Point.",
    highlights: [
      "Yumthang Valley of Flowers",
      "Zero Point (Yumesamdong)",
      "Lachung Chu River Hamlets",
      "Sulphur Hot Springs",
    ],
    bestTime: "Feb – June & Nov – Jan",
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    destinationSlug: "yumthang-valley",
    packageCategory: "sikkim",
    routePathFromHub: "M 424 434 Q 466 365 462 346 T 488 236 Q 508 190 514 146",
  },
  {
    id: "north-sikkim",
    name: "Lachen & Gurudongmar",
    region: "sikkim",
    regionLabel: "North Sikkim, India",
    x: 456,
    y: 86,
    labelPos: "top",
    altitude: "8,800 – 17,800 ft",
    distanceFromSiliguri: "250 km (via Gangtok)",
    driveTime: "~6 hrs north from Gangtok",
    permitNote: "North Sikkim Restricted Permit handled end-to-end",
    summary:
      "High-altitude Himalayan frontier featuring Lachen village, Chopta Valley, and sacred Gurudongmar Lake—one of the highest glacial lakes in the world.",
    highlights: [
      "Gurudongmar Lake (17,800 ft)",
      "Chopta Valley Snowfields",
      "Lachen Mountain Village",
      "Thangu Valley",
    ],
    bestTime: "April – June & Oct – Dec",
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    destinationSlug: "north-sikkim",
    packageCategory: "sikkim",
    routePathFromHub: "M 424 434 Q 466 365 462 346 T 488 236 Q 480 156 456 86",
  },
  {
    id: "bhutan",
    name: "Paro & Thimphu",
    region: "bhutan",
    regionLabel: "Kingdom of Bhutan",
    x: 694,
    y: 230,
    labelPos: "left",
    altitude: "7,300 – 10,240 ft",
    distanceFromSiliguri: "145 km to Phuentsholing Border",
    driveTime: "~3.5 hrs to border + scenic ascent",
    permitNote: "Phuentsholing immigration & SDF guidance handled",
    summary:
      "Overland journeys from Siliguri across the Phuentsholing border to Bhutan's cultural capitals—visiting Buddha Dordenma, Tashichho Dzong, and cliffside Paro Taktsang.",
    highlights: [
      "Tiger's Nest (Paro Taktsang)",
      "Thimphu Buddha Dordenma",
      "National Memorial Chorten",
      "Chele La High Pass",
    ],
    bestTime: "March – May & Sept – Nov",
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    destinationSlug: "bhutan",
    packageCategory: "other",
    routePathFromHub: "M 424 434 Q 525 415 612 384 Q 642 308 694 230",
  },
  {
    id: "bhutan-punakha",
    name: "Punakha & Dochula Pass",
    region: "bhutan",
    regionLabel: "Kingdom of Bhutan",
    x: 842,
    y: 186,
    labelPos: "top",
    altitude: "4,075 – 10,170 ft",
    distanceFromSiliguri: "75 km east of Thimphu",
    driveTime: "~2.5 hrs via Dochula Pass",
    permitNote: "Included in our Bhutan cross-border permits",
    summary:
      "Cross the 108 memorial chortens at mist-laced Dochula Pass down into Punakha's warm valley, famed for its grand riverside Punakha Dzong and suspension bridge.",
    highlights: [
      "Dochula Pass (108 Chortens)",
      "Punakha Dzong Fortress",
      "Pho Chhu Suspension Bridge",
      "Chimi Lhakhang Temple",
    ],
    bestTime: "March – May & Sept – Nov",
    image: "/src/assets/images/himalayan_luxury_resort_1794311636712.jpg",
    destinationSlug: "bhutan",
    packageCategory: "other",
    routePathFromHub:
      "M 424 434 Q 525 415 612 384 Q 642 308 694 230 Q 768 206 842 186",
  },
  {
    id: "nepal",
    name: "Kathmandu & Nagarkot",
    region: "nepal",
    regionLabel: "Federal Democratic Republic of Nepal",
    x: 212,
    y: 230,
    labelPos: "bottom",
    altitude: "4,600 – 7,200 ft",
    distanceFromSiliguri: "36 km to Kakarbhitta Border",
    driveTime: "~1 hr to border + flight or drive",
    permitNote: "Seamless India–Nepal border crossing via Kakarbhitta",
    summary:
      "Effortless Nepal holidays routed from Siliguri across Kakarbhitta—exploring UNESCO Pashupatinath Temple, Boudhanath Stupa, Patan Durbar Square, and Nagarkot sunrises.",
    highlights: [
      "Pashupatinath & Boudhanath",
      "Kathmandu Durbar Square",
      "Swayambhunath Stupa",
      "Nagarkot Everest Panoramas",
    ],
    bestTime: "Sept – Nov & March – May",
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    destinationSlug: "nepal",
    packageCategory: "other",
    routePathFromHub: "M 424 434 Q 378 430 338 422 Q 268 340 212 230",
  },
  {
    id: "nepal-pokhara",
    name: "Pokhara & Annapurna",
    region: "nepal",
    regionLabel: "Federal Democratic Republic of Nepal",
    x: 102,
    y: 176,
    labelPos: "bottom",
    altitude: "2,713 – 5,250 ft",
    distanceFromSiliguri: "200 km west of Kathmandu",
    driveTime: "Custom Kathmandu–Pokhara circuit",
    permitNote: "Indian Voter ID / Passport valid for travel",
    summary:
      "Nepal's tranquil adventure lake city nestled beneath the Annapurna massif—featuring Phewa Lake boating, Sarangkot sunrise vistas, and Devi's Fall.",
    highlights: [
      "Phewa Lake & Tal Barahi",
      "Sarangkot Annapurna Sunrise",
      "World Peace Pagoda",
      "Davis Falls & Gupteshwor Cave",
    ],
    bestTime: "Sept – Nov & March – May",
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    destinationSlug: "nepal",
    packageCategory: "other",
    routePathFromHub:
      "M 424 434 Q 378 430 338 422 Q 268 340 212 230 Q 156 204 102 176",
  },
];

const REGION_TABS: Array<{ key: RegionKey; label: string; count: number }> = [
  { key: "all", label: "All Regions", count: 4 },
  { key: "sikkim", label: "Sikkim", count: 5 },
  { key: "darjeeling", label: "Darjeeling & Siliguri", count: 3 },
  { key: "bhutan", label: "Bhutan", count: 2 },
  { key: "nepal", label: "Nepal", count: 2 },
];

interface TourCoverageMapProps {
  onOpenBooking: (prefill?: BookingPrefill) => void;
  variant?: "home" | "destinations";
}

export const TourCoverageMap: React.FC<TourCoverageMapProps> = ({
  onOpenBooking,
  variant = "home",
}) => {
  const [activeRegion, setActiveRegion] = useState<RegionKey>("all");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("gangtok");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const focusedNodeId = hoveredNodeId || selectedNodeId;

  const selectedNode = useMemo(
    () =>
      COVERAGE_NODES.find((n) => n.id === selectedNodeId) ||
      COVERAGE_NODES.find((n) => n.id === "gangtok")!,
    [selectedNodeId]
  );

  const focusedNode = useMemo(
    () =>
      COVERAGE_NODES.find((n) => n.id === focusedNodeId) || selectedNode,
    [focusedNodeId, selectedNode]
  );

  const matchedPackageCount = useMemo(() => {
    const destRecord = DESTINATIONS.find((d) => d.slug === selectedNode.destinationSlug);
    const searchTerm = (destRecord?.name || selectedNode.name).toLowerCase().split(" ")[0];
    const matches = TOUR_PACKAGES.filter(
      (pkg) =>
        pkg.title.toLowerCase().includes(searchTerm) ||
        pkg.destinationsCovered.some((d) => d.toLowerCase().includes(searchTerm))
    );
    return Math.max(matches.length, 1);
  }, [selectedNode]);

  const handleRegionChange = (region: RegionKey) => {
    setActiveRegion(region);
    if (region !== "all") {
      const firstInRegion = COVERAGE_NODES.find(
        (n) => n.region === region && !n.isHub
      );
      if (firstInRegion) {
        setSelectedNodeId(firstInRegion.id);
      }
    }
  };

  const isNodeVisibleInFilter = (node: CoverageNode) =>
    activeRegion === "all" || node.region === activeRegion || node.isHub;

  const visibleSelectableNodes = useMemo(
    () =>
      COVERAGE_NODES.filter(
        (n) => activeRegion === "all" || n.region === activeRegion || n.isHub
      ),
    [activeRegion]
  );

  const getRegionOpacity = (region: Exclude<RegionKey, "all">) => {
    if (activeRegion === "all") return 1;
    return activeRegion === region ? 1 : 0.35;
  };

  return (
    <section
      className={`py-16 border-t border-slate-200 ${
        variant === "home" ? "bg-white" : "bg-[#F6F9FC]"
      }`}
      aria-label="Interactive Himalayan Tour Coverage Map"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 max-w-xs mb-2">
              <span className="text-xs font-bold text-[#E2A829] uppercase tracking-widest whitespace-nowrap">
                Tour Coverage Network
              </span>
              <div className="flex-1 gold-spear-line-right" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A2D6E] tracking-tight text-balance">
              Explore Our Himalayan Routes
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Dispatched directly from our Salugara, Siliguri hub near Bagdogra Airport (IXB) and NJP Railway Station—click any destination on the map to inspect route distances, altitudes, and permit coverage.
            </p>
          </div>

          {/* Interactive Region Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6F9FC] border border-slate-200 rounded-xl self-start lg:self-end"
            role="tablist"
            aria-label="Filter tour coverage by region"
          >
            {REGION_TABS.map((tab) => {
              const isActive = activeRegion === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleRegionChange(tab.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-[#0A2D6E] text-white shadow-xs"
                      : "text-slate-600 hover:text-[#0A2D6E] hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 12-Column Interactive Split: 8-Col SVG Map + 4-Col Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: Interactive Cartographic SVG Canvas */}
          <div className="lg:col-span-8 bg-[#F6F9FC] rounded-2xl border border-slate-200 p-3 sm:p-5 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-200/80 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-medium text-[#0A2D6E]">
                <Compass className="w-4 h-4 text-[#E2A829]" />
                <span>Eastern Himalayas & Cross-Border Transit Corridors</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0A2D6E] border border-[#E2A829]" />
                  <span>Hub / Destination</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-5 h-0.5 bg-[#E2A829] inline-block" />
                  <span>Active Route</span>
                </span>
              </div>
            </div>

            {/* Responsive Topographic SVG Map */}
            <div className="relative w-full overflow-hidden rounded-xl bg-white border border-slate-200/90">
              <svg
                viewBox="0 0 960 520"
                className="w-full h-auto block select-none"
                role="img"
                aria-label="Interactive tour coverage map across Nepal, Darjeeling, Sikkim, and Bhutan dispatched from Siliguri"
              >
                <defs>
                  <linearGradient id="mapOceanSkyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EEF4FA" />
                    <stop offset="55%" stopColor="#F8FBFF" />
                    <stop offset="100%" stopColor="#F1F5F9" />
                  </linearGradient>

                  <linearGradient id="ridgeSnowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DCE6F2" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#F8FBFF" stopOpacity="0" />
                  </linearGradient>

                  <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow
                      dx="0"
                      dy="2"
                      stdDeviation="3"
                      floodColor="#0A2D6E"
                      floodOpacity="0.22"
                    />
                  </filter>
                </defs>

                {/* Base Canvas */}
                <rect width="960" height="520" fill="url(#mapOceanSkyGrad)" />

                {/* Subtle Latitude & Longitude Graticule Lines */}
                <g stroke="#CBD5E1" strokeWidth="0.7" strokeOpacity="0.55" strokeDasharray="3 5">
                  <line x1="0" y1="104" x2="960" y2="104" />
                  <line x1="0" y1="208" x2="960" y2="208" />
                  <line x1="0" y1="312" x2="960" y2="312" />
                  <line x1="0" y1="416" x2="960" y2="416" />
                  <line x1="160" y1="0" x2="160" y2="520" />
                  <line x1="320" y1="0" x2="320" y2="520" />
                  <line x1="480" y1="0" x2="480" y2="520" />
                  <line x1="640" y1="0" x2="640" y2="520" />
                  <line x1="800" y1="0" x2="800" y2="520" />
                </g>

                {/* Northern High Himalayan Elevation Contour Crest */}
                <path
                  d="M 0 0 L 960 0 L 960 112 Q 870 84 780 110 Q 670 135 585 95 Q 505 42 440 52 Q 375 72 305 104 Q 210 138 115 95 Q 55 72 0 110 Z"
                  fill="url(#ridgeSnowGrad)"
                />
                <path
                  d="M 24 128 Q 105 92 195 135 Q 280 148 345 112 Q 405 56 462 48 Q 525 62 565 118 Q 665 148 765 118 Q 855 96 942 126"
                  fill="none"
                  stroke="#94A3B8"
                  strokeOpacity="0.35"
                  strokeWidth="1.2"
                  strokeDasharray="6 4"
                />

                {/* REGION 1: NEPAL (West) */}
                <g
                  style={{ opacity: getRegionOpacity("nepal"), transition: "opacity 220ms ease" }}
                  onClick={() => handleRegionChange("nepal")}
                  className="cursor-pointer"
                >
                  <path
                    d="M 46 138 C 85 112, 165 112, 238 134 C 288 150, 326 158, 346 196 C 352 246, 352 332, 344 434 L 222 406 C 145 362, 82 288, 38 192 Z"
                    fill={activeRegion === "nepal" ? "#FEF3C7" : "#F8F5EB"}
                    stroke={activeRegion === "nepal" ? "#D97706" : "#CBD5E1"}
                    strokeWidth={activeRegion === "nepal" ? 2 : 1.3}
                  />
                  <text
                    x="156"
                    y="302"
                    textAnchor="middle"
                    className="font-serif font-bold tracking-[0.26em] uppercase fill-[#0A2D6E]/45 pointer-events-none"
                    fontSize="14"
                  >
                    Nepal
                  </text>
                </g>

                {/* REGION 2: DARJEELING, KALIMPONG & SILIGURI FOOTHILLS */}
                <g
                  style={{
                    opacity: getRegionOpacity("darjeeling"),
                    transition: "opacity 220ms ease",
                  }}
                  onClick={() => handleRegionChange("darjeeling")}
                  className="cursor-pointer"
                >
                  <path
                    d="M 346 298 L 486 300 L 580 390 L 535 478 L 352 478 L 344 434 Z"
                    fill={activeRegion === "darjeeling" ? "#ECFDF5" : "#F2F8F5"}
                    stroke={activeRegion === "darjeeling" ? "#059669" : "#CBD5E1"}
                    strokeWidth={activeRegion === "darjeeling" ? 2 : 1.3}
                  />
                  <text
                    x="512"
                    y="452"
                    textAnchor="middle"
                    className="font-serif font-semibold tracking-[0.16em] uppercase fill-[#0A2D6E]/45 pointer-events-none"
                    fontSize="10.5"
                  >
                    North Bengal
                  </text>
                </g>

                {/* REGION 3: SIKKIM (North Central Alpine Wedge) */}
                <g
                  style={{ opacity: getRegionOpacity("sikkim"), transition: "opacity 220ms ease" }}
                  onClick={() => handleRegionChange("sikkim")}
                  className="cursor-pointer"
                >
                  <path
                    d="M 352 178 C 362 110, 416 56, 464 56 C 512 56, 548 110, 560 184 C 566 224, 544 274, 492 300 L 356 298 Z"
                    fill={activeRegion === "sikkim" ? "#EFF6FF" : "#F1F6FC"}
                    stroke={activeRegion === "sikkim" ? "#0A2D6E" : "#94A3B8"}
                    strokeWidth={activeRegion === "sikkim" ? 2.2 : 1.4}
                  />
                  <text
                    x="456"
                    y="196"
                    textAnchor="middle"
                    className="font-serif font-bold tracking-[0.26em] uppercase fill-[#0A2D6E]/40 pointer-events-none"
                    fontSize="13"
                  >
                    Sikkim
                  </text>
                </g>

                {/* REGION 4: BHUTAN (East) */}
                <g
                  style={{ opacity: getRegionOpacity("bhutan"), transition: "opacity 220ms ease" }}
                  onClick={() => handleRegionChange("bhutan")}
                  className="cursor-pointer"
                >
                  <path
                    d="M 596 184 C 638 136, 738 118, 845 138 C 902 150, 932 204, 922 290 C 910 356, 844 398, 725 404 L 598 400 C 578 330, 574 236, 596 184 Z"
                    fill={activeRegion === "bhutan" ? "#FFFBEB" : "#FAF7EE"}
                    stroke={activeRegion === "bhutan" ? "#E2A829" : "#CBD5E1"}
                    strokeWidth={activeRegion === "bhutan" ? 2.2 : 1.3}
                  />
                  <text
                    x="772"
                    y="314"
                    textAnchor="middle"
                    className="font-serif font-bold tracking-[0.28em] uppercase fill-[#0A2D6E]/45 pointer-events-none"
                    fontSize="14"
                  >
                    Bhutan
                  </text>
                </g>

                {/* Teesta River Scenic Flow (North Sikkim -> Kalimpong -> Siliguri Plains) */}
                <path
                  d="M 472 110 C 468 175, 454 228, 456 286 C 458 336, 444 388, 456 492"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeOpacity="0.65"
                />
                <text
                  x="456"
                  y="505"
                  textAnchor="middle"
                  fontSize="9.5"
                  className="fill-sky-700/65 font-medium italic pointer-events-none"
                >
                  Teesta River Corridor
                </text>

                {/* Iconic Himalayan Peak Reference Markers (Non-interactive landmarks) */}
                <g className="pointer-events-none">
                  {/* Mount Everest */}
                  <polygon points="282,120 273,136 291,136" fill="#0A2D6E" fillOpacity="0.75" />
                  <polygon points="282,120 278,127 286,127" fill="#FFFFFF" />
                  <text
                    x="282"
                    y="112"
                    textAnchor="middle"
                    fontSize="10"
                    className="fill-slate-600 font-semibold"
                  >
                    Mt. Everest · 29,031 ft
                  </text>

                  {/* Mount Kanchenjunga */}
                  <polygon points="354,154 344,172 364,172" fill="#0A2D6E" fillOpacity="0.82" />
                  <polygon points="354,154 349,163 359,163" fill="#FFFFFF" />
                  <text
                    x="338"
                    y="164"
                    textAnchor="end"
                    fontSize="10"
                    className="fill-[#0A2D6E] font-semibold"
                  >
                    Mt. Kanchenjunga
                  </text>
                  <text
                    x="338"
                    y="175"
                    textAnchor="end"
                    fontSize="9"
                    className="fill-slate-500"
                  >
                    28,169 ft
                  </text>
                </g>

                {/* Border Transit Checkpoints */}
                <g className="pointer-events-none">
                  {/* Kakarbhitta Nepal Border */}
                  <circle cx="338" cy="422" r="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.8" />
                  <text
                    x="332"
                    y="442"
                    textAnchor="end"
                    fontSize="9.5"
                    className="fill-amber-800/80 font-medium"
                  >
                    Kakarbhitta Border
                  </text>

                  {/* Phuentsholing Bhutan Border */}
                  <circle cx="612" cy="384" r="4" fill="#FFFFFF" stroke="#E2A829" strokeWidth="1.8" />
                  <text
                    x="622"
                    y="398"
                    textAnchor="start"
                    fontSize="9.5"
                    className="fill-amber-800/85 font-medium"
                  >
                    Phuentsholing Border
                  </text>
                </g>

                {/* Background Tour Route Paths (Muted Dotted Slate) */}
                {COVERAGE_NODES.filter((n) => !n.isHub).map((node) => {
                  const visible = isNodeVisibleInFilter(node);
                  return (
                    <path
                      key={`bg-route-${node.id}`}
                      d={node.routePathFromHub}
                      fill="none"
                      stroke="#64748B"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      style={{
                        opacity: visible ? 0.36 : 0.1,
                        transition: "opacity 220ms ease",
                      }}
                    />
                  );
                })}

                {/* Active Highlighted Route Path (Solid Metallic Sun Gold + Navy Halo) */}
                {!focusedNode.isHub && (
                  <g>
                    <path
                      d={focusedNode.routePathFromHub}
                      fill="none"
                      stroke="#0A2D6E"
                      strokeWidth="5"
                      strokeOpacity="0.16"
                      strokeLinecap="round"
                    />
                    <path
                      d={focusedNode.routePathFromHub}
                      fill="none"
                      stroke="#E2A829"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {/* Interactive Destination Nodes */}
                {COVERAGE_NODES.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isFocused = focusedNodeId === node.id;
                  const visible = isNodeVisibleInFilter(node);

                  let labelX = node.x;
                  let labelY = node.y;
                  let anchor: "start" | "middle" | "end" = "middle";

                  if (node.labelPos === "left") {
                    labelX = node.x - 14;
                    labelY = node.y + 4;
                    anchor = "end";
                  } else if (node.labelPos === "right") {
                    labelX = node.x + 14;
                    labelY = node.y + 4;
                    anchor = "start";
                  } else if (node.labelPos === "top") {
                    labelX = node.x;
                    labelY = node.y - 16;
                    anchor = "middle";
                  } else {
                    labelX = node.x;
                    labelY = node.y + 23;
                    anchor = "middle";
                  }

                  return (
                    <g
                      key={node.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${node.name} in ${node.regionLabel}`}
                      onClick={() => setSelectedNodeId(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedNodeId(node.id);
                        }
                      }}
                      className="cursor-pointer focus:outline-none"
                      style={{
                        opacity: visible ? 1 : 0.28,
                        transition: "opacity 220ms ease",
                      }}
                    >
                      {/* Generous invisible hit circle for touch & click accessibility */}
                      <circle cx={node.x} cy={node.y} r="20" fill="transparent" />

                      {/* Selection Outer Ring */}
                      {isFocused && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.isHub ? 17 : 14}
                          fill="#E2A829"
                          fillOpacity="0.22"
                          stroke="#E2A829"
                          strokeWidth="1.5"
                        />
                      )}

                      {/* Node Marker Circle */}
                      {node.isHub ? (
                        <>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="11"
                            fill="#0A2D6E"
                            stroke="#F3C853"
                            strokeWidth="2.5"
                            filter="url(#nodeGlow)"
                          />
                          <circle cx={node.x} cy={node.y} r="3.5" fill="#F3C853" />
                        </>
                      ) : (
                        <>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isSelected ? 8.5 : 6.8}
                            fill={isSelected ? "#E2A829" : "#0A2D6E"}
                            stroke="#FFFFFF"
                            strokeWidth="2.2"
                            filter="url(#nodeGlow)"
                          />
                          {isSelected && (
                            <circle cx={node.x} cy={node.y} r="2.8" fill="#071F4D" />
                          )}
                        </>
                      )}

                      {/* Crisp Readable Map Label */}
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor={anchor}
                        fontSize={node.isHub ? 12 : isFocused ? 12 : 11}
                        fontWeight={isFocused || node.isHub ? 700 : 600}
                        className="pointer-events-none"
                        fill={isFocused ? "#071F4D" : "#1E293B"}
                        stroke="#FFFFFF"
                        strokeWidth="3.5"
                        paintOrder="stroke"
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Tap Destination Selector Strip (ensures fast touch switching on small screens) */}
            <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                Quick Select:
              </span>
              {visibleSelectableNodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium border transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? "bg-[#0A2D6E] text-white border-[#0A2D6E]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-[#E2A829] hover:text-[#0A2D6E]"
                    }`}
                  >
                    {node.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Live Destination Route & Coverage Inspector Panel */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            {/* Selected Destination Visual Banner */}
            <div className="relative h-44 bg-[#071F4D] overflow-hidden shrink-0">
              <img
                src={selectedNode.image}
                alt={selectedNode.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F4D]/92 via-[#071F4D]/40 to-transparent" />
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-[11px] text-[#F3C853] font-semibold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{selectedNode.regionLabel}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mt-0.5 leading-tight">
                  {selectedNode.name}
                </h3>
              </div>
            </div>

            {/* Destination Telemetry & Details */}
            <div className="p-5 flex-1 flex flex-col space-y-4">
              {/* Unboxed Tabular Key Route Facts */}
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium block">
                    Distance & Transit
                  </span>
                  <div className="font-semibold text-[#0A2D6E] mt-0.5 flex items-center gap-1 tabular-nums">
                    <Navigation className="w-3.5 h-3.5 text-[#E2A829] shrink-0" />
                    <span className="truncate">{selectedNode.distanceFromSiliguri}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {selectedNode.driveTime}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-medium block">
                    Elevation & Season
                  </span>
                  <div className="font-semibold text-[#0A2D6E] mt-0.5 flex items-center gap-1 tabular-nums">
                    <Mountain className="w-3.5 h-3.5 text-[#E2A829] shrink-0" />
                    <span className="truncate">{selectedNode.altitude}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {selectedNode.bestTime}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedNode.summary}
              </p>

              {/* Highlights List */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Key Coverage Stops
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedNode.highlights.join(" · ")}
                </p>
              </div>

              {/* Permit & Fleet Note */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E2A829] shrink-0 mt-0.5" />
                  <span>{selectedNode.permitNote}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-[#E2A829] shrink-0" />
                  <span>
                    {matchedPackageCount}+ private tour & taxi circuits active
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onOpenBooking({
                      title: selectedNode.isHub
                        ? "Siliguri / IXB Airport Pickup & Custom Tour"
                        : `${selectedNode.name} Tour & Taxi Enquiry`,
                      destination: selectedNode.name,
                      type: selectedNode.isHub ? "taxi" : "package",
                    })
                  }
                  className="w-full py-2.5 px-4 bg-[#0A2D6E] hover:bg-[#13469E] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#F3C853]" />
                  <span>Plan Trip to {selectedNode.name.split(" ·")[0]}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={`/destinations#${selectedNode.destinationSlug}`}
                    className="py-2 px-3 bg-[#F6F9FC] hover:bg-slate-100 text-[#0A2D6E] font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Full Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    to="/packages"
                    className="py-2 px-3 bg-[#F6F9FC] hover:bg-slate-100 text-[#0A2D6E] font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Packages</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
