export type PathStation = {
  company: string;
  role: string;
  companyDescriptor: string;
  did: string;
  learnt: string;
  gtmTie: string;
  tint: string;
};

// DRAFT COPY (from Siddhanth's brief -- edit freely): frames AI GTM as a dynamic,
// evolving space that needs dynamic people, priming his path as the fit.
export const pathThesis =
  "AI go-to-market is a moving target. The models change every few months, buyers are still writing the rules, and the gap between a demo and a renewed contract never sits still. A dynamic space needs dynamic people: operators who can read a customer, build the thing, and sell it, often in the same week. That is the exact shape of my path, and here is where each piece came from.";

export const pathStations: PathStation[] = [
  {
    company: "Epigamia",
    role: "Marketing Associate",
    companyDescriptor: "A Mumbai D2C brand that built the Greek yogurt category in India.",
    did: "Ran consumer service, digital, and new-product sampling for a challenger food brand.",
    learnt: "How to start from the customer and hold a brand's tonality steady across every touchpoint.",
    gtmTie: "AI GTM starts the same way, from the customer's problem, not the model's capability.",
    tint: "#9B7FD4", // soft violet -- carried from prior path.ts Epigamia entry; fresh D2C energy
  },
  {
    company: "Slurrp Farm",
    role: "Marketing Associate, Brand Delight",
    companyDescriptor: "A children's food brand making millet-based food for Indian families.",
    did: "Owned content planning and the end-to-end consumer experience.",
    learnt: "Consumer insighting, reading the real need a parent has underneath what they actually say.",
    gtmTie: "The same skill finds the job a customer is hiring an AI product to do, under the stated ask.",
    tint: "#6B9E6B", // muted sage -- carried from prior path.ts; organic, earthy, distinct from warm anchors
  },
  {
    company: "Schbang",
    role: "Strategist, then Associate Account Lead",
    companyDescriptor: "One of India's largest independent creative and digital agencies.",
    did: "Ran pitches at roughly a 50 percent conversion rate and led client accounts, including an award-winning tuberculosis-awareness campaign.",
    learnt: "Client servicing, pitching, account management, and B2B sales under real pressure.",
    gtmTie: "AI GTM is selling into unsold rooms, the exact muscle a pitch floor builds.",
    tint: "#E8703A", // warm amber -- carried from prior path.ts; creative agency heat, lighter than tangerine
  },
  {
    company: "Zomato",
    role: "Associate Brand Manager",
    companyDescriptor: "India's largest food-delivery and dining platform.",
    did: "Ran omnichannel marketing and brand positioning for new businesses, including a Founder's-Award-winning AI-generated content campaign.",
    learnt: "B2B GTM strategy, brand management, and product growth at platform scale.",
    gtmTie: "Owning the whole arc, positioning to adoption to growth, is the actual job in AI GTM.",
    tint: "#E23744", // Zomato red -- brand-accurate; anchors this station immediately
  },
];

export const pathPayoff = "AI Builder and GTM Strategist";
export const pathPayoffLine = "Now building AI products and putting the whole kit to work.";
