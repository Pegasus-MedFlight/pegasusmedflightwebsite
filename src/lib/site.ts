export const SITE = {
  name: "Pegasus MedFlight",
  shortName: "Pegasus",
  tagline: "Reliable. Traceable. Compliant.",
  oneLiner:
    "Pegasus MedFlight is a medical logistics intelligence system built to stabilize, optimize, and lower the total cost of healthcare courier and inventory movement.",
  mission:
    "Pegasus MedFlight helps healthcare organizations stabilize, trace, and lower the cost of medical courier and logistics operations.",
  positioning:
    "Not just a courier company. A medical logistics intelligence system that executes courier trips, then uses that movement data to improve reliability, cost control, routing, inventory visibility, and partner decision-making.",
  powered: "THE SKY · SKY Bay · SKY Linq · CAPTAIN · PEGA1",
  description:
    "Pegasus MedFlight is a medical logistics intelligence system with courier execution. Target markets: Phoenix and San Diego. Reliable. Traceable. Compliant.",
  heroEyebrow: "Medical logistics intelligence · Phoenix · San Diego",
  heroTitle: "The problem, solved in one trip.",
  heroLead:
    "Medical courier work is often fragmented, hard to track, inconsistent, and costly. Pegasus MedFlight is the solution: a medical logistics intelligence system that executes deliveries and captures the data healthcare operations actually need.",
  heroSupport:
    "We begin with defined paid Launch Programs in two markets: Phoenix and San Diego. Medical Partners apply for a route. Drivers apply to operate PEGA1.",
  chips: [
    "RELIABLE",
    "TRACEABLE",
    "COMPLIANT",
    "Launch Program",
    "Phoenix",
    "San Diego",
    "HIPAA-aware",
    "BBP-aware",
    "Chain of custody",
    "Temperature-aware",
    "FSD-capable PEGA1",
    "AI-assisted dispatch",
  ],
  email: "captain@pegasusmedflight.com",
  ops: {
    city: "Chandler, AZ",
    region: "Phoenix · San Diego",
    markets: "Phoenix and San Diego",
    note: "Two target markets, not a nationwide rollout. Phoenix, Arizona: Tempe, Mesa, Chandler, Gilbert, Scottsdale, and Queen Creek. San Diego, California: San Diego, La Jolla, Hillcrest, Kearny Mesa, Chula Vista, Oceanside, and surrounding communities.",
  },
  legal: {
    entity: "Pegasus MedFlight",
    dba: "Pegasus MedFlight",
    city: "Apache Junction, Arizona",
    founder: "Branden Griffin",
    role: "Founder & Managing Member",
  },
  founded: 2024,
  url: "https://pegasusmedflight.com",
} as const;

export const NAV = [
  { to: "/", label: "The Problem" },
  { to: "/stack", label: "The Stack" },
  { to: "/system", label: "Intelligence" },
  { to: "/partners", label: "Launch Program" },
  { to: "/request", label: "Get Started" },
] as const;

export const PROBLEMS = [
  {
    title: "Fragmented vendors.",
    body: "Healthcare organizations often stitch together multiple courier vendors. Service quality, paperwork, and accountability change from run to run.",
  },
  {
    title: "Hard to track.",
    body: "Many teams do not know where specimens, medications, devices, or supplies are until something is late or missing.",
  },
  {
    title: "Inconsistent custody.",
    body: "Medical deliveries need documented handoffs, timestamps, and exception records — not a paper log after the fact.",
  },
  {
    title: "Cost without visibility.",
    body: "Urgent requests and inefficient routes raise spend without making logistics more predictable.",
  },
  {
    title: "Disconnected from inventory.",
    body: "Courier movement reveals demand, waste, shortages, and poor replenishment — but that data is rarely used.",
  },
  {
    title: "Compliance as an afterthought.",
    body: "HIPAA, bloodborne-pathogen, and chain-of-custody rules are often handled after the trip, not designed into it.",
  },
] as const;

