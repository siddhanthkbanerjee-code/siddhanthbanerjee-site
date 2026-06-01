export type ProjectTheme = {
  bg: string;
  surface: string;
  text: string;
  accent: string;
};

export type BuildSections = {
  whatItIs: string;
  whatIsUnique: string;
  howItWasBuilt: string;
};

export type ConsultingSections = {
  context: string;
  theThinking: string;
  whatIMade: string;
};

export type BuildProject = {
  slug: string;
  name: string;
  kind: 'build';
  oneLiner: string;
  liveUrl: string | null;
  theme: ProjectTheme;
  logo: null;
  sections: BuildSections;
};

export type ConsultingProject = {
  slug: string;
  name: string;
  kind: 'consulting';
  oneLiner: string;
  liveUrl: string | null;
  theme: ProjectTheme;
  logo: null;
  sections: ConsultingSections;
};

export type Project = BuildProject | ConsultingProject;

export const projects: Project[] = [
  // ---- Builds ----
  {
    slug: 'kairos',
    name: 'Kairos',
    kind: 'build',
    oneLiner: 'AI cultural event discovery for London. Spotify for live culture.',
    liveUrl: 'https://kairos-deploy-sigma.vercel.app',
    logo: null,
    theme: {
      bg: '#0D0816',      // near-black with violet tint; deeper than ink for Kairos dark mode
      surface: '#18102a', // elevated surface for Kairos dark mode
      text: '#F4EFE6',    // --color-cream
      accent: '#a855f7',  // purple-500 per brief (dark-background purple family)
    },
    sections: {
      whatItIs:
        'A swipe-style taste quiz builds a personalised event feed with match scores, each backed by an AI-generated explanation of why the event fits you.',
      whatIsUnique:
        'The edge is the discovery intelligence layer, a three-layer taste engine (LLM event enrichment, a multi-dimensional taste vector, contextual ranking) plus a natural-language explanation on every recommendation, so it feels like a knowledgeable friend rather than a listings site.',
      howItWasBuilt:
        'Next.js, TypeScript, Tailwind, Pinecone vector search, OpenAI embeddings, Claude API for explanations, Ticketmaster data, deployed on Vercel.',
    },
  },

  {
    slug: 'prizerv',
    name: 'Prizerv',
    kind: 'build',
    oneLiner: 'AI self-discovery in three phases. A structured mirror, not a personality test.',
    liveUrl: 'https://prizerv-mvp-pivot.vercel.app',
    logo: null,
    theme: {
      bg: '#FAF6F0',      // warm cream base; light-mode entry for Prizerv
      surface: '#FFFFFF',
      text: '#0E0B12',    // --color-ink
      accent: '#e879f9',  // fuchsia-400; bright enough on light bg for Prizerv gradient world
    },
    sections: {
      whatItIs:
        'A guided journey across three stages, Being (who am I), Doing (where am I today), Becoming (where could I be tomorrow), grounded in Big Five, PERMA, positive psychology, and flow.',
      whatIsUnique:
        'The integration is the moat. Each phase consumes the prior phase\'s output, the AI leads the session adaptively rather than running a static question battery, and it mirrors rather than defines, reflecting patterns back to confirm or correct.',
      howItWasBuilt:
        'Next.js, TypeScript, Supabase, Anthropic API (Claude Sonnet), Vercel. Built with a two-agent workflow, Claude as planner and Claude Code as builder. Currently in closed alpha.',
    },
  },

  {
    slug: 'lever',
    name: 'Lever',
    kind: 'build',
    oneLiner: 'An AI tool that shows mid-market owners where AI actually applies to their business.',
    liveUrl: 'https://lever-gilt.vercel.app',
    logo: null,
    theme: {
      bg: '#F5F2ED',      // warm off-white; document-clean professional feel
      surface: '#FFFFFF',
      text: '#0E0B12',    // --color-ink
      accent: '#1d4ed8',  // blue-700; restrained professional accent per brief
    },
    sections: {
      whatItIs:
        'A single-page diagnostic where a business owner answers 8 to 12 questions and gets a prioritised list of 5 to 8 AI integration opportunities tailored to them, with plain-language explanations, complexity ratings, and ROI ranges, plus an ROI calculator and a contact CTA.',
      whatIsUnique:
        'It starts a step earlier than every other AI-adoption tool, at "what can AI even do for my business," the highest-value and least-served question, instead of assuming the buyer already knows enough to ask about build-versus-buy or vendors.',
      howItWasBuilt:
        'A clean single-page web app, leading with the qualitative use-case-matching layer where wrong answers are not catastrophic, and keeping the fragile-numbers layers as the paid back end.',
    },
  },

  // ---- Consulting ----
  {
    slug: 'slurrp-farm',
    name: 'Slurrp Farm',
    kind: 'consulting',
    oneLiner: 'Two pro bono AI bets for a D2C brand I used to market.',
    liveUrl: 'https://slurrp-farm.vercel.app/index.html',
    logo: null,
    theme: {
      bg: '#F5F0E8',      // warm cream; earthy warmth for a food brand
      surface: '#FFFFFF',
      text: '#0E0B12',    // --color-ink
      accent: '#4A7C4E',  // earthy green; distinct from all palette anchors; suits organic D2C
    },
    sections: {
      context:
        'A private, pro bono pitch built specifically for Slurrp Farm, written up before a call so there was somewhere real to start.',
      theThinking:
        'Two ideas. One, an AI co-pilot for the Q-commerce category manager, turning fragmented dashboards into plain-language intelligence for the most overworked role in Indian D2C. Two, AI-scaled customer listening, the abandoned-cart calls I used to run by hand rebuilt for 2026, AI for breadth and humans for depth.',
      whatIMade:
        'A two-path proposal site that lets the reader pick whichever bet is more interesting and read the thinking behind each in three minutes.',
    },
  },

  {
    slug: 'share-our-strength',
    name: 'Share Our Strength',
    kind: 'consulting',
    oneLiner: 'A pro bono AI tool that surfaces a children\'s nutrition nonprofit\'s next donor every week.',
    liveUrl: 'https://share-our-strength-proposal.vercel.app/',
    logo: null,
    theme: {
      bg: '#FDF4EE',      // warm light; optimistic and open for a nonprofit
      surface: '#FFFFFF',
      text: '#0E0B12',    // --color-ink
      accent: '#E05C2A',  // red-orange; distinct from tangerine (#FF6B35); warmer, more charitable
    },
    sections: {
      context:
        'A private, pro bono pitch for Share Our Strength India, an anti-hunger nonprofit working toward feeding a million more children over five years, whose mission depends on finding the next Indian donor with a small team against a very large prospect universe.',
      theThinking:
        'The bottleneck is time, not intent. Researching one prospect by hand takes hours, donor signals are time-sensitive, and the relevant people sit across separate worlds (CSR corporates, HNIs, foundations, chefs and restaurateurs, diaspora). The system builds a watch list of around 500 high-fit prospects from Indian CSR filings, wealth and funding data, existing donor history, and the nonprofit\'s chef and foundation networks, scans business news, public filings, and LinkedIn every day for the right moment to reach out, and each Monday delivers the top eight to ten as one-page briefs with a fit score, warm-introduction paths, and a ready-to-send draft message.',
      whatIMade:
        'A proposal site laying out the concept, the three-step mechanic, an illustrative weekly donor brief, the running-cost math against a single affluent gift, and fully pro bono terms where the nonprofit owns all code and accounts from day one.',
    },
  },
];
