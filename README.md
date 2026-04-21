# Cosmic Essence Education Website

A modern, minimal website for Cosmic Essence Education — teaching entrepreneurship through physics.

## Overview

- **Stack:** Pure HTML + CSS + Vanilla JS (no frameworks)
- **Hosting:** Netlify (free tier)
- **CMS:** Decap CMS (formerly Netlify CMS) for blog posts, testimonials, and resources
- **Forms:** Tally.so for lead capture
- **Domain:** cosmicessence.co.in

## File Structure

```
/
├── index.html                  # Homepage
├── about.html                  # About CE + Atray
├── contact.html                # Contact forms
├── book.html                   # The Book page
├── 404.html                    # Custom 404
├── programs/
│   ├── index.html              # Programs overview
│   ├── first-spark.html        # First Spark Workshop
│   ├── founders-blueprint.html # Founders Blueprint Bootcamp
│   ├── founders-walk.html      # The Founder & CEO's Walk
│   ├── math-classes.html       # Mathematics Classes
│   └── learn-to-pitch.html     # Learn to Pitch (coming soon)
├── resources/
│   └── index.html              # Resource hub
├── blog/
│   └── index.html              # Blog listing
├── admin/
│   ├── index.html              # Decap CMS entry point
│   └── config.yml              # CMS configuration
├── assets/
│   ├── css/
│   │   ├── main.css            # Global styles
│   │   └── components.css      # Component styles
│   ├── js/
│   │   └── main.js             # Vanilla JS (nav, tabs, etc.)
│   └── images/
│       └── ...                 # Images (upload here)
├── _content/                   # CMS-managed content
│   ├── blog/
│   ├── testimonials/
│   └── resources/
├── netlify.toml                # Netlify configuration
└── README.md                   # This file
```

## Deployment Steps

### Step 1: Create GitHub Repository

1. Go to github.com → New Repository
2. Name: `cosmic-essence-site`
3. Make it public
4. Push all these files to the repository

### Step 2: Deploy to Netlify

1. Go to netlify.com → Add new site → Import from Git
2. Connect GitHub → select `cosmic-essence-site`
3. Build settings: leave blank (static site, no build command)
4. Click Deploy

### Step 3: Enable Netlify Identity (for CMS)

1. In Netlify dashboard → Site Settings → Identity → Enable Identity
2. Registration: Invite only
3. Services → Git Gateway → Enable
4. Invite yourself as admin (your email)

### Step 4: Create Tally Forms

1. Go to tally.so → create free account
2. Create these 5 forms:
   - Newsletter signup (Name + Email + "I am a: Student/Parent/Educator/Other")
   - Program enquiry (Name + Email + Phone + Program + Grade/Age + Message)
   - Walk booking (Name + Email + Phone + Walk type + Preferred date)
   - Resource download (Name + Email)
   - Join team (Name + Email + Role + Note)
3. Copy each form's embed ID
4. Replace `TALLY_NEWSLETTER`, `TALLY_PROGRAM`, `TALLY_WALK`, `TALLY_RESOURCE`, `TALLY_TEAM` in HTML files with actual IDs

### Step 5: Connect Domain

1. Netlify → Domain Settings → Add custom domain
2. Enter: `cosmicessence.co.in`
3. Follow DNS instructions (add CNAME or A record at your domain registrar)

### Step 6: Access Your CMS

1. Go to `cosmicessence.co.in/admin`
2. Log in with your Netlify Identity invite email
3. Start adding blog posts, testimonials, resources

### Step 7: Add Images

Replace these placeholders before launch:

- `[ATRAY_PORTRAIT]` — High-res photo of Atray (add to assets/images/)
- `[YOUTUBE_VIDEO_ID]` — Featured YouTube video ID
- `[BOOK COVER PLACEHOLDER]` — Book cover image
- `[OG_IMAGE]` — 1200×630px social share image
- Instagram placeholders — Replace with Behold.so widget or actual images

## Placeholder Content to Update

Search for these in the HTML files and replace:

1. `[ATRAY_PORTRAIT_URL]` — Hero/about page images
2. `[YOUTUBE_VIDEO_ID]` — YouTube embed on homepage
3. `[INSTAGRAM_HANDLE]` — Confirm @atrayagrawal
4. `[YOUTUBE_CHANNEL_URL]` — Full YouTube channel URL
5. `[LINKEDIN_URL]` — LinkedIn profile URL
6. `TALLY_*` — All 5 Tally form IDs
7. `[OG_IMAGE]` — Social share image
8. Program pricing — Confirm current pricing

## CMS Usage

Access the CMS at `yourdomain.com/admin`

### Blog Posts
- Write in markdown
- Add title, date, category, excerpt
- Upload featured image
- Publish to go live

### Testimonials
- Add student/parent quotes
- Mark as "featured" to show on homepage
- Link to specific programs

### Resources
- Upload PDFs/guides
- Mark as "gated" to require email before download
- Organize by format type

## Customization

### Colors
Edit in `assets/css/main.css`:
```css
--ce-orange: #F26522;    /* Primary brand */
--ce-black: #111111;     /* Headings */
--ce-off-white: #F9F6F1; /* Backgrounds */
```

### Typography
Uses Google Fonts:
- JetBrains Mono (headings)
- Lato (body)

Load in each HTML file's `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
```

## Performance

Target metrics:
- Lighthouse score: 90+ on mobile
- No external CSS frameworks (pure custom CSS)
- Lazy loading images
- Minimal JavaScript

## Support

For questions or issues:
- Email: atray@cosmicessence.co.in
- WhatsApp: +91 87420 17911

---

Built by Claude Code for Cosmic Essence Education.