export const STACK = [
  {
    layer: "Command",
    role: "Operations",
    name: "THE SKY",
    body: "The operations command center. Requests, dispatch, live status, and the record of every trip live here.",
  },
  {
    layer: "Partner",
    role: "Coordination",
    name: "SKY Bay",
    body: "A virtual office. The Medical Partner, CAPTAIN, the driver, and the Pegasus Operator communicate here on the same trip.",
  },
  {
    layer: "Driver",
    role: "Execution",
    name: "SKY Linq",
    body: "The driver app. Pickup, custody, exceptions, and delivery confirmation stay on the trip, not in a text thread.",
  },
  {
    layer: "AI",
    role: "Assistance",
    name: "CAPTAIN",
    body: "AI assistance for routing, SLA risk, compliance awareness, and exceptions. A person stays accountable.",
  },
  {
    layer: "Vehicle",
    role: "Delivery",
    name: "PEGA1",
    body: "Every PEGA1 rolls with live telemetry and CAPTAIN. FSD from day one. Maps Phoenix and San Diego routes. Sentry Mode watches the vehicle on every trip.",
  },
  {
    layer: "People",
    role: "Accountability",
    name: "Drivers",
    body: "Trained drivers own pickup, chain of custody, and delivery. The vehicle and CAPTAIN support them. They do not replace them.",
  },
] as const;

export const TRIP_STEPS = [
  {
    n: "01",
    title: "Request submitted",
    body: "A Medical Partner submits the trip: what is moving, from where, to where, and how urgent it is.",
  },
  {
    n: "02",
    title: "CAPTAIN evaluates",
    body: "CAPTAIN weighs urgency, route, compliance, cold-chain needs, and the available PEGA and driver.",
  },
  {
    n: "03",
    title: "Driver on SKY Linq",
    body: "The assigned driver runs the trip in SKY Linq: navigation, handoffs, exceptions, and confirmation.",
  },
  {
    n: "04",
    title: "Custody confirmed",
    body: "Chain of custody is confirmed at pickup and again at delivery.",
  },
  {
    n: "05",
    title: "Insight returned",
    body: "The partner receives delivery confirmation, timestamps, route data, and usable logistics insight.",
  },
] as const;

export const LAUNCH_STEPS = [
  {
    n: "01",
    title: "Discovery",
    body: "Facility, route need, cargo type, schedule, and the current courier problem.",
  },
  {
    n: "02",
    title: "Written scope",
    body: "Defined geography, service class, expectations, and KPIs before the first paid trip.",
  },
  {
    n: "03",
    title: "Paid trips",
    body: "Documented medical courier trips on PEGA1 with a trained driver and chain-of-custody records.",
  },
  {
    n: "04",
    title: "Closeout report",
    body: "Basic performance reporting and a closeout review — not a slide deck in place of the work.",
  },
  {
    n: "05",
    title: "Conversion discussion",
    body: "If the Launch works, we discuss a recurring route. If it does not, we stop.",
  },
] as const;

export const LAUNCH_INCLUDES = [
  "Written scope",
  "Defined geography",
  "Defined service class",
  "Paid trips",
  "Chain-of-custody records",
  "Basic performance reporting",
  "Closeout review",
  "Conversion discussion if the Launch works",
] as const;

export const LAUNCH_CASES = [
  "Recurring lab route",
  "STAT overflow",
  "Pharmacy or specialty medication run",
  "Dialysis logistics",
  "Device or supply replenishment",
  "Multi-stop clinic corridor",
] as const;

export const PRIORITIES = [
  {
    n: "01",
    title: "Execute first",
    body: "A documented trip is the product. Reliability, custody, and communication come before analytics theater.",
  },
  {
    n: "02",
    title: "One corridor",
    body: "Win a route in Phoenix or San Diego before talking about a region.",
  },
  {
    n: "03",
    title: "Records partners can use",
    body: "Timestamps, exceptions, and confirmation the Medical Partner can audit.",
  },
] as const;

