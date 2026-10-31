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
  tagline: "The Home of Unlimited Filipino & Pan-Asian Buffet in Guimaras",
  headline: "Comforting Flavors, Unlimited Feasts",
  subtitle: "Casual Dining, Budget-Friendly All-You-Can-Eat Buffets & All-Inclusive Event Venue in Jordan, Guimaras",
  established: 2021,
  
  location: {
    island: "Guimaras",
    municipality: "Jordan",
    barangay: "Brgy. Alaguisoc",
    province: "Guimaras Province",
    region: "Western Visayas (Region VI)",
    country: "Philippines",
    postalCode: "5045",
    fullAddress: "Brgy. Alaguisoc, Jordan, Guimaras, Philippines",
    landmarks: "Right beside Guimaras State University – Mosqueda Campus",
    coordinates: {
      lat: 10.5936,
      lng: 122.5898,
    },
    travelNote: "Located right along the main highway in Brgy. Alaguisoc, immediately beside Guimaras State University – Mosqueda Campus. Easily accessible from Jordan Wharf via a quick 10-minute tricycle or jeepney ride after the 15-minute pump boat from Iloilo Parola/Ortiz Wharf.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kozyna+Restaurant+Alaguisoc+Jordan+Guimaras",
  },

  contact: {
    phone: "+63 953 425 6428",
    primaryPhone: "+63 953 425 6428",
    secondaryPhone: "+63 969 583 6203",
    phones: ["+63 953 425 6428", "+63 969 583 6203"],
    landline: "+63 953 425 6428",
    email: "reservations@kozyna.ph",
    inquiries: "hello@kozyna.ph",
    facebookUrl: "https://www.facebook.com/Kozynarestaurant/",
    instagramUrl: "https://www.instagram.com/kozynarestaurant/",
  },

  operatingHours: [
    { days: "Monday – Sunday (Daily)", hours: "11:00 AM – 9:00 PM", notes: "Open Daily for Buffets & À La Carte Dining" },
    { days: "Lunch Buffet Slot", hours: "11:00 AM – 2:30 PM", notes: "₱329 – ₱349 (Weekday promos from ₱299)" },
    { days: "Dinner Buffet Slot", hours: "5:00 PM – 9:00 PM", notes: "₱329 – ₱349 (Specialty Unli-Sushi: ₱355)" },
    { days: "À La Carte Service", hours: "11:00 AM – 9:00 PM", notes: "Your Plate, Your Rules: Individual Plated Classics & Asian Fusion" },
    { days: "Private Events & Banquets", hours: "11:00 AM – 9:00 PM", notes: "All-inclusive party packages & venue rentals" },
  ],

  buffetDetails: {
    spreadDescription: "Alternating daily buffet spreads featuring 7 hot main dishes plus sides: crispy pork belly, savory meat dishes, chicken specialties, fresh seafood, dim sum, pizza, pasta, fresh fruits, endless desserts, and bottomless drinks.",
    ratesSummary: "Regular buffet rates typically hover between ₱329 to ₱349 per person depending on schedule and theme, with special weekday promo rates from ₱299 and signature Unlimited Sushi events at ₱355 per person.",
    slots: [
      { name: "Lunch Buffet", hours: "11:00 AM – 2:30 PM", note: "Daily hot spreads, dim sum, pasta & dessert bar" },
      { name: "Dinner Buffet", hours: "5:00 PM – 9:00 PM", note: "Evening spread with rotating Pan-Asian & sushi specialties" },
    ],
    hotDishesCount: "7 Hot Main Dishes Daily",
    keyInclusions: [
      "Crispy golden pork belly & savory braised meats",
      "Chicken specialties (Chicken Inasal, Chicken Teriyaki)",
      "Fresh Guimaras Strait seafood selections",
      "Steamed Dim Sum baskets & dumplings",
      "Handcrafted pizza & comforting pastas",
      "Unlimited sushi & maki rolls (on featured slots)",
      "Fresh local fruits including sweet Guimaras mangoes",
      "Endless dessert bar & bottomless chilled drinks"
    ]
  },

  activePromos: [
    {
      id: "birthday",
      title: "Birthday Celebrant Dines FREE",
      badge: "Birthday Promo",
      discount: "100% FREE for Celebrant",
      summary: "Celebrate your birthday for free at Kozyna! Bring at least 5 paying guests, present 1 valid ID showing your birthdate, and the birthday celebrant's buffet meal is completely on the house.",
      condition: "5 Paying Guests + 1 Free Celebrant",
      validity: "Valid on birth month / birth week with valid ID"
    },
    {
      id: "group-6",
      title: "Barkada Deal: Pay for 6, Get 1 FREE (6+1)",
      badge: "Group Perk",
      discount: "1 Free Buffet Entry",
      summary: "Gather your barkada or office team! Pay for 6 full buffet entries and receive 1 complimentary guest entry (7 diners total).",
      condition: "Pay 6, Dine 7 (6+1 layout)",
      validity: "Available on both lunch and dinner buffet slots"
    },
    {
      id: "group-12",
      title: "Grand Family Deal: Pay for 12, Get 2 FREE (12+2)",
      badge: "Big Family Deal",
      discount: "2 Free Buffet Entries",
      summary: "Planning a big family celebration or reunion? Pay for 12 full buffet entries and receive 2 complimentary guest entries (14 diners total).",
      condition: "Pay 12, Dine 14 (12+2 layout)",
      validity: "Great for reunions, graduations, and banquets"
    },
    {
      id: "loyalty-card",
      title: "Kozyna Loyalty Stamp Card",
      badge: "Loyalty Perk",
      discount: "50% OFF (5th) · 100% FREE (8th)",
      summary: "Frequent diners can ask our crew for a loyalty stamp card. Enjoy a 50% discount on your 5th visit and a completely FREE meal on your 8th visit!",
      condition: "1 Stamp per visit per diner",
      validity: "Valid across all regular buffet visits"
    },
    {
      id: "senior-pwd",
      title: "Senior Citizens & PWDs 20% Discount",
      badge: "Mandatory Privilege",
      discount: "20% Standard Discount",
      summary: "In strict accordance with Philippine law (RA 9994 and RA 10754), Senior Citizens and Persons with Disabilities enjoy a 20% discount on their buffet and à la carte orders.",
      condition: "Upon presentation of valid Senior / PWD ID",
      validity: "Honored on all operating days and slots"
    }
  ],

  socialLinks: [
    { name: "Facebook", handle: "@Kozynarestaurant", url: "https://www.facebook.com/Kozynarestaurant/" },
    { name: "Instagram", handle: "@kozynarestaurant", url: "https://www.instagram.com/kozynarestaurant/" },
    { name: "Google", handle: "Kozyna Restaurant Guimaras", url: "https://www.google.com/search?kgmid=%2Fg%2F11txztfqs2" },
  ],

  story: {
    label: "OUR STORY",
    title: "More than just a place to eat.",
    narrative: [
      "Located in Brgy. Alaguisoc, Jordan, Guimaras (right beside the Guimaras State University – Mosqueda Campus), Kozyna is a beloved dining destination and celebration venue known throughout the island for our welcoming atmosphere and budget-friendly all-you-can-eat buffets.",
      "At Kozyna, we believe extraordinary feasts should be accessible to every family, student, traveler, and neighbor. Our kitchen harmoniously unites comforting Filipino home-style favorites with vibrant Pan-Asian classics—bringing together Thai, Japanese, Chinese, and Korean-inspired culinary traditions under one hospitable roof.",
      "From our renowned ₱299 to ₱355 unlimited buffet spreads (featuring crowd favorites like unlimited sushi rolls, crispy pork belly, savory stir-frys, and island mango coolers) to all-inclusive event styling for birthdays and weddings, Kozyna celebrates the joy of shared gatherings.",
      "Whether dropping by for a casual lunch, gathering your barkada for an all-you-can-eat celebration, or hosting a milestone banquet, Kozyna welcomes you to experience paradise on your plate."
    ],
    pillars: [
      {
        title: "Comforting Filipino & Pan-Asian Fusion",
        description: "From heirloom Visayan comfort stews to Thai curries, Japanese sushi, Chinese stir-frys, and Korean sweet-soy glazes."
      },
      {
        title: "Affordable All-You-Can-Eat Feasts",
        description: "Guimaras' favorite budget-friendly buffet spreads ranging from ₱299 to ₱355 per person with unlimited sides and drinks."
      },
      {
        title: "Warm Island Celebrations",
        description: "All-inclusive party packages with catering, decor, sound systems, and private venue reservations beside GSU Mosqueda."
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
    title: "Unlimited Buffets & Event Packages",
    description: "Kozyna is Guimaras Island's beloved home for budget-friendly all-you-can-eat Filipino and Pan-Asian buffets, as well as all-inclusive private event packages.",
    buffetOptions: [
      {
        name: "Filipino & Pan-Asian Buffet (7 Hot Mains + Sides)",
        price: "₱329 – ₱349 per guest",
        minGuests: "Lunch (11:00 AM – 2:30 PM) & Dinner (5:00 PM – 9:00 PM) · Weekdays from ₱299",
        inclusions: [
          "7 Hot Main Dishes: Crispy pork belly, savory braised meats, chicken inasal/teriyaki, seafood",
          "Steamed Dim Sum baskets, Handcrafted Pizza & Comforting Pasta Bar",
          "Unlimited Steamed Rice, Daily Chef's Kettle Broth & Fresh Salad Bar",
          "Fresh Guimaras Fruits, Endless Dessert Treats & Bottomless Refreshments",
          "Birthday Celebrants dine FREE with 5 paying guests · Barkada 6+1 and 12+2 valid!"
        ]
      },
      {
        name: "Weekend Special & Unlimited Sushi Feast",
        price: "₱355 per guest",
        minGuests: "Friday – Sunday Specials & Featured Unlimited Sushi Slots",
        inclusions: [
          "Handcrafted Unlimited Sushi Bar (California Maki, Spicy Tuna, Salmon Nigiri, Tamago)",
          "Pan-Asian hot entrees (Chicken Teriyaki, Crispy Katsu, Korean Sweet-Soy Pork)",
          "Filipino favorites + Dim Sum, Pizza, Pasta, and Seafood",
          "Unlimited Japanese Rice, Miso Broth, Salad Bar & Condiments",
          "Endless Sweet Guimaras Mango Desserts & Bottomless Refreshments"
        ]
      },
      {
        name: "All-Inclusive Party & Private Event Package",
        price: "Custom Packages / From ₱299–₱349/pax",
        minGuests: "Birthdays, Weddings, Debuts, Reunions & Corporate Banquets",
        inclusions: [
          "Complete All-You-Can-Eat Buffet Catering for all attendees",
          "Exclusive Venue Rental (Air-conditioned & naturally ventilated areas beside GSU Mosqueda)",
          "Basic Themed Event Styling, Table Settings & Celebration Backdrop",
          "Sound & Light System with Microphones for Programs & Speeches",
          "Dedicated Banquet Service Staff & Event Coordinator Assistance"
        ]
      }
    ]
  }
};
