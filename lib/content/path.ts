export type Station = {
  slug: string;
  name: string;
  yearRange: string;
  role: string;
  location: string;
  domain: string;
  oneLiner: string;
  learned: string;
  tint: string;
};

export const path: Station[] = [
  {
    slug: "epigamia",
    name: "Epigamia",
    yearRange: "2019",
    role: "Brand Executive",
    location: "Mumbai",
    domain: "Consumer FMCG",
    oneLiner: "First taste of brand building at a category-creating yogurt startup.",
    learned: "How brand voice compounds when product and marketing are aligned.",
    tint: "#9B7FD4", // soft violet -- fresh, dairy, modern D2C energy; sits against ink without competing with tangerine or gold
  },
  {
    slug: "slurrp-farm",
    name: "Slurrp Farm",
    yearRange: "2020",
    role: "Brand Manager",
    location: "Delhi",
    domain: "Health Food D2C",
    oneLiner: "Scaled organic kids-food brand from launch to national retail.",
    learned: "Founder-mode marketing and the speed of scrappy creative.",
    tint: "#6B9E6B", // muted sage green -- organic, millet, earthy; distinct from the warm palette anchors
  },
  {
    slug: "vendiman",
    name: "Vendiman",
    yearRange: "2020",
    role: "Growth Lead",
    location: "Delhi",
    domain: "Retail Tech",
    oneLiner: "Early-stage vending-machine IoT startup; built GTM from zero.",
    learned: "Selling hardware in India requires more trust than product.",
    tint: "#5B8BA8", // slate blue -- industrial, machine, tech-forward; cool contrast to warm tints
  },
  {
    slug: "schbang",
    name: "Schbang",
    yearRange: "2021-2023",
    role: "Account Director",
    location: "Mumbai",
    domain: "Integrated Creative Agency",
    oneLiner: "Led multi-brand accounts at one of India's fastest-growing agencies.",
    learned: "Scale of creative output that only cross-functional teams can produce.",
    tint: "#E8703A", // warm amber-orange -- creative, energy, agency heat; lighter and more muted than tangerine (#FF6B35)
  },
  {
    slug: "zomato",
    name: "Zomato",
    yearRange: "2023-2024",
    role: "Brand Manager",
    location: "Gurugram",
    domain: "Consumer Tech / Food Delivery",
    oneLiner: "Ran AI-generated content campaigns at scale for India's largest food brand.",
    learned: "How a 100M-user brand maintains cultural relevance without losing speed.",
    tint: "#E23744", // Zomato red -- brand-accurate; anchors this station immediately for anyone who knows the brand
  },
  {
    slug: "akshaya-patra",
    name: "Akshaya Patra",
    yearRange: "2024-2025",
    role: "Communications Consultant",
    location: "Bengaluru / Singapore",
    domain: "NGO / Mid-day Meal Programme",
    oneLiner: "Rebuilt donor communications for the world's largest NGO-run school meals program.",
    learned: "Storytelling at the intersection of scale, dignity, and impact.",
    tint: "#C4943A", // warm amber-gold -- charitable warmth, slightly cooler than gold (#C9A961) to stay distinct
  },
  {
    slug: "stealth",
    name: "Stealth",
    yearRange: "2025",
    role: "Founding Team",
    location: "London",
    domain: "AI / Consumer",
    oneLiner: "Undisclosed early-stage AI product. Details live.",
    learned: "[PENDING]",
    tint: "#4A3A5C", // deep purple-grey -- mystery, pre-launch, intentionally dark and withholding
  },
  {
    slug: "oxford-oxai",
    name: "Oxford / OxAI",
    yearRange: "2025-present",
    role: "MBA Candidate, OxAI Society",
    location: "Oxford",
    domain: "Business Strategy / AI",
    oneLiner: "Full-time MBA at Said Business School; building AI products in parallel.",
    learned: "[ONGOING]",
    tint: "#1E3A5F", // Oxford navy -- institutional, authoritative, academic; the darkest tint anchors the timeline end
  },
];

export const pathThesis: string = "[THESIS_PENDING_WORKSHOP]";
