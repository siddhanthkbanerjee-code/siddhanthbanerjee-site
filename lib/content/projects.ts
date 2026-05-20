export type ProjectStatus =
  | "LIVE"
  | "IN_BUILD_ALPHA"
  | "IN_BUILD"
  | "ARCHIVED"
  | "TBD";

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  status: ProjectStatus;
  liveUrl?: string;
  heroImage?: string;
  stack?: string[];
};

export const projects: Project[] = [
  {
    slug: "kairos",
    name: "Kairos",
    oneLiner:
      "AI-powered cultural event discovery for London. Spotify for live culture.",
    status: "LIVE",
    liveUrl: "https://kairos-deploy-sigma.vercel.app",
    stack: ["Next.js", "Pinecone", "OpenAI embeddings", "Claude API"],
  },
  {
    slug: "prizerv",
    name: "Prizerv",
    oneLiner:
      "AI-powered psychological self-discovery platform. Three-phase architecture: Being, Doing, Becoming.",
    status: "IN_BUILD_ALPHA",
    stack: ["Next.js", "Supabase", "Anthropic API"],
  },
  {
    slug: "saathi",
    name: "Saathi",
    oneLiner: "[ONE_LINER_PENDING]",
    status: "TBD",
  },
  {
    slug: "slurrp-farm-consulting",
    name: "Slurrp Farm Consulting",
    oneLiner: "[ONE_LINER_PENDING]",
    status: "TBD",
  },
  {
    slug: "sosi",
    name: "Sosi",
    oneLiner: "[ONE_LINER_PENDING]",
    status: "TBD",
  },
];
