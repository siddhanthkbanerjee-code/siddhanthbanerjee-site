export type Paper = {
  slug: string;
  title: string;
  descriptor: string; // plain-language one-liner for the home section display
  module: string;     // Oxford module for context
  abstract: string;
  body: string;       // HTML
};

export const papers: Paper[] = [
  {
    slug: 'should-anthropic-enter-enterprise-legal-ai',
    title: 'Should Anthropic Enter US Enterprise Legal AI?',
    descriptor: 'A constrained verticalisation argument for how Anthropic should enter one of the highest-stakes AI application markets.',
    module: 'Strategy, Firms and Markets',
    abstract:
      'Enterprise legal AI is one of the fastest-growing software categories in the US, but the market is currently dominated by compliance-focused incumbents that have not confronted a model-native entrant. This paper argues that Anthropic should enter through a constrained verticalisation strategy: a narrow initial position in contract review, executed as a safety-forward product that leverages Constitutional AI as a product moat rather than a marketing claim. The argument runs through market structure, Anthropic\'s specific advantages, the risks of broader entry, and a staged recommendation.',
    body: `
<h2>The Opportunity</h2>
<p>US enterprise legal AI is a market built on anxiety. Law firms and in-house teams face document volumes that cannot be read at human speed, liability exposure that cannot be ignored, and client pressure on cost that cannot be absorbed. The incumbents, largely contract lifecycle management vendors and document automation tools, were designed for process efficiency. They were not designed to reason.</p>
<p>The arrival of large language models changed the capability frontier. A model that can read, synthesise, flag, and draft with near-professional accuracy opens a different product design space. But it also introduces a different risk profile: a hallucination in a legal context is not an embarrassing autocomplete error, it is a malpractice exposure. This is precisely where Constitutional AI becomes a structural advantage rather than a brand claim.</p>

<h2>Why Anthropic Has Specific Advantages</h2>
<p>Three things distinguish Anthropic from the current competitive set in this application market.</p>
<p>First, the research base. Constitutional AI, RLHF refinements, and the ongoing interpretability programme give Anthropic credible tools to constrain model behaviour in ways that matter to legal professionals: predictable refusals, confidence calibration, and auditability of reasoning chains. These are not features that can be bolted onto an existing product. They require a model designed for them.</p>
<p>Second, the trust surface. Legal buyers are unusual in that they will pay a premium for demonstrated safety and will punish a vendor for a single high-profile failure. The market is structurally tolerant of Anthropic\'s positioning as the careful player. This is not a natural position for most AI companies. It is Anthropic\'s default.</p>
<p>Third, the enterprise motion. Anthropic\'s existing relationships with AWS, Google Cloud, and enterprise API customers mean it is not entering legal cold. The sales infrastructure exists to reach the procurement layer at large firms.</p>

<h2>The Constrained Verticalisation Argument</h2>
<p>The recommendation is not to build a full legal suite. It is to enter through one high-value, high-risk application where Constitutional AI\'s properties map directly to the buyer\'s primary concern.</p>
<p>Contract review is that application. The task is bounded: a contract has a defined structure, a defined set of clauses that require scrutiny, and a defined output format. The risk is material: a missed indemnity clause or an unnoticed exclusion can cost multiples of the contract\'s value. And the incumbent products are genuinely bad at it, relying on keyword matching and template comparisons that miss novel phrasing.</p>
<p>A model that reviews contracts with high recall, calibrated confidence, and an auditable reasoning trace for every flag is a defensible product. It is not a pivot to being a legal software company. It is a demonstration that model-native products can own the most sensitive tier of the enterprise stack.</p>
<p>Expansion from contract review into other legal tasks follows naturally once the trust is established at the highest-scrutiny point. The constrained entry is not a limitation. It is the strategy.</p>

<h2>Risks and Mitigations</h2>
<p>The primary risk is the single-incident failure scenario. One well-publicised hallucination in a material contract context could close the market to Anthropic for a cycle. Mitigation requires not just model quality but product design: confidence thresholds, mandatory human review handoffs, and explicit disclaimers that the model is an assistant, not counsel.</p>
<p>The secondary risk is channel conflict. Major law firm clients may resist AI adoption that is visible to their own clients as a cost-reduction move. The positioning must frame the product as quality improvement, not headcount reduction.</p>
<p>The tertiary risk is a regulatory response. Legal AI is attracting bar association scrutiny. Anthropic should engage proactively with the ABA and state bars rather than waiting for adverse guidance.</p>

<h2>Recommendation</h2>
<p>Enter through contract review. Build the safety audit trail as a first-class product feature, not a legal disclaimer. Price at the quality premium the market will bear for demonstrable accuracy over incumbents. Use the contract review position to establish the regulatory relationships that will matter when the market expands into advice-adjacent tasks. Do not attempt to build a full legal vertical in the first product cycle.</p>
`,
  },

  {
    slug: 'anthropics-regulatory-strategy',
    title: "Anthropic's Regulatory-First Global Strategy",
    descriptor: 'How treating regulation as a competitive moat rather than a compliance cost could define how Anthropic expands internationally.',
    module: 'Global Strategy',
    abstract:
      'Most AI companies treat regulation as a cost of doing business. This paper argues that Anthropic\'s constitutional and safety positioning creates a window to invert that logic: to treat regulatory engagement as the primary route to market in jurisdictions where governments are actively looking for a trustworthy AI partner. The paper maps the regulatory landscape across the US, EU, UK, and select Asian markets, identifies where Anthropic\'s positioning is structurally advantaged, and proposes a baseline global strategy built around regulatory co-design as the primary market entry mechanism.',
    body: `
<h2>The Regulatory Landscape</h2>
<p>The global AI regulatory environment is fracturing. The EU AI Act imposes horizontal obligations with a risk-based framework. The UK has adopted a principles-based, sector-led approach that is explicitly pro-innovation but with safety conditions. The US federal picture is fragmented, with executive orders and sector-specific guidance operating without comprehensive legislation. Several Asian markets, notably Singapore and Japan, are pursuing regulatory frameworks designed to attract safety-credentialed AI companies as national AI infrastructure partners.</p>
<p>What is consistent across jurisdictions is that governments are actively looking for companies they can work with. The demand for a credible, safety-oriented AI partner at the policy table is real and, relative to the number of companies capable of filling it, undersupplied.</p>

<h2>The Strategic Logic</h2>
<p>Anthropic\'s core differentiation in the market is safety and interpretability research. In most commercial contexts, this creates a positioning challenge: enterprise buyers care about capability first and safety second. But in regulatory and government contexts, the hierarchy inverts. A government ministry procuring AI infrastructure, or a regulatory body co-designing a compliance framework, will weight safety credibility above marginal capability differences.</p>
<p>This means Anthropic has a natural first-mover advantage in the government and regulated-sector market that most AI companies cannot credibly enter. The question is whether that advantage is exploited reactively, by showing up when called, or proactively, by structuring market entry around it.</p>
<p>The proactive version is a regulatory-first baseline strategy: enter each target jurisdiction not by opening a commercial office and then engaging with regulators, but by leading with regulatory engagement and using the resulting relationships and legitimacy to unlock commercial channels. This is not a philanthropic exercise. It is the fastest route to durable market position in jurisdictions where government procurement and regulated-sector revenue are a large share of the total addressable market.</p>

<h2>Priority Markets</h2>
<p>The UK is the highest-priority market for this strategy. The government has signalled willingness to work closely with safety-oriented AI companies through the AI Safety Institute and the post-Bletchley framework. Anthropic already has a presence here. The priority is to formalise this into co-design relationships on sector-specific AI frameworks, particularly in financial services and healthcare, where regulated buyers are looking for guidance on acceptable AI use.</p>
<p>The EU is a compliance exercise first and a market entry opportunity second. The AI Act creates significant obligations for high-risk applications, but it also creates a certification infrastructure that will advantage companies whose products are genuinely designed around the Act\'s requirements. Building to the Act\'s specifications rather than retrofitting for compliance is both cheaper and more defensible.</p>
<p>Singapore and Japan represent the Asian entry points. Both governments have explicit strategies to attract safety-credentialed AI companies as partners in national AI infrastructure, and both have procurement and research channels that are accessible to a company with Anthropic\'s profile.</p>

<h2>Implementation</h2>
<p>The baseline global strategy requires three operational changes. First, dedicated regulatory affairs capacity in each target jurisdiction, staffed with people who understand both the technical and policy dimensions. This is not a legal team. It is a policy team with technical fluency.</p>
<p>Second, a research publication strategy that serves both the scientific community and the regulatory audience. Papers on interpretability, Constitutional AI, and evaluation methodology are simultaneously academic contributions and credibility signals in regulatory conversations.</p>
<p>Third, a commercial packaging of the regulatory engagement work. The co-design relationships and compliance frameworks developed in each jurisdiction should be positioned as enterprise products: not just compliant with the EU AI Act, but certified against it, with the audit trail to prove it. Governments do not want to use a product that happens to be safe. They want to demonstrate they are using a product that has been validated as safe. That is a different product, and it commands a premium.</p>
`,
  },

  {
    slug: 'agentic-ai-in-enterprise-sales',
    title: 'Agentic AI in Enterprise Sales',
    descriptor: 'Why most firms are applying AI to the wrong problem in sales, and what the reinvention framing requires instead.',
    module: 'Leading Digital Transformation',
    abstract:
      'Enterprise AI adoption in sales has largely followed an automation playbook: identify repetitive tasks, replace them with AI, measure the efficiency gain. This paper argues that framing systematically undervalues the transformation available and creates path dependency that forecloses the larger structural advantage. Agentic AI in enterprise sales is better understood as a reinvention question. The paper distinguishes automation from reinvention across four sales functions, identifies the enabling conditions that separate firms that achieve structural change from those that achieve only efficiency gains, and argues that the bottleneck is not technology but organisational willingness to change the definition of the sales role itself.',
    body: `
<h2>The Automation Trap</h2>
<p>The default framing for AI in enterprise sales is productivity improvement. A sales rep spends too many hours on CRM updates, email drafting, and call preparation. AI tools reduce those hours. The rep has more time for selling. Revenue per headcount rises. The investment is justified.</p>
<p>This is a real improvement. It is not a transformation. The firm that automates its existing sales process is more efficient but not structurally different. Its competitive position relative to a rival that has done the same automation is unchanged. Its structural position relative to a rival that has used AI to redesign what selling means is significantly worse.</p>
<p>The automation trap is the tendency to measure AI adoption by its effect on the existing process rather than by its effect on the definition of the process itself. It is a measurement error with strategic consequences.</p>

<h2>Reinvention versus Automation</h2>
<p>The distinction between reinvention and automation is not about the tools used. It is about the questions being asked. Automation asks: how do we do what we do faster and cheaper? Reinvention asks: given what AI makes possible, what should selling actually involve?</p>
<p>In contract research, automation means having an AI tool summarise the prospect\'s recent filings before a call. Reinvention means redesigning the qualification process so that the rep\'s job is to validate AI-generated hypotheses about buyer need rather than to discover those needs from scratch. The output of the reinvented process is a better-calibrated conversation. The output of the automated process is a faster version of the existing conversation.</p>
<p>In objection handling, automation means AI-generated rebuttals delivered through a conversational assistant. Reinvention means using AI analysis of historical deal data to redesign which objections are worth engaging and which indicate a buyer who is not actually in-market, changing what the rep attempts rather than how they attempt it.</p>
<p>The pattern across functions is consistent: reinvention uses AI to change the inputs and logic of the sales process, not just the speed of its execution.</p>

<h2>Enabling Conditions</h2>
<p>Three conditions separate firms that achieve structural transformation from those that achieve only efficiency gains.</p>
<p>The first is data infrastructure. Agentic AI systems in sales require access to clean, connected data across CRM, marketing automation, customer success, and product usage. Most enterprise firms have this data in disconnected systems. Reinvention is blocked not by the AI capability but by the data layer. Firms that have invested in data infrastructure as a prior condition are disproportionately positioned to achieve the structural gain.</p>
<p>The second is role redefinition. Automation improves the existing role. Reinvention requires changing what the role is. This is an organisational change management problem, not a technology problem. Firms where sales leadership has the mandate and the appetite to redefine what a good sales rep does will achieve the structural gain. Firms where the role definition is locked by commission structures, performance metrics, and management habits will achieve only the efficiency gain even with superior AI tools.</p>
<p>The third is measurement redesign. The metrics that capture the value of reinvention are different from the metrics that capture the value of automation. Measuring AI adoption by its effect on time-per-call or emails-sent-per-week is the wrong instrument. Measuring it by pipeline quality, late-stage conversion rates, and deal cycle compression is closer to the right instrument. Firms that measure the right thing will invest in the right place.</p>

<h2>Conclusion</h2>
<p>The firms that extract structural advantage from agentic AI in enterprise sales will not be the ones with the most sophisticated tools. They will be the ones that asked a different question. The technology is not the constraint. The constraint is the willingness to treat sales transformation as an organisational design problem rather than a software procurement problem.</p>
`,
  },

  {
    slug: 'microsofts-sustainability-as-procurement',
    title: "Microsoft's Sustainability Strategy",
    descriptor: 'How Microsoft turned a sustainability commitment into a supply-chain shaping mechanism, and what that means for enterprise AI positioning.',
    module: 'Global Sustainable Business',
    abstract:
      'Microsoft\'s climate commitments are frequently characterised as values-led corporate responsibility. This paper argues they are primarily a market-shaping strategy. The 2030 carbon-negative and 2050 historical-carbon-removal pledges, combined with the supplier emissions requirements embedded in Microsoft\'s procurement standards, function as a mechanism to embed Microsoft\'s sustainability standards into enterprise supply chains where Microsoft is already the dominant platform vendor. The strategy creates switching costs, market legitimacy, and regulatory alignment simultaneously. The paper maps the mechanism, assesses the competitive implications, and considers what it means for enterprise AI positioning.',
    body: `
<h2>Beyond Values: The Procurement Thesis</h2>
<p>Microsoft\'s sustainability commitments have been analysed extensively as evidence of corporate purpose, stakeholder capitalism, and ESG leadership. These analyses are not wrong. But they miss the more interesting and more durable explanation: the sustainability strategy is a procurement strategy at its core.</p>
<p>The mechanism is straightforward. Microsoft sets emissions targets for its own operations that are aggressive enough to require significant supplier and partner behaviour change to achieve. It then embeds those requirements into its supplier code of conduct and, progressively, into procurement criteria. Suppliers who want to remain in the Microsoft ecosystem adopt Microsoft\'s sustainability standards. Those standards become the de facto benchmark for the segment of enterprise purchasing that flows through Microsoft\'s supply chain.</p>
<p>The result is that Microsoft\'s sustainability position compounds its platform position. Firms already standardised on Microsoft infrastructure have an additional reason to resist switching: switching means re-certifying against a different sustainability framework. The commitment cost of adoption is real. The switching cost once adopted is higher.</p>

<h2>The AI Dimension</h2>
<p>The sustainability strategy becomes more significant in the context of AI infrastructure. Data centre energy consumption is the primary sustainability concern for enterprise AI deployment. Microsoft\'s commitments to renewable energy procurement and data centre efficiency give enterprise AI buyers a specific cover story for their procurement decisions: they can choose Azure AI infrastructure and report it as a sustainability preference as well as a capability preference.</p>
<p>Competitors can match the capability argument. Matching the sustainability argument requires not just renewable energy purchases but the same supplier network, the same carbon accounting methodology, and the same external validation infrastructure that Microsoft has built over a decade. The lead time advantage is significant.</p>
<p>The implication for enterprise AI positioning is that Microsoft\'s sustainability investment is also a differentiation investment in the AI infrastructure market, particularly with the large enterprise buyers who face internal ESG reporting requirements and external stakeholder scrutiny on technology choices.</p>

<h2>Competitive Implications</h2>
<p>The sustainability strategy creates a dilemma for competitors. Not matching it invites ESG-driven procurement disadvantage. Matching it requires capital expenditure that is not directly revenue-generating in the short term. Matching it faster requires acceleration that risks greenwashing accusations.</p>
<p>Amazon and Google have made comparable commitments. The differentiation in Microsoft\'s approach is the specificity of the supplier requirements and the integration with core procurement rather than treatment as a separate corporate responsibility programme. This integration is harder to replicate quickly because it requires re-engineering procurement processes, not just announcing targets.</p>
<p>The competitive moat from the sustainability strategy is not permanent. It will narrow as sustainability reporting standardises and as competitors close the infrastructure gap. But the window is long enough to matter for the current AI infrastructure market cycle.</p>

<h2>Conclusion</h2>
<p>The lesson for strategy is not that sustainability commitments are cynically commercial. They can be both genuine and strategic. What the Microsoft case illustrates is that the most durable sustainability strategies are those that align the firm\'s values with a mechanism that creates structural competitive advantage. When the right thing to do is also the thing that compounds your market position, the commitment holds through leadership changes, market cycles, and short-term cost pressure. That is not a coincidence of values and strategy. It is the design of a sustainable strategy.</p>
`,
  },

  {
    slug: 'serco-under-soames',
    title: 'Serco Under Soames',
    descriptor: 'Operational excellence as identity: what the Serco turnaround reveals about how firms recover by narrowing their mission rather than broadening it.',
    module: 'Corporate Turnaround',
    abstract:
      'Serco\'s recovery under Rupert Soames from 2014 is conventionally described as a turnaround through contract rationalisation, operational improvement, and management restructuring. This paper argues the deeper mechanism was identity reconstruction. Soames gave Serco a coherent answer to the question of what the company existed to do, and that clarity changed the behaviour of employees, clients, and investors before any specific operational improvement could be measured. The paper examines the identity reconstruction process, maps how it interacted with the operational turnaround, and draws implications for how firms in distress should sequence recovery actions.',
    body: `
<h2>The State of Serco in 2014</h2>
<p>When Rupert Soames joined Serco as chief executive in June 2014, the company had disclosed a profit warning of over 1.5 billion pounds, had contracts under government investigation for alleged fraud, and faced a genuine question about whether the group as constituted was viable. The share price had fallen by more than 50 percent in twelve months. Two major clients had suspended new business pending resolution of the investigations.</p>
<p>The operational problems were real and required operational solutions. But they were symptoms. The underlying condition was that Serco had grown by acquisition and contract accumulation into a company that could not coherently answer what it was for. It ran prisons, managed air traffic control systems, operated nuclear submarine maintenance, delivered public health contracts, and ran electronic tagging programmes. The diversity was not a portfolio strategy. It was an accumulation of deals that had seemed individually attractive without adding up to a coherent business identity.</p>

<h2>Identity as the First Intervention</h2>
<p>Soames\'s first significant action was not operational. It was definitional. He articulated a clear account of what Serco was: a company that managed complex, essential services on behalf of governments, in contexts where the consequences of failure were severe enough that the client could not afford to run the service themselves but also could not afford a contractor who was not expert. Defence support, criminal justice, immigration, healthcare.</p>
<p>This sounds like a mission statement. It was not. It was a sorting mechanism. The definition excluded categories of contract that Serco had been pursuing and created a clear decision rule for the exit programme that followed. Contracts that did not fit the definition were not just underperforming. They were wrong. The distinction mattered for management morale, for investor communication, and for the culture of accountability that had to be rebuilt inside the organisation.</p>
<p>The operational turnaround that followed, closing or exiting more than a billion pounds of contract value, was made politically and culturally viable by the prior identity work. Without a coherent account of what Serco should be, every exit would have been a defeat. With that account, the exits were evidence of discipline and judgement.</p>

<h2>Operational Excellence as Identity, Not Programme</h2>
<p>The phrase "operational excellence" appears in most corporate turnaround narratives as a description of a programme: a set of process improvements, quality standards, and performance metrics that the firm adopts as part of recovery. In the Serco case, it was something different. It was positioned as the identity of the company, not the method of its recovery.</p>
<p>The distinction has practical consequences. A programme has a completion date. An identity does not. A programme can be declared successful and discontinued. An identity cannot. When Soames articulated operational excellence as what Serco fundamentally was, he made it resistant to the normal lifecycle of improvement initiatives.</p>
<p>This positioning also changed how Serco communicated with clients. Governments awarding complex, long-term service contracts are not primarily buying a price. They are buying certainty of delivery. A supplier whose identity is operational excellence is an easier procurement decision than a supplier whose marketing claims operational excellence. The identity claim is tested every day by the existence and behaviour of the company. The marketing claim is tested only at contract award and in crisis.</p>

<h2>Implications for Turnaround Sequencing</h2>
<p>The Serco case suggests that identity reconstruction should precede operational improvement in the turnaround sequence, not follow it. The conventional sequence is: stabilise, improve, reposition. The more effective sequence where the identity problem is the root cause appears to be: define, stabilise, improve, validate.</p>
<p>The practical constraint is that identity reconstruction requires a clear vision from leadership that cannot be delegated and cannot be communicated through consultants. It requires the chief executive to make the argument repeatedly, in enough contexts and with enough specificity, that it becomes the firm\'s operating reality rather than its aspirational statement. This is one reason why the turnaround literature so consistently identifies leadership credibility as the first condition of recovery. The operational plan matters. But the operational plan is only executable once people inside and outside the firm believe it is being executed by someone who knows what the firm is for.</p>
`,
  },
];
