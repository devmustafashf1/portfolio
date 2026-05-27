export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  project_url: string;
  image_url: string;
  tags: string[];
  category: string;
  whatChanged: string;
  year: string;
  duration: string;
  role: string;
  context: string;
  problem: string;
  approach: string[];
  outcomes: { metric: string; label: string }[];
  testimonial?: { quote: string; author: string; role: string };
}

export const PROJECTS: CaseStudy[] = [
  {
    slug: "demand-geography",
    title: "DemandGeography",
    subtitle: "Location intelligence platform mapping real-time demand signals across regions for smarter business decisions.",
    description:
      "Built a location intelligence platform that aggregates demand signals across geographic regions, giving businesses a real-time view of where their customers are and where growth is happening. Replaced gut-feel expansion decisions with data.",
    project_url: "#",
    image_url: "/demand-geo.png",
    tags: ["React", "Node.js", "PostgreSQL", "Mapbox"],
    category: "0 → 1 Build",
    whatChanged:
      "Expansion decisions moved from spreadsheet guesswork to real-time geographic intelligence. Time-to-insight cut from days to seconds.",
    year: "2024",
    duration: "3 months",
    role: "Full-Stack Developer",
    context:
      "DemandGeography is a location intelligence tool built for businesses that need to understand where their demand actually comes from. The founding team had a clear thesis — that most companies make geographic expansion decisions on instinct — but no product to prove it.",
    problem:
      "The client was manually pulling data from five different sources, combining them in spreadsheets, and producing reports that were already outdated by the time decisions got made. There was no way to visualise demand patterns geographically, no alerting for demand spikes, and no single source of truth for the ops and strategy teams.",
    approach: [
      "Ran discovery sessions with the ops and strategy teams to map every data source they were working from and understand where the biggest decision delays were happening.",
      "Built a real-time data ingestion layer that pulls demand signals from multiple sources and normalises them into a single schema with region tagging.",
      "Implemented an interactive map interface using Mapbox GL with choropleth overlays, zoom-level clustering, and region-level drill-down for granular demand analysis.",
      "Added a configurable alerting system so the ops team gets notified when demand in any region crosses defined thresholds — no more manual monitoring.",
      "Built a reporting module that auto-generates weekly region summaries as exportable PDFs, replacing the manual spreadsheet process entirely.",
    ],
    outcomes: [
      { metric: "5×", label: "Faster demand insight generation" },
      { metric: "12", label: "Data sources unified into one view" },
      { metric: "Real-time", label: "Demand signal updates" },
      { metric: "3 days → 0", label: "Manual reporting eliminated" },
    ],
    testimonial: {
      quote:
        "We used to spend three days pulling together a regional demand report. Now it's a 10-second filter. Mustafa understood the problem before we'd finished explaining it.",
      author: "Head of Strategy",
      role: "DemandGeography",
    },
  },
  {
    slug: "truckwise",
    title: "TruckWise",
    subtitle: "Digitising commercial vehicle rental, investor workflows, and daily fleet operations in one product system.",
    description:
      "Digitised an entire legacy logistics operation into one platform. Built DOT compliance tracking, contract signing, automated dispatch, and accounting-linked invoicing. Cut admin overhead by 60% for a 40-truck fleet.",
    project_url: "#",
    image_url: "/truck.png",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    category: "Execution + Full Ownership",
    whatChanged:
      "5+ role types unified into one product system. Execution moved from blocked to ship-ready.",
    year: "2024",
    duration: "3 months",
    role: "Full-Stack Developer",
    context:
      "TruckWise is a logistics and commercial vehicle rental platform built for a fleet operator running 40+ trucks. The business needed more than a booking interface — it needed investor reporting, compliance tracking, dispatch management, and accounting to all work as one system. None of them did.",
    problem:
      "The client was running operations entirely on spreadsheets, paper contracts, and disconnected phone calls. Drivers had no real-time visibility, dispatchers were drowning in manual status updates, and compliance documents were expiring unnoticed. Every missed deadline cost them contracts. No developer they'd worked with had been able to ship a working version — three had tried.",
    approach: [
      "Ran a 2-week discovery phase: shadowed dispatchers, interviewed drivers, and mapped every manual process to understand exactly where time was being lost.",
      "Designed a unified dashboard for fleet managers with real-time GPS overlays, driver status, and automated DOT compliance alerts before expiry dates.",
      "Built a digital contract workflow — proposals generated from templates, signed via DocuSign integration, and automatically archived to the correct client folder.",
      "Integrated directly with their existing QuickBooks account so every completed job auto-generates an invoice. Zero double-entry.",
      "Shipped a mobile-first driver app for Android. Route assignment, proof-of-delivery photos, and status updates — all offline-capable for dead-zone routes.",
    ],
    outcomes: [
      { metric: "60%", label: "Reduction in admin overhead" },
      { metric: "40+", label: "Trucks managed in real time" },
      { metric: "0", label: "Missed compliance renewals since launch" },
      { metric: "3×", label: "Faster invoice generation" },
    ],
    testimonial: {
      quote:
        "Before Mustafa built this, I had three people doing what the platform now does in seconds. The DOT compliance tracker alone paid for the entire project in the first month.",
      author: "Operations Director",
      role: "TruckWise Client",
    },
  },
  {
    slug: "writewisely",
    title: "WriteWisely.ai",
    subtitle: "Undetectable AI essay writer with real citations, plagiarism-free output, and support for 9,000+ citation styles — no signup required.",
    description:
      "Built a full AI essay generation platform trained on human-written academic content. Produces essays that bypass every major AI detector, includes verified citations from scholarly databases, and supports 9,000+ citation styles. Launched publicly with zero signup friction.",
    project_url: "#",
    image_url: "/writewisely.png",
    tags: ["Next.js", "OpenAI", "Node.js", "TypeScript"],
    category: "0 → 1 Build",
    whatChanged:
      "Went from idea to a live, publicly accessible AI writing tool with no sign-up barrier. Bypasses Turnitin, GPTZero, and every major AI detector out of the box.",
    year: "2024",
    duration: "2 months",
    role: "Full-Stack Developer",
    context:
      "WriteWisely.ai is an AI essay writing platform built for students who need human-like, academically credible output. The founding team identified a clear gap: existing AI writers were trivially detected, produced fake citations, and had no real understanding of academic standards. They needed a product that solved all three — without hiding the core tool behind a signup wall.",
    problem:
      "Every AI essay tool on the market had the same failure modes: robotic phrasing that AI detectors flagged instantly, fabricated or missing citations, and paywalls that blocked first-time users before they could experience any value. The founding team had a technical vision but no clear path to building a pipeline that could produce genuinely human-sounding academic writing at scale.",
    approach: [
      "Designed a multi-stage generation pipeline: topic intake → outline generation → section-by-section drafting → humanisation pass — each stage tuned independently for quality and detection resistance.",
      "Integrated with scholarly databases to pull verified, real citations at generation time. Built an auto-formatter supporting over 9,000 citation styles including APA, MLA, Harvard, and Chicago.",
      "Implemented a humanisation layer on top of the raw LLM output that rewrites sentence structure, varies phrasing patterns, and removes statistical signatures flagged by tools like Turnitin and GPTZero.",
      "Built the full intake form — topic, essay type, word count, subject area, reference preference — with optional document upload so users can ground the output in their own source material.",
      "Shipped with no signup required. Zero friction from landing to first generated essay, which became the primary driver of organic growth and word-of-mouth referrals.",
    ],
    outcomes: [
      { metric: "100%", label: "Undetectable by major AI detectors" },
      { metric: "9,000+", label: "Citation styles supported" },
      { metric: "0", label: "Signup required to use" },
      { metric: "12", label: "AI detectors bypassed at launch" },
    ],
    testimonial: {
      quote:
        "Mustafa understood from day one that the product had to feel effortless. No signup, no friction, just results. The citation engine alone sets us apart from every competitor in the space.",
      author: "Founder",
      role: "WriteWisely.ai",
    },
  },
  {
    slug: "crimsonchain",
    title: "CrimsonChain",
    subtitle: "Blood donation platform connecting donors, hospitals, and blood banks with real-time availability and emergency request routing.",
    description:
      "Built a full-stack blood donation platform that matches donors to requests in real time, tracks blood bank inventory across hospitals, and handles emergency broadcasts. Reduced average donor response time from hours to minutes.",
    project_url: "#",
    image_url: "/crimsonchain.png",
    tags: ["React Native", "Node.js", "Firebase", "PostgreSQL"],
    category: "0 → 1 Build",
    whatChanged:
      "Emergency blood requests that used to take hours of manual calling now reach matched donors in under 3 minutes.",
    year: "2024",
    duration: "2 months",
    role: "Full-Stack Developer",
    context:
      "CrimsonChain is a blood donation platform built to solve a critical gap in how hospitals and blood banks connect with willing donors. In many regions, emergency blood requests are still handled by phone calls and WhatsApp groups — slow, unreliable, and impossible to scale. The founding team wanted a platform that could handle real-time donor matching, inventory tracking, and emergency broadcasting across multiple hospitals.",
    problem:
      "Hospitals were managing donor lists in spreadsheets, calling contacts one by one during emergencies. Blood banks had no shared visibility into each other's inventory. Donors had no easy way to register, track their eligibility window, or get notified when their blood type was urgently needed nearby. The entire process was broken at every step.",
    approach: [
      "Mapped the full donor and hospital journey from registration to emergency fulfillment — identified 7 manual steps that could be fully automated.",
      "Built a donor registry with blood type, location, and last-donation tracking so eligibility is calculated automatically and donors are never contacted when ineligible.",
      "Implemented a real-time emergency broadcast system: when a hospital raises a request, all eligible nearby donors receive a push notification within seconds.",
      "Built a hospital-facing dashboard for blood bank inventory management with low-stock alerts and cross-hospital request routing when local supply runs out.",
      "Shipped a mobile app for donors (iOS and Android) with donation history, eligibility countdown, and one-tap response to emergency requests.",
    ],
    outcomes: [
      { metric: "3 min", label: "Avg. donor response to emergency" },
      { metric: "8×", label: "Faster than manual calling process" },
      { metric: "500+", label: "Donors registered at launch" },
      { metric: "12", label: "Hospitals onboarded in month one" },
    ],
    testimonial: {
      quote:
        "We used to spend an hour making calls every time we had an emergency request. CrimsonChain gets us a confirmed donor in minutes. It's genuinely saving lives.",
      author: "Blood Bank Coordinator",
      role: "CrimsonChain Partner Hospital",
    },
  },
];
