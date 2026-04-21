# CMS Setup Guide for Cosmic Essence Website

## What You Need to Know

The website now uses **Decap CMS** with **dynamic content loading**. This means:

1. **You can edit content via a UI** at `yourdomain.com/admin`
2. **Draft mode is supported** — set "Draft: true" when creating, change to "Draft: false" when ready
3. **Content appears automatically** after you run the index generator

## How Content Works

### The Flow:
```
You edit in CMS (/admin) → Markdown files saved → Run generate-index.js → JSON indexes created → Website displays content
```

## Step-by-Step Setup

### 1. Deploy the Site to Netlify

Follow the main README.md deployment steps:
- Push to GitHub
- Connect to Netlify
- Enable Netlify Identity
- Invite yourself as admin

### 2. Access the CMS

1. Go to `yourdomain.com/admin`
2. Log in with your Netlify Identity email
3. You'll see the CMS dashboard with three collections:
   - **Blog Posts** — Articles and stories
   - **Testimonials** — Student/parent quotes
   - **Resources** — Downloadable guides

### 3. Create Your First Blog Post

1. Click "Blog Posts" → "New Blog Post"
2. Fill in:
   - **Title**: Post title
   - **Publish Date**: When it should appear
   - **Category**: Choose from dropdown
   - **Excerpt**: Short summary (shows in listings)
   - **Draft**: ✅ **Leave checked while editing**
   - **Featured**: Check to show on homepage
   - **Body**: Write your post (markdown supported)
3. Click "Save" — this creates a draft
4. When ready: Uncheck "Draft" and click "Publish"

### 4. Generate the Index (IMPORTANT!)

**After publishing content, you MUST run this:**

```bash
node generate-index.js
```

This creates the JSON files that the website reads.

**Then commit and push:**
```bash
git add .
git commit -m "Update content index"
git push
```

Netlify will auto-deploy, and your content will appear!

## Draft Mode Explained

- **Draft: true** → Post is saved but NOT shown on website
- **Draft: false** → Post is visible to everyone

You can toggle this anytime in the CMS.

## Editorial Workflow

The CMS supports three stages:
1. **Draft** — Working on it
2. **Review** — Ready for review
3. **Published** — Live on site

Use these stages to collaborate or just track your own progress.

## Common Issues

### "I published but don't see it on the website"

**Solution**: You forgot to run `node generate-index.js` and push.

### "The admin panel shows my post but website doesn't"

**Solution**: Check that `draft: false` is set in the post.

### "Images aren't showing"

**Solution**: Make sure images are uploaded via the CMS and properly referenced.

## Content Structure

### Blog Post File Format (auto-generated):
```yaml
---
title: "Your Title"
date: 2025-04-21T10:00:00.000Z
category: "Frameworks"
excerpt: "Short description"
draft: false
featured: true
---

Your content here in markdown...
```

### Resource File Format:
```yaml
---
title: "Guide Name"
description: "What this resource is about"
format: "PDF"
download_url: "https://drive.google.com/..."
gated: true  # Requires email to download
draft: false
---
```

## Quick Commands Cheat Sheet

```bash
# After editing content in CMS:
node generate-index.js
git add .
git commit -m "Update content"
git push

# That's it! Netlify auto-deploys.
```

## Tips

1. **Write in the CMS** — The markdown editor is good enough
2. **Use featured flag** — Check "Featured" for posts you want on homepage
3. **Preview before publishing** — Keep draft=true while editing
4. **Run generate-index after each publish** — This is the most forgotten step!

## Need Help?

If something's not working:
1. Check browser console for errors
2. Verify you ran `node generate-index.js`
3. Check that files were committed and pushed
4. Email: atray@cosmicessence.co.in
