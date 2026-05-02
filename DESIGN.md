# Design Brief: Starbucks Chibi Miniature Delivery

## Tone & Aesthetic
Playful, cozy, premium toy-like. Blind-box miniature aesthetic inspired by Cinema 4D renders with warm afternoon lighting. Whimsical, inviting, brand-cohesive Starbucks experience.

## Color Palette
| Token | OKLCH | Usage |
|-------|-------|-------|
| Primary (Starbucks Green) | 0.38 0.15 142 | Hero, CTAs, key highlights |
| Accent (Warm Gold) | 0.65 0.22 54 | Secondary actions, warm detail |
| Background | 0.98 0.01 142 | Surfaces, cards |
| Foreground | 0.12 0.02 135 | Text, primary contrast |
| Muted | 0.92 0.02 142 | Subtle backgrounds, borders |

## Typography
| Layer | Font | Purpose |
|-------|------|----------|
| Display | Fraunces (serif) | Headlines, hero text |
| Body | General Sans (sans-serif) | Content, UI labels |
| Mono | System monospace | Code, prices |

## Structural Zones
| Zone | Treatment | Purpose |
|------|-----------|----------|
| Header | Starbucks green with white text, floating shadow | Navigation, brand identity |
| Hero | 2:3 aspect 3D miniature, elevated card with soft shadow | Interactive coffee shop entry |
| Content | Alternating bg-card / bg-muted-30 sections | Menu browsing, product grid |
| Footer | Muted background with border-top | Secondary info, links |
| Cart Sidebar | Floating elevated shadow, semi-transparent overlay | Order summary, always accessible |

## Component Patterns
- **Buttons**: Primary (Starbucks green), Secondary (warm gold), rounded-lg, soft shadows on hover
- **Cards**: Rounded-lg, bg-card, subtle border, float animation on hover
- **Product Grid**: 2:3 aspect ratio images, product name + price visible
- **Order Status**: Visual timeline with checkmarks, color-coded states
- **Input Fields**: Soft borders, focus ring matches primary color

## Motion & Animation
- Entrance: `fade-in` (0.4s) for page loads, `slide-up` (0.5s) for content sections
- Hover: `float` (3s infinite) for cards, subtle shadow elevation
- Transitions: `transition-smooth` (0.3s cubic-bezier) for all interactive elements
- Status updates: Pulse animation for real-time order tracking

## Responsive Design
- Mobile-first approach (sm: 640px, md: 768px, lg: 1024px)
- Hero 2:3 ratio scales responsively
- Menu grid: 1 column (sm), 2 columns (md), 3 columns (lg)
- Cart sidebar: Modal on mobile, fixed on lg+

## Key Constraints
- No generic purple/blue gradients—Starbucks green only
- No harsh shadows—soft, warm lighting mimics Cinema 4D aesthetic
- Maintain toy-like proportions in component scale and spacing
- All imagery and renders must respect 2:3 aspect ratio
- Dark mode uses warm neutrals, not cool greys