export const COMPLIANCE = [
  "HIPAA-aware",
  "BBP-aware",
  "Chain of custody",
  "Temperature-aware workflows",
  "Human accountability",
  "FSD-capable PEGA1",
  "Live telemetry",
  "CAPTAIN on every PEGA1",
  "Sentry Mode on every trip",
] as const;

export const ASK = [
  "A named operational problem, not a general interest call",
  "Cargo type, frequency, and the sites involved",
  "Whether the work sits in Phoenix or San Diego",
  "A contact who can approve a paid Launch",
] as const;

export const GLOSSARY = [
  { term: "Launch Program", meaning: "A defined, paid medical logistics engagement with written scope — not a demo." },
  { term: "Medical Partner", meaning: "The clinic, lab, pharmacy, or healthcare organization requesting trips." },
  { term: "Driver", meaning: "The trained operator accountable for pickup, custody, and delivery on PEGA1." },
  { term: "Trip", meaning: "One documented courier movement from request through delivery confirmation." },
  { term: "PEGA1", meaning: "The Pegasus MedFlight launch vehicle. FSD-capable from day one. Maps Phoenix and San Diego routes. Operated with a trained driver accountable for custody." },
  { term: "THE SKY", meaning: "Operations command center for requests, dispatch, and the trip record." },
  { term: "SKY Bay", meaning: "The virtual office where the Medical Partner, CAPTAIN, the driver, and the Pegasus Operator communicate." },
  { term: "SKY Linq", meaning: "The driver execution app for the trip in progress." },
  { term: "CAPTAIN", meaning: "AI assistant for dispatch, routing, compliance awareness, and exception watch, with human oversight." },
] as const;

export const INTELLIGENCE_HIGHLIGHTS = [
  {
    title: "On-time pattern",
    body: "Which windows hold, which sites slip, and whether STAT is a habit or an exception.",
  },
  {
    title: "Custody exceptions",
    body: "Where handoffs break — missing signature, temperature question, or a dock that is never ready.",
  },
  {
    title: "Route cost",
    body: "Miles, stops, and urgency on the same corridor, so spend has a reason attached.",
  },
  {
    title: "Repeat demand",
    body: "The same origin and destination showing up often enough to become a scheduled route.",
  },
  {
    title: "Partner view",
    body: "A record the Medical Partner can read without calling dispatch for a status.",
  },
  {
    title: "Not a forecast yet",
    body: "Insight starts with trip history. Forecasting waits until the record is real.",
  },
] as const;

export const MODEL = [
  {
    n: "01",
    title: "Execute",
    body: "Run the trip. Document custody, time, route, and exceptions.",
    outcome: "A delivery the partner can trust, and a record that exists.",
  },
  {
    n: "02",
    title: "Analyze",
    body: "Read the trips. Find the pattern in lateness, cost, and repeat demand.",
    outcome: "Operational insight from movement, not a dashboard with no trips behind it.",
  },
  {
    n: "03",
    title: "Forecast",
    body: "Only after enough verified trips exist. Not a launch-day savings claim.",
    outcome: "A later step. Earned, not promised.",
  },
] as const;

export const INTELLIGENCE_STEPS = [
  "Collect the trip record: request, dispatch, custody, delivery.",
  "Separate noise from a repeatable corridor.",
  "Show the Medical Partner what the trips actually did.",
  "Agree on one intervention: schedule, route, or service class.",
  "Run the next trips against that agreement.",
  "Review. Continue, adjust, or stop.",
] as const;

export const EHRS = [
  { name: "Epic", body: "Common in hospitals. A later, permissioned connection — not required to start a Launch." },
  { name: "Cerner / Oracle Health", body: "Same rule. Useful when a partner is ready. Not a launch dependency." },
  { name: "Lab systems", body: "Often the more relevant cabinet for specimen and result-adjacent logistics." },
] as const;

export const FHIR_BLOCKS = [
  { name: "Patient", meaning: "Only when the payload needs it. Not a full chart." },
  { name: "Organization", meaning: "The lab, clinic, or pharmacy at either end." },
  { name: "Location", meaning: "The dock, suite, or receiving point." },
  { name: "Specimen / Supply", meaning: "What moved, and the handling rules with it." },
] as const;

