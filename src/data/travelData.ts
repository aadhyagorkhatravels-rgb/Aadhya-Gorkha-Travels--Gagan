/**
 * Centralized Editable Data Structure for Aadhya Gorkha Travels
 * Location: Siliguri, West Bengal, India
 */

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phones: string[];
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  workingHours: string;
}

export const COMPANY_INFO: CompanyInfo = {
  name: "Aadhya Gorkha Travels",
  shortName: "Aadhya Gorkha",
  tagline: "Himalayan Journeys, Memories for a Lifetime",
  address: "Ward No. 42 of SMC, Jila Parishad Road, East, Salugara",
  city: "Siliguri",
  state: "West Bengal",
  pincode: "734008",
  country: "India",
  phones: ["+91 8670374242", "+91 8899505665"],
  primaryPhone: "+91 8670374242",
  whatsappNumber: "918670374242",
  email: "hello@aadhyagorkhatravels.com",
  workingHours: "Monday – Sunday: 7:00 AM – 10:00 PM IST",
};

export function getWhatsAppUrl(message: string): string {
  const cleanNumber = COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  stateOrCountry: string;
  altitude: string;
  bestTimeToVisit: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  image: string;
  popularFor: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "darjeeling",
    slug: "darjeeling",
    name: "Darjeeling",
    stateOrCountry: "West Bengal, India",
    altitude: "6,700 ft (2,042 m)",
    bestTimeToVisit: "March to June & September to December",
    shortDescription: "The Queen of Hills famed for majestic Kanchenjunga sunrise views, lush emerald tea plantations, and heritage colonial charm.",
    longDescription: "Perched gracefully in the Lesser Himalayas, Darjeeling is globally celebrated for its muscatel Darjeeling tea, UNESCO World Heritage Himalayan Toy Train, and sweeping panoramic views of the mighty Mount Kanchenjunga from Tiger Hill.",
    highlights: ["Tiger Hill Sunrise", "Batasia Loop & Toy Train", "Happy Valley Tea Estate", "Himalayan Mountaineering Institute", "Peace Pagoda"],
    image: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
    popularFor: "Tea Tourism, Heritage & Scenic Vistas",
  },
  {
    id: "gangtok",
    slug: "gangtok",
    name: "Gangtok",
    stateOrCountry: "Sikkim, India",
    altitude: "5,410 ft (1,650 m)",
    bestTimeToVisit: "September to June",
    shortDescription: "Sikkim's vibrant cosmopolitan capital blending Tibetan Buddhist culture, panoramic mountain viewpoints, and pedestrian MG Marg.",
    longDescription: "Gangtok is the heart of Sikkim travel. Clean, serene, and culturally rich, it serves as the base for excursions to high-altitude wonders like Tsomgo Lake, Nathula Pass, and pristine North Sikkim.",
    highlights: ["MG Marg Promenade", "Rumtek & Enchey Monasteries", "Tashi View Point", "Banjhakri Falls", "Ganesh Tok & Ropeway"],
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    popularFor: "Culture, Food, Cable Car & Monastery Trails",
  },
  {
    id: "north-sikkim",
    slug: "north-sikkim",
    name: "North Sikkim",
    stateOrCountry: "Sikkim, India",
    altitude: "8,800 to 17,800 ft",
    bestTimeToVisit: "April to June & October to December",
    shortDescription: "Untamed Himalayan wilderness featuring holy Gurudongmar Lake, rugged snow valleys, waterfalls, and alpine wonder.",
    longDescription: "North Sikkim is a dramatic realm of jagged snow summits, frozen glacial streams, and high-altitude hamlets like Lachen and Lachung. A journey here offers one of the most sublime alpine vistas on Earth.",
    highlights: ["Gurudongmar Lake (17,800 ft)", "Lachung & Lachen Hamlets", "Yumthang Valley of Flowers", "Zero Point (Yumesamdong)", "Chungthang Confluence"],
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    popularFor: "High-Altitude Glaciers, Snow Peaks & Adventure",
  },
  {
    id: "pelling",
    slug: "pelling",
    name: "Pelling",
    stateOrCountry: "West Sikkim, India",
    altitude: "7,200 ft (2,150 m)",
    bestTimeToVisit: "September to May",
    shortDescription: "Tranquil mountain haven offering the closest, most intimate frontal views of Kanchenjunga and sacred Buddhist heritage.",
    longDescription: "Nestled in West Sikkim, Pelling is adored for its quiet pine-scented ambiance, ancient monasteries like Pemayangtse, India's first skywalk, and spellbinding views of snow peaks at sunrise.",
    highlights: ["Pelling Glass Skywalk", "Pemayangtse Monastery", "Rabdentse Ruins", "Khecheopalri Sacred Lake", "Kanchenjunga Waterfalls"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    popularFor: "Closest Kanchenjunga Vistas, Skywalk & Monasteries",
  },
  {
    id: "lachung",
    slug: "lachung",
    name: "Lachung",
    stateOrCountry: "North Sikkim, India",
    altitude: "8,610 ft (2,600 m)",
    bestTimeToVisit: "October to June",
    shortDescription: "Charming traditional mountain village nestled amidst snow-capped peaks, apple orchards, and roaring mountain streams.",
    longDescription: "Lachung is a fairy-tale Himalayan settlement bifurcated by the Lachung Chu river. It is the iconic gateway to Yumthang Valley, hot springs, and Zero Point's year-round snowscapes.",
    highlights: ["Lachung Monastery", "Cottage Apple Orchards", "Lachung Chu River Banks", "Gateway to Yumthang & Zero Point"],
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    popularFor: "Alpine Snow Landscapes & Village Hospitality",
  },
  {
    id: "yumthang-valley",
    slug: "yumthang-valley",
    name: "Yumthang Valley",
    stateOrCountry: "North Sikkim, India",
    altitude: "11,693 ft (3,564 m)",
    bestTimeToVisit: "Late February to June (Flowers) & Nov to Jan (Snow)",
    shortDescription: "The fabled 'Valley of Flowers of the East', adorned with 24 species of wild rhododendrons, hot springs, and snow meadows.",
    longDescription: "Yumthang Valley transforms from a colorful blanket of flowering rhododendrons and primulas in spring into a pristine wonderland of pure white snow during winter.",
    highlights: ["Shingba Rhododendron Sanctuary", "Sulphur Hot Springs", "Yumesamdong (Zero Point)", "Grazing Yaks & Pine Meadows"],
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    popularFor: "Wild Rhododendron Blooms & Zero Point Snow",
  },
  {
    id: "kalimpong",
    slug: "kalimpong",
    name: "Kalimpong",
    stateOrCountry: "West Bengal, India",
    altitude: "4,100 ft (1,250 m)",
    bestTimeToVisit: "Throughout the year",
    shortDescription: "Peaceful hill station famous for exotic flower nurseries, colonial architecture, quiet monasteries, and Teesta river views.",
    longDescription: "Kalimpong offers a relaxed, unhurried Himalayan getaway. Renowned for its vibrant gladioli and orchid nurseries, historic educational institutions, and gentle climate.",
    highlights: ["Deolo Hill & Paragliding", "Pine View Cactus Nursery", "Zang Dhok Palri Monastery", "Morgan House", "Graham's Homes"],
    image: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
    popularFor: "Horticulture, Colonial Heritage & Leisure",
  },
  {
    id: "ravangla",
    slug: "ravangla",
    name: "Ravangla",
    stateOrCountry: "South Sikkim, India",
    altitude: "7,000 ft (2,133 m)",
    bestTimeToVisit: "September to May",
    shortDescription: "Serene hill town crowned by the monumental 130-foot Golden Buddha statue in the Tathagata Tsal park.",
    longDescription: "Ravangla sits amidst lush hills covered with tea plants and dense rhododendron forests, offering uninterrupted views of Mt. Kanchenjunga, Mt. Pandim, and Mt. Sinialchu.",
    highlights: ["Buddha Park (Tathagata Tsal)", "Ralang Monastery", "Rayong Sunrise Point", "Temi Tea Garden", "Maenam Hill Trek"],
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    popularFor: "Buddha Park, Temi Tea & Spiritual Serenity",
  },
  {
    id: "bhutan",
    slug: "bhutan",
    name: "Bhutan",
    stateOrCountry: "Kingdom of Bhutan",
    altitude: "7,000 to 10,000 ft",
    bestTimeToVisit: "March to May & September to November",
    shortDescription: "The Land of the Thunder Dragon, celebrating Gross National Happiness, ancient cliffside dzongs, and rich Buddhist culture.",
    longDescription: "Directly accessible from Siliguri via the Phuentsholing border, Bhutan mesmerizes with untouched forests, cliff-hanging monasteries like Tiger's Nest, and grand medieval fortress dzongs.",
    highlights: ["Tiger's Nest (Paro Taktsang)", "Punakha Dzong & Suspension Bridge", "Thimphu Buddha Dordenma", "Dochula Pass 108 Chortens"],
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    popularFor: "Spiritual Culture, Dzongs & Himalayan Majesty",
  },
  {
    id: "nepal",
    slug: "nepal",
    name: "Nepal",
    stateOrCountry: "Federal Democratic Republic of Nepal",
    altitude: "4,600 to 8,000 ft",
    bestTimeToVisit: "September to November & March to May",
    shortDescription: "The roof of the world, home to Mount Everest, sacred Hindu & Buddhist shrines, Pokhara lakes, and warm hospitality.",
    longDescription: "Seamlessly reachable from Siliguri via the Kakarbhitta border, Nepal is a land of unmatched mountain majesty, ancient royal squares in Kathmandu, and tranquil lakeside vistas in Pokhara.",
    highlights: ["Pashupatinath & Swayambhunath", "Phewa Lake & Sarangkot Pokhara", "Kathmandu Durbar Square", "Annapurna Range Panoramas"],
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    popularFor: "Everest Vistas, Ancient Temples & Pokhara Lakes",
  },
  {
    id: "meghalaya",
    slug: "meghalaya",
    name: "Meghalaya",
    stateOrCountry: "Northeast India",
    altitude: "4,900 ft (1,496 m)",
    bestTimeToVisit: "October to April",
    shortDescription: "The fabled Abode of Clouds featuring mystical living root bridges, crystal-clear Dawki waters, and roaring waterfalls.",
    longDescription: "Meghalaya is nature at its most poetic: emerald hills, mist-shrouded limestone caves, Asia's cleanest village Mawlynnong, and boat rides on the mirror-like Umngot River.",
    highlights: ["Double Decker Living Root Bridge", "Umngot River Boat Ride in Dawki", "Nohkalikai Falls Cherrapunji", "Mawlynnong Clean Village"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    popularFor: "Living Root Bridges, Waterfalls & Crystal Rivers",
  },
  {
    id: "arunachal-pradesh",
    slug: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    stateOrCountry: "Northeast India",
    altitude: "6,000 to 13,700 ft",
    bestTimeToVisit: "October to April",
    shortDescription: "India's Land of the Dawn-Lit Mountains, home to Asia's second-largest Buddhist monastery and high Sela Pass.",
    longDescription: "Arunachal Pradesh represents the frontier of Himalayan wonder. Travel across the snowbound Sela Pass into the tranquil valleys of Tawang, filled with rich Monpa heritage and glacial lakes.",
    highlights: ["Tawang Monastery (10,000 ft)", "Sela Pass (13,700 ft) & Sela Lake", "Madhuri (Sangetsar) Lake", "Nuranang Waterfalls"],
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    popularFor: "High-Altitude Passes, Tawang Monastery & Tribal Heritage",
  },
];

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meal: string;
  stay: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  duration: string;
  durationNightsDays: string;
  category: "darjeeling" | "sikkim" | "other";
  categoryLabel: string;
  destinationsCovered: string[];
  pickupDrop: string;
  shortDescription: string;
  overview: string;
  bannerImage: string;
  itinerary: ItineraryDay[];
  placesCovered: string[];
  accommodation: string;
  transportation: string;
  inclusions: string[];
  exclusions: string[];
  travelInfo: string[];
  faqs: { question: string; answer: string }[];
  featured?: boolean;
}

