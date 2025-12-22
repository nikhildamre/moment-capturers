# Quick Start Guide - Moment Capturers Portfolio

## 🚀 Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 What's New

### ✅ Fixed Issues
1. **Image Loading**: Fixed portfolio images to work with both Sanity CMS and dummy data
2. **Color Contrast**: Changed from pale yellow to vibrant orange for better visibility
3. **Dummy Data**: Added 18 professional portfolio images that load automatically

### 🌟 New Features
1. **Spotlight Effect**: Mouse-tracking radial spotlight on portfolio images
2. **3D Tilt Cards**: Portfolio images tilt in 3D space on hover
3. **Morphing Backgrounds**: Liquid blob animations throughout
4. **Animated Orbs**: Floating gradient orbs in background
5. **Enhanced Hovers**: Multi-layer reveals and animations
6. **Gradient Buttons**: Vibrant category selection
7. **Animated Stats**: Counting numbers with gradient colors
8. **Glowing Elements**: Profile pictures with radial glow

## 📁 Project Structure

```
moment-capturers-portfolio/
├── app/
│   ├── page.tsx              # Main page with all sections
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles with animations
├── components/
│   ├── Landing.tsx           # Hero section
│   ├── Portfolio.tsx         # Portfolio gallery (with dummy images)
│   ├── About.tsx             # About section with stats
│   ├── Testimonials.tsx      # Client testimonials
│   ├── Contact.tsx           # Contact form
│   ├── Navigation.tsx        # Floating navigation
│   ├── CustomCursor.tsx      # Camera cursor
│   ├── ParticleBackground.tsx # Particle network
│   ├── LoadingScreen.tsx     # Initial loading
│   └── ui/                   # Reusable UI components
│       ├── AnimatedBackground.tsx
│       ├── MorphingShape.tsx
│       ├── SpotlightCard.tsx
│       ├── TiltCard.tsx
│       ├── MagneticButton.tsx
│       ├── CounterAnimation.tsx
│       ├── GradientText.tsx
│       └── ... (many more)
├── lib/
│   ├── dummyPortfolioData.ts # 18 dummy portfolio images
│   ├── sanity.ts             # Sanity CMS integration
│   └── animations.ts         # Animation variants
└── public/                   # Static assets
```

## 🎨 Color Scheme

### Primary Colors
- **Orange**: #FF8C00 (Dark Orange)
- **Light Orange**: #FFA500 (Orange)
- **Accent**: #FF6B00 (Red-Orange)
- **Dark**: #2B2B2B (Graphite)
- **Light**: #FFFEF2 (Floral White)

### Gradients
```css
/* Warm Gradient */
background: linear-gradient(90deg, #FF8C00 0%, #FF6B00 50%, #FFA500 100%);

/* Default Gradient */
background: linear-gradient(90deg, #FF8C00 0%, #FFA500 100%);

/* Sunset Gradient */
background: linear-gradient(135deg, #FF8C00 0%, #FF6B6B 50%, #FFA500 100%);
```

## 🖼️ Portfolio Images

The portfolio now includes 18 dummy images from Unsplash:

### Categories:
- **Food** (4 images): Burgers, Pasta, Coffee, Sushi
- **Fashion** (3 images): Urban, Evening Wear, Summer Collection
- **Events** (3 images): Weddings, Corporate Gala, Birthday
- **Corporate** (3 images): Executive Portraits, Team Building, Office
- **Portrait** (4 images): Natural Light, Studio, Family, Creative

Images automatically load from `lib/dummyPortfolioData.ts` if CMS is unavailable.

## 🎯 Key Components

### Portfolio Section
```tsx
<SpotlightCard>      // Mouse-tracking spotlight
  <TiltCard>         // 3D tilt effect
    <Image />        // Enhanced hover with scale & brightness
  </TiltCard>
</SpotlightCard>
```

### About Section
- Animated skill tags
- Counting stats with gradient numbers
- Gradient background with decorative orbs

### Testimonials Section
- Glowing profile pictures
- 3D rotation animations
- Animated pagination dots

