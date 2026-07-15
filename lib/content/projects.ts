export type ProjectTheme = {
  bg: string;
  surface: string;
  text: string;
  accent: string;
  cardBg?: string; // optional CSS background for card and detail page (can be gradient); uses bg if absent
  tileBg?: string; // optional CSS background for the home tile ONLY (not the detail page); lets a tile carry more brand color
};

export type BuildSections = {
  whatItIs: string;
  whatIsUnique: string;
  howItWasBuilt: string;
  gtmAngle: string;
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
    liveUrl: 'https://kairos-psi.vercel.app/',
    logo: null,
    theme: {
      bg: '#0D0816',      // near-black with violet tint; deeper than ink for Kairos dark mode
      surface: '#18102a', // elevated surface for Kairos dark mode
      text: '#F4EFE6',    // --color-cream
      accent: '#a855f7',  // purple-500 per brief (dark-background purple family)
      cardBg: 'linear-gradient(160deg, #1a0535 0%, #0D0816 65%)', // purple-to-near-black gradient matching Kairos landing page
    },
    sections: {
      whatItIs:
        'AI-powered cultural event discovery platform for London, positioned as Spotify for live culture. A swipe-style taste quiz builds a personalised event feed with match scores, each backed by an AI-generated explanation of why the event fits.',
      whatIsUnique:
        'The edge is the discovery intelligence layer, not inventory or ticketing. A three-layer taste engine: an LLM enriches each event with vibe tags and social context, a multi-dimensional taste vector is built from the quiz, and a transparent scoring formula ranks contextually. Every recommendation comes with a generated reason, which makes it feel less like a listings site and more like a knowledgeable friend with taste.',
      howItWasBuilt:
        'Next.js, TypeScript, Tailwind. Pinecone vector search over roughly 800 events, OpenAI text-embedding-3-large embeddings, Claude for the natural-language explanations. Event data enriched through an LLM pipeline. Deployed on Vercel.',
      gtmAngle:
        'This is the full stack end to end, not a feature bolted onto someone else\'s product: embeddings, vector retrieval, and an LLM explanation layer, shipped live. That depth is what lets a GTM person scope a roadmap and talk credibly with engineering, not just market around the edges. The positioning itself is a GTM decision too, Spotify for live culture and a match score with a reason turns a capability into a story a user gets instantly. And the niche-event score multiplier, tuned so a big Ticketmaster listing does not drown out a more interesting small one, is the same judgment call GTM has to make on any AI product: when to tune for business intent, not just raw accuracy.',
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
    tileBg: 'radial-gradient(120% 110% at 12% 0%, #f6cdee 0%, #fbe6f6 42%, #FAF6F0 78%)', // fuchsia bloom (new tints) so the tile reads clearly as Prizerv; stays light so ink text is legible
    },
    sections: {
      whatItIs:
        'An AI-powered self-discovery platform. Not therapy, not a personality test. A structured mirror that helps people understand who they are, how they are currently living, and how to close the gap. Runs on a fixed three-phase arc: Being, Doing, Becoming.',
      whatIsUnique:
        'The integration is the point. Most tools do one of these jobs. Prizerv insists on the full arc, each phase consuming the prior phase\'s output. It is AI-led, not assessment-led: no static question battery, the AI drives the session and adapts in real time. It mirrors rather than defines, reflecting patterns back tentatively rather than scoring you. Surfaces frameworks including Big Five, PERMA, positive psychology, and flow.',
      howItWasBuilt:
        'Next.js, TypeScript, Tailwind, Supabase, the Anthropic API, deployed on Vercel. Built with a two-agent workflow, Claude as planner and Claude Code as builder. Design language is Living Dark, a warm near-black base, two typographic voices, motion that feels like breath.',
      gtmAngle:
        'The rare thing here is full ownership across a stack that is usually split between people: prompt architecture, session design, the database, deployment, and the psychological frameworks that give the AI its structure. The prompts alone have gone through more than 20 build sessions, real product decisions each time on how much to infer versus invent and how to keep a long adaptive conversation coherent. The actual GTM lesson is trust and voice: a self-discovery tool lives or dies on whether the output feels genuinely personal rather than generic AI output, which is the same pitch any AI product has to make to a skeptical buyer. It is also, honestly, the build with the least obvious buyer of the four, and knowing which builds have a clean go-to-market and which do not is itself a GTM skill.',
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
    tileBg: 'linear-gradient(160deg, #dce6fb 0%, #eef3fb 46%, #F5F2ED 100%)', // cool blue document tint (new tints); leans into Lever's professional blue, ink text stays legible
    },
    sections: {
      whatItIs:
        'A single-page diagnostic tool that helps UK mid-market business owners find where AI actually applies to their business. Answer eight to twelve questions, get a prioritised list of five to eight AI integration opportunities tailored to the business, each with a plain-language explanation, a complexity rating, and a typical ROI range. An ROI calculator and a contact step sit below.',
      whatIsUnique:
        'The entry point. Most AI-adoption tooling assumes the buyer already knows enough to ask build-versus-buy or which vendor. Lever starts a step earlier, at what AI can even do for this business, which is the highest-value, least-served gap. The tool never tries to give a final answer, it opens doors: the free tool surfaces opportunities, the ROI calculator creates urgency, the contact step captures qualified leads.',
      howItWasBuilt:
        'A clean single-page web app. The tonal job is credibility and clarity, output that reads like consulting work a business owner would trust enough to act on. Plain-language explanations over jargon, complexity and ROI presented soberly.',
      gtmAngle:
        'This is a GTM problem before it is a product. Most mid-market owners cannot yet ask build versus buy, so the wedge is a free, honest answer to what AI can even do for their business, a conversation most AI-adoption tools skip in favour of assuming the buyer is already further along than they are.',
    },
  },

  {
    slug: 'fuel',
    name: 'Fuel',
    kind: 'build',
    oneLiner: 'A mobile-first fitness tracker I built solo with AI. Real people use it daily.',
    liveUrl: 'https://fuel-hazel-eight.vercel.app/',
    logo: null,
    theme: {
      bg: '#0A0E09',      // near-black with a faint green cast; athletic dark identity, new token for Fuel
      surface: '#141A12', // elevated surface for Fuel dark mode; new token
      text: '#F4EFE6',    // --color-cream
      accent: '#A3E635',  // electric lime; energetic fitness accent, new token, distinct from Slurrp Farm earthy green and from Lever/Kairos
      cardBg: 'linear-gradient(160deg, #16210F 0%, #0A0E09 62%)', // lime-tinted dark gradient (new tints) for the athletic identity, used by card and detail page
    },
    sections: {
      whatItIs:
        'A mobile-first fitness tracking web app, installable as a PWA, for logging food, weight, steps, and workouts. First run sets a profile and a goal (cut, maintain, or bulk) with a pace, then the Today tab shows calorie, macro, and fibre rings alongside the food log for that day and a morning weight entry. Food is logged three ways: rear-camera barcode scanning, manual barcode entry, or name search over Open Food Facts. A Train tab offers a structured push, pull, and legs split plus a free-log mode that surfaces your last session for each exercise so you can beat it, and Calendar, Trends, and an in-app diet Plan round it out. It is deliberately a tracker, not a coach: it logs and visualises, and you set and edit your own targets.',
      whatIsUnique:
        'It is a real multi-user product, not a personal script. Cloud sync runs on Supabase with Postgres, email magic-link auth, and row-level security, so each person only ever sees their own data, while the app still works fully offline on local storage and sync stays purely additive, never a dependency. Every target is transparent and editable rather than a black box: a Mifflin-St Jeor BMR, an activity factor for TDEE, a goal-and-pace adjustment, and macro targets set by grams per kilogram, each shown with its source. That is what turned it from a personal build into something real testers use daily, which generates the usage data to iterate on.',
      howItWasBuilt:
        'The entire app is a single index.html of vanilla JavaScript and inline CSS, with no framework and no build step, around 79KB in total. Supabase was added afterwards as a purely additive backend over an already-working offline-first localStorage app. Nutrition data comes from Open Food Facts, which is free, open, and carries no API cost. It installs to a phone home screen through a web manifest and service worker. It was built almost entirely through conversational AI-assisted development with Claude, by an MBA with no professional engineering background, which is part of the point.',
      gtmAngle:
        'The lesson is that shipping an AI-built product is the easy part. Daily use is the real test, and this is the one build where real people actually open it every day, which is a different and harder bar than getting something live.',
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
    tileBg: 'linear-gradient(160deg, #e2efdd 0%, #eef2e4 50%, #F5F0E8 100%)', // earthy green wash (new tints) to separate SF from Share Our Strength; ink text legible
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
    liveUrl: 'https://sos-intelligence-mvp.vercel.app/',
    logo: null,
    theme: {
      bg: '#FDF4EE',      // warm light; optimistic and open for a nonprofit
      surface: '#FFFFFF',
      text: '#0E0B12',    // --color-ink
      accent: '#E05C2A',  // red-orange; distinct from tangerine (#FF6B35); warmer, more charitable
    tileBg: 'linear-gradient(160deg, #fbd9c8 0%, #fde8dd 50%, #FDF4EE 100%)', // warm coral/red wash (new tints) to separate SOS from Slurrp Farm's green; ink text legible
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
