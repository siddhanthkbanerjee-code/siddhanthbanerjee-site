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
    oneLiner: 'A consumer intelligence sprint for the makers of Slurrp Farm and Mille.',
    liveUrl: null,
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
        'Wholsum Foods is the parent company of Slurrp Farm and Mille, founded by Shauravi Malik and Meghana Narayan, selling packaged food for kids and families across ecommerce, quick commerce, and D2C in India. Siddhanth worked at Slurrp Farm early in his career; this is a pro bono engagement pitched to the founders directly.',
      theThinking:
        'Consumer signal at Wholsum Foods is scattered: reviews, search behaviour, social mentions, and competitor moves each sit in a different place and mostly get read reactively, if at all. There is no single view of what consumers are actually saying and doing that the team can act on week to week, so product, positioning, and marketing decisions end up running on instinct rather than a current read of the consumer.',
      whatIMade:
        'A v0 sprint: four to six weeks against one narrow data slice, producing two real Friday briefs before handover. Each brief synthesises public consumer signal, reviews, search trends, competitor activity, into a short, structured read the team can act on immediately. The engagement ends with a blueprint and a hiring spec, not a standing tool, deliberately proving the model works before Wholsum commits to running it long-term. If the two briefs change a decision, the blueprint makes it straightforward to hand the capability to someone internal; if they do not, the cost of finding that out is one sprint, not a hire.',
    },
  },

  {
    slug: 'share-our-strength',
    name: 'Share Our Strength',
    kind: 'consulting',
    oneLiner: 'A relationship-intelligence engine for a fundraising NGO with no programs of its own.',
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
        'Share Our Strength India (SOS India) is a fundraising and grantmaking organisation led by Executive Director Rohit Choudhary. It runs no programs on the ground; its entire mandate is building a sustainable Indian donor pipeline, corporates, HNIs, family offices, and community networks, so that program partners can operate.',
      theThinking:
        'Donor development ran on relationship memory and manual tracking: who is worth approaching, when their situation changes (a liquidity event, a CSR budget jump, a board appointment), and how to make the ask feel timely rather than cold. None of that was systematised, so opportunities were missed simply because nobody was watching continuously, and every existing tool in the market was built for sales pipelines, not philanthropic relationship intelligence.',
      whatIMade:
        'An editorial briefing, not a dashboard: the Brief is the page Rohit opens every Monday, a written overview of what changed, a ranked "reach out now" list with an expandable, in-voice outreach draft for each name, and "keep tracking" and "upcoming opportunities" queues. Behind it sit five supporting views, people, organisations, media and events, professional networks, and city geography, each clickable through to a profile with hover-for-provenance on every claim (source and date, so nothing reads as asserted fact it cannot support) and relationships shown as confidence-rated hypotheses rather than claims ("likely knows" versus "possible overlap"), because a wrong introduction breaks trust instantly with a client whose entire mandate is relationships. The design language is deliberately restrained, an editorial-luxury aesthetic that reads as a trusted instrument rather than a generic SaaS dashboard, since the product here is judgement, not data volume. Built pro bono, on a real running-cost budget SOS India can sustain after handover.',
    },
  },

  {
    slug: 'akanksha-foundation',
    name: 'Akanksha Foundation',
    kind: 'consulting',
    oneLiner: 'A financial coverage cockpit for the CFO of a 27-school operating NGO.',
    liveUrl: 'https://akanksha-intelligence.vercel.app/',
    logo: null,
    theme: {
      bg: '#F0F5F7',      // pale blue-teal wash; cool and precise, distinct from SF's green and SOS's coral
      surface: '#FFFFFF',
      text: '#0E0B12',    // --color-ink
      accent: '#0F7C8C',  // teal; financial precision register, distinct from every other project accent
    tileBg: 'linear-gradient(160deg, #d6ecef 0%, #e9f3f4 50%, #F0F5F7 100%)', // cool teal wash (new tints); ink text stays legible
    },
    sections: {
      context:
        'The Akanksha Foundation runs about 27 public-private-partnership schools across Mumbai, Pune, and Nagpur, roughly 14,600 children, free education for low-income communities. Unlike a grantmaker, Akanksha is an operating NGO: it must raise on the order of Rs 160 crore a year, every year, just to keep teachers and principals in those classrooms, funded mostly through restricted, time-limited grants across Indian corporate CSR, foundations, HNI donors, and a US diaspora fund.',
      theThinking:
        'The person who owns this risk is the CFO, not the development team, and her problem is different from a typical fundraising gap: forward revenue continuity against fixed, non-negotiable salary costs. She needs to know how much of next year\'s committed cost is already secured, where the gaps are, which multi-year grants are about to roll off with nothing lined up to replace them, and how concentrated the funding base has become on a handful of donors. None of that sits in one place today.',
      whatIMade:
        'The centrepiece is the Coverage cockpit: forward funding coverage by year and school cluster, a cliff radar for grants ending soon with no replacement identified, and a concentration view showing reliance on a handful of funders, the specific numbers a CFO needs before she can sign off on next year\'s hiring plan. Every gap the cockpit surfaces links straight into a matched, well-timed prospect with a credible way in, so it does not just flag the hole, it points at how to fill it. A Government/PPP tab tracks municipal MoUs, renewal risk, and partial salary-reimbursement commitments, because in a PPP model the government is landlord, regulator, and funder all at once, a layer no generic fundraising tool would think to include. The anchor thread running through every tab is India\'s mandatory corporate CSR pool for education, about Rs 10,085 crore a year and legally refilling under the Companies Act. Every datapoint is tagged Public source or Illustrative, and no fabricated funding signal is ever attached to a real, named individual. Live and demoed, built as a real, warm-intro engagement rather than a portfolio exercise, with the next concrete step being to wire the cockpit to Akanksha\'s actual grant ledger.',
    },
  },
];