## 🎬 Animations

### Hover Effects
- **Portfolio Images**: Scale 110%, brightness increase, gradient overlay
- **Category Buttons**: Scale 105%, shadow effects
- **Skill Tags**: Scale 105%, move up 2px
- **Stats**: Scale 105% on hover

### Background Animations
- **Morphing Shapes**: 10-18 second organic transformations
- **Gradient Orbs**: 20-25 second floating animations
- **Particle Network**: Continuous connection animations

### Entrance Animations
- **Testimonials**: 3D rotation (rotateY)
- **Stats**: Count up from 0
- **Text**: Word-by-word reveal
- **Images**: Fade in with scale

## 🔧 Configuration

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

### Image Domains (next.config.js)
```javascript
images: {
  unoptimized: true,
  remotePatterns: [
    { hostname: 'cdn.sanity.io' },
    { hostname: 'images.unsplash.com' }
  ]
}
```

## 📱 Responsive Design

All components are fully responsive:
- **Mobile**: Single column, touch-optimized
- **Tablet**: 2 columns, adjusted spacing
- **Desktop**: 3-4 columns, full effects

## ⚡ Performance

- Lazy loading for images
- Optimized animations with GPU acceleration
- Reduced motion support for accessibility
- Efficient re-renders with React.memo
- Debounced scroll handlers

## 🎨 Customization

### Change Colors
Edit `components/ui/GradientText.tsx`:
```tsx
const gradients = {
  warm: 'linear-gradient(90deg, #YOUR_COLOR 0%, #YOUR_COLOR 100%)',
}
```

### Add More Portfolio Images
Edit `lib/dummyPortfolioData.ts`:
```tsx
{
  _id: 'unique-id',
  title: 'Your Title',
  category: 'Food', // or Fashion, Events, Corporate, Portrait
  images: [{ asset: { url: 'image-url' }, alt: 'description' }]
}
```

### Adjust Animation Speed
Edit animation durations in component files:
```tsx
transition={{ duration: 0.3 }} // Fast
transition={{ duration: 0.6 }} // Medium
transition={{ duration: 2 }}   // Slow
```

## 🐛 Troubleshooting

### Images Not Loading
1. Check `next.config.js` has correct image domains
2. Verify dummy data URLs are accessible
3. Check browser console for errors

### Animations Not Working
1. Check if `prefers-reduced-motion` is enabled
2. Verify Framer Motion is installed: `npm install framer-motion`
3. Check browser console for errors

### Build Errors
1. Run `npm install` to ensure all dependencies
2. Check TypeScript errors: `npm run type-check`
3. Clear `.next` folder: `rm -rf .next`

## 📚 Documentation

- **CREATIVE_ENHANCEMENTS.md**: Complete list of all creative features
- **LATEST_ENHANCEMENTS.md**: Recent improvements and changes
- **README.md**: Project overview and setup

## 🎯 Next Steps

1. **Add Real Content**: Replace dummy data with actual portfolio images
2. **Connect CMS**: Set up Sanity Studio and add real content
3. **SEO Optimization**: Add meta tags, sitemap, robots.txt
4. **Analytics**: Add Google Analytics or similar
5. **Contact Form**: Connect to email service (SendGrid, etc.)
6. **Deploy**: Deploy to Vercel, Netlify, or similar

## 🌟 Features Checklist

- ✅ Responsive design
- ✅ Custom camera cursor
- ✅ Particle background
- ✅ Smooth scrolling navigation
- ✅ Portfolio gallery with lightbox
- ✅ Contact form
- ✅ Testimonials carousel
- ✅ Animated statistics
- ✅ Loading screen
- ✅ Scroll to top button
- ✅ 3D tilt effects
- ✅ Spotlight hover effects
- ✅ Morphing backgrounds
- ✅ Gradient animations
- ✅ Dummy portfolio images

## 🚀 Performance Metrics

Target metrics:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review component code comments
3. Check browser console for errors
4. Verify all dependencies are installed

---

**Happy Coding! 🎨📸**
