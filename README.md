# RentalKE

**Affordable rental homes for everyone in Kenya**

## 🎯 Project Vision

RentalKE is a rental housing platform designed to solve the affordable housing search problem in Kenya. Starting in Vijiweni, Mombasa, the platform connects landlords with tenants looking for affordable bedsitters, 1-bedroom, and larger homes.

### Target Users
- Students and comrades looking for affordable housing
- Young professionals starting their careers
- Anyone seeking affordable rental homes
- Landlords who want to list their properties for free

### Key Differentiators
1. **Real-time availability status** - No stale listings
2. **Hyperlocal focus** - Starting with underserved neighborhoods
3. **Free for landlords and tenants** - No agent fees
4. **Extreme simplicity** - "7-year-old test" - anyone can use it

---

## 🎨 Design Philosophy

Inspired by **Stripe** and **Mercor**, RentalKE follows these principles:

### Visual Design
- **Minimalist** - No unnecessary elements
- **Typography-driven** - Let content breathe
- **No animations** - Fast loading, professional feel
- **Generous whitespace** - Clean, uncluttered
- **Flat design** - No shadows, no complex hover effects
- **Mobile-first** - Optimized for phone screens

### Color Palette

**Primary Colors:**
- Primary Blue: `#2563EB` (trust, main actions)
- Purple Accent: `#7C3AED` (modern touch)
- Gradient: `linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)`

**Neutrals:**
- Background: `#FFFFFF`
- Light Background: `#F9FAFB`
- Text Primary: `#111827`
- Text Secondary: `#6B7280`
- Border: `#E5E7EB`

**Status Colors:**
- Available: `#10B981` (green)
- Almost Full: `#F59E0B` (amber)
- Occupied: `#EF4444` (red)

### Typography
- **Font:** Inter (Google Fonts)
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold)
- **Sizes:**
  - H1: 48px Semibold
  - H2: 36px Semibold
  - H3: 24px Semibold
  - Body: 16px Regular
  - Small: 14px Regular

### User Experience Principles

**"7-Year-Old Test"** - Every feature must be usable by:
- A 7-year-old child
- A 60-year-old landlord with no tech experience
- Someone with basic English skills

**Hand-Holding Approach:**
1. Tell users EXACTLY what to do
2. Show progress everywhere (Step 1 of 3)
3. One action per screen
4. Explain WHY we need information
5. Use visual cues (icons, arrows, numbers)
6. Celebrate successes

**Content Rules:**
- Simple English (6th grade reading level)
- Active voice
- No jargon
- Encouraging tone
- Clear next steps

---

## 🏗️ Website Structure

### Core Pages

1. **Homepage**
   - Hero with giant search box
   - "How It Works" (3 steps)
   - Featured available homes

2. **Search Results**
   - Simple filters (price, bedrooms)
   - Clean home cards
   - Real-time availability status

3. **Individual Home Page**
   - Large photos
   - Clear details (price, location, amenities)
   - Prominent contact buttons (WhatsApp, phone)

4. **For Landlords**
   - Explanation of free listing
   - How it works for landlords
   - CTA to list a house

5. **List Your House** (Multi-step form)
   - Step 1: Location
   - Step 2: House details
   - Step 3: Photos
   - Step 4: Contact info
   - Success page with next steps

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (React framework)
- Tailwind CSS (utility-first styling)
- TypeScript (type safety)

**Backend:**
- Next.js API routes
- PostgreSQL (via Supabase)

**Hosting:**
- Vercel (free tier)
- Supabase (database + storage)

**Media:**
- Cloudinary (image hosting/optimization)

**Why This Stack:**
- Single codebase for frontend + backend
- Free hosting (Vercel)
- Free database (Supabase)
- Excellent performance
- Mobile-optimized
- Easy to scale

---

## 📁 Project Structure

```
rentalke/
├── app/                  # Next.js 15 app directory
│   ├── page.tsx         # Homepage
│   ├── search/          # Search results
│   ├── homes/[id]/      # Individual home page
│   ├── landlords/       # For landlords page
│   └── list/            # List your house flow
├── components/          # Reusable components
├── lib/                 # Utilities and helpers
├── public/              # Static assets
├── styles/              # Global styles
└── types/               # TypeScript types
```

---

## 🚀 Getting Started

(Instructions will be added once we set up the project)

---

## 📋 Development Roadmap

### Phase 1: MVP (Weeks 1-2)
- [ ] Set up Next.js project
- [ ] Design and build homepage
- [ ] Create property listing cards
- [ ] Build individual property page
- [ ] Implement basic search/filter
- [ ] Create landlord listing form
- [ ] Set up database schema

### Phase 2: Launch (Week 3)
- [ ] Add 10-15 sample listings
- [ ] Test on multiple devices
- [ ] Optimize for mobile
- [ ] Deploy to production
- [ ] Soft launch in Vijiweni

### Phase 3: Growth (Week 4+)
- [ ] Add real Vijiweni properties
- [ ] Implement WhatsApp integration
- [ ] Add landlord dashboard
- [ ] Create admin panel for updates
- [ ] Marketing in Mombasa
- [ ] Collect user feedback
- [ ] Iterate based on feedback

### Future Features
- Map view of properties
- Save favorites
- Email notifications
- SMS availability updates
- Landlord reviews
- Virtual tours
- Expand to other cities

---

## 🎯 Success Metrics

**MVP Validation (3 months):**
- 20+ active property listings in Vijiweni
- 5-10 successful rentals facilitated
- Positive feedback from landlords and tenants
- Return users (people recommending to friends)

**Growth Phase:**
- Expand to 3+ neighborhoods in Mombasa
- 100+ active listings
- 50+ rentals per month
- Begin monetization experiments

---

## 👥 Team

**Mordy** - Founder & Developer

---

## 📄 License

TBD

---

**Domain:** rentalke.com
**GitHub:** github.com/morde2002/rentalke
**Started:** January 2026
