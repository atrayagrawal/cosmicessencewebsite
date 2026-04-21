# Cosmic Essence Education — Website PRD
**For:** Claude Code  
**Domain:** cosmicessence.co.in  
**Stack:** Pure HTML + CSS + Vanilla JS (no frameworks) · Netlify hosting · Decap CMS · Tally.so for forms  
**Goal:** Permanent institutional home for Cosmic Essence. Easy to update forever. Captures leads. Showcases everything.

---

## 1. Tech Stack & Architecture

### Hosting & Deployment
- **Host:** Netlify (free tier — sufficient for CE's traffic)
- **Source:** GitHub repository (`cosmic-essence-site`)
- **Deploy:** Auto-deploy on every push to `main` branch
- **Domain:** Connect `cosmicessence.co.in` via Netlify DNS settings

### CMS (Content Management)
- **Tool:** Decap CMS (formerly Netlify CMS) — free, open source
- **Access:** `cosmicessence.co.in/admin` — browser-based editor, no code needed
- **Auth:** Netlify Identity (free)
- **What it manages:** Blog posts, testimonials, program details, resource downloads, team members
- **What it does NOT manage:** Core layout/design (only edit those in code when needed)

### Forms & Lead Capture
- **Tool:** Tally.so (free tier)
- **Forms needed:**
  1. `Newsletter signup` — Name + Email + "I am a: Student / Parent / Educator / Other"
  2. `Program enquiry` — Name + Email + Phone + Program interested in + Grade/Age + Message
  3. `Walk booking` — Name + Email + Phone + Walk type (Community/Private) + Preferred date
  4. `Resource download` — Name + Email (gates PDF downloads)
  5. `Join the team` — Name + Email + Role + Brief note
- **Data flow:** Tally → Google Sheets (auto-sync via Tally's built-in integration)
- **Implementation:** Each Tally form has a unique embed code; paste into the relevant HTML section

### File Structure
```
/
├── index.html                  # Homepage
├── about.html                  # About CE + Atray
├── programs/
│   ├── index.html              # Programs overview
│   ├── first-spark.html        # First Spark Workshop
│   ├── founders-blueprint.html # Founders Blueprint Bootcamp
│   ├── founders-walk.html      # The Founder & CEO's Walk
│   ├── math-classes.html       # Mathematics Classes
│   └── learn-to-pitch.html     # Learn to Pitch Intensive (coming soon)
├── book.html                   # The Book page
├── resources/
│   └── index.html              # Resource hub (guides, reports, downloads)
├── blog/
│   └── index.html              # Blog listing page
├── contact.html                # Contact + all forms
├── 404.html                    # Custom 404 page
├── admin/
│   ├── index.html              # Decap CMS entry point
│   └── config.yml              # CMS configuration
├── assets/
│   ├── css/
│   │   ├── main.css            # Global styles
│   │   └── components.css      # Reusable components
│   ├── js/
│   │   └── main.js             # Minimal JS (nav, scroll, etc.)
│   └── images/
│       ├── logo.svg
│       ├── atray-portrait.jpg  # Placeholder — Atray to replace
│       └── og-image.jpg        # Social share preview
├── _content/                   # CMS-managed markdown files
│   ├── blog/
│   ├── testimonials/
│   └── resources/
├── netlify.toml                # Netlify config
└── README.md                   # Setup + editing guide for Atray
```

---

## 2. Brand System

### Colors
```css
--ce-orange:     #F26522;   /* Primary brand — CTAs, highlights, accents */
--ce-black:      #111111;   /* Headings, nav, footer */
--ce-off-white:  #F9F6F1;   /* Page backgrounds, card backgrounds */
--ce-white:      #FFFFFF;
--ce-dark-gray:  #333333;   /* Body text */
--ce-mid-gray:   #666666;   /* Secondary text, captions */
--ce-light-gray: #E8E4DF;   /* Dividers, borders */
--ce-orange-10:  rgba(242, 101, 34, 0.10); /* Subtle tint for section bg */
```

### Typography
```css
/* Headings */
font-family: 'JetBrains Mono', monospace;
/* Body + UI */
font-family: 'Lato', sans-serif;

/* Scale */
--text-xs:   0.75rem;
--text-sm:   0.875rem;
--text-base: 1rem;
--text-lg:   1.125rem;
--text-xl:   1.25rem;
--text-2xl:  1.5rem;
--text-3xl:  1.875rem;
--text-4xl:  2.25rem;
--text-5xl:  3rem;
```

### Load fonts via Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
```

### Design Principles
- Clean, minimal, high-signal. No clutter.
- Generous white space. CE is premium and boutique — the layout should feel like it.
- Orange used sparingly — for CTAs and key callouts only. Not decorative.
- JetBrains Mono for all headings, labels, and the CE logo wordmark.
- Body text always Lato, max line-length ~65 characters for readability.
- Mobile-first. All layouts work perfectly on phones (Neha reads on WhatsApp, then taps a link).

---

## 3. Global Components

### Navigation
```
Logo (left) | Programs · About · The Walk · Book · Blog · Resources (center/right) | "Talk to Atray" CTA button (right, orange)
```
- Sticky on scroll
- Mobile: hamburger menu, full-screen overlay
- Active page indicator: orange underline
- "Talk to Atray" button → opens Program Enquiry Tally form in modal OR links to `/contact`

### Footer
```
Column 1: CE Logo + tagline "Teaching Entrepreneurship Through Physics"
Column 2: Programs (links)
Column 3: Company (About, Blog, Resources, Book, Join Team)
Column 4: Connect (Instagram, YouTube, LinkedIn, WhatsApp)
Bottom bar: © 2025 Cosmic Essence Education | Privacy Policy | T&C | cosmicessence.co.in
Contact: atray@cosmicessence.co.in | +91 87420 17911
```

### CTA Button Variants
```css
/* Primary — orange fill */
.btn-primary { background: #F26522; color: white; }

/* Secondary — outline */
.btn-secondary { border: 2px solid #F26522; color: #F26522; }

/* Ghost — text only with arrow */
.btn-ghost { color: #F26522; text-decoration: underline; }
```

### Section Structure
Every section uses this pattern:
```html
<!-- ========== SECTION: [NAME] — EDIT CONTENT BELOW ========== -->
<section id="[name]" class="section">
  <div class="container">
    <!-- content -->
  </div>
</section>
```
`container` = max-width 1100px, centered, padding 0 24px.

---

## 4. Page Specifications

---

### 4.1 Homepage (`index.html`)

**Purpose:** Convert a skeptical smart parent (Neha) or curious teenager (Aarav) into an enquiry within 60 seconds.

---

#### Section 1: Hero
**Layout:** Full-width, dark background (#111111), white text. Large headline left-aligned. Right side: Atray's portrait or a powerful visual.

**Content:**
```
LABEL (small caps, orange, JetBrains Mono):
COSMIC ESSENCE EDUCATION

HEADLINE (H1, JetBrains Mono, large):
"We Teach Teenagers
to Think Like Founders."

SUBHEADLINE (Lato, 1.25rem, light gray):
Using the laws of Physics as a lens,
we help ambitious 13–18 year olds build clarity,
confidence, and their first real venture.

PROOF LINE (small, orange):
→ Students placed at UChicago · Duke · Parsons · Pratt · SAIC

PRIMARY CTA: [Explore Programs] → /programs
SECONDARY CTA: [Download Free Guide] → Tally resource download form
```

---

#### Section 2: The Problem (for Neha)
**Layout:** Off-white background. Two-column: left = text block, right = pull quote.

**Content:**
```
LABEL: THE GAP WE'RE CLOSING

HEADLINE:
"School teaches your child to answer questions.
We teach them to ask better ones."

BODY:
The world is changing faster than any curriculum can keep up.
IB, IGCSE, and CBSE are excellent — but none of them teach
a teenager how to spot opportunity, build something real,
or think through complexity without a textbook answer.

That's what Cosmic Essence exists for.

PULL QUOTE (right column, large orange text):
"Entrepreneurship isn't a career path.
It's a way of seeing the world."
— Atray Agrawal
```

---

#### Section 3: The 4D Framework
**Layout:** Orange background (#F26522). White text. 4 cards in a row.

**Content:**
```
LABEL: OUR INTELLECTUAL FRAMEWORK
HEADLINE: The 4 Dimensions of Seeing

CARD 1 — D1: SEEING CLEARLY
First Principles · Experimentation · Inversion · Compounding
Strip away assumptions. Think from truth.

CARD 2 — D2: SEEING CHANGE  
Inertia · Friction · Momentum · Activation Energy · Catalyst
Understand what moves, what resists, what accelerates.

CARD 3 — D3: SEEING SYSTEMS
Quantization · Bottleneck · Flywheel
Build things that run themselves.

CARD 4 — D4: SEEING SCALE
Critical Mass · Surface Area · Leverage
Make your effort multiply.

BODY BELOW CARDS:
These aren't metaphors. They're the same laws that govern
rockets, rivers, and nuclear reactions — applied to how
businesses start, grow, and sustain.
```

---

#### Section 4: Programs Overview
**Layout:** White background. 5 program cards in a responsive grid (2 cols on tablet, 1 on mobile).

**Each card contains:**
```
Program name (JetBrains Mono)
One-line description
Who it's for (tag: Students / Adults / Both)
Duration
CTA: [Learn More] → program page
```

**Programs:**
1. **The First Spark Workshop** — A 4-hour introduction to entrepreneurial thinking through Physics. | Students Gr 8–12 | 4 Hours
2. **Founders Blueprint Bootcamp** — 6 weeks. Real frameworks. Your first venture blueprint. | Students Gr 8–12 | 6 Weeks
3. **The Founder & CEO's Walk** — 298 years of entrepreneurship lessons, walked through Jaipur. | Students + Adults | 2 Hours
4. **Learn to Pitch** — A 10-day confidence and expression intensive. Pitch as proof. | Students Gr 6+ | 10 Days *(Coming Soon tag)*
5. **Mathematics Classes** — Grades 8–12. Physics-informed, concept-first. | Students Gr 8–12 | Ongoing

---

#### Section 5: Social Proof
**Layout:** Off-white. Alternating testimonials + outcome stats.

**Stats row (4 across):**
```
159+        Students taught
10+         Universities
5+          Ventures built
925+        Kythera community members
```

**Testimonials (3, in cards):**
```
"They made me curious about both Physics and Maths."
— Anurag Harsh, accepted to University of Leeds

"This is not just for acing exams, but for falling in love with the subject itself."
— Prannat Sharma

"Atray didn't just give me strategies — he changed how I think about business."
— Eli Finer
```

**University logos row:** UChicago · Duke · Parsons · Pratt · SAIC *(text-only list, clean)*

---

#### Section 6: About Atray (short)
**Layout:** Dark background. Left: text. Right: Atray's portrait.

```
LABEL: LED BY A FOUNDER-EDUCATOR

HEADLINE:
Atray Agrawal

BODY:
A serial entrepreneur, physics teacher, and pattern-thinker.
5+ ventures. 159+ students. 8 years building communities.

Atray founded Cosmic Essence because he believes the
entrepreneurial mindset must be built during high school —
not stumbled into later. His method: use Physics as the language,
and real-world building as the proof.

Featured in: Times of India · DNA · City Radio

CTA: [Read Atray's Story] → /about
```

---

#### Section 7: Latest from CE
**Layout:** White. 3-column grid showing latest blog posts (pulled from CMS). Each card = title + date + 2-line excerpt + Read More link.

```
LABEL: FROM THE CE BLOG
HEADLINE: Ideas, Frameworks & Stories

[Blog Post Card 1]   [Blog Post Card 2]   [Blog Post Card 3]

CTA: [View All Posts] → /blog
```

---

#### Section 8: YouTube Embed
**Layout:** Off-white. Centered. One featured video embed.

```
LABEL: WATCH
HEADLINE: See How We Teach

[YouTube embed — 16:9, max-width 800px, centered]

Below embed:
Subscribe to the CE YouTube channel →
[YouTube subscribe button or link]
```

*Note for Atray: Replace `YOUTUBE_VIDEO_ID` in the HTML with your actual video ID.*

---

#### Section 9: Instagram Feed
**Layout:** White. Horizontal scroll row of 6 latest posts.

**Implementation:** Use Behold.so free widget (embed a JS snippet) OR a static grid of 6 screenshots linking to Instagram. 

*Note: Behold.so free tier = 15 posts displayed, refreshes weekly. Embed code: paste one `<script>` tag and one `<div>` tag.*

```
LABEL: @ATRAYAGRAWAL ON INSTAGRAM
[6 post thumbnails in a row, each linking to instagram.com/atrayagrawal]
CTA: [Follow on Instagram →]
```

---

#### Section 10: Lead Magnet / Newsletter CTA
**Layout:** Full-width, orange background. White text. Centered.

```
HEADLINE:
"Get the CE Starter Guide — Free"

BODY:
5 physics-based thinking tools every teenager
(and every parent) should have.

[Tally embed — just Name + Email fields, inline]

Below form:
→ No spam. One useful email a week, max.
```

---

### 4.2 About Page (`about.html`)

**Sections:**
1. **Hero** — "Why Cosmic Essence Exists" — CE's POV statement in full
2. **Atray's Story** — Full bio from About_Atray.pdf, written in first person, human tone
3. **CE's Mission + Vision** — From Strategic_Guidelines: Vision, Mission, Values (5 values as cards)
4. **The 100-Year Vision** — One paragraph: this isn't a tutoring company. It's a 100-year institution.
5. **Kythera** — Brief mention of Kythera as Atray's parallel community work (social proof of track record)
6. **Media** — "Featured in: Times of India · DNA · City Radio"
7. **Join the Team** — Brief section + Tally "Join Our Team" form embed
8. **CTA** — "Ready to explore CE programs?" → /programs

---

### 4.3 Programs Index (`programs/index.html`)

**Layout:** Clean listing of all 5 programs.

Each program gets a full-width card with:
- Program name + category tag
- 3-sentence description
- Who it's for
- Duration + format (live/in-person/online)
- Key outcomes (3 bullet points)
- CTA: [Learn More] OR [Join Waitlist] for coming-soon ones

---

### 4.4 First Spark Workshop (`programs/first-spark.html`)

Pull all content from CE_Website.pdf sections 8–11. Structure:
1. Hero — Name + tagline + CTA
2. The Problem (why this workshop exists)
3. What you'll achieve (4 outcomes)
4. Workshop highlights (6 feature tiles)
5. Who this is for
6. About Atray (short)
7. Testimonials (2–3)
8. Guarantee statement
9. Pricing + CTA → Tally Program Enquiry form

---

### 4.5 Founders Blueprint Bootcamp (`programs/founders-blueprint.html`)

Pull all content from CE_Website.pdf sections 12–16. Structure:
1. Hero
2. The objective + promise
3. 6-week curriculum (week by week)
4. What's included (8 items)
5. Who this is for
6. About Atray (short)
7. Testimonials
8. Guarantee
9. Pricing + CTA → Tally form

---

### 4.6 The Founder & CEO's Walk (`programs/founders-walk.html`)

Pull from Founder_CEOs_Walk__Students.pdf + Adults.pdf. Structure:
1. Hero — "298 Years of Entrepreneurship Lessons. Walked."
2. Two audience tabs: [For Students] | [For Adults/Founders] — toggle between content
3. What makes this walk different
4. What you'll experience (bullet list)
5. What you take away
6. Testimonials (4 existing ones from the PDFs)
7. Pricing (Community: ₹899 students / ₹1299 adults | Private: ₹2499/person min 2)
8. How to book → Tally Walk Booking form + WhatsApp link

---

### 4.7 Mathematics Classes (`programs/math-classes.html`)

Structure:
1. Hero — "Physics-Informed Mathematics for Grades 8–12"
2. What's different about how CE teaches math
3. Grades covered + curriculum boards (CBSE, IB, IGCSE)
4. Format (live, small cohort, online)
5. Testimonials (use Anurag Harsh, Aritra Saha, Manya Premani from About_Atray)
6. CTA → Tally Program Enquiry form

---

### 4.8 Learn to Pitch (`programs/learn-to-pitch.html`)

Structure:
1. Hero — "Confidence is the Product. The Pitch is the Proof."
2. Coming Soon banner with waitlist CTA
3. Program overview (10-day intensive, co-facilitated with Vidhi/ABT)
4. Three-phase arc:
   - Days 1–3: Presence & Psychological Safety (Vidhi leads)
   - Days 4–7: Idea Development (Atray leads)
   - Days 8–10: Delivery & Pitch (co-facilitated)
5. Who it's for (Grade 6+, mixed-age cohorts)
6. Join Waitlist → Tally newsletter form tagged "Learn to Pitch"

---

### 4.9 The Book (`book.html`)

Structure:
1. Hero — Book title, cover image placeholder, tagline
2. What the book is about (the 4D framework, written for CBSE/IB Grades 9–12)
3. Table of contents preview (collapsible accordion — 5 parts + 17 chapters)
4. Sample excerpt — first 3 paragraphs of the Preface from the draft
5. Comparable books: "If you liked Range by David Epstein..."
6. "Stay updated" → Tally newsletter form tagged "Book"
7. "Interested in publishing?" → Contact form

---

### 4.10 Resources Hub (`resources/index.html`)

**Layout:** Clean grid. Each resource = card with title, description, format tag (PDF/Guide/Report), and download CTA.

**Initial resources to populate:**
1. **The CE Starter Guide** — 5 physics-based thinking tools (lead magnet PDF — to be created)
2. **First Principles Worksheet** — from the book (Reality Table)
3. **Experiment Canvas** — from the book
4. **Inversion Map** — from the book
5. **The Flywheel Canvas** — from the book

Each download → triggers Tally Resource Download form (Name + Email) before showing the Google Drive link.

**CMS-managed:** New resources added via Decap CMS, no code needed.

---

### 4.11 Blog (`blog/index.html`)

**Layout:** Clean list. Each post = title + date + category tag + 2-line excerpt + Read More.

**Categories:** Physics × Business | Student Stories | Frameworks | CE Updates

**Individual post page:** Auto-generated from markdown files in `_content/blog/` via Decap CMS. Atray writes in the CMS dashboard, hits publish — post goes live.

**No pagination initially.** Show all posts (there won't be many to start). Add pagination later via CMS config.

---

### 4.12 Contact Page (`contact.html`)

**Sections:**
1. Direct contact info (email, WhatsApp, Instagram)
2. Program Enquiry form (Tally embed — full form)
3. Walk Booking form (Tally embed)
4. Newsletter signup (Tally embed)
5. Join the Team form (Tally embed)

---

### 4.13 404 Page (`404.html`)

**Content:**
```
HEADLINE (JetBrains Mono):
"Looks like this page lost its momentum."

BODY:
Let's get you back on track.

LINKS: Home · Programs · Contact
```

---

## 5. Decap CMS Configuration

### `admin/config.yml`

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "assets/images/uploads"
public_folder: "/assets/images/uploads"

collections:
  - name: "blog"
    label: "Blog Posts"
    folder: "_content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Category", name: "category", widget: "select", options: ["Physics × Business", "Student Stories", "Frameworks", "CE Updates"] }
      - { label: "Excerpt", name: "excerpt", widget: "text" }
      - { label: "Featured Image", name: "image", widget: "image", required: false }
      - { label: "Body", name: "body", widget: "markdown" }

  - name: "testimonials"
    label: "Testimonials"
    folder: "_content/testimonials"
    create: true
    fields:
      - { label: "Name", name: "name", widget: "string" }
      - { label: "Role", name: "role", widget: "string" }
      - { label: "Quote", name: "quote", widget: "text" }
      - { label: "Program", name: "program", widget: "string", required: false }
      - { label: "Featured", name: "featured", widget: "boolean", default: false }

  - name: "resources"
    label: "Resources"
    folder: "_content/resources"
    create: true
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Description", name: "description", widget: "text" }
      - { label: "Format", name: "format", widget: "select", options: ["PDF", "Guide", "Report", "Template"] }
      - { label: "Download Link", name: "download_url", widget: "string" }
      - { label: "Gated (requires email)", name: "gated", widget: "boolean", default: true }
```

---

## 6. Netlify Configuration

### `netlify.toml`
```toml
[build]
  publish = "."

[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### `admin/index.html`
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CE Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

---

## 7. SEO & Meta

Every page includes:
```html
<meta name="description" content="[page-specific description]">
<meta property="og:title" content="[page title] | Cosmic Essence Education">
<meta property="og:description" content="[description]">
<meta property="og:image" content="/assets/images/og-image.jpg">
<meta property="og:url" content="https://cosmicessence.co.in/[path]">
<meta name="twitter:card" content="summary_large_image">
```

**Page-specific descriptions:**
- Homepage: "Cosmic Essence Education teaches entrepreneurship through Physics to ambitious teenagers (13–18). Programs in Jaipur and online. Founded by Atray Agrawal."
- About: "Meet Atray Agrawal — serial entrepreneur, physics teacher, and founder of Cosmic Essence Education. 159+ students. 5+ ventures. A different kind of education."
- Walk: "The Founder & CEO's Walk — 298 years of entrepreneurship lessons walked through Jaipur's streets. For students, founders, and curious minds."

---

## 8. Performance Requirements

- **No external CSS frameworks** (no Bootstrap, no Tailwind CDN) — write clean custom CSS only
- **No JavaScript frameworks** — vanilla JS only for nav toggle, scroll effects, tab switching
- **Google Fonts** loaded with `display=swap` to prevent layout shift
- **Images** — use `loading="lazy"` on all below-fold images
- **Target:** Lighthouse score 90+ on mobile

---

## 9. Tally Form Integration Pattern

For every Tally form embed:
```html
<!-- Inline embed -->
<div data-tally-src="https://tally.so/embed/[FORM_ID]" 
     data-tally-layout="inline" 
     data-tally-width="100%" 
     data-tally-hide-title="1"
     data-tally-emoji-text="👋" 
     data-tally-emoji-animation="wave">
</div>
<script async src="https://tally.so/widgets/embed.js"></script>
```

**Placeholder IDs** (Atray to replace after creating forms on tally.so):
- Newsletter signup: `TALLY_NEWSLETTER`
- Program enquiry: `TALLY_PROGRAM`
- Walk booking: `TALLY_WALK`
- Resource download: `TALLY_RESOURCE`
- Join team: `TALLY_TEAM`

---

## 10. Responsive Breakpoints

```css
/* Mobile first */
/* Default: mobile (< 640px) */

@media (min-width: 640px)  { /* sm — large phones */ }
@media (min-width: 768px)  { /* md — tablets */ }
@media (min-width: 1024px) { /* lg — laptops */ }
@media (min-width: 1280px) { /* xl — desktops */ }
```

---

## 11. Social Links

To be placed in nav, footer, and About page:
- **Instagram:** https://instagram.com/atrayagrawal
- **YouTube:** https://youtube.com/@cosmicessence *(placeholder — update with actual channel)*
- **LinkedIn:** https://linkedin.com/in/atrayagrawal *(placeholder)*
- **WhatsApp:** https://wa.me/918742017911
- **Email:** atray@cosmicessence.co.in

---

## 12. Deployment Steps (for README.md)

Claude Code should also generate a `README.md` with these exact steps:

```
STEP 1 — Create GitHub repository
- Go to github.com → New Repository
- Name: cosmic-essence-site
- Public repository
- Push all site files

STEP 2 — Deploy to Netlify
- Go to netlify.com → Add new site → Import from Git
- Connect GitHub → select cosmic-essence-site
- Build settings: leave blank (static site, no build command)
- Deploy

STEP 3 — Enable Netlify Identity
- Site Settings → Identity → Enable Identity
- Registration: Invite only
- Services → Git Gateway → Enable
- Invite yourself as admin (your email)

STEP 4 — Create Tally forms
- Go to tally.so → create free account
- Create 5 forms (see Section 9)
- Copy embed codes
- Replace TALLY_* placeholders in HTML files

STEP 5 — Connect domain
- Netlify → Domain Settings → Add custom domain
- Enter: cosmicessence.co.in
- Follow DNS instructions (add CNAME or A record at your domain registrar)

STEP 6 — Access your CMS
- Go to cosmicessence.co.in/admin
- Log in with your Netlify Identity invite email
- Start adding blog posts, testimonials, resources

STEP 7 — Add Behold.so Instagram widget (optional)
- Go to behold.so → free account
- Connect your Instagram
- Copy the embed snippet
- Paste into the Instagram section of index.html
```

---

## 13. Content Placeholders for Atray to Fill

The following items are marked `[PLACEHOLDER]` in the HTML and need to be swapped before launch:

1. `[ATRAY_PORTRAIT_URL]` — High-res photo of Atray
2. `[YOUTUBE_VIDEO_ID]` — Featured YouTube video ID
3. `[INSTAGRAM_HANDLE]` — Confirmed Instagram handle
4. `[YOUTUBE_CHANNEL_URL]` — Full YouTube channel URL
5. `[LINKEDIN_URL]` — LinkedIn profile URL
6. `TALLY_*` — All 5 Tally form IDs (after creating on tally.so)
7. `[OG_IMAGE]` — 1200×630px social share image
8. Program pricing — confirm current pricing for each program before launch
9. Book cover image — placeholder for now

---

## 14. Future Additions (Do Not Build Now)

These are noted here so the architecture supports them later:

- **Student portal** — password-protected resource area for enrolled students
- **Events calendar** — upcoming walks, workshops, webinars
- **Alumni directory** — opt-in showcase of CE student outcomes
- **Multilingual** — Hindi version of key pages
- **Podcast page** — when CE launches its podcast
- **Merch store** — if/when CE launches physical products

The current file structure and CMS setup supports all of these as new additions without rebuilding anything.

---

*PRD version 1.0 — April 2025*
*Built for Claude Code. All content sourced from CE's own documents.*
