/**
 * KOZYNA RESTAURANT — RESTAURANT DATA & CONFIGURATION
 * Location: Jordan, Guimaras, Western Visayas, Philippines
 */

import chefPortrait from '../assets/chef.jfif';
import restaurantLogo from '../assets/logo.jfif';
import interiorPhoto from '../assets/kozyna-interior-real.jpg';
import exteriorPhoto from '../assets/kozyna-exterior-real.jpg';

export const restaurantData = {
  name: "KOZYNA",
  logo: restaurantLogo,
  interiorPhoto,
  exteriorPhoto,
  tagline: "A Journey Through The Art of Dining",
  headline: "A Place at the Table",
  subtitle: "Artisanal Island Flavors & Contemporary Filipino Dining in the Heart of Guimaras",
  established: 2021,
  
  location: {
    island: "Guimaras",
    municipality: "Jordan",
    province: "Guimaras Province",
    region: "Western Visayas (Region VI)",
    country: "Philippines",
    postalCode: "5045",
    fullAddress: "San Miguel, Jordan, Guimaras 5045, Philippines",
    coordinates: {
      lat: 10.5936,
      lng: 122.5898,
    },
    landmarks: "5 minutes from Jordan Port / Guimaras Provincial Capitol",
    travelNote: "Easily accessible via Jordan Wharf (15-minute pump boat from Iloilo City Ortiz / Parola Wharf). Tricycles and private vehicles readily available at the terminal.",
    googleMapsUrl: "https://maps.google.com/?q=Kozyna+Restaurant+Jordan+Guimaras",
  },

  contact: {
    phone: "+63 917 845 2891",
    landline: "+63 (033) 396 1420",
    email: "reservations@kozyna.ph",
    inquiries: "hello@kozyna.ph",
  },

  operatingHours: [
    { days: "Monday – Thursday", hours: "10:30 AM – 9:00 PM", notes: "Lunch & Dinner" },
    { days: "Friday – Sunday", hours: "10:00 AM – 10:00 PM", notes: "Weekend Dining & Sunset Acoustic" },
    { days: "Public Holidays", hours: "10:00 AM – 10:00 PM", notes: "Reservations recommended" },
  ],

  socialLinks: [
    { name: "Facebook", handle: "@KozynaRestaurant", url: "https://facebook.com/kozyna" },
    { name: "Instagram", handle: "@kozyna.guimaras", url: "https://instagram.com/kozyna.guimaras" },
    { name: "TripAdvisor", handle: "Kozyna Guimaras", url: "https://tripadvisor.com" },
  ],

  story: {
    label: "OUR STORY",
    title: "More than just a place to eat.",
    narrative: [
      "Nestled amidst the gentle breezes of Jordan, Guimaras, Kozyna was born from a profound passion for culinary intimacy and the vibrant agricultural heritage of our island.",
      "Guimaras is internationally revered for producing the world's sweetest mangoes, exceptionally fresh coastal harvests, and a time-honored tradition of warm Hiligaynon hospitality. At Kozyna, we weave these natural bounties into an unforgettable dining narrative.",
      "Every recipe honors ancestral Filipino kitchen wisdom while embracing contemporary plating, balanced textures, and sustainable farm-to-fork sourcing from local Guimaras growers and artisanal fisherfolk.",
      "Whether sharing a quiet anniversary dinner, gathering for a grand multi-generational family reunion, or discovering the island after crossing the Iloilo Strait, Kozyna welcomes you to savor each moment with intention."
    ],
    pillars: [
      {
        title: "Island Provenance",
        description: "Fresh catch from the Guimaras Strait, native fowl, and produce harvested daily from local agrarian communities."
      },
      {
        title: "Artful Alchemy",
        description: "Reimagined classics that honor authentic heirloom recipes while celebrating modern culinary balance."
      },
      {
        title: "Hiligaynon Warmth",
        description: "Attentive, gracious hospitality that reflects the soulful spirit of Western Visayas hospitality."
      }
    ]
  },

  chef: {
    label: "THE PEOPLE BEHIND THE PLATE",
    headline: "Every plate has a story.",
    name: "Chef Jufel Espin Magbal",
    role: "Executive Head Chef & Culinary Director",
    biography: "Trained across premier culinary establishments in Western Visayas and Manila, Chef Jufel returned to his ancestral roots in Guimaras with a singular mission: to elevate regional island gastronomy into a sophisticated sensory experience.",
    philosophy: "“Cooking is an act of memory and reverence. When we place a dish on your table, we are sharing the morning catch of our waters, the sweetness nurtured by Guimaras sun, and the warmth of a family kitchen.”",
    experienceYears: "16+ Years of Culinary Mastery",
    kitchenTeam: "A tight-knit ensemble of passionate local cook-artisans dedicated to precision, scratch preparation, and seasonal artistry.",
    portrait: chefPortrait,
  },

  diningExperience: {
    label: "THE EXPERIENCE",
    headline: "Good food. Great company.",
    description: "Dining at Kozyna transcends the meal. It is an orchestration of sensory details—soft candlelight flickering across warm hardwood, the gentle clink of artisanal glassware, the aroma of lemongrass and garlic wafting from the open pass, and the comforting resonance of conversation.",
    ambianceFeatures: [
      {
        title: "Al Fresco & Indoor Pavilions",
        detail: "Naturally ventilated spaces with reclaimed Guimaras hardwood, hand-woven lighting, and lush botanical garden vistas."
      },
      {
        title: "Private Celebration Dining",
        detail: "Intimate curated rooms designed for birthdays, anniversaries, intimate weddings, and corporate gatherings."
      },
      {
        title: "Weekend Twilight Sessions",
        detail: "Live acoustic serenades paired with handcrafted island cocktails and signature shared platters."
      }
    ],
    verifiedReviews: [
      {
        quote: "An extraordinary culinary gem in Guimaras. The mango-infused glaze on the roasted native chicken was transcendental, and the ambiance felt like an editorial spread come to life.",
        author: "Maria Elena C.",
        location: "Iloilo City",
        rating: 5
      },
      {
        quote: "Easily the best dining experience on the island. The attention to detail from the wooden tableware to the warm service made our family anniversary unforgettable.",
        author: "Dante & Carmela V.",
        location: "Bacolod City",
        rating: 5
      },
      {
        quote: "The seafood sinigang with Guimaras batwan broth was perfection. A must-visit destination for anyone traveling through Jordan.",
        author: "Janice T.",
        location: "Makati, Manila",
        rating: 5
      }
    ]
  },

  buffetAndEvents: {
    title: "Special Celebrations & Banquets",
    description: "Kozyna crafts customized banquet menus and weekend buffet arrangements for gatherings of 20 to 120 guests.",
    buffetOptions: [
      {
        name: "Island Harvest Grand Feast",
        price: "₱780 per guest",
        minGuests: "Minimum 25 guests",
        inclusions: [
          "5 Main Courses (Seafood, Beef, Pork/Poultry, Vegetables, Noodles)",
          "Signature Kozyna Guimaras Mango Salad Bar",
          "Steamed Garlic Pandan Rice",
          "2 Artisanal Desserts",
          "Bottomless Calamansi-Lemongrass Iced Infusion"
        ]
      },
      {
        name: "Chef's Reserve Degustation Buffet",
        price: "₱1,150 per guest",
        minGuests: "Minimum 30 guests",
        inclusions: [
          "Live Carving Station: Slow-Roasted Crispy Pork Belly with Mango Sarsa",
          "6 Signature Mains including Grilled Blue Marlin and Native Binakol",
          "Artisanal Pastries & Fresh Guimaras Mango Crepes",
          "Welcome Island Spritzers",
          "Exclusive Garden Pavilion reservation for 4 hours"
        ]
      }
    ]
  }
};
