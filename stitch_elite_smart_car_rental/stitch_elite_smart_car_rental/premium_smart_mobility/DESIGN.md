---
name: Premium Smart Mobility
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8e5'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#f0ecf9'
  surface-container-high: '#eae6f4'
  surface-container-highest: '#e4e1ee'
  on-surface: '#1b1b24'
  on-surface-variant: '#464555'
  inverse-surface: '#302f39'
  inverse-on-surface: '#f3effc'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#fcf8ff'
  on-background: '#1b1b24'
  surface-variant: '#e4e1ee'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system embodies the intersection of high-end luxury and cutting-edge automotive technology. It is tailored for a discerning audience that values efficiency, precision, and a seamless digital-to-physical transition. 

The aesthetic is **Minimalist and Corporate Modern**, characterized by an expansive use of whitespace, a highly disciplined color palette, and a focus on clarity over decoration. The goal is to evoke a sense of "quiet luxury"—where the interface recedes to let high-resolution photography of premium vehicles and essential data points take center stage. Every interaction should feel intentional, smooth, and expensive.

## Colors
The palette is rooted in a sophisticated "White & Slate" foundation. 
- **Primary:** A refined Electric Indigo serves as the interactive signal, used sparingly for calls to action and active states to maintain a high-end feel.
- **Surface Strategy:** We utilize a "layered white" approach in light mode. The main background uses a very soft slate tint (`#F8FAFC`) to allow pure white (`#FFFFFF`) card elements to pop with subtle depth.
- **Typography & Accents:** Deep Charcoal (Slate-900) provides the necessary weight for headings and primary branding elements, ensuring high legibility and a grounded, professional atmosphere.
- **Dark Mode:** Transitions to a deep obsidian environment, maintaining the indigo accent for continuity while shifting surfaces to deep navy-slates to reduce glare during night-time rentals.

## Typography
The system relies exclusively on **Inter**, a typeface designed for screens, to convey a systematic and technical personality. 
- **Hierarchy:** We use significant scale shifts between display headers and body text to create an editorial feel. 
- **Tracking:** Headlines use slight negative letter-spacing (`-0.01em` to `-0.02em`) to appear tighter and more "designed." Small labels and overlines use increased tracking and uppercase styling for improved scanning.
- **Line Height:** Generous leading is applied to body text to facilitate readability during high-context tasks like reviewing rental agreements or vehicle specs.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile devices. 
- **Rhythm:** We follow an 8px baseline grid. Internal component spacing (padding/gap) should strictly adhere to multiples of 4 or 8.
- **Negative Space:** Content blocks are separated by "Macro-spacing" (48px+) to prevent the interface from feeling cluttered. This "breathable" layout is a key signifier of the premium brand positioning.
- **Alignment:** Content is centered in a max-width container for desktop viewing to maintain focus on high-quality automotive imagery.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Ambient Shadows** rather than harsh borders.
- **Shadows:** Use extremely soft, high-diffusion shadows. For example, a "Level 1" shadow might have a 12px blur with only 4% opacity of the Slate-900 color. This creates a "lifted" effect without looking heavy.
- **Borders:** Subtle 1px outlines in Slate-200 (light mode) or Slate-800 (dark mode) define container boundaries where shadow is insufficient.
- **Backdrop Blurs:** For overlays and navigation bars, a subtle `backdrop-filter: blur(12px)` with 80% opacity surface color is used to maintain context of the background while focusing the user.

## Shapes
In line with the modern automotive theme—reflecting the aerodynamic curves of smart vehicles—the design system utilizes a **Rounded (Level 2)** approach.
- **Standard Corners:** Primary cards and containers use a `1rem` (16px) radius.
- **Large Elements:** Featured car cards or hero images utilize `1.5rem` (24px) to create a soft, inviting frame.
- **Interactive Elements:** Buttons and input fields use a slightly smaller `0.5rem` (8px) or a full pill shape for specialized "Chip" filters.

## Components
- **Buttons:** The primary action button is Indigo with white text. It features a subtle hover transition where the shadow deepens slightly. Secondary buttons use a Slate-100 background with Slate-900 text.
- **Car Cards:** These are the centerpiece. They use a pure white surface, 24px corner radius, and 24px internal padding. The vehicle image should bleed to the edges or sit on a very light gray background within the card.
- **Input Fields:** Minimalist design with a 1px Slate-200 border. On focus, the border transitions to Indigo with a soft 2px indigo glow (box-shadow).
- **Chips/Badges:** Used for vehicle features (e.g., "Electric," "Autonomous," "Luxury"). These should have a light slate background and semi-bold text for quick scanning.
- **Booking Progress Bar:** A thin, high-contrast bar at the top of the viewport using the Electric Indigo color to indicate state without occupying significant vertical space.