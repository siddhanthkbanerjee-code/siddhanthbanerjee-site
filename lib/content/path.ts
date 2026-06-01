export type PathStation = {
  company: string;
  role: string;
  learnt: string;
  gtmTie: string;
  tint: string;
};

export const pathThesis =
  "AI GTM is not hard because the technology is hard. It is hard because of the distance between what a model can do in a demo and what a customer will actually buy, adopt, and keep paying for. Closing that distance takes four things: starting from the customer instead of the capability, reading the real need underneath the stated ask, walking into an unsold room and leaving with a yes, and owning the whole arc from positioning to adoption to growth. I did not pick these up in order or on purpose, but every role added one. Put together, they are the kit this job needs.";

export const pathStations: PathStation[] = [
  {
    company: "Epigamia",
    role: "Marketing Associate",
    learnt: "customer service",
    gtmTie: "start from the customer, not the capability",
    tint: "#9B7FD4", // soft violet -- carried from prior path.ts Epigamia entry; fresh D2C energy
  },
  {
    company: "Slurrp Farm",
    role: "Marketing Associate, Brand Delight",
    learnt: "consumer insighting",
    gtmTie: "read the real need underneath the stated ask",
    tint: "#6B9E6B", // muted sage -- carried from prior path.ts; organic, earthy, distinct from warm anchors
  },
  {
    company: "Schbang",
    role: "Strategist, then Associate Account Lead",
    learnt: "client servicing, pitching, account management, B2B sales",
    gtmTie: "walk into an unsold room and leave with a yes",
    tint: "#E8703A", // warm amber -- carried from prior path.ts; creative agency heat, lighter than tangerine
  },
  {
    company: "Zomato",
    role: "Associate Brand Manager",
    learnt: "B2B GTM strategy, brand management, product growth",
    gtmTie: "own the whole arc, from positioning to adoption to growth",
    tint: "#E23744", // Zomato red -- brand-accurate; anchors this station immediately
  },
];

export const pathPayoff = "AI Builder and GTM Strategist";
