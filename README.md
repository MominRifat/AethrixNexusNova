# Aethrix Nexus Nova — Enterprise IT & AI Systems Architecture

An elite B2B enterprise software engineering platform engineered with **Next.js 16 (App Router, Turbopack)**, **React 19**, **Three.js / React Three Fiber**, and **Tailwind CSS v4**.

Designed with the **Obsidian Amber** aesthetic strictly adhering to enterprise design principles: dark obsidian canvas (`#0a0805`), precision amber accents (`#ffd426`, `#ff9f1c`), Space Grotesk typography, and 60-120 FPS hardware acceleration.

---

## 🛠️ Quick Start & Local Setup

### 1. Prerequisites
* Node.js v20+ 
* npm v10+

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd "IT Farm Website"

# Install dependencies
npm install

# Copy environment placeholders
cp .env.example .env.local
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Linting
```bash
# Type check and lint codebase
npm run lint

# Production build with Turbopack
npm run build

# Start production server
npm run start
```

---

## 📁 Project Architecture & Directory Layout

```text
├── public/                     # Static assets (brand logo mark, images)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── architect/      # Server-side Gemini & Mock Solution Architect API
│   │   │   └── lead/           # Lead ingestion API (Django forwarder & ndjson logger)
│   │   ├── design-system/      # Visual system test route (palettes, typography, cards)
│   │   ├── layout.tsx          # Root layout, fonts, JSON-LD Schema, SEO metadata
│   │   ├── page.tsx            # Full landing page assembly
│   │   ├── opengraph-image.tsx # Dynamic OpenGraph social card generator
│   │   ├── robots.ts           # Dynamic robots.txt
│   │   └── sitemap.ts          # Dynamic sitemap.xml
│   ├── components/
│   │   ├── layout/             # Navbar (auto-hide/reveal) & Footer
│   │   ├── providers/          # Smooth scroll provider (Lenis)
│   │   ├── sections/
│   │   │   ├── Hero/           # Step 2: Hero section & trust benchmark strip
│   │   │   ├── Expertise/      # Step 3A: 12-col bento grid & 4 pure SVG visuals
│   │   │   ├── Tech/           # Step 3B: Dual infinite marquee & filterable radar
│   │   │   ├── Work/           # Step 4A: Featured case studies, 3D tilt, SVG modal
│   │   │   ├── Process/        # Step 4B: Sticky-scroll timeline & 4 mini-visuals
│   │   │   ├── Lab/            # Step 5: Terminal console, dynamic SVG topology
│   │   │   ├── Estimator/      # Step 6A: 4-step scope & budget configurator
│   │   │   └── Contact/        # Step 6B: Direct commitments & lead form
│   │   ├── three/              # Three.js Neural Architecture Core & static fallbacks
│   │   └── ui/                 # Atomic design primitives (Button, Card, Badge, Section, Reveal)
│   └── lib/
│       ├── architect/          # AI types, Zod schemas, deterministic mock provider
│       ├── case-studies.ts     # Reference case studies & SVG circuit flow topologies
│       ├── contact-prefill.ts  # Shared pre-fill bridge for Lab & Estimator
│       ├── estimator-config.ts # Budget bands, scale tiers, milestone horizons
│       ├── site-config.ts      # Direct company commitments, emails, calendar URLs
│       ├── tech-data.ts        # 24 enterprise technologies & radar proficiency data
│       └── utils.ts            # ClassName merge utility (cn)
├── .env.example                # Sample environment variables
├── Dockerfile                  # Multi-stage production container
├── docker-compose.yml          # Container composition file
├── DEPLOY.md                   # Full deployment manual (Vercel & VPS)
└── PROJECT_RULES.md            # Governing architecture rules & palette specifications
```

---

## ⚙️ How to Customize Business Data

All copy and credentials are decoupled into typed configuration files. Editing these files updates the entire website instantly:

### 1. Company Information, Commitments & Calendar
Edit `src/lib/site-config.ts`:
* `contactEmail`: Official enterprise inquiries email.
* `contactPhone`: Official business phone number.
* `officeLocation`: Corporate office addresses.
* `commitments`: Key SLA statements (e.g. Mutual NDA, 24-hr response).
* `calendarUrl`: Link to your team's Google Calendar, Cal.com, or Calendly.

### 2. Technology Stack & Radar Depth
Edit `src/lib/tech-data.ts`:
* Add or remove technologies from `TECH_STACK`.
* Assign categories (`ai`, `spatial`, `backend`, `edge`) and proficiency depth ratings (1 to 3 dots).

### 3. Case Studies & Architecture Blueprints
Edit `src/lib/case-studies.ts`:
* Replace concept/reference data with verified production client case studies.
* Update headline, summary, tags, and 3 KPI metrics per study.
* Adjust SVG node coordinates (`nodes`) and circuit paths (`pathD`, `branchPathD`).

### 4. Project Estimator & Budget Ranges
Edit `src/lib/estimator-config.ts`:
* Customize project categories in `PROJECT_TYPES`.
* Update scale multipliers in `SCALE_TIERS`.
* Adjust indicative price brackets in `BUDGET_BANDS`.

---

## 🔒 Security & Performance Hardening

* **Security Headers**: Configured in `next.config.ts` (CSP, Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options).
* **Bot Protection**: Honeypot field and in-memory rate limiting applied to `/api/lead` and `/api/architect`.
* **Zero Leakage**: No server-side API keys (`GEMINI_API_KEY`, `DJANGO_LEAD_TOKEN`) are exposed to client bundles.
* **3D Fallback Safety**: WebGL disabled, low-power mobile devices, and `prefers-reduced-motion` automatically swap the 3D Canvas for an optimized pure-CSS static fallback.
* **Memory Management**: Canvas render loop pauses (`frameloop="never"`) when scrolled off-screen via `IntersectionObserver`.

---

## 📜 License
Proprietary & Confidential. All rights reserved by **Aethrix Nexus Nova**.
