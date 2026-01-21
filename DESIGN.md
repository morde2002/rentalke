# RentalKE Design System

This document contains the complete design specifications for RentalKE.

## Color System

### Primary Colors
```css
--color-primary-blue: #2563EB;
--color-primary-blue-hover: #1D4ED8;
--color-accent-purple: #7C3AED;
--color-accent-purple-hover: #6D28D9;
```

### Gradient
```css
--gradient-primary: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
```

### Neutral Colors
```css
--color-white: #FFFFFF;
--color-background-light: #F9FAFB;
--color-text-primary: #111827;
--color-text-secondary: #6B7280;
--color-border: #E5E7EB;
```

### Status Colors
```css
--color-available: #10B981;
--color-almost-full: #F59E0B;
--color-occupied: #EF4444;
```

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Sizes & Weights
```css
/* Headings */
--font-h1: 48px / 600 (Semibold);
--font-h2: 36px / 600 (Semibold);
--font-h3: 24px / 600 (Semibold);

/* Body */
--font-body-large: 18px / 400 (Regular);
--font-body: 16px / 400 (Regular);
--font-body-small: 14px / 400 (Regular);

/* UI Elements */
--font-button: 16px / 500 (Medium);
--font-label: 14px / 500 (Medium);
```

### Line Heights
```css
--line-height-tight: 1.2;
--line-height-normal: 1.6;
--line-height-relaxed: 1.8;
```

## Spacing System

### Base Unit: 8px

```css
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-5: 40px;
--space-6: 48px;
--space-8: 64px;
--space-10: 80px;
```

### Common Spacings
- Element spacing: 24px (--space-3)
- Section padding: 80px top/bottom (--space-10)
- Mobile padding: 24px sides (--space-3)
- Max content width: 1200px

## Components

### Buttons

#### Primary Button
```css
background: #2563EB;
color: #FFFFFF;
padding: 16px 32px;
border-radius: 8px;
font-size: 16px;
font-weight: 500;
border: none;
cursor: pointer;
transition: background 0.2s ease;

/* Hover */
background: #1D4ED8;
```

#### Secondary Button
```css
background: #FFFFFF;
color: #374151;
padding: 16px 32px;
border-radius: 8px;
border: 1px solid #E5E7EB;
font-size: 16px;
font-weight: 500;
cursor: pointer;
transition: background 0.2s ease;

/* Hover */
background: #F9FAFB;
```

#### WhatsApp Button
```css
background: #25D366;
color: #FFFFFF;
padding: 16px 32px;
border-radius: 8px;
font-size: 16px;
font-weight: 500;
display: flex;
align-items: center;
gap: 8px;

/* Hover */
background: #20BA5A;
```

### Input Fields
```css
width: 100%;
padding: 12px 16px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 16px;
color: #111827;
background: #FFFFFF;

/* Focus */
border-color: #2563EB;
outline: none;
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
```

### Cards (Property Listings)
```css
/* No fancy cards - simple sections with borders */
border-bottom: 1px solid #E5E7EB;
padding: 24px 0;
```

### Status Badge
```css
display: inline-flex;
align-items: center;
padding: 4px 12px;
border-radius: 16px;
font-size: 14px;
font-weight: 500;
gap: 6px;

/* Available */
background: #D1FAE5;
color: #065F46;

/* Occupied */
background: #FEE2E2;
color: #991B1B;
```

## Layout

### Grid System
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
gap: 24px;
```

### Container
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 24px;
```

### Section
```css
padding: 80px 0;
```

## Mobile Breakpoints

```css
/* Mobile first approach */
@media (max-width: 640px) {
  /* Stack everything */
  /* Full width buttons */
  /* Larger tap targets (min 44px) */
}

@media (min-width: 641px) and (max-width: 1024px) {
  /* Tablet */
}

@media (min-width: 1025px) {
  /* Desktop */
}
```

## Icons

Use simple, clear icons from:
- Heroicons (matches Tailwind)
- Or simple SVGs

Keep icons:
- 24px × 24px for UI elements
- Monochrome (use CSS color)
- Simple, not detailed

## Images

### Property Photos
- Aspect ratio: 4:3
- Min width: 800px
- Compressed for web (Cloudinary auto-optimization)
- Lazy loading enabled

### Image Guidelines for Landlords
1. Outside of the house
2. Main room
3. Bathroom
4. Kitchen (if separate)
5. Any special features

## Content Guidelines

### Voice & Tone
- **Friendly** but professional
- **Encouraging** - "Great job!", "Almost there!"
- **Clear** - no jargon
- **Direct** - active voice
- **Helpful** - explain why we need info

### Writing Rules
1. Use simple English (6th grade level)
2. Short sentences (15 words or less)
3. One idea per sentence
4. Active voice ("Click here" not "Button should be clicked")
5. Conversational ("Let's find your home" not "Commence property search")

### Examples

#### ❌ Bad
"Utilize our comprehensive platform to facilitate your residential rental property search"

#### ✅ Good
"Find your next home here"

---

#### ❌ Bad
"Submit property listing for administrative review"

#### ✅ Good
"Tell us about your house (takes 3 minutes)"

---

#### ❌ Bad
"Filter accommodations by specification parameters"

#### ✅ Good
"Show me: Bedsitters under Ksh 5,000"

## Accessibility

### Key Requirements
- Color contrast ratio: 4.5:1 minimum
- Touch targets: 44px × 44px minimum
- Focus indicators: visible on all interactive elements
- Alt text: all images have descriptive alt text
- Semantic HTML: proper heading hierarchy
- Keyboard navigation: all features accessible via keyboard

## Animation Guidelines

**Keep it minimal:**
- Transitions: 0.2s ease (for hovers, focus states)
- No complex animations
- No loading spinners unless necessary
- No auto-playing carousels

**DO animate:**
- Hover state color changes
- Form field focus states
- Success checkmarks

**DON'T animate:**
- Page transitions
- Content reveals
- Parallax effects
- Anything that distracts from content

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Mobile speed: > 85 (Google PageSpeed)
- Image optimization: auto (Cloudinary)
- Code splitting: automatic (Next.js)

## Design Checklist

Before launching any page, verify:
- [ ] Passes 7-year-old test (anyone can understand)
- [ ] Mobile responsive (test on actual phone)
- [ ] All text is readable (contrast, size)
- [ ] Touch targets are large enough (44px min)
- [ ] Page loads fast (< 3s)
- [ ] No jargon in copy
- [ ] Clear call-to-action
- [ ] One primary action per page
- [ ] Visual hierarchy is clear
- [ ] Works without JavaScript (progressive enhancement)
