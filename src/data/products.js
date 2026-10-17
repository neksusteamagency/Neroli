export const CATEGORIES = ["Perfumes", "Home Scents", "Room Sprays", "Gift Sets"]; // legacy, safe to remove once nothing else imports it

// Master checklist options — shared by storefront display and admin dashboard
export const ACCORD_OPTIONS = [
  "Warm Spicy", "Fresh Spicy", "Woody", "Aromatic", "Lavender",
  "Citrus", "Floral", "Amber", "Musky", "Sweet", "Fresh", "Powdery",
];

// Each name must match a file in public/notes/ (lowercase, spaces → hyphens)
export const NOTE_OPTIONS = [
  // Citrus & fruit
  "Bergamot", "Lemon", "Orange", "Tangerine", "Apple", "Apricot", "Blueberry",
  "Fig Leaf", "Lychee", "Muskmelon", "Pear", "Plum", "Pomegranate", "Quince",
  "Strawberry",
  // Florals
  "Algerian Iris", "Cherry Blossom", "Geranium", "Jasmine", "Lavender",
  "Lotus Flower", "Magnolia", "Marigold", "Mimosa", "Neroli", "Osmanthus",
  "Peony", "Rose", "Violet", "Ylang-Ylang",
  // Spices & herbs
  "Cardamom", "Cinnamon", "Nutmeg", "Pink Pepper", "Saffron", "Sage",
  "Mint", "Spearmint", "Eucalyptus", "Juniper",
  // Woods & resins
  "Amberwood", "Balsam Fir", "Cedar", "Frankincense", "Myrrh", "Oud",
  "Sandalwood", "Vetiver",
  // Gourmand
  "Almond", "Black Tea", "Chocolate", "Coconut", "Coffee", "Hazelnut",
  "Honey", "Marshmallow",
  // Other
  "Ambrette", "Cucumber", "Gasoline", "Leather", "Ocean", "Sea Salt", "Tobacco",
];

export const INGREDIENT_OPTIONS = [
  "Alcohol Denat", "Aqua", "Parfum (Fragrance)", "Limonene", "Linalool",
  "Coumarin", "Citral", "Geraniol", "Citronellol", "Eugenol", "Benzyl Benzoate",
];

export const LONGEVITY_OPTIONS = [
  "Weak (1–2h)",
  "Moderate (3–5h)",
  "Long Lasting (6–8h)",
  "Very Long Lasting (9h+)",
  "Eternal",
];

export const SILLAGE_OPTIONS = ["Intimate", "Moderate", "Strong", "Enormous"];

export const DAYTIME_OPTIONS = ["Day", "Night"];

export const SEASON_OPTIONS = ["Winter", "Spring", "Summer", "Autumn"];

// Homepage tile data — one entry per top-level category
export const collections = [
  {
    id: "brands",
    title: "Brands",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=80",
  },
  {
    id: "car-scents",
    title: "Car Scents",
    image: "https://images.unsplash.com/photo-1602874801006-94f7b1da6766?w=900&q=80",
  },
  {
    id: "home-office",
    title: "Home & Office",
    image: "https://images.unsplash.com/photo-1610461888750-10bfc601656b?w=900&q=80",
  },
  {
    id: "generic",
    title: "Generic",
    image: "https://images.unsplash.com/photo-1607006677169-2c2d9a0a0f93?w=900&q=80",
  },
  {
    id: "gift-sets",
    title: "Gift Sets",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=80",
  },
  {
    id: "gadgets-deco",
    title: "Gadgets & Deco",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=900&q=80",
  },
];

// Full category tree — drives Shop.jsx filtering + admin dashboard structure
export const CATEGORY_TREE = {
  "brands": {
    label: "Brands",
    type: "brand-list",
    brands: ["Lattafa", "Louis Cardin"],
  },
  "car-scents": {
    label: "Car Scents",
    type: "bottle-with-shared-scents",
    scentOptions: ["Vanilla", "Oud", "Citrus", "Musk", "Lavender", "Ocean Breeze"],
  },
  "home-office": {
    label: "Home & Office",
    type: "redirect",
    redirectTo: "gadgets-deco",
    subcategories: ["Reed Diffusers", "Sprays", "Others"],
  },
  "generic": {
    label: "Generic",
    type: "mixed",
    subcategories: {
      "refill": { label: "Refill", type: "simple" },
      "victorias-secret": {
        label: "Victoria's Secret",
        type: "bottle-with-shared-scents",
        scentOptions: ["Vanilla Lace", "Pure Seduction", "Coconut Passion", "Love Spell"],
        subcategories: ["Lotion", "Splash", "Perfume", "Bundles", "Pens"],
      },
    },
  },
  "gift-sets": {
    label: "Gift Sets",
    type: "bundle-list",
    brands: ["Victoria's Secret", "Louis Cardin", "Lattafa"],
  },
  "gadgets-deco": {
    label: "Gadgets & Deco",
    type: "electric-split",
    subcategories: {
      electric: ["Electric"],
      "non-electric": ["Candles", "Glass", "Flammable Sticks"],
    },
  },
};

// Catalog is empty until real products are added via the admin dashboard
export const products = [];