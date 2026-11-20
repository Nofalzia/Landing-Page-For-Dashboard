# Retail Analytics — Landing Page

Marketing landing page for the **Retail Analytics Dashboard** Final Year Project.

## Stack

- Vite + React 18
- Tailwind CSS v3
- Roboto Slab + Montserrat + Inter (Google Fonts)
- Zero external dependencies beyond React

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Drop the `dist/` folder into **Vercel** or **Netlify** — works with zero config.

Or connect the repo to Vercel and it auto-deploys on push.

## Links

| Resource | URL |
|---|---|
| Live Dashboard | https://retail-analytics-dashboard-sigma.vercel.app |
| Dashboard GitHub | https://github.com/Nofalzia/Retail_Analytics_Dashboard |

## Structure

```
src/
  components/
    Navbar.jsx          # Sticky nav, mobile menu
    Hero.jsx            # Hero + dashboard mockup
    UseCasesSection.jsx # Tehzeeb / Imtiaz / Al-Fatah tabs ← signature section
    FeaturesSection.jsx # Interactive numbered feature list
    HowItWorksSection.jsx
    AnomalySection.jsx  # Dark green differentiator section
    ArchitectureSection.jsx
    TeamSection.jsx     # Team + Bahria University
    FinalCTA.jsx
    Footer.jsx
  index.css             # Design tokens + global styles
  App.jsx
  main.jsx
public/
  favicon.svg
  robots.txt
  sitemap.xml
index.html              # Full SEO + OG meta
```

## Project Info

**Final Year Project** — Bahria University Islamabad  
**Team:** Mohammad Nofal Zia · Azlan Shah  
**Supervisor:** Ms. Ameena Saaed