export const INTELLIGENCE_SOURCES = [
  {
    n: "01",
    title: "Our trip history",
    body: "The foundation. If we did not run the trip, we do not invent the insight.",
  },
  {
    n: "02",
    title: "Partner context",
    body: "Hours, sites, and what “late” means to that organization.",
  },
  {
    n: "03",
    title: "EHR and FHIR, later",
    body: "Selected inventory or order signals, only with permission, after paid corridors exist.",
  },
  {
    n: "04",
    title: "What we will not claim",
    body: "Nationwide coverage, air-medical service, or savings we have not measured.",
  },
] as const;

export const PEGA_FEATURES = [
  {
    n: "01",
    title: "Live telemetry",
    body: "Location, status, and temperature stream into THE SKY on every trip.",
    partner: "The partner sees the trip. Dispatch does not guess.",
  },
  {
    n: "02",
    title: "FSD from day one",
    body: "Full Self-Driving is on PEGA1 from the first paid trip. A trained driver remains accountable.",
    partner: "Autonomy supports the route. Custody stays human.",
  },
  {
    n: "03",
    title: "CAPTAIN on every PEGA1",
    body: "Routing, SLA risk, compliance, and exception watch ride with the vehicle.",
    partner: "A miss is flagged before it becomes a phone call.",
  },
  {
    n: "04",
    title: "Sentry Mode on every trip",
    body: "Cameras stay on watch around PEGA1, in motion and at the stop.",
    partner: "Medical cargo is guarded, not left to a parking lot.",
  },
  {
    n: "05",
    title: "Temperature-aware",
    body: "Cold-chain needs are part of the request and the record, not a cooler someone remembered.",
    partner: "Handling rules travel with the payload.",
  },
  {
    n: "06",
    title: "Route memory",
    body: "Each trip feeds the map. PEGA1 learns the docks, windows, and streets in Phoenix or San Diego.",
    partner: "The next delivery on that corridor is cleaner than the last.",
  },
] as const;

export const SERVE = [
  { title: "Labs", body: "Specimens that need a window, a chain of custody, and a receiving desk that is actually open." },
  { title: "Pharmacies", body: "Specialty and compounding runs where late is not a minor inconvenience." },
  { title: "Clinics", body: "Devices, supplies, and records between sites that already know each other." },
  { title: "Healthcare offices", body: "A defined overflow or corridor — not a blank check for every ZIP code." },
] as const;

export const PAYLOADS = [
  { title: "Laboratory specimens", body: "Labeled, time-sensitive, and documented at both ends." },
  { title: "Pharmacy & specialty meds", body: "Temperature-aware, signature-aware delivery for specialty and compounding work." },
  { title: "Devices & supplies", body: "Replenishment between a warehouse, clinic, or hospital dock." },
  { title: "Research materials", body: "Controlled handoffs when the payload is irreplaceable." },
  { title: "Records", body: "HIPAA-aware document trips when the payload is information, not a vial." },
] as const;

export const PEGA_VIEWS = [
  { id: "three-quarter", label: "Three-quarter", src: "/images/pega-front-34.jpg" },
  { id: "front", label: "Front", src: "/images/pega-front-studio.jpg" },
  { id: "side", label: "Side", src: "/images/pega-side.jpg" },
  { id: "rear", label: "Rear", src: "/images/pega-rear-studio.jpg" },
] as const;

export const LAUNCH_EARLY = [
  {
    title: "Priority onboarding",
    body: "Defined scope, written expectations, and a start that fits one Phoenix or San Diego problem — not a waiting list for a national rollout.",
  },
  {
    title: "Operational feedback loop",
    body: "You see how trips actually run. We see how your docks, windows, and exceptions actually work.",
  },
  {
    title: "Intelligence from your trips",
    body: "The Launch produces a performance record from the trips we ran — not a promise about trips we have not run.",
  },
] as const;

