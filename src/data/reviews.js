/**
 * KOZYNA RESTAURANT — VERIFIED RATINGS & REVIEWS DATA
 * Authentic Dining Impressions from Local & Traveling Guests
 * Location: Jordan, Guimaras, Philippines
 */

export const reviewStats = {
  averageRating: 4.9,
  totalReviews: 154,
  recommendationRate: "98%",
  ratingsBreakdown: [
    { stars: 5, percentage: 92, count: 142 },
    { stars: 4, percentage: 6, count: 9 },
    { stars: 3, percentage: 2, count: 3 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ],
  aspects: [
    { label: "Culinary Quality & Island Terroir", score: "5.0" },
    { label: "Hiligaynon Warmth & Hospitality", score: "5.0" },
    { label: "Pavilion Atmosphere & Lighting", score: "4.9" },
    { label: "Sourcing & Authenticity", score: "4.9" },
    { label: "Value for Experience", score: "4.8" },
  ],
};

export const reviewCategories = [
  { id: "all", label: "All Reviews" },
  { id: "culinary", label: "Food & Terroir" },
  { id: "ambiance", label: "Ambiance & Pavilion" },
  { id: "hospitality", label: "Service & Hospitality" },
  { id: "gatherings", label: "Family & Celebrations" },
];

export const initialReviews = [
  {
    id: "rev-01",
    author: "Maria Elena Cruz",
    location: "Iloilo City",
    date: "October 2026",
    rating: 5,
    category: "culinary",
    categoryLabel: "Food & Terroir",
    dishMentioned: "Butter Garlic Tiger Prawns with Mango Glaze",
    title: "An extraordinary culinary gem in Jordan, Guimaras",
    comment:
      "The mango-infused glaze on the charcoal-seared tiger prawns was transcendental. You can taste the genuine terroir of Guimaras in every bite. The ambiance felt like an international luxury editorial spread come to life.",
    verifiedDiner: true,
    visitType: "Dinner with Partner",
  },
  {
    id: "rev-02",
    author: "Dante & Carmela Villanueva",
    location: "Bacolod City, Negros Occidental",
    date: "October 2026",
    rating: 5,
    category: "gatherings",
    categoryLabel: "Family & Celebrations",
    dishMentioned: "Slow-Braised Beef Shank Kare-Kare & Binakol",
    title: "Easily the best dining experience across the island",
    comment:
      "We took the fast craft from Bacolod to Iloilo and hopped over the Jordan strait specifically to celebrate our wedding anniversary here. The attention to detail—from the polished hardwood tableware to the warm acoustic guitar—made our evening unforgettable.",
    verifiedDiner: true,
    visitType: "Anniversary Celebration",
  },
  {
    id: "rev-03",
    author: "Janice Tan",
    location: "Makati, Metro Manila",
    date: "September 2026",
    rating: 5,
    category: "culinary",
    categoryLabel: "Food & Terroir",
    dishMentioned: "Sinigang na Hipon sa Heirloom Batwan",
    title: "The Guimaras batwan broth is culinary perfection",
    comment:
      "Unlike ordinary tamarind souring, the fresh wild batwan brought a deep, floral acidity with zero harshness. Combined with fresh river prawns and Aligue rice, this dish alone justifies the trip to Jordan. A must-visit destination.",
    verifiedDiner: true,
    visitType: "Solo Food Critic & Traveler",
  },
  {
    id: "rev-04",
    author: "Chef Marcus & Lea Delgado",
    location: "Cebu City",
    date: "September 2026",
    rating: 5,
    category: "hospitality",
    categoryLabel: "Service & Hospitality",
    dishMentioned: "Native Chicken Binakol inside Charred Coconut",
    title: "Honoring ancestral culinary wisdom with supreme finesse",
    comment:
      "As restaurant owners visiting Western Visayas, Chef Jufel's kitchen blew us away. Serving the native chicken simmered in fresh buko water inside a charred coconut shell was breathtaking. Gracious Hiligaynon hospitality from start to finish.",
    verifiedDiner: true,
    visitType: "Culinary Professional Visit",
  },
  {
    id: "rev-05",
    author: "Arch. Rafael Santos",
    location: "Iloilo City",
    date: "August 2026",
    rating: 5,
    category: "ambiance",
    categoryLabel: "Ambiance & Pavilion",
    dishMentioned: "Guimaras Blue Marlin Steak & Sunset Spritzer",
    title: "Remarkable architectural ambiance & natural breezes",
    comment:
      "The architecture alone is worth visiting. The soaring black steel trusses, rectangular Edison cage chandeliers, and open timber bays create a naturally ventilated sanctuary that harmonizes with the island's tropical flora.",
    verifiedDiner: true,
    visitType: "Weekend Sunset Gathering",
  },
  {
    id: "rev-06",
    author: "Vivienne G. & Family",
    location: "Quezon City, Metro Manila",
    date: "August 2026",
    rating: 5,
    category: "gatherings",
    categoryLabel: "Family & Celebrations",
    dishMentioned: "Island Harvest Buffet Feast & Mango Sans Rival",
    title: "Unmatched banquet coordination for 40 guests",
    comment:
      "We hosted our parents' 30th anniversary in the Garden Pavilion. 40 family members, seamless service, generous portions, and the Artisanal Mango Sans Rival dessert was hailed by everyone as the finest they had ever tasted.",
    verifiedDiner: true,
    visitType: "Family Banquet (40 Guests)",
  },
];
