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
        'AI-powered cultural event discovery platform for London, positioned as Spotify for live culture. A swipe-style taste quiz builds a personalised event feed with match scores, each backed by an AI-generated explanation of why the event fits.',
      whatIsUnique:
        'The edge is the discovery intelligence layer, not inventory or ticketing. A three-layer taste engine: an LLM enriches each event with vibe tags and social context, a multi-dimensional taste vector is built from the quiz, and a transparent scoring formula ranks contextually. Every recommendation comes with a generated reason, which makes it feel less like a listings site and more like a knowledgeable friend with taste.',
      howItWasBuilt:
        'Next.js, TypeScript, Tailwind. Pinecone vector search over roughly 800 events, OpenAI embeddings, Claude for the natural-language explanations. Event data enriched through an LLM pipeline. Deployed on Vercel.',
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
        'An AI-powered self-discovery platform. Not therapy, not a personality test. A structured mirror that helps people understand who they are, how they are currently living, and how to close the gap. Runs on a fixed three-phase arc: Being, Doing, Becoming.',
      whatIsUnique:
        'The integration is the point. Most tools do one of these jobs. Prizerv insists on the full arc, each phase consuming the prior phase\'s output. It is AI-led, not assessment-led: no static question battery, the AI drives the session and adapts in real time. It mirrors rather than defines, reflecting patterns back tentatively rather than scoring you. Surfaces frameworks including Big Five, PERMA, positive psychology, and flow.',
      howItWasBuilt:
        'Next.js, TypeScript, Tailwind, Supabase, the Anthropic API, deployed on Vercel. Built with a two-agent workflow, Claude as planner and Claude Code as builder. Design language is Living Dark, a warm near-black base, two typographic voices, motion that feels like breath.',
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
        'A single-page diagnostic tool that helps UK mid-market business owners find where AI actually applies to their business. Answer eight to twelve questions, get a prioritised list of five to eight AI integration opportunities tailored to the business, each with a plain-language explanation, a complexity rating, and a typical ROI range. An ROI calculator and a contact step sit below.',
      whatIsUnique:
        'The entry point. Most AI-adoption tooling assumes the buyer already knows enough to ask build-versus-buy or which vendor. Lever starts a step earlier, at what AI can even do for this business, which is the highest-value, least-served gap. The tool never tries to give a final answer, it opens doors: the free tool surfaces opportunities, the ROI calculator creates urgency, the contact step captures qualified leads.',
      howItWasBuilt:
        'A clean single-page web app. The tonal job is credibility and clarity, output that reads like consulting work a business owner would trust enough to act on. Plain-language explanations over jargon, complexity and ROI presented soberly.',
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
        'Slurrp Farm is a children\'s millet-food brand Siddhanth worked at early on. Two pro bono AI proposals, both built specifically for SF, both pitched to former colleagues.',
      theThinking:
        'Bet one is a Q-commerce co-pilot. The category manager is doing the job of three people across five-plus quick-commerce platforms, each with different rules, thin margins, and listing fees in the lakhs. Existing tools (agencies, analytics dashboards, AI listing tools) each miss the gap between the data and the Monday-morning decision. Bet two is a weekly listening system, a rebuild of the abandoned-cart customer calls Siddhanth used to do, scaled with AI. SF customers talk everywhere (hundreds of reviews per SKU, half a million Instagram followers, CS inbox, NPS, community groups) and nobody reads it systematically. The principle: AI for breadth, humans for depth.',
      whatIMade:
        'For the co-pilot, a weekly digest built on SF\'s SKUs and competitors that tells the CM where they are losing share of search and why, what competitors changed, and what to do that week, with synthesis via Claude and judgment staying with the CM. For the listening system, a four-layer weekly loop (ingest customer voice from every surface, tag and cluster with Claude plus embeddings, synthesise a 500-word Friday brief, and surface twenty customers worth a real human call), anchored by a standing Friday-morning leadership ritual. Both scoped honestly as pro bono sprints with full handover and SF owning everything.',
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
        'A pro bono AI tool proposed to Share Our Strength India, a children\'s-nutrition nonprofit. The mission rests on one thing, finding the next Indian donor, and the team doing that is small while the universe of prospects is large.',
      theThinking:
        'Researching a single donor prospect manually takes hours, donor signals are time-sensitive, and the right people mostly never get reached, not for lack of intent but for lack of time. The system does the search work so the team keeps doing the human work.',
      whatIMade:
        'A tool that delivers eight to ten fresh donor prospects every Monday, each researched, scored, and ready to act on in minutes. It builds a watch list of around 500 prospects from CSR filings, philanthropy data, funding databases, and existing donor history, scans business news and public signals every day, and lands the week\'s best moments in the inbox as one-page briefs with a draft outreach message. Pro bono, with Share Our Strength India owning all code and accounts from day one.',
    },
  },
];