export const ORG_TYPES = [
  { value: "lab", label: "Laboratory" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "clinic", label: "Clinic" },
  { value: "hospital", label: "Hospital / health system" },
  { value: "dialysis", label: "Dialysis" },
  { value: "office", label: "Healthcare office" },
  { value: "other", label: "Other medical organization" },
] as const;

export const DECISION_ROLES = [
  { value: "ops", label: "Operations / logistics" },
  { value: "lab", label: "Lab or pharmacy leadership" },
  { value: "admin", label: "Practice or office administration" },
  { value: "exec", label: "Executive / owner" },
  { value: "other", label: "Other" },
] as const;

export const CARGO_TYPES = [
  { value: "specimens", label: "Laboratory specimens" },
  { value: "pharmacy", label: "Pharmacy / specialty medication" },
  { value: "devices", label: "Devices & supplies" },
  { value: "dialysis", label: "Dialysis logistics" },
  { value: "research", label: "Research materials" },
  { value: "records", label: "HIPAA-aware records" },
] as const;

export const FREQUENCY = [
  { value: "stat", label: "STAT / as needed" },
  { value: "daily", label: "Daily" },
  { value: "several", label: "Several times a week" },
  { value: "weekly", label: "Weekly" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const QUANTITY = [
  { value: "1-4", label: "1–4 items per trip" },
  { value: "5-15", label: "5–15 items per trip" },
  { value: "16+", label: "16 or more" },
  { value: "varies", label: "Varies" },
] as const;

export const URGENCY_NEEDS = [
  { value: "stat", label: "STAT" },
  { value: "same-day", label: "Same day" },
  { value: "scheduled", label: "Scheduled route" },
  { value: "overflow", label: "Overflow backup" },
] as const;

export const PICKUP_HOURS = [
  { value: "business", label: "Business hours" },
  { value: "early", label: "Early morning" },
  { value: "evening", label: "Evening" },
  { value: "night", label: "Nights / weekends" },
] as const;

export const START_WHEN = [
  { value: "now", label: "As soon as possible" },
  { value: "2w", label: "Within 2 weeks" },
  { value: "30d", label: "Within 30 days" },
  { value: "quarter", label: "This quarter" },
  { value: "exploring", label: "Exploring" },
] as const;

export const CONTACT_TIMES = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
] as const;

export const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "either", label: "Either" },
] as const;

export const YEARS_DRIVING = [
  { value: "1-2", label: "1–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "10+", label: "More than 10 years" },
] as const;

export const LICENSE_CLASSES = [
  { value: "d", label: "Standard (Class D / C)" },
  { value: "c", label: "Commercial learner / Class C" },
  { value: "a-b", label: "Class A or B" },
  { value: "other", label: "Other" },
] as const;

export const CERTIFICATIONS = [
  { value: "none", label: "None yet" },
  { value: "hipaa", label: "HIPAA" },
  { value: "bbp", label: "Bloodborne pathogen" },
  { value: "dot", label: "DOT / hazmat awareness" },
  { value: "cpr", label: "CPR / first aid" },
  { value: "courier", label: "Medical courier training" },
] as const;

export const VEHICLE_TYPES = [
  { value: "pega1", label: "PEGA1 — company vehicle" },
  { value: "own", label: "Own vehicle, if approved" },
  { value: "either", label: "Either" },
] as const;

export const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export const DRIVER_WORK = [
  { value: "stat", label: "STAT trips" },
  { value: "route", label: "Scheduled routes" },
  { value: "overflow", label: "Overflow / on call" },
  { value: "nights", label: "Nights and weekends" },
] as const;

export const COVERAGE = [
  { value: "east-valley", label: "Phoenix — Tempe, Mesa, Chandler, Gilbert, Scottsdale, Queen Creek" },
  { value: "san-diego", label: "San Diego — San Diego, La Jolla, Hillcrest, Kearny Mesa, Chula Vista, Oceanside" },
  { value: "both", label: "Both Phoenix and San Diego" },
  { value: "partial", label: "Partial coverage in one market" },
  { value: "no", label: "Neither market" },
] as const;
