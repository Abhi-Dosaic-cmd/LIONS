# Lions Club of LEAD College Autonomous, Dhoni - Portfolio Website

This is a premium, modern, responsive portfolio website built for the **Lions Club of LEAD College Autonomous, Dhoni**. The platform showcases the club's leadership, mission, historical milestones, community activities, and recruits new members.

---

## 🎨 Design System & Brand Identity

The interface has been curated to project **Trust, Legacy, Leadership, and Innovation**:
- **Official Color Palette**:
  - **Royal Blue (`#003F87`)**: Represents professionalism, structure, and loyalty.
  - **Gold (`#FDB913`)**: Represents youth energy, optimism, and excellence.
  - **Dark Theme Navy (`#080F1E` / `#0B132B`)**: Provides contrast for modern glassmorphism layouts.
  - **Light Theme Slate (`#F8FAFC`)**: Ensures light readability across cards.
- **Glassmorphism**: Glass-like semi-transparent panels with background blurs create depth.
- **Aesthetic Motions**: Animations powered by `Framer Motion` for element reveals, hover states, filter changes, and form submissions.
- **Typography**: Prefetched `Outfit` and `Inter` Google Fonts.

---

## 🚀 Key Features

1. **Sticky Glassmorphic Navbar**: Features scroll progress tracking, active section indicators, and responsive drawer navigation.
2. **Hero Section & Animated Counters**: Viewport-triggered statistics for projects, active members, lives impacted, and years of service.
3. **About & Milestones Timeline**: An interactive timeline detailing chartering events and achievements.
4. **Current Board of Directors Grid**: Circular profile cards pulling from a customizable JSON config, complete with quotes and social icons.
5. **Activities Grid**: Full search/filter support by category and year. Cards include a "Read More" modal popover for details.
6. **Masonry Gallery**: Interactive gallery filter tabs. Features a fullscreen lightbox supporting keyboard navigation (left/right, ESC).
7. **Join Lions recruitment Form**: Form validations for email, phone, name, and study years. Triggers a `canvas-confetti` celebration upon success.
8. **Contact Us & Map**: Address details, validated contact form, and embedded college location.
9. **Dark Mode Integration**: System-preferred theme loading with manual toggle support.
10. **Favicon support**: Custom vector shield emblem SVG.
11. **SEO Optimization**: Configured title tags, meta tags, and Open Graph attributes.

---

## 🛠️ Technical Stack

- **Framework**: React 19 (TypeScript)
- **Scaffolding**: Vite 8
- **Styles**: Tailwind CSS v4 (native `@theme` and `@utility` imports)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Celebration Particle Engine**: Canvas Confetti
- **Typography**: Outfit + Inter Google Fonts

---

## 📁 Directory Structure

```
LIONS/
├── dist/                   # Production build distribution folder
├── public/
│   ├── favicon.svg         # Custom Lions shield emblem SVG
│   └── assets/             # Static images
├── src/
│   ├── components/         # Modular presentation layouts
│   │   ├── About.tsx       # Introduction & Milestones timeline
│   │   ├── Activities.tsx  # Event grids with detail modals
│   │   ├── Board.tsx       # Leadership board of directors grid
│   │   ├── FloatingActions.tsx # Back to top floating button
│   │   ├── Footer.tsx      # Comprehensive site footer
│   │   ├── Gallery.tsx     # Masonry gallery + keyboard lightbox
│   │   ├── Hero.tsx        # Hero banner with CTA triggers
│   │   ├── JoinLions.tsx   # Perks & validated recruitment forms
│   │   ├── Navbar.tsx      # Sticky glass nav + scroll tracker
│   │   ├── StatsSection.tsx# Statistics counter animations
│   │   ├── ThemeToggle.tsx # Light / Dark mode switcher
│   │   └── VisionMission.tsx # Side-by-side Vision/Mission cards
│   ├── data/               # Configurable JSON files for easy updates
│   │   ├── activities.json # Initiatives data config
│   │   └── board.json      # Board members data config
│   ├── pages/
│   │   └── Portfolio.tsx   # Combined Portfolio landing page
│   ├── App.tsx             # Bootstrap wrapper, loading screens, layouts
│   ├── index.css           # Tailwind base styles, theme values, utilities
│   └── main.tsx            # App entry point
├── index.html              # SEO & Open Graph meta config
├── postcss.config.js       # PostCSS Tailwind config
├── tsconfig.json           # TS configuration
└── package.json            # Scripts & dependencies manifest
```

---

## ⚙️ Customizing Content

You can easily update the board members and club activities without touching code by editing the JSON files in `src/data/`:

### 1. Board of Directors (`src/data/board.json`)
Update members by matching this structure:
```json
{
  "id": "1",
  "name": "Dr. Aarav Mehta",
  "designation": "Club Advisor",
  "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&fit=crop",
  "quote": "Empowering youth to lead with compassion.",
  "socialLinks": {
    "linkedin": "https://linkedin.com",
    "email": "aarav.mehta@lead.ac.in"
  }
}
```

### 2. Activities & Initiatives (`src/data/activities.json`)
Add or edit events:
```json
{
  "id": "1",
  "title": "Mega Blood Donation Camp",
  "date": "2026-05-12",
  "category": "Service",
  "year": "2026",
  "description": "Short card description...",
  "image": "https://images.unsplash.com/...imageurl",
  "details": "Long description shown in popover modal window..."
}
```

---

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Code Linting**:
   ```bash
   npm run lint
   ```

---

## 📦 Deployment Guide

### Build for Production
To compile and optimize assets for deployment:
```bash
npm run build
```
This generates a production-ready bundle in the `/dist` directory.

### Deploying to Netlify/Vercel
This project is fully ready for zero-config deployments:
1. Push this directory to a GitHub repository.
2. Link the repository to Netlify or Vercel.
3. Configure build parameters:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Deploy!
