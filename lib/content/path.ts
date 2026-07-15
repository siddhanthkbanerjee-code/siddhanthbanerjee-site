export type PathStation = {
  company: string;
  role: string;
  companyDescriptor: string;
  did: string;
  learnt: string;
  gtmTie: string;
  tint: string;
};

// Thesis rewritten 2026-07-15 from his own draft ("AI GTM is an emerging field...").
// Kept his core insight (multidisciplinary as the asset, human edge as AI absorbs
// the rest) but pulled back two phrases a skeptical reader would discount:
// "most exciting technology of our times" (breathless) and "AI will do everything
// else" (overclaims, invites pushback). Merged with the prior calibrated register.
export const pathThesis =
  "AI go-to-market is a new discipline inside one of the largest shifts business has seen, and it rewards a rare profile: people who can learn fast, unlearn just as fast, and lead with something no model has, empathy and judgment. As AI absorbs more of the routine work, that human edge is what lasts. My path was built for exactly this, five years across brand, insight, pitching, and product before the label existed.";

export const pathStations: PathStation[] = [
  {
    company: "Epigamia",
    role: "Marketing Associate",
    companyDescriptor: "A Mumbai D2C brand that built the Greek yogurt category in India.",
    did: "Ran customer service, agency management, and digital media for a challenger food brand.",
    learnt: "Customer centricity is key. The day the customer stops being first priority is the day a business starts to slip.",
    gtmTie: "AI GTM starts the same way, from the customer's problem, not the model's capability.",
    tint: "#9B7FD4", // soft violet -- carried from prior path.ts Epigamia entry; fresh D2C energy
  },
  {
    company: "Slurrp Farm",
    role: "Marketing Associate, Brand Delight",
    companyDescriptor: "A children's food brand making millet-based food for Indian families.",
    did: "Founded the consumer insights function, individually spoke to 20+ customers a day, reporting findings to the founders daily.",
    learnt: "How to speak and emote with customers such that they really open up, and drop nuggets of gold information and insights.",
    gtmTie: "The same skill finds the job a customer is hiring an AI product to do, underneath the stated ask.",
    tint: "#6B9E6B", // muted sage -- carried from prior path.ts; organic, earthy, distinct from warm anchors
  },
  {
    company: "Schbang",
    role: "Associate Account Lead",
    companyDescriptor: "One of India's largest independent creative and digital agencies.",
    did: "Founding member of a new Delhi office. Led 10+ client strategy pitches with a 50% sales win rate. Headed an award-winning team for a multinational pharma company.",
    learnt: "Client servicing, pitching, account management, and B2B sales under real pressure.",
    gtmTie: "AI GTM is selling into unsold rooms, the exact muscle a pitch floor builds.",
    tint: "#E8703A", // warm amber -- carried from prior path.ts; creative agency heat, lighter than tangerine
  },
  {
    company: "Zomato",
    role: "Associate Brand Manager",
    companyDescriptor: "The world's second-largest food delivery platform and one of India's largest tech companies.",
    did: "Youngest-ever Brand Manager, ran omnichannel brand and product strategy across lines of business, including a Founder's Award-winning AI-generated content campaign.",
    // TODO(Siddhanth): "what I learnt" for Zomato is still open, he has not sent this line.
    // Do not invent it. Kept the prior accurate line as a placeholder until he sends the real one.
    learnt: "B2B GTM strategy, brand management, and product growth at platform scale.",
    gtmTie: "Owning the whole arc, positioning to adoption to growth, is the actual job in AI GTM.",
    tint: "#E23744", // Zomato red -- brand-accurate; anchors this station immediately
  },
];

export const pathPayoff = "AI Builder and GTM Strategist";
export const pathPayoffLine = "Four AI products built. Daily users on the newest. The whole path, put to work.";
