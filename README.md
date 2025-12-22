# 📸 Moment Capturers - Professional Photography Portfolio

A stunning, modern photography portfolio website built with Next.js 14, featuring advanced animations, dynamic effects, and a seamless user experience.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4)

## ✨ Features

### 🎨 Visual Excellence
- **Stunning Animations**: Particle networks, magnetic cursor, floating elements
- **Creative Backgrounds**: Animated gradients with dynamic effects
- **Curtain Reveals**: Dramatic entrance animations
- **Continuous Flow**: Portfolio images flow vertically non-stop
- **Interactive Elements**: Hover effects, tilt cards, spotlight effects

### 📸 Portfolio Features
- **Dynamic Gallery**: Masonry layout with category filtering
- **Lightbox View**: Full-screen image viewing
- **Vertical Flow Animation**: Images continuously flow from top to bottom
- **Category Filters**: Food, Fashion, Events, Corporate, Portrait
- **Responsive Grid**: Adapts to all screen sizes

### 🏢 Professional Sections
- **Hero Landing**: Animated background with gradient orbs
- **Portfolio Gallery**: Showcase your best work
- **Brands Section**: Infinite scrolling client logos with stats
- **About Section**: Tell your story
- **Testimonials**: Client reviews
- **Contact Form**: Email integration with validation

### 🚀 Performance & SEO
- **Next.js 14**: App Router with Server Components
- **Image Optimization**: Next.js Image component
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Fast Loading**: Optimized bundle size
- **Lazy Loading**: Images load on demand

### ♿ Accessibility
- **WCAG AA Compliant**: Proper contrast ratios
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: ARIA labels and semantic HTML
- **Reduced Motion**: Respects user preferences
- **Focus Indicators**: Clear focus states

### 📱 Responsive Design
- **Mobile First**: Optimized for all devices
- **Touch Friendly**: Smooth touch interactions
- **Adaptive Layouts**: Breakpoint-aware components
- **Cross-Browser**: Works on all modern browsers

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Email**: [Resend](https://resend.com/)
- **Image Gallery**: [React Photo Album](https://react-photo-album.com/)
- **Lightbox**: [Yet Another React Lightbox](https://yet-another-react-lightbox.com/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/moment-capturers-portfolio.git
cd moment-capturers-portfolio
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [Netlify](https://netlify.com)
3. Import your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables
6. Deploy!

## 📁 Project Structure

```
moment-capturers-portfolio/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   └── contact/        # Contact form endpoint
│   ├── globals.css         # Global styles & animations
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── ui/                 # Reusable UI components (30+)
│   ├── About.tsx           # About section
│   ├── BrandsSection.tsx   # Client logos
│   ├── Contact.tsx         # Contact form
│   ├── Landing.tsx         # Hero section
│   ├── Portfolio.tsx       # Portfolio gallery
│   └── Testimonials.tsx    # Testimonials
├── lib/                     # Utilities & helpers
│   ├── animations.ts       # Animation configurations
│   ├── sanity.ts          # Sanity CMS client
│   ├── dummyPortfolioData.ts # Fallback data
│   └── hooks/             # Custom React hooks
├── public/                  # Static assets
├── schemas/                 # Sanity CMS schemas
├── __tests__/              # Test files
├── .env.local.example      # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Key Components

### Landing Page
- Animated gradient background with orbs
- Curtain reveal effect
- Floating geometric shapes
- Parallax scrolling
- Call-to-action buttons

### Portfolio Gallery
- Continuous vertical flow animation
- Category filtering (All, Food, Fashion, Events, Corporate, Portrait)
- Masonry layout
- Lightbox for full-screen viewing
- Hover effects with tilt and spotlight

### Brands Section
- Infinite horizontal scrolling logos
- Grayscale to color on hover
- Animated statistics counters
- Responsive grid layout

### Contact Form
- Email validation
- Resend API integration
- Success/error states
- Social media links with logos

## 🎭 Animations

- **Particle Network**: 80 interactive particles with mouse reactions
- **Magnetic Cursor**: Custom cursor with trail effect
- **Text Animations**: Kinetic, glitch, 3D, typewriter effects
- **Image Reveals**: Curtain, circular, diagonal, mosaic reveals
- **Floating Elements**: Continuous smooth animations
- **Scroll Triggers**: Viewport-based animations
- **Hover Effects**: Scale, tilt, glow, lift effects

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Sanity CMS Setup

1. Create account at [Sanity.io](https://www.sanity.io/)
2. Create new project
3. Copy project ID and dataset name
4. Add to `.env.local`

### Email Setup (Resend)

1. Create account at [Resend](https://resend.com/)
2. Get API key
3. Add to `.env.local`
4. Configure sender email in `app/api/contact/route.ts`

## 🎯 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  accentYellow: '#FFC50F',
  graphite: '#2B2B2B',
  floralWhite: '#F8F5EE',
}
```

### Animations
Edit `lib/animations.ts` for custom animation variants.

### Content
- Update `lib/dummyPortfolioData.ts` for portfolio items
- Modify component text directly in component files
- Use Sanity CMS for dynamic content management

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Amey Ghadge**
- Instagram: [@moment._.capturers](https://www.instagram.com/moment._.capturers/)
- LinkedIn: [Amey Ghadge](https://www.linkedin.com/in/amey-ghadge-a93a91230/)
- Email: momentcapturers04@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Sanity](https://www.sanity.io/) - Content management
- [Vercel](https://vercel.com/) - Hosting platform

## 📞 Support

For support, email momentcapturers04@gmail.com or open an issue on GitHub.

---

**Made with ❤️ by Amey Ghadge**

⭐ Star this repo if you like it!
#   m o m e n t - c a p t u r e r s  
 