export const TOUR_PACKAGES: TourPackage[] = [
  // DARJEELING PACKAGES
  {
    id: "darjeeling-2n-3d",
    slug: "darjeeling-2n-3d",
    title: "Darjeeling Scenic Getaway (2N / 3D)",
    duration: "2 Nights / 3 Days",
    durationNightsDays: "2N / 3D",
    category: "darjeeling",
    categoryLabel: "Darjeeling Packages",
    destinationsCovered: ["Siliguri", "Darjeeling", "Tiger Hill", "Batasia Loop"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station",
    shortDescription: "A classic short Himalayan holiday covering world-famous Tiger Hill sunrise, heritage toy train loops, and fragrant tea plantations.",
    overview: "Ideal for weekend getaways, couples, and quick nature escapes. Journey from Siliguri through picturesque tea hills to Darjeeling. Witness sunrise over Mount Kanchenjunga and explore the Queen of Hills with dedicated private transport.",
    bannerImage: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
    itinerary: [
      {
        day: 1,
        title: "Arrival at NJP / Bagdogra & Transfer to Darjeeling (70 km / ~3 hrs)",
        description: "Warm welcome by our representative at Bagdogra Airport (IXB) or NJP Railway Station. Enjoy a scenic winding drive through Kurseong and rolling emerald tea hills. Check-in to your Darjeeling hotel. Evening free to stroll down Mall Road / Chowrasta and enjoy local hot bakery delights.",
        meal: "Dinner Included",
        stay: "Darjeeling Hotel / Resort",
      },
      {
        day: 2,
        title: "Early Morning Tiger Hill Sunrise & Full Day Darjeeling 7-Point Sightseeing",
        description: "Early morning drive at 4:00 AM to Tiger Hill (8,482 ft) for the unforgettable sunrise illuminating Mt. Kanchenjunga in fiery amber and gold. On return, visit the famous Batasia Loop with the War Memorial and Ghoom Monastery. After breakfast, visit Himalayan Mountaineering Institute (HMI), P.N. Zoological Park (Red Panda conservation), Tenzing Rock, Tibetan Refugee Self-Help Centre, and a panoramic drive through outer tea garden views.",
        meal: "Breakfast & Dinner Included",
        stay: "Darjeeling Hotel / Resort",
      },
      {
        day: 3,
        title: "Darjeeling to NJP Railway Station / Bagdogra Airport Departure (70 km / ~3 hrs)",
        description: "Enjoy breakfast overlooking the mountain ridges. Check-out and take a relaxing drive back to Siliguri for drop-off at NJP or Bagdogra Airport with sweet Himalayan memories.",
        meal: "Breakfast Included",
        stay: "Departure",
      },
    ],
    placesCovered: ["Tiger Hill", "Batasia Loop", "Ghoom Monastery", "Himalayan Mountaineering Institute", "Darjeeling Zoo", "Chowrasta Mall"],
    accommodation: "Handpicked hill view hotels in Standard, Deluxe, or Premium heritage categories.",
    transportation: "Exclusive private sanitized vehicle (Swift Dzire / Innova / Bolero based on group size).",
    inclusions: [
      "All transfers & sightseeing in private dedicated vehicle",
      "2 nights comfortable hotel accommodation",
      "Daily breakfast and dinner (MAP Plan)",
      "Tiger Hill sunrise permit & morning transfer",
      "Driver allowances, toll taxes, fuel charges, and parking fees",
      "24x7 local on-ground assistance from our Siliguri office",
    ],
    exclusions: [
      "Airfare or train tickets",
      "Entry fees to monuments, ropeway, toy train tickets",
      "Personal expenses (laundry, room heater, beverages)",
      "Any costs arising from unforeseen road blocks or weather changes",
      "GST 5%",
    ],
    travelInfo: [
      "Best time to visit: Year round (March-June clear skies, Oct-Dec snow peak views).",
      "Warm clothing recommended throughout the year, especially for Tiger Hill morning.",
      "Valid Government Photo ID required for all guests.",
    ],
    faqs: [
      {
        question: "How far is Darjeeling from Bagdogra Airport / NJP?",
        answer: "The distance is approximately 70 km and takes roughly 2.5 to 3.5 hours depending on traffic and mountain road conditions.",
      },
      {
        question: "Can we experience the Toy Train ride during this trip?",
        answer: "Yes! We can coordinate with you in advance to book Darjeeling-Ghoom Joy Ride tickets depending on railway availability.",
      },
    ],
    featured: true,
  },
  {
    id: "darjeeling-3n-4d",
    slug: "darjeeling-3n-4d",
    title: "Darjeeling & Rock Garden Leisure Holiday (3N / 4D)",
    duration: "3 Nights / 4 Days",
    durationNightsDays: "3N / 4D",
    category: "darjeeling",
    categoryLabel: "Darjeeling Packages",
    destinationsCovered: ["Siliguri", "Darjeeling", "Tiger Hill", "Rock Garden & Ganga Maya Lake"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station",
    shortDescription: "An unhurried mountain holiday adding cascading Barbotey Rock Garden, Japanese Temple, and relaxing Mall Road evenings.",
    overview: "Enjoy the serene colonial charm of Darjeeling with extra time to explore tranquil waterfalls, rock gardens, Buddhist peace pagodas, and tea tasting sessions.",
    bannerImage: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
    itinerary: [
      {
        day: 1,
        title: "Pick up from NJP / Bagdogra to Darjeeling",
        description: "Arrival at Siliguri and picturesque ascent into Darjeeling hills. Check-in and relax with a hot cup of authentic Darjeeling first flush tea. Evening walk on Chowrasta.",
        meal: "Dinner Included",
        stay: "Darjeeling Hotel",
      },
      {
        day: 2,
        title: "Tiger Hill Sunrise & City Sightseeing",
        description: "Sunrise over Kanchenjunga from Tiger Hill. Visit Ghoom Monastery and Batasia Loop. Post-breakfast visit Himalayan Zoo, HMI, Ropeway, and Tibetan Self Help Centre.",
        meal: "Breakfast & Dinner Included",
        stay: "Darjeeling Hotel",
      },
      {
        day: 3,
        title: "Excursion to Rock Garden, Ganga Maya Park & Peace Pagoda",
        description: "Visit the cascading Chunnu Summer Falls at Rock Garden terraced into the mountainside. Visit the serene Japanese Peace Pagoda and Mahakal Temple.",
        meal: "Breakfast & Dinner Included",
        stay: "Darjeeling Hotel",
      },
      {
        day: 4,
        title: "Darjeeling to Siliguri Departure",
        description: "Check-out and transfer back to Bagdogra / NJP for your onward journey.",
        meal: "Breakfast Included",
        stay: "Departure",
      },
    ],
    placesCovered: ["Tiger Hill", "Batasia Loop", "Rock Garden", "Japanese Peace Pagoda", "HMI", "Chowrasta Mall"],
    accommodation: "3 Nights at comfortable, scenic hotels.",
    transportation: "Private dedicated vehicle for all days.",
    inclusions: [
      "3 nights accommodation with breakfast & dinner",
      "All transfers & sightseeing in exclusive vehicle",
      "Toll, parking, fuel, and driver charges",
      "Dedicated Siliguri travel coordinator",
    ],
    exclusions: ["Train/air tickets", "Monument fees & ropeway ride", "GST 5%"],
    travelInfo: ["Carry light woolens in summer, heavy jackets in winter."],
    faqs: [
      {
        question: "Is Rock Garden suitable for elderly guests?",
        answer: "Rock Garden has terraced stone steps; elderly guests can relax in the lower garden viewing the magnificent waterfall.",
      },
    ],
  },
  {
    id: "darjeeling-mirik-4n-5d",
    slug: "darjeeling-mirik-4n-5d",
    title: "Darjeeling & Mirik Lake Himalayan Retreat (4N / 5D)",
    duration: "4 Nights / 5 Days",
    durationNightsDays: "4N / 5D",
    category: "darjeeling",
    categoryLabel: "Darjeeling Packages",
    destinationsCovered: ["Siliguri", "Darjeeling", "Mirik Lake", "Pashupati Nagar (Nepal Border)", "Kurseong"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station",
    shortDescription: "Experience Darjeeling's classic beauty coupled with tranquil boating on Sumendu Lake in Mirik and Nepal border market shopping.",
    overview: "A comprehensive Darjeeling regional tour taking you through lush pine forests, the peaceful lakeside town of Mirik, Pashupati Nagar market, and heritage Kurseong viewpoints.",
    bannerImage: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
    itinerary: [
      { day: 1, title: "Arrival Siliguri to Darjeeling", description: "Scenic transfer through tea gardens to Darjeeling. Check-in and evening stroll.", meal: "Dinner", stay: "Darjeeling Hotel" },
      { day: 2, title: "Tiger Hill Sunrise & 7-Point Sightseeing", description: "Iconic Kanchenjunga sunrise, Batasia Loop, Ghoom Monastery, HMI, and Zoo.", meal: "Breakfast & Dinner", stay: "Darjeeling Hotel" },
      { day: 3, title: "Full Day Excursion to Mirik Lake & Pashupati Nagar", description: "Drive along the Nepal border ridges. Visit Sumendu Lake in Mirik (boating & horse riding), cross the Indreni Foot Bridge, stop at Simana Viewpoint, and browse Pashupati Nagar market.", meal: "Breakfast & Dinner", stay: "Darjeeling Hotel" },
      { day: 4, title: "Kurseong Exploration & Tea Estate Visit", description: "Visit Eagle's Crag viewpoint in Kurseong, Makaibari Tea Garden vista, and local artisan markets.", meal: "Breakfast & Dinner", stay: "Darjeeling Hotel" },
      { day: 5, title: "Darjeeling to NJP / Bagdogra Departure", description: "Morning breakfast and drop-off at Siliguri for your flight or train.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Tiger Hill", "Batasia Loop", "Mirik Lake", "Simana View Point", "Pashupati Nagar", "Kurseong Tea Hills"],
    accommodation: "4 Nights deluxe mountain accommodation.",
    transportation: "Private dedicated vehicle throughout.",
    inclusions: ["4 nights hotel stay", "Daily breakfast & dinner", "Exclusive private vehicle for all transfers & excursions", "All parking & road permits"],
    exclusions: ["Airfare/train fare", "Boating fees in Mirik", "Personal expenses", "GST 5%"],
    travelInfo: ["Citizens of India do not need a passport for crossing into Pashupati market; carrying Aadhar is advised."],
    faqs: [
      { question: "Can we buy tea in Mirik and Darjeeling?", answer: "Yes, you can purchase authentic world-renowned first flush and second flush Darjeeling tea directly." },
    ],
  },

  // SIKKIM PACKAGES
  {
    id: "gangtok-2n-3d",
    slug: "gangtok-2n-3d",
    title: "Gangtok Highlights & Culture (2N / 3D)",
    duration: "2 Nights / 3 Days",
    durationNightsDays: "2N / 3D",
    category: "sikkim",
    categoryLabel: "Sikkim Packages",
    destinationsCovered: ["Siliguri", "Gangtok", "Tashi View Point", "Rumtek Monastery", "MG Marg"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station",
    shortDescription: "A crisp and refreshing weekend in Sikkim's charming capital. Stroll MG Marg, admire Rumtek Monastery, and enjoy panoramic mountain viewpoints.",
    overview: "Designed for travelers on a tight schedule who want to taste Sikkim's rich Buddhist traditions, vibrant clean capital, and crisp mountain atmosphere.",
    bannerImage: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    itinerary: [
      { day: 1, title: "Siliguri to Gangtok (120 km / ~4.5 hrs)", description: "Meet at NJP or Bagdogra and follow the emerald Teesta river up into the hills. Arrive in Gangtok, check-in, and spend a relaxing evening on MG Marg.", meal: "Dinner", stay: "Gangtok Hotel" },
      { day: 2, title: "Full Day Gangtok Local Sightseeing", description: "Visit Tashi Viewpoint, Ganesh Tok, Hanuman Tok, Bakthang Waterfalls, Do Drul Chorten Stupa, Namgyal Institute of Tibetology, and Rumtek Monastery.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 3, title: "Gangtok to Siliguri Departure", description: "Breakfast, checkout, and picturesque descent along the Teesta valley to Bagdogra / NJP.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["MG Marg", "Tashi View Point", "Rumtek Monastery", "Do Drul Chorten", "Bakthang Waterfalls", "Namgyal Institute of Tibetology"],
    accommodation: "2 Nights at central Gangtok hotel near MG Marg.",
    transportation: "Private dedicated vehicle.",
    inclusions: ["2 nights hotel accommodation", "Daily breakfast & dinner", "All sightseeing & transfers", "Driver allowance, parking, tolls"],
    exclusions: ["Permits for restricted zones", "Entry tickets", "GST 5%"],
    travelInfo: ["Sikkim is a 100% organic state. Carry eco-friendly bottles; single-use plastic bottles are prohibited in Sikkim."],
    faqs: [
      { question: "Is MG Marg accessible by car?", answer: "MG Marg is a pedestrian-only zone. Hotels situated nearby allow easy walking access." },
    ],
    featured: true,
  },
  {
    id: "gangtok-3n-4d",
    slug: "gangtok-3n-4d",
    title: "Gangtok & Sacred Tsomgo Lake (3N / 4D)",
    duration: "3 Nights / 4 Days",
    durationNightsDays: "3N / 4D",
    category: "sikkim",
    categoryLabel: "Sikkim Packages",
    destinationsCovered: ["Siliguri", "Gangtok", "Tsomgo Lake", "Baba Harbhajan Singh Mandir"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station",
    shortDescription: "Sikkim's most sought-after short tour. Visit the sacred glacial Tsomgo (Changu) Lake at 12,400 ft and Baba Harbhajan Mandir.",
    overview: "Ascend into the high Himalayan altitudes to witness the breathtaking alpine colors of Tsomgo Lake. Combined with Gangtok's monastery culture and delicious local cuisine.",
    bannerImage: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    itinerary: [
      { day: 1, title: "Arrival Siliguri to Gangtok", description: "Meet & greet at Bagdogra/NJP. Scenic drive along Teesta River to Gangtok. Check-in and evening walk on MG Marg.", meal: "Dinner", stay: "Gangtok Hotel" },
      { day: 2, title: "Excursion to Tsomgo Lake & Baba Mandir (12,400 ft)", description: "Morning drive along rugged mountain road to high-altitude Tsomgo Lake surrounded by alpine peaks. Continue to Baba Harbhajan Singh Memorial Mandir (13,123 ft). Optional Nathula Pass permit subject to military clearance.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 3, title: "Gangtok Local Sightseeing", description: "Explore Tashi View Point, Ganesh Tok, Cottage Industries, Flower Exhibition Centre, and Enchey Monastery.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 4, title: "Gangtok to Siliguri Departure", description: "Transfer to NJP / Bagdogra for onward travel.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Tsomgo Lake", "Baba Mandir", "MG Marg", "Tashi View Point", "Flower Show", "Enchey Monastery"],
    accommodation: "3 Nights in Gangtok.",
    transportation: "Dedicated private vehicle with high-altitude permit.",
    inclusions: ["3 nights hotel stay", "Breakfast & Dinner", "Tsomgo Lake & Baba Mandir permit assistance & transport", "All parking and tolls"],
    exclusions: ["Nathula Pass permit & supplement vehicle charges", "Ropeway & personal rides", "GST 5%"],
    travelInfo: ["Passports/Voter ID card and 4 passport-size photographs required for Tsomgo Lake permits."],
    faqs: [
      { question: "Can we visit Nathula Pass?", answer: "Nathula Pass is on the Indo-China border. Permits depend on Army clearance and weather. We can apply for your permit with prior notice." },
    ],
  },
  {
    id: "gangtok-tsomgo-lake-4n-5d",
    slug: "gangtok-tsomgo-lake-4n-5d",
    title: "Gangtok, Tsomgo Lake & Namchi (4N / 5D)",
    duration: "4 Nights / 5 Days",
    durationNightsDays: "4N / 5D",
    category: "sikkim",
    categoryLabel: "Sikkim Packages",
    destinationsCovered: ["Gangtok", "Tsomgo Lake", "Baba Mandir", "Namchi Char Dham", "Temi Tea Garden"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station",
    shortDescription: "Blend high-altitude alpine lakes with South Sikkim's architectural marvel Char Dham at Solophok and lush Temi Tea Garden.",
    overview: "A balanced tour combining Gangtok's buzzing lifestyle, the glacial splendor of Tsomgo Lake, and the spiritual tranquility of Namchi's 108 ft Shiva statue at Siddheshwar Dham.",
    bannerImage: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    itinerary: [
      { day: 1, title: "Siliguri to Gangtok", description: "Transfer from Bagdogra/NJP to Gangtok. Evening leisure at MG Marg.", meal: "Dinner", stay: "Gangtok Hotel" },
      { day: 2, title: "Tsomgo Lake & Baba Mandir Excursion", description: "High altitude day trip to Tsomgo Lake (12,400 ft) and Baba Mandir.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 3, title: "Day Excursion to Namchi & Temi Tea Garden", description: "Scenic drive to South Sikkim. Visit the magnificent Char Dham complex in Namchi, Samdruptse Hill (Guru Padmasambhava statue), and roll through Sikkim's only tea estate at Temi.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 4, title: "Gangtok Sightseeing & Leisure", description: "Rumtek Monastery, Banjhakri Falls, and local handicraft shopping.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 5, title: "Gangtok to Siliguri Departure", description: "Transfer to Bagdogra / NJP with fond memories.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Tsomgo Lake", "Baba Mandir", "Namchi Char Dham", "Temi Tea Garden", "Samdruptse", "Rumtek Monastery"],
    accommodation: "4 Nights comfortable hotel accommodation in Gangtok.",
    transportation: "Exclusive vehicle throughout the trip.",
    inclusions: ["4 nights hotel stay", "Daily breakfast & dinner", "Tsomgo permit & transport", "Namchi excursion in private car"],
    exclusions: ["Nathula Pass charges", "Camera fees", "GST 5%"],
    travelInfo: ["Namchi temple requires modest attire; shoes must be removed inside sanctums."],
    faqs: [
      { question: "Is Temi Tea Garden visit included?", answer: "Yes, you will drive right through Temi Tea Estate and can taste freshly plucked organic tea." },
    ],
  },
  {
    id: "gangtok-pelling-darjeeling-5n-6d",
    slug: "gangtok-pelling-darjeeling-5n-6d",
    title: "Gangtok, Pelling & Darjeeling Golden Triangle (5N / 6D)",
    duration: "5 Nights / 6 Days",
    durationNightsDays: "5N / 6D",
    category: "sikkim",
    categoryLabel: "Sikkim Packages",
    destinationsCovered: ["Gangtok", "Tsomgo Lake", "Pelling", "Skywalk", "Darjeeling", "Tiger Hill"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station",
    shortDescription: "The ultimate Eastern Himalayan trifecta: Gangtok's vibrancy, Pelling's majestic Kanchenjunga skywalk, and Darjeeling's tea heritage.",
    overview: "Our most popular signature tour. Experience the cultural soul of Sikkim and the colonial beauty of Darjeeling in one seamless, luxury-chauffeured holiday.",
    bannerImage: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    itinerary: [
      { day: 1, title: "Siliguri to Gangtok", description: "Pick up from NJP / Bagdogra and transfer to Gangtok. Evening MG Marg walk.", meal: "Dinner", stay: "Gangtok Hotel" },
      { day: 2, title: "Tsomgo Lake & Baba Mandir", description: "Glacial lake trip at 12,400 ft with prayer flags and yak rides.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 3, title: "Gangtok to Pelling via Ravangla Buddha Park", description: "Spectacular drive to West Sikkim. Stop at the majestic 130 ft Golden Buddha Park in Ravangla. Arrive in Pelling.", meal: "Breakfast & Dinner", stay: "Pelling Hotel" },
      { day: 4, title: "Pelling Sightseeing & Transfer to Darjeeling", description: "Visit Pelling Glass Skywalk, Pemayangtse Monastery, Rabdentse Ruins, and Khecheopalri Lake. Drive to Darjeeling through tea valleys.", meal: "Breakfast & Dinner", stay: "Darjeeling Hotel" },
      { day: 5, title: "Tiger Hill Sunrise & Darjeeling Sightseeing", description: "Sunrise over Kanchenjunga, Batasia Loop, Ghoom Monastery, HMI, Zoo, and Tibetan Centre.", meal: "Breakfast & Dinner", stay: "Darjeeling Hotel" },
      { day: 6, title: "Darjeeling to Siliguri Departure", description: "Descent to NJP Railway Station / Bagdogra Airport.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Tsomgo Lake", "Buddha Park Ravangla", "Pelling Skywalk", "Pemayangtse Monastery", "Tiger Hill", "Batasia Loop"],
    accommodation: "2N Gangtok + 1N Pelling + 2N Darjeeling.",
    transportation: "Private dedicated SUV / Sedan throughout.",
    inclusions: [
      "5 nights hotel accommodation",
      "Daily breakfast & dinner",
      "Tsomgo Lake permit & transport",
      "All inter-state transfers & sightseeing",
      "Siliguri team on-ground support",
    ],
    exclusions: ["Nathula Pass supplement", "Personal expenses", "GST 5%"],
    travelInfo: ["Excellent circuit for families and honeymooners seeking mountain vistas."],
    faqs: [
      { question: "Is this tour strenuous?", answer: "It is a leisurely driving tour suitable for all age groups with comfortable paved routes." },
    ],
    featured: true,
  },
  {
    id: "gangtok-lachung-yumthang-5n-6d",
    slug: "gangtok-lachung-yumthang-5n-6d",
    title: "Gangtok, Lachung & Yumthang Valley Snow Circuit (5N / 6D)",
    duration: "5 Nights / 6 Days",
    durationNightsDays: "5N / 6D",
    category: "sikkim",
    categoryLabel: "Sikkim Packages",
    destinationsCovered: ["Gangtok", "Tsomgo Lake", "Lachung", "Yumthang Valley", "Zero Point"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station",
    shortDescription: "Venture deep into North Sikkim's pristine alpine snow valleys, rhododendron meadows, hot springs, and Zero Point.",
    overview: "Immerse yourself in raw Himalayan beauty. Discover high-altitude glacial meadows, quaint wooden hamlets in Lachung, and touch snow at Zero Point (15,300 ft).",
    bannerImage: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    itinerary: [
      { day: 1, title: "Arrival Siliguri to Gangtok", description: "Transfer to Gangtok. Evening at leisure.", meal: "Dinner", stay: "Gangtok Hotel" },
      { day: 2, title: "Tsomgo Lake & Baba Mandir Excursion", description: "Visit holy Tsomgo Lake at 12,400 ft and Baba Harbhajan Mandir.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 3, title: "Gangtok to Lachung (125 km / ~6 hrs)", description: "Drive along the wild North Sikkim highway passing Seven Sister Waterfalls, Naga Falls, and Chungthang confluence. Check in at Lachung.", meal: "Breakfast & Dinner", stay: "Lachung Mountain Resort" },
      { day: 4, title: "Yumthang Valley & Zero Point Excursion, Return to Gangtok", description: "Early morning drive to Yumthang Valley (11,800 ft) and further to Zero Point (15,300 ft) with perennial snow. Visit hot springs. Post lunch, drive back to Gangtok.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 5, title: "Gangtok Local Sightseeing & MG Marg", description: "Visit Rumtek Monastery, Do Drul Chorten, and shopping on MG Marg.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 6, title: "Gangtok to Siliguri Departure", description: "Drop off at NJP / Bagdogra.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Tsomgo Lake", "Lachung Chu", "Yumthang Valley", "Zero Point", "Seven Sister Falls", "Rumtek"],
    accommodation: "4N Gangtok + 1N Lachung.",
    transportation: "Robust high-clearance SUV for North Sikkim terrain.",
    inclusions: [
      "5 nights accommodation with MAP meals",
      "North Sikkim special protected area permit (PAP)",
      "Dedicated mountain driver & vehicle",
      "All toll, parking, and driver charges",
    ],
    exclusions: ["Zero Point local vehicle supplement (direct payment)", "Heavy snow gear rental", "GST 5%"],
    travelInfo: ["North Sikkim requires advance permits. Keep original ID and 4 photos handy."],
    faqs: [
      { question: "Is snow guaranteed at Zero Point?", answer: "Zero Point has snow almost 10 months a year, making it one of India's top snow spots." },
    ],
    featured: true,
  },
  {
    id: "complete-sikkim-tour-7n-8d",
    slug: "complete-sikkim-tour-7n-8d",
    title: "Complete Sikkim Grand Odyssey (7N / 8D)",
    duration: "7 Nights / 8 Days",
    durationNightsDays: "7N / 8D",
    category: "sikkim",
    categoryLabel: "Sikkim Packages",
    destinationsCovered: ["Gangtok", "Tsomgo Lake", "Lachen", "Gurudongmar Lake", "Lachung", "Yumthang", "Pelling"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station",
    shortDescription: "The definitive Sikkim expedition covering East, North, and West Sikkim: Gurudongmar Lake, Yumthang Valley, and Pelling Kanchenjunga.",
    overview: "Our flagship grand circuit for explorers wanting to see it all. From sacred Gurudongmar Lake at 17,800 ft to the monasteries of Pelling and bustling Gangtok.",
    bannerImage: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    itinerary: [
      { day: 1, title: "Siliguri to Gangtok", description: "Transfer from NJP / Bagdogra to Gangtok. MG Marg leisure.", meal: "Dinner", stay: "Gangtok Hotel" },
      { day: 2, title: "Tsomgo Lake & Baba Mandir", description: "Glacial lake trip at 12,400 ft.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 3, title: "Gangtok to Lachen (120 km / ~6 hrs)", description: "Drive to high Lachen valley past Seven Sisters and Chungthang.", meal: "Breakfast & Dinner", stay: "Lachen Stay" },
      { day: 4, title: "Gurudongmar Lake (17,800 ft) & Transfer to Lachung", description: "Early morning expedition across Cold Desert to holy Gurudongmar Lake. Marvel at turquoise sacred water against snow peaks. Transfer to Lachung.", meal: "Breakfast & Dinner", stay: "Lachung Stay" },
      { day: 5, title: "Yumthang Valley & Zero Point to Gangtok", description: "Explore Yumthang Valley and hot springs. Return to Gangtok.", meal: "Breakfast & Dinner", stay: "Gangtok Hotel" },
      { day: 6, title: "Gangtok to Pelling via Ravangla", description: "Visit Buddha Park in Ravangla, drive to Pelling with frontal Kanchenjunga views.", meal: "Breakfast & Dinner", stay: "Pelling Hotel" },
      { day: 7, title: "Pelling Skywalk & Heritage Sightseeing", description: "Visit Glass Skywalk, Pemayangtse Monastery, Rabdentse Ruins, and waterfalls.", meal: "Breakfast & Dinner", stay: "Pelling Hotel" },
      { day: 8, title: "Pelling to Siliguri Departure", description: "Scenic transfer back to Bagdogra Airport / NJP Station.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Gurudongmar Lake", "Yumthang Valley", "Zero Point", "Tsomgo Lake", "Pelling Skywalk", "Buddha Park Ravangla"],
    accommodation: "Handpicked mountain resorts & hotels across Gangtok, Lachen, Lachung, and Pelling.",
    transportation: "High-clearance 4WD / SUV for North Sikkim and smooth touring vehicle.",
    inclusions: [
      "7 nights accommodation with breakfast & dinner",
      "North Sikkim inner line permits for Lachen & Lachung",
      "Gurudongmar & Yumthang permits",
      "Dedicated private fleet and professional mountain driver",
    ],
    exclusions: ["Zero Point / Nathula pass supplements", "Personal items", "GST 5%"],
    travelInfo: ["Children below 5 years and elderly guests with severe respiratory conditions are advised against staying at Lachen/Gurudongmar."],
    faqs: [
      { question: "Is Gurudongmar Lake open year round?", answer: "It remains accessible from March to November. During heavy winter snowfall in Dec-Jan, local police regulate access." },
    ],
  },

  // OTHER DESTINATIONS
  {
    id: "bhutan-5n-6d",
    slug: "bhutan-5n-6d",
    title: "Bhutan Cultural Wonder & Tiger's Nest (5N / 6D)",
    duration: "5 Nights / 6 Days",
    durationNightsDays: "5N / 6D",
    category: "other",
    categoryLabel: "Bhutan Packages",
    destinationsCovered: ["Phuentsholing", "Thimphu", "Punakha", "Dochula Pass", "Paro", "Tiger's Nest"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station or Phuentsholing Border",
    shortDescription: "Experience the Kingdom of Happiness. Explore grand Dzongs, prayer-wheeled valleys, Dochula Pass, and hike to Tiger's Nest.",
    overview: "An enchanting journey into the Last Shangri-La. Starting conveniently from Siliguri via Phuentsholing, explore Bhutan's capital Thimphu, majestic Punakha Dzong, and sacred Paro Taktsang.",
    bannerImage: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    itinerary: [
      { day: 1, title: "Siliguri to Phuentsholing / Thimphu", description: "Pick up from Siliguri / Bagdogra, cross into Phuentsholing. Complete immigration formalities and drive to Thimphu (altitude 7,600 ft).", meal: "Dinner", stay: "Thimphu Hotel" },
      { day: 2, title: "Thimphu Cultural Sightseeing", description: "Visit Buddha Dordenma (giant bronze Buddha), National Memorial Chorten, Motithang Takin Preserve, Folk Heritage Museum, and Tashichho Dzong.", meal: "Breakfast & Dinner", stay: "Thimphu Hotel" },
      { day: 3, title: "Thimphu to Punakha via Dochula Pass (10,170 ft)", description: "Drive across panoramic Dochula Pass with 108 memorial chortens and views of the snow-clad Bhutanese Himalayas. Visit majestic Punakha Dzong at the confluence of Pho Chhu and Mo Chhu.", meal: "Breakfast & Dinner", stay: "Punakha Hotel" },
      { day: 4, title: "Punakha to Paro", description: "Drive to Paro valley. Visit Rinpung Dzong, National Museum (Ta Dzong), and Paro town market.", meal: "Breakfast & Dinner", stay: "Paro Hotel" },
      { day: 5, title: "Paro Tiger's Nest Monastery Hike", description: "Hike to the legendary Paro Taktsang (Tiger's Nest) clinging to a granite cliff 3,000 ft above the valley floor. In the evening, try a traditional Bhutanese hot stone bath.", meal: "Breakfast & Dinner", stay: "Paro Hotel" },
      { day: 6, title: "Paro to Siliguri / Phuentsholing Departure", description: "Drive back to Phuentsholing border and transfer to Bagdogra / NJP.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Tiger's Nest", "Punakha Dzong", "Dochula Pass", "Buddha Dordenma", "Tashichho Dzong", "Takin Preserve"],
    accommodation: "3-Star and 4-Star Certified Bhutanese boutique heritage hotels.",
    transportation: "Comfortable private tourist vehicle with certified driver.",
    inclusions: [
      "5 nights hotel stay",
      "Breakfast and dinner",
      "Bhutan entry permit assistance",
      "All transfers from Siliguri to Bhutan and return",
      "Local licensed Bhutanese English-speaking tour guide",
    ],
    exclusions: ["Bhutan Sustainable Development Fee (SDF) as applicable per government norms", "Travel insurance", "GST 5%"],
    travelInfo: ["Indian nationals need a valid Passport (min 6 months validity) or Voter ID Card."],
    faqs: [
      { question: "Is an Indian driving license valid for Bhutan entry?", answer: "No, only original Indian Passport or Voter Identity Card is accepted by Bhutan immigration." },
    ],
    featured: true,
  },
  {
    id: "nepal-5n-6d",
    slug: "nepal-5n-6d",
    title: "Nepal Himalayan Explorer: Kathmandu & Pokhara (5N / 6D)",
    duration: "5 Nights / 6 Days",
    durationNightsDays: "5N / 6D",
    category: "other",
    categoryLabel: "Nepal Packages",
    destinationsCovered: ["Kakarbhitta Border", "Kathmandu", "Pokhara", "Phewa Lake", "Sarangkot"],
    pickupDrop: "Bagdogra Airport (IXB) / NJP Railway Station or Kakarbhitta",
    shortDescription: "Experience ancient UNESCO world heritage durbar squares, sacred Pashupatinath, serene boating on Pokhara's Phewa Lake, and Annapurna sunrise.",
    overview: "Easily accessible from Siliguri through the Panitanki / Kakarbhitta border. Discover the spiritual majesty of Kathmandu and the serene lakeside adventure capital of Pokhara.",
    bannerImage: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    itinerary: [
      { day: 1, title: "Siliguri to Kathmandu", description: "Meet in Siliguri, border crossing assistance at Kakarbhitta and scenic transfer/flight to Kathmandu. Check-in and relax.", meal: "Dinner", stay: "Kathmandu Hotel" },
      { day: 2, title: "Kathmandu Valley Sightseeing", description: "Visit Pashupatinath Temple, Boudhanath Stupa, Swayambhunath (Monkey Temple), and historic Kathmandu Durbar Square.", meal: "Breakfast & Dinner", stay: "Kathmandu Hotel" },
      { day: 3, title: "Kathmandu to Pokhara (Scenic Drive / Optional Flight)", description: "Drive along the Trishuli River to the picturesque valley of Pokhara under the shadow of the Annapurnas. Evening boat ride on Phewa Lake.", meal: "Breakfast & Dinner", stay: "Pokhara Hotel" },
      { day: 4, title: "Sarangkot Sunrise & Pokhara Sightseeing", description: "Early morning sunrise from Sarangkot overlooking Machapuchare (Fishtail) and Annapurna peaks. Visit Davis Falls, Gupteshwor Cave, and Peace Pagoda.", meal: "Breakfast & Dinner", stay: "Pokhara Hotel" },
      { day: 5, title: "Pokhara to Kathmandu", description: "Return drive to Kathmandu. Evening free for souvenir shopping in Thamel.", meal: "Breakfast & Dinner", stay: "Kathmandu Hotel" },
      { day: 6, title: "Departure", description: "Transfer back to Siliguri via border or onward travel.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Pashupatinath", "Boudhanath", "Phewa Lake", "Sarangkot Sunrise", "Davis Falls", "Thamel"],
    accommodation: "Deluxe hotel accommodation in Kathmandu and Pokhara.",
    transportation: "Private dedicated vehicle throughout.",
    inclusions: ["5 nights hotel accommodation", "Daily breakfast & dinner", "Sightseeing & transfers", "Border entry assistance"],
    exclusions: ["Temple entry tickets", "Paragliding/adventure activities", "GST 5%"],
    travelInfo: ["No visa required for Indian citizens; valid Voter ID or Passport required."],
    faqs: [
      { question: "Can we do paragliding in Pokhara?", answer: "Yes, Pokhara is one of the world's premier tandem paragliding spots; we can arrange it." },
    ],
  },
  {
    id: "meghalaya-5n-6d",
    slug: "meghalaya-5n-6d",
    title: "Meghalaya Abode of Clouds & Living Root Bridges (5N / 6D)",
    duration: "5 Nights / 6 Days",
    durationNightsDays: "5N / 6D",
    category: "other",
    categoryLabel: "Northeast Packages",
    destinationsCovered: ["Guwahati", "Shillong", "Cherrapunji", "Dawki", "Mawlynnong"],
    pickupDrop: "Guwahati Airport (GAU) / Railway Station or Siliguri Connect",
    shortDescription: "Trek to UNESCO living root bridges, cruise the crystal waters of Umngot River in Dawki, and marvel at roaring waterfalls in Cherrapunji.",
    overview: "Immerse in the cleanest, greenest landscapes of Northeast India. Explore Scotland of the East (Shillong), Asia's cleanest village, and crystal rivers.",
    bannerImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    itinerary: [
      { day: 1, title: "Guwahati to Shillong (100 km / ~3 hrs)", description: "Meet at Guwahati, stop at scenic Umiam Lake (Barapani). Check in at Shillong hotel. Evening visit Police Bazar.", meal: "Dinner", stay: "Shillong Hotel" },
      { day: 2, title: "Shillong to Cherrapunji (Sohra)", description: "Visit Elephant Falls, Mawkdok Dympep Valley Viewpoint, Nohkalikai Falls (India's tallest plunge waterfall), Mawsmai Caves, and Seven Sisters Falls.", meal: "Breakfast & Dinner", stay: "Cherrapunji Resort" },
      { day: 3, title: "Double Decker Living Root Bridge Trek", description: "Trek through lush subtropical forests in Nongriat to marvel at the indigenous bio-engineering wonder: the Double Decker Living Root Bridge.", meal: "Breakfast & Dinner", stay: "Cherrapunji Resort" },
      { day: 4, title: "Mawlynnong & Dawki Crystal River", description: "Visit Mawlynnong, celebrated as Asia's Cleanest Village. Continue to Dawki on the Indo-Bangladesh border for boating on the mirror-like Umngot River. Drive to Shillong.", meal: "Breakfast & Dinner", stay: "Shillong Hotel" },
      { day: 5, title: "Shillong Local Sightseeing", description: "Don Bosco Museum, Laitlum Canyons, Ward's Lake, and Cathedral of Mary Help of Christians.", meal: "Breakfast & Dinner", stay: "Shillong Hotel" },
      { day: 6, title: "Shillong to Guwahati Departure", description: "Transfer to Guwahati Airport with blessings at Kamakhya Temple on route.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Nohkalikai Falls", "Double Decker Root Bridge", "Dawki Umngot River", "Mawlynnong", "Laitlum Canyons", "Umiam Lake"],
    accommodation: "Scenic resorts and boutique hotels in Shillong and Cherrapunji.",
    transportation: "Exclusive private tourist vehicle.",
    inclusions: ["5 nights accommodation", "Breakfast & Dinner", "All sightseeing & transfers", "Boating in Dawki"],
    exclusions: ["Guide charges for root bridge trek", "Personal gear", "GST 5%"],
    travelInfo: ["Root bridge trek involves steps; sturdy walking shoes are mandatory."],
    faqs: [
      { question: "Is Dawki water always crystal clear?", answer: "The river is crystal clear from October to May outside the monsoon season." },
    ],
    featured: true,
  },
  {
    id: "northeast-india-7n-8d",
    slug: "northeast-india-7n-8d",
    title: "Northeast India Grand Circuit: Assam & Meghalaya (7N / 8D)",
    duration: "7 Nights / 8 Days",
    durationNightsDays: "7N / 8D",
    category: "other",
    categoryLabel: "Northeast Packages",
    destinationsCovered: ["Guwahati", "Kaziranga National Park", "Shillong", "Cherrapunji", "Dawki"],
    pickupDrop: "Guwahati Airport / Railway Station or Siliguri Connect",
    shortDescription: "A legendary wildlife and nature journey: one-horned rhinos in Kaziranga, mist-clad waterfalls in Cherrapunji, and transparent Dawki waters.",
    overview: "Unite the best of Assam's UNESCO wildlife sanctuaries with Meghalaya's mystical caves, root bridges, and pine forests.",
    bannerImage: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    itinerary: [
      { day: 1, title: "Arrival Guwahati to Kaziranga National Park", description: "Meet at Guwahati and drive to Kaziranga. Evening Assamese cultural dance performance.", meal: "Dinner", stay: "Kaziranga Jungle Resort" },
      { day: 2, title: "Kaziranga Wildlife Safari", description: "Early morning Elephant Safari followed by afternoon 4x4 Jeep Safari in the Western or Central range to spot the Great Indian One-horned Rhinoceros, wild water buffaloes, and birds.", meal: "Breakfast & Dinner", stay: "Kaziranga Jungle Resort" },
      { day: 3, title: "Kaziranga to Shillong", description: "Drive to the hills of Shillong stopping at Umiam Lake. Evening at leisure.", meal: "Breakfast & Dinner", stay: "Shillong Hotel" },
      { day: 4, title: "Shillong to Cherrapunji", description: "Nohkalikai Falls, Mawsmai Cave, Seven Sisters Falls, and Eco Park.", meal: "Breakfast & Dinner", stay: "Cherrapunji Resort" },
      { day: 5, title: "Living Root Bridge Exploration", description: "Discover the living root bridges and serene waterfalls.", meal: "Breakfast & Dinner", stay: "Cherrapunji Resort" },
      { day: 6, title: "Dawki & Mawlynnong to Shillong", description: "Boating on transparent Umngot River, visit clean village Mawlynnong, return to Shillong.", meal: "Breakfast & Dinner", stay: "Shillong Hotel" },
      { day: 7, title: "Shillong & Laitlum Canyons", description: "Panoramic visit to the breathtaking amphitheater of Laitlum Canyons.", meal: "Breakfast & Dinner", stay: "Shillong Hotel" },
      { day: 8, title: "Departure via Kamakhya Temple", description: "Morning visit to Kamakhya Devi Temple and transfer to Guwahati Airport.", meal: "Breakfast", stay: "Departure" },
    ],
    placesCovered: ["Kaziranga Wildlife Safari", "Nohkalikai Falls", "Dawki River", "Living Root Bridge", "Laitlum Canyons", "Kamakhya Temple"],
    accommodation: "7 nights in handpicked wildlife resorts & hill view hotels.",
    transportation: "Private dedicated SUV / tempo traveller.",
    inclusions: ["7 nights hotel accommodation", "Breakfast and dinner", "Kaziranga Jeep Safari permit & vehicle", "All transfers and sightseeing"],
    exclusions: ["Kaziranga elephant safari (optional subject to booking)", "Personal expenses", "GST 5%"],
    travelInfo: ["Kaziranga Park opens from October to May every year."],
    faqs: [
      { question: "Is Kaziranga safe for children?", answer: "Yes, children thoroughly enjoy the jeep safari and seeing rhinos, elephants, and deer in their natural habitat." },
    ],
  },
];

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  capacity: string;
  luggage: string;
  acType: string;
  terrainSuitability: string;
  bestFor: string;
  features: string[];
  image: string;
}

export const VEHICLES: Vehicle[] = [
  {
    id: "maruti-swift",
    name: "Maruti Swift",
    category: "Hatchback",
    capacity: "4 Passengers",
    luggage: "2 Medium Bags",
    acType: "Air Conditioned",
    terrainSuitability: "City Transfers & Smooth Hill Roads",
    bestFor: "Couples, Solo Travelers & Quick Siliguri Drops",
    features: ["Economical & Agile", "Comfortable Seating", "Clean & Sanitized Interiors", "Experienced Mountain Chauffeur"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "maruti-dzire",
    name: "Maruti Dzire",
    category: "Sedan",
    capacity: "4 Passengers",
    luggage: "3 Medium Bags",
    acType: "Air Conditioned",
    terrainSuitability: "City, Airport & Darjeeling / Kalimpong Highway",
    bestFor: "Small Families, Business Transfers & Couples",
    features: ["Spacious Boot Space", "Smooth Ride Comfort", "Modern Audio System", "Polite Local Driver"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wagonr",
    name: "Maruti WagonR",
    category: "Compact Hatchback",
    capacity: "4 Passengers",
    luggage: "2 Bags",
    acType: "Air Conditioned",
    terrainSuitability: "Siliguri Local, NJP, Bagdogra & Gentle Slopes",
    bestFor: "Budget-conscious Travelers & Quick Station Transfers",
    features: ["Tall Boy Design for Easy Entry", "Budget Friendly Rates", "High Fuel Efficiency", "Prompt On-Time Pickup"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "toyota-innova",
    name: "Toyota Innova",
    category: "Premium SUV / MUV",
    capacity: "6 to 7 Passengers",
    luggage: "4 Large Bags",
    acType: "Dual Air Conditioned",
    terrainSuitability: "All Mountain Highways & Hill Stations",
    bestFor: "Family Vacations, Executive Travel & Darjeeling-Gangtok Circuits",
    features: ["Legendary Himalayan Reliability", "Captain Seats / Bench Options", "Exceptional Legroom", "High Ground Clearance"],
    image: "/src/assets/images/himalayan_taxi_suv_1794309511238.jpg",
  },
  {
    id: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    category: "Luxury Mountain SUV",
    capacity: "6 to 7 Passengers",
    luggage: "5 Large Bags",
    acType: "Climate Controlled Dual AC",
    terrainSuitability: "All Mountain Highways, Bhutan Border & Sikkim",
    bestFor: "Luxury Family Holidays, VIP Delegates & Honeymooners",
    features: ["Plush Leather Reclining Seats", "Ultra-Smooth Suspension", "USB Charging Ports", "Verified Top-Rated Chauffeurs"],
    image: "/src/assets/images/himalayan_taxi_suv_1794309511238.jpg",
  },
  {
    id: "mahindra-bolero",
    name: "Mahindra Bolero",
    category: "Rugged Mountain SUV",
    capacity: "7 to 8 Passengers",
    luggage: "4 Bags + Roof Carrier",
    acType: "AC / Non-AC Available",
    terrainSuitability: "Rugged Mountain Slopes, Offbeat Stays & North Sikkim",
    bestFor: "Rugged Hill Terrains, Offbeat Homestays & Budget Groups",
    features: ["Sturdy Metal Body", "High Ground Clearance for Rock Slopes", "Heavy Duty Suspension", "Himalayan Route Veteran Driver"],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tata-sumo",
    name: "Tata Sumo Gold",
    category: "Utility SUV",
    capacity: "8 to 9 Passengers",
    luggage: "5 Bags + Secure Top Carrier",
    acType: "Non-AC / AC",
    terrainSuitability: "Steep Incline Mountain Roads & Group Transfers",
    bestFor: "Student Groups, Trekking Parties & Budget Family Circles",
    features: ["Maximum Seating Utility", "Sturdy Hill Climber", "Secure Luggage Carrier", "Cost-effective Group Commute"],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tempo-traveller",
    name: "Force Tempo Traveller",
    category: "Luxury Mini Coach",
    capacity: "12 to 16 Passengers",
    luggage: "10+ Large Bags with Top Rack",
    acType: "Individual Air Vents",
    terrainSuitability: "Major Mountain Highways & Inter-State Circuits",
    bestFor: "Corporate Retreats, Wedding Groups & Large Family Caravans",
    features: ["Pushback Ergonomic Seats", "Spacious Aisle Space", "Surround Music System", "Experienced Long-Haul Crew"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
  },
];

export interface TaxiRoute {
  id: string;
  from: string;
  to: string;
  distance: string;
  estimatedTime: string;
  routeType: string;
  description: string;
}

export const POPULAR_TAXI_ROUTES: TaxiRoute[] = [
  {
    id: "ixb-to-darjeeling",
    from: "Bagdogra Airport (IXB)",
    to: "Darjeeling",
    distance: "70 km",
    estimatedTime: "2.5 to 3.5 Hours",
    routeType: "Airport Transfer",
    description: "Scenic climb via Rohini / Kurseong or Pankhabari through tea plantations.",
  },
  {
    id: "ixb-to-gangtok",
    from: "Bagdogra Airport (IXB)",
    to: "Gangtok",
    distance: "125 km",
    estimatedTime: "4 to 5 Hours",
    routeType: "Airport Transfer",
    description: "Serene valley drive along the emerald Teesta river into Sikkim.",
  },
  {
    id: "njp-to-darjeeling",
    from: "NJP Railway Station",
    to: "Darjeeling",
    distance: "72 km",
    estimatedTime: "3 Hours",
    routeType: "Railway Station Pickup",
    description: "Direct punctual pick-up from NJP platform gate to your Darjeeling hotel door.",
  },
  {
    id: "njp-to-gangtok",
    from: "NJP Railway Station",
    to: "Gangtok",
    distance: "120 km",
    estimatedTime: "4.5 Hours",
    routeType: "Railway Station Pickup",
    description: "Hassle-free transfers with permit coordination at Rangpo border checkpoint.",
  },
  {
    id: "siliguri-local",
    from: "Siliguri / Salugara",
    to: "Local Sightseeing & Shopping",
    distance: "Variable",
    estimatedTime: "Full Day / Half Day",
    routeType: "City Sightseeing",
    description: "Visits to Bengal Safari, ISKCON Temple, Salugara Monastery, and Hong Kong Market.",
  },
  {
    id: "darjeeling-sightseeing",
    from: "Darjeeling Hotel",
    to: "Tiger Hill & 7-Point Points",
    distance: "35 km circuit",
    estimatedTime: "Early Morning + Day",
    routeType: "Hill Sightseeing",
    description: "Early 4:00 AM Tiger Hill sunrise, Batasia Loop, Ghoom, HMI, and Zoo tour.",
  },
  {
    id: "north-sikkim-safari",
    from: "Gangtok",
    to: "Lachen, Lachung, Yumthang & Gurudongmar",
    distance: "Excursion Package",
    estimatedTime: "2 Nights / 3 Days",
    routeType: "High Altitude Terrain",
    description: "Permit-ready 4WD Bolero/Innova fleet with seasoned high-altitude drivers.",
  },
  {
    id: "bhutan-border",
    from: "Bagdogra / Siliguri",
    to: "Phuentsholing / Jaigaon (Bhutan Border)",
    distance: "155 km",
    estimatedTime: "3.5 to 4 Hours",
    routeType: "International Border Transfer",
    description: "Smooth transit through the Dooars tea corridor right to the Bhutan entry gate.",
  },
];

export interface HotelListing {
  id: string;
  name: string;
  destination: string;
  category: "Luxury" | "Resort" | "Boutique" | "Homestay" | "Budget";
  rating: number;
  viewType: string;
  amenities: string[];
  description: string;
  image: string;
}

export const HOTELS: HotelListing[] = [
  {
    id: "hotel-darjeeling-luxury",
    name: "The Grand Kanchenjunga Heritage Retreat",
    destination: "Darjeeling",
    category: "Luxury",
    rating: 5,
    viewType: "Direct Kanchenjunga Sunrise View",
    amenities: ["Free Wi-Fi", "In-house Multi-cuisine Restaurant", "Room Heating", "Tea Tasting Lounge", "Travel Desk"],
    description: "Perched near Mall Road with grand panoramic glass balconies framing the majestic Kanchenjunga peaks.",
    image: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
  },
  {
    id: "hotel-gangtok-resort",
    name: "Sikkim Orchid Mountain Spa Resort",
    destination: "Gangtok",
    category: "Resort",
    rating: 5,
    viewType: "Sprawling Valley & Pine Forest View",
    amenities: ["Organic Garden Dining", "Heated Rooms", "Spa & Wellness", "Kids Play Area", "Bonfire Evenings"],
    description: "Serene eco-luxury nestled amidst terraced cardamom and orchid groves with warm Sikkimese hospitality.",
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
  },
  {
    id: "hotel-pelling-boutique",
    name: "Pelling Alpine Peaks Boutique Hotel",
    destination: "Pelling",
    category: "Boutique",
    rating: 4,
    viewType: "Frontal Snow Peaks & Monastic Valley",
    amenities: ["Rooftop Observation Deck", "Traditional Wooden Accents", "Doctor on Call", "Buffet Breakfast"],
    description: "Boutique hillside hotel minutes away from the famous Pelling Skywalk and Pemayangtse Monastery.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hotel-lachung-homestay",
    name: "Lachung Snow Valley Pine Homestay",
    destination: "Lachung (North Sikkim)",
    category: "Homestay",
    rating: 4,
    viewType: "Snow Capped Mountain Streams",
    amenities: ["Wood Heaters (Bukhari)", "Fresh Home-cooked Tibetan Food", "Electric Blankets", "Hot Water Supply"],
    description: "Experience authentic warm mountain village hospitality with traditional timber architecture and hearty meals.",
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
  },
  {
    id: "hotel-kalimpong-resort",
    name: "Kalimpong Pine Haven Resort & Gardens",
    destination: "Kalimpong",
    category: "Resort",
    rating: 4,
    viewType: "Teesta River Valley & Rolling Hills",
    amenities: ["Exotic Flower Gardens", "Outdoor Gazebo", "Wi-Fi", "Campfire", "Sightseeing Coordination"],
    description: "Surrounded by blooming orchids and pine forests on Deolo Hill slope, offering peace and unhurried charm.",
    image: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
  },
  {
    id: "hotel-darjeeling-budget",
    name: "Cedar Crest Cozy Inn",
    destination: "Darjeeling",
    category: "Budget",
    rating: 4,
    viewType: "Town View & Mountain Slopes",
    amenities: ["Piped Hot Water", "Clean Bedding", "Room Service", "Walking Distance to Mall", "Luggage Storage"],
    description: "Clean, comfortable, and wallet-friendly accommodations located just a 3-minute stroll from Chowrasta.",
    image: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
  },
];

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  category: "darjeeling" | "kanchenjunga" | "valleys" | "snow" | "monasteries" | "lakes" | "culture";
  categoryLabel: string;
  image: string;
  description: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "Sunrise Glow over Mount Kanchenjunga",
    location: "Tiger Hill, Darjeeling",
    category: "kanchenjunga",
    categoryLabel: "Kanchenjunga Views",
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    description: "The world's third highest peak glowing with fiery golden radiance at the break of dawn.",
  },
  {
    id: "g2",
    title: "Terraced Tea Gardens in Morning Mist",
    location: "Darjeeling Hills",
    category: "darjeeling",
    categoryLabel: "Darjeeling Landscapes",
    image: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
    description: "Endless rolling green carpets of organic tea gardens enveloped in soft mountain mist.",
  },
  {
    id: "g3",
    title: "Sacred Glacial Tsomgo Lake with Prayer Flags",
    location: "East Sikkim (12,400 ft)",
    category: "lakes",
    categoryLabel: "Lakes & Waterfalls",
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    description: "Turquoise glacial water reflecting the crisp alpine sky adorned with Buddhist prayer flags.",
  },
  {
    id: "g4",
    title: "Premium Fleet on Scenic Mountain Highway",
    location: "Sikkim-Bengal Highway",
    category: "culture",
    categoryLabel: "Himalayan Roads",
    image: "/src/assets/images/himalayan_taxi_suv_1794309511238.jpg",
    description: "Comfortable, sanitized mountain SUVs navigating panoramic bends across pine valleys.",
  },
  {
    id: "g5",
    title: "Snow-capped Peaks of North Sikkim",
    location: "Zero Point, Yumesamdong (15,300 ft)",
    category: "snow",
    categoryLabel: "Snow Mountains",
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    description: "Year-round snow landscapes where the high Himalayas meet the cold alpine sky.",
  },
  {
    id: "g6",
    title: "Golden Buddha Statue at Tathagata Tsal",
    location: "Ravangla, South Sikkim",
    category: "monasteries",
    categoryLabel: "Monasteries & Heritage",
    image: "/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg",
    description: "The monumental 130-foot Golden Buddha surrounded by manicured spiritual gardens.",
  },
  {
    id: "g7",
    title: "Pristine Rhododendron Blooms in Yumthang",
    location: "Yumthang Valley of Flowers",
    category: "valleys",
    categoryLabel: "Sikkim Valleys",
    image: "/src/assets/images/sikkim_glacier_lake_1794309511944.jpg",
    description: "Vibrant alpine meadows blanketed in wild flowers during spring months.",
  },
  {
    id: "g8",
    title: "Colonial Charm & Heritage Toy Train Route",
    location: "Batasia Loop, Darjeeling",
    category: "darjeeling",
    categoryLabel: "Darjeeling Landscapes",
    image: "/src/assets/images/darjeeling_tea_gardens_1794309511066.jpg",
    description: "Historic spiral railway track offering unmatched 360-degree vistas of the hills.",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  destinationVisited: string;
  rating: number;
  reviewDate: string;
  feedback: string;
}

export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh & Meera Sharma",
    location: "Kolkata, West Bengal",
    destinationVisited: "Darjeeling & Gangtok Golden Tour (5N / 6D)",
    rating: 5,
    reviewDate: "November 2025",
    feedback: "Aadhya Gorkha Travels arranged our family trip with exceptional attention to detail. The Innova vehicle was spotless, driver was exceptionally courteous on steep curves, and our Kanchenjunga view hotel in Darjeeling was breathtaking. Prompt WhatsApp support throughout!",
  },
  {
    id: "t2",
    name: "Dr. Ananya Mukherjee",
    location: "Bengaluru, Karnataka",
    destinationVisited: "North Sikkim & Yumthang Snow Circuit (5N / 6D)",
    rating: 5,
    reviewDate: "December 2025",
    feedback: "Visiting Gurudongmar Lake and Zero Point seemed daunting with permits, but the team at Salugara handled everything smoothly. Clear guidance, transparent pricing, and wonderful local homestays in Lachung. Highly recommended for Northeast travel!",
  },
  {
    id: "t3",
    name: "Vikram & Sneha Singhania",
    location: "Mumbai, Maharashtra",
    destinationVisited: "Bhutan Cultural Wonder (5N / 6D)",
    rating: 5,
    reviewDate: "January 2026",
    feedback: "We opted for their Bhutan package starting from Bagdogra. Everything from the border pickup at Phuentsholing, hotel bookings in Thimphu & Paro, to the Tiger's Nest hike guide was flawless. Truly the local experts you can rely on.",
  },
  {
    id: "t4",
    name: "Amitav & Suniti Das",
    location: "Guwahati, Assam",
    destinationVisited: "Pelling & Ravangla Family Retreat (4N / 5D)",
    rating: 5,
    reviewDate: "February 2026",
    feedback: "The taxi service from NJP was right on time with a warm welcome. Traveling with my elderly parents, comfort was our top priority and Aadhya Gorkha Travels delivered 100%. Transparent pricing with zero hidden costs.",
  },
];
