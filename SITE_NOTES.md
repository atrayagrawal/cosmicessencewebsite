# Cosmic Essence website — working notes

This file lives in the website repo (`cosmicessencewebsite`) so it is both **local** and **on the server** after deploy:

- Local: `D:\Cosmic Essence\cosmicessencewebsite\SITE_NOTES.md`
- Live: https://cosmicessence.co.in/SITE_NOTES.md
- Git: https://github.com/atrayagrawal/cosmicessencewebsite

Use this to pick up work, revert, and remember parked decisions. Do not put this page in the public nav.

---

## How to pick this up

1. Repo: `D:\Cosmic Essence\cosmicessencewebsite` → GitHub `atrayagrawal/cosmicessencewebsite` → Netlify publish `.`
2. Canonical CTAs are in `assets/js/main.js` (`CE_LINKS`). Sitewide nav pill + footer strip are rewritten there, so you do not have to edit every HTML file for community vs assessment.
3. **Resources (homepage + /resources/):** edit `_content/resources/index.json` only. Both pages load that file. Set `"show_on_home": true` to also show on the homepage. `"home_style": "video"` + `"embed"` renders the YouTube iframe on the home page.
4. Program landing pages: `programs/design-your-life.html`, `programs/future-founders-bootcamp.html`, `programs/future-founders-fellowship.html`.
5. Atlas CTAs are hardcoded in `atlas.html` (that page does not use `main.js`).

### Add a resource later

Edit `_content/resources/index.json`, add an object:

```json
{
  "id": "short-slug",
  "tag": "PDF",
  "title": "Title",
  "description": "One or two sentences.",
  "url": "https://...",
  "cta": "Open →",
  "external": true,
  "show_on_home": true,
  "home_style": "card"
}
```

Commit and push. Homepage and Resources update together. Do not put templates back on the Resources page unless they are in this JSON.

---

## Live links (current)

| Use | URL |
|---|---|
| WhatsApp Community | https://superprofile.bio/lf/6a9a82a0f29e060013b4fdcc |
| Readiness Call | https://superprofile.bio/bookings/atrayagrawal?sessionId=6a6e1cca33211a0013338098 |
| YouTube playlist | https://www.youtube.com/playlist?list=PLAvixarDYsX4 |
| Readiness Assessment (Tally) | https://tally.so/r/2EzpEM |
| Fellowship Apply | https://tally.so/r/gDEAYP |
| Fellowship Program Details | https://superprofile.bio/lf/6aad2a945fee200013287fc1 |
| Math (IB/IGCSE) WhatsApp | https://wa.me/918742017911?text=Hi%20Atray%2C%20I'm%20interested%20in%20Math%20classes%20for%20IB%2FIGCSE. |

**Sitewide CTA (nav + footer strip):** Community.  
**Atlas CTAs (for now):** Readiness Call.  
**Bootcamp page still has** “Take Readiness Assessment” as a program CTA (intentional — that is CTA 2 on the Bootcamp landing page).

---

## Changelog

### 2026-09-18 — Community CTAs, Atlas → call, resources without CMS

- Nav pill “Find Readiness Score” and footer assessment strips now point to the **WhatsApp community** (`initSitewideCtas` in `main.js`).
- Homepage: removed the bottom assessment block (lead magnet + strip). Hero secondary CTA is Join Community.
- Atlas: every assessment Tally CTA is now the **Readiness Call**.
- Resources: CMS disconnected. Templates removed. List comes from `_content/resources/index.json` (Atlas + YouTube playlist). Homepage “Resources” section reads the same file (`show_on_home`).
- Blog → Kit.com **not done** (custom URL not ready). Leave the current blog/CMS until then.

### 2026-09-18 — Programs match sales calls

- Design Your Life: 7 days, 1 hour/day, ages 12+, ₹6,500. CTA: Readiness Call.
- Future Founders Bootcamp: 8 weeks, learn to build / learn to sell, no fee on page. CTA 1 currently Readiness Call (waiting on Program Details Superprofile/doc). CTA 2: Assessment.
- Future Founders Fellowship: new Blue Ocean Track page, cohort 15, no fee. Details + Apply Now wired.
- Walk stays in nav. Math classes: no landing page, WhatsApp IB/IGCSE. First Spark unlisted.
- Student count 195+.

---

## Parked / do next

1. **Bootcamp Program Details URL** (Superprofile `/lf/` or Google Doc). Until then, “Check out the Program Details” on Bootcamp goes to the Readiness Call.
2. **Blog → Kit.com** once the custom URL exists. Current blog still uses `_content/blog/` + `cms-content.js`.
3. **Assessment Tally** is parked as a sitewide CTA. It still exists at `https://tally.so/r/2EzpEM` and is still used as Bootcamp CTA 2.
4. First Spark and old math landing page files still exist on disk but are not sold. Math URL redirects to WhatsApp.

---

## How to revert

Everything is git. From `cosmicessencewebsite`:

```
git log --oneline -10
git revert <commit-hash>
git push origin main
```

To roll the whole 18 Sep program rewrite: look for commit `Align program pages with the live offer`.  
To roll only this CTA/resources pass: revert the commit that mentions community CTAs / Atlas / resources JSON.

Netlify deploys `main`. A revert + push restores the live site.

---

## Voice / offer rules (so the next edit does not fight the calls)

- Do not publish Bootcamp or Fellowship fees on the site.
- Do not mention 1-on-1s on public pages.
- DYL is the only program with a public price (₹6,500).
- Fellowship: mentorship for global entrepreneurship competitions, Blue Ocean Track, cohort of 15.
- Bootcamp: Learn to build. Learn to sell. 8 weeks.
- Resources are not a CMS. Do not reconnect `cms-content.js` to `/resources/`.
