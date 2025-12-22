# Requirements Document

## Introduction

A single-page Next.js portfolio website for photographer Amey Ghadge under the brand "Moment Capturers". The site will feature a modern, elegant design without traditional navigation, using a floating contact button and modal form. All content will be managed through a headless CMS with optimized performance and SEO.

## Glossary

- **Portfolio_Website**: The complete single-page application showcasing photography work
- **CMS**: Content Management System (Sanity or Strapi) for managing dynamic content
- **Contact_Modal**: Floating contact button that opens an accessible modal form
- **Portfolio_Gallery**: Responsive image grid displaying photography work by category
- **Landing_Section**: Full-viewport hero section with animated branding
- **About_Section**: Biography section with photographer information
- **Testimonials_Carousel**: Auto-rotating client testimonials display
- **Brand_Colors**: Specific color palette (Accent Yellow #FFC50F, Graphite #2B2B2B, Floral White #F8F5EE, Black #000000)

## Requirements

### Requirement 1: Website Structure and Navigation

**User Story:** As a visitor, I want to navigate through a single-page portfolio website, so that I can easily view all content without page reloads.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display all content on a single scrollable page
2. WHEN a visitor scrolls through sections, THE Portfolio_Website SHALL provide smooth transitions between content areas
3. THE Portfolio_Website SHALL NOT include a traditional navigation bar
4. THE Portfolio_Website SHALL maintain consistent Brand_Colors throughout all sections

### Requirement 2: Landing Section

**User Story:** As a visitor, I want to see an engaging landing section, so that I understand the brand and photographer's identity immediately.

#### Acceptance Criteria

1. THE Landing_Section SHALL display the "Moment Capturers" brand name prominently
2. THE Landing_Section SHALL include the photographer's name "Amey Ghadge"
3. THE Landing_Section SHALL fill the entire viewport height
4. WHEN the Landing_Section loads, THE Portfolio_Website SHALL animate the logo and title elements
5. THE Landing_Section SHALL use a dark graphite background with contrasting text

### Requirement 3: About Section

**User Story:** As a potential client, I want to learn about the photographer, so that I can understand their background and expertise.

#### Acceptance Criteria

1. THE About_Section SHALL display photographer biography content from the CMS
2. THE About_Section SHALL use a two-column layout on desktop devices
3. WHEN the About_Section comes into view, THE Portfolio_Website SHALL animate the content fade-in
4. THE About_Section SHALL use Brand_Colors for consistent styling

### Requirement 4: Portfolio Gallery

**User Story:** As a visitor, I want to browse photography work by category, so that I can see relevant examples for my needs.

#### Acceptance Criteria

1. THE Portfolio_Gallery SHALL organize images into categories (Food, Fashion, Events, Corporate, Portrait)
2. THE Portfolio_Gallery SHALL display images in a responsive masonry grid layout
3. WHEN a visitor clicks on an image, THE Portfolio_Website SHALL open the image in a lightbox
4. THE Portfolio_Gallery SHALL load all image data from the CMS
5. WHEN hovering over images, THE Portfolio_Website SHALL display subtle hover effects
6. THE Portfolio_Gallery SHALL optimize image loading using Next.js Image component

### Requirement 5: Testimonials Section

**User Story:** As a potential client, I want to read client testimonials, so that I can gauge the photographer's reputation and quality.

#### Acceptance Criteria

1. THE Testimonials_Carousel SHALL display client testimonials from the CMS
2. THE Testimonials_Carousel SHALL auto-rotate testimonials every 5 seconds
3. THE Testimonials_Carousel SHALL include client names and optional photos
4. WHEN testimonials change, THE Portfolio_Website SHALL animate the transition smoothly
5. THE Testimonials_Carousel SHALL load all testimonial data from the CMS

### Requirement 6: Contact System

**User Story:** As a potential client, I want to contact the photographer easily, so that I can inquire about services.

#### Acceptance Criteria

1. THE Contact_Modal SHALL display a floating contact button fixed to the bottom-right corner
2. WHEN a visitor clicks the contact button, THE Portfolio_Website SHALL open an accessible modal form
3. THE Contact_Modal SHALL include fields for name, email, and message
4. WHEN a visitor submits the form, THE Portfolio_Website SHALL validate all required fields
5. WHEN form validation passes, THE Portfolio_Website SHALL send the message to momentcapturers04@gmail.com
6. WHEN the email is sent successfully, THE Portfolio_Website SHALL display a confirmation message
7. THE Contact_Modal SHALL close when clicking outside the form or pressing escape

### Requirement 7: Content Management

**User Story:** As the website owner, I want to manage all content through a CMS, so that I can update information without code changes.

#### Acceptance Criteria

1. THE CMS SHALL store About section biography text
2. THE CMS SHALL store Portfolio items with title, category, images, and descriptions
3. THE CMS SHALL store Testimonials with author, quote, and optional images
4. WHEN content is updated in the CMS, THE Portfolio_Website SHALL reflect changes on the next build
5. THE CMS SHALL provide image upload and management capabilities

### Requirement 8: Performance and SEO

**User Story:** As a website owner, I want the site to load quickly and rank well in search engines, so that I can attract more potential clients.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL use Next.js server-side rendering for SEO optimization
2. THE Portfolio_Website SHALL generate static pages at build time when possible
3. THE Portfolio_Website SHALL include proper meta tags, titles, and Open Graph data
4. THE Portfolio_Website SHALL generate a sitemap.xml and robots.txt file
5. THE Portfolio_Website SHALL optimize all images for web delivery
6. THE Portfolio_Website SHALL mark the largest hero image with priority loading
7. THE Portfolio_Website SHALL achieve good Core Web Vitals scores

### Requirement 9: Responsive Design

**User Story:** As a visitor on any device, I want the website to display properly, so that I can view content regardless of screen size.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display correctly on mobile, tablet, and desktop devices
2. THE Portfolio_Website SHALL use mobile-first responsive design principles
3. WHEN viewed on mobile devices, THE Portfolio_Website SHALL stack content in single columns
4. WHEN viewed on desktop devices, THE Portfolio_Website SHALL use multi-column layouts where appropriate
5. THE Portfolio_Website SHALL maintain readable text sizes across all devices

### Requirement 10: Animations and Interactions

**User Story:** As a visitor, I want smooth animations and interactions, so that the browsing experience feels polished and engaging.

#### Acceptance Criteria

1. WHEN sections come into view during scrolling, THE Portfolio_Website SHALL animate elements with fade-in effects
2. WHEN hovering over interactive elements, THE Portfolio_Website SHALL provide visual feedback
3. THE Portfolio_Website SHALL use Framer Motion for all animations
4. THE Portfolio_Website SHALL ensure animations do not interfere with accessibility
5. WHEN animations complete, THE Portfolio_Website SHALL maintain smooth performance

### Requirement 11: Technical Implementation

**User Story:** As a developer, I want the website built with modern technologies, so that it's maintainable and performant.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL be built using Next.js with React
2. THE Portfolio_Website SHALL use Tailwind CSS for styling with custom Brand_Colors configuration
3. THE Portfolio_Website SHALL integrate with Sanity or Strapi as the headless CMS
4. THE Portfolio_Website SHALL use Framer Motion for animations
5. THE Portfolio_Website SHALL use Headless UI for accessible modal components
6. THE Portfolio_Website SHALL use React Photo Album for gallery layouts
7. THE Portfolio_Website SHALL use Yet Another React Lightbox for image viewing
8. THE Portfolio_Website SHALL use NodeMailer for email functionality

### Requirement 12: Deployment and Environment

**User Story:** As a website owner, I want the site deployed reliably, so that it's always available to visitors.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL be deployed on Vercel platform
2. THE Portfolio_Website SHALL use environment variables for sensitive configuration
3. THE Portfolio_Website SHALL automatically deploy when code changes are pushed
4. THE Portfolio_Website SHALL include proper error handling for API routes
5. THE Portfolio_Website SHALL maintain uptime and performance monitoringMoment Capturers Portfolio Website
We will build a single-page Next.js portfolio for photographer Amey Ghadge (brand “Moment
Capturers”) using React, Tailwind CSS, Framer Motion, and a headless CMS (e.g. Sanity). The site will
have no traditional nav bar; instead, a floating contact button will open a modal form. All content (about
text, portfolio images, testimonials) is managed via the CMS. We’ll ensure SEO-friendly SSR/SSG and fast
image loading with Next.js optimizations . Brand colors (Accent Yellow #FFC50F, Graphite
#2B2B2B, Floral White #F8F5EE, Black #000000) will be injected via Tailwind’s config.
Tech Stack & Dependencies
Next.js (React) – for server-side rendering (improves SEO) and routing. We’ll use the App
Router ( /app ) or Pages Router as needed.
Tailwind CSS – for responsive design and custom theming. Brand colors are added via
tailwind.config.js .
Framer Motion – for scroll-triggered and hover animations. For example, use <motion.div
initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}> to
animate section fade-ins .
CMS (Sanity or Strapi) – to manage About text, PortfolioItem (title, category, images, slug,
desc), and Testimonial (author, quote, image). These schemas are defined in the CMS (see
below).
Headless UI (Dialog) – for the accessible modal contact form with Tailwind styling .
Next.js API Routes – to handle form submissions (using NodeMailer or a mail API). E.g. a
POST /api/contact route reads process.env.SMTP_* credentials to send mail .
Next Image Optimization – use <Image> for all photos; configure next.config.js with
approved host domains . Mark the largest hero image as priority for LCP boost .
SEO/Deployment Tools – Add <Head> tags for title/meta , generate robots.txt and
sitemap.xml via next-sitemap , and deploy on Vercel.
// package.json dependencies
{
"dependencies": {
"next": "latest",
"react": "latest",
"react-dom": "latest",
"tailwindcss": "^3.x",
"framer-motion": "^10.x",
"@headlessui/react": "^1.x",
"react-photo-album": "^3.x",
"yet-another-react-lightbox": "^1.x",
"@sanity/client": "^3.x", // or use strapi client
"nodemailer": "^6.x" // for contact emails
}
}
1 2
• 1
•
•
3
•
• 4 5
•
6
•
7 2
• 8
9 10
1
Install steps: run npx create-next-app , enable Tailwind (via tailwindcss init ), install the
above packages ( npm i framer-motion @headlessui/react react-photo-album yetanother-react-lightbox @sanity/client nodemailer ), and set up a CSS import for Tailwind.
Tailwind Configuration (Custom Theme)
Define our palette in tailwind.config.js under theme.extend.colors . For example:
// tailwind.config.js
module.exports = {
content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/
*.{js,jsx}"],
theme: {
extend: {
colors: {
accentYellow: '#FFC50F', // Accent Yellow
graphite: '#2B2B2B', // Graphite (dark gray)
floralWhite: '#F8F5EE', // Off-white
black: '#000000', // Pure black
},
},
},
plugins: [],
};
We then use these in classes like bg-accentYellow , text-graphite , etc. Tailwind’s responsive
utilities (e.g. md:flex , sm:text-lg ) ensure mobile-first responsiveness without extra media
queries.
Next.js Configuration
Configure next.config.js to allow optimized images from our CMS or asset host. For example, if using
Sanity’s CDN:
// next.config.js
module.exports = {
reactStrictMode: true,
images: {
remotePatterns: [
{
protocol: 'https',
hostname: 'cdn.sanity.io', // or your CMS image host
port: '',
pathname: '/images/**',
},
],
2
},
};
This matches Next’s remotePatterns example . We also set environment variables in .env.local
(e.g. Sanity project ID, SMTP credentials) and prefix public ones with NEXT_PUBLIC_ for client use.
Vercel deployment will require adding the same env vars in its dashboard (Vercel uses these for build/
runtime). For email, define SMTP_HOST , SMTP_USER , etc., and FROM_EMAIL in .env.local .
Next.js will inject them into process.env on the server . Ensure .env.local is gitignored.
SEO and Meta Tags
Use Next.js’s built-in <Head> (Pages Router) or the Metadata API (App Router) to add titles and meta
tags. For example:
// Example in pages/_app.js or app/layout.js
import Head from 'next/head';
function AppLayout({ children }) {
return (
<>
<Head>
<title>Moment Capturers – Amey Ghadge Photography</title>
<meta name="description" content="Capturing moments that matter –
portfolio of Amey Ghadge, Moment Capturers." />
<meta property="og:title" content="Moment Capturers – Amey Ghadge
Photography" />
<meta property="og:description" content="Capturing moments that
matter." />
{/* Additional OG tags, canonical, etc */}
</Head>
<main>{children}</main>
</>
);
}
This matches Next.js SEO guidance on meta tags . We also add a robots.txt and sitemap.xml .
Using next-sitemap , include a config ( next-sitemap.config.js ) like:
// next-sitemap.config.js
module.exports = {
siteUrl: 'https://www.momentcapturers.com',
generateRobotsTxt: true,
// ...other options
};
Running next-sitemap in a post-build script generates /public/robots.txt and sitemap.xml
(see example config ). A sample robots.txt might then include User-agent: * and
Allow: / to enable indexing.
7
6
8
9
10
3
Headless CMS Schemas
We define three simple content models in our CMS:
About: a single document with a text field (string or rich text) for the photographer’s bio.
PortfolioItem: a document with fields title (string), slug (slug), category (string or
reference), images (array of image type), and description (text).
Testimonial: a document with fields author (string), quote (text), and image (image type,
optional).
Example Sanity schema code:
// schemas/about.js
export default {
name: 'about',
title: 'About Section',
type: 'document',
fields: [
{ name: 'content', type: 'text', title: 'Bio Text' },
],
};
// schemas/portfolioItem.js
export default {
name: 'portfolioItem',
title: 'Portfolio Item',
type: 'document',
fields: [
{ name: 'title', type: 'string' },
{ name: 'slug', type: 'slug', options: { source: 'title' } },
{ name: 'category', type: 'string' },
{ name: 'images', type: 'array', of: [{ type: 'image', options: {
hotspot: true } }] },
{ name: 'description', type: 'text' },
],
};
// schemas/testimonial.js
export default {
name: 'testimonial',
title: 'Testimonial',
type: 'document',
fields: [
{ name: 'author', type: 'string' },
{ name: 'quote', type: 'text' },
{ name: 'image', type: 'image' },
],
};
•
•
•
4
(These follow Sanity’s defineType / defineField pattern as shown in examples .) If using
Strapi, create equivalent Collection Types via the admin UI or JSON schemas. The frontend will query
these via the CMS API (e.g. GROQ for Sanity or REST for Strapi) and render the content.
Components & Sections
Below is the high-level structure. Each section is a React component (in /components or under /
app ). We animate as each comes into view (e.g. with motion.div whileInView ) and add hover
effects on interactive elements.
Landing Section
A full-viewport landing section with an animated logo and title. No banner image; instead use styled
SVG/HTML shapes or animated background (e.g. SVG blobs with CSS animation or Framer). Example JSX:
// components/Landing.js
import { motion } from 'framer-motion';
export default function Landing() {
return (
<section className="min-h-screen bg-graphite flex flex-col items-center
justify-center text-center relative">
{/* Animated logo/title */}
<motion.h1
initial={{ scale: 0 }}
animate={{ scale: 1 }}
transition={{ duration: 1 }}
className="text-6xl font-bold text-floralWhite"
>
Moment Capturers
</motion.h1>
<motion.p
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.5 }}
className="mt-4 text-xl text-accentYellow"
>
Capturing Moments That Matter
</motion.p>
<motion.p
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 1 }}
className="mt-2 text-lg text-floralWhite"
>
Amey Ghadge, Photographer
</motion.p>
{/* (Optional: animated background shapes with CSS) */}
</section>
11 12
3
5
);
}
We use Framer Motion’s initial / animate for fade/scale effects on the title and tagline. (Similar
approaches are described in Framer Motion guides .) The colors use our theme (e.g. textfloralWhite , text-accentYellow ). The section fills the screen ( min-h-screen ) with a dark
graphite background.
About Section
A simple two-column layout (on desktop) with a bio paragraph and maybe a subtle graphic or icon. For
example:
// components/About.js
export default function About({ content }) {
return (
<section id="about" className="py-24 px-6 bg-floralWhite text-graphite">
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
className="max-w-3xl mx-auto text-center"
>
<h2 className="text-3xl font-semibold mb-4">About Me</h2>
<p className="text-lg">{content}</p>
</motion.div>
</section>
);
}
Here the content prop is fetched from the CMS About entry. We animate its fade-in using
whileInView . Styling uses brand colors (dark text on off-white background). We avoid large
photo banners; any graphic should be vector/animation-driven.
Photography Categories (Portfolio)
We provide sub-sections or tab-like anchors for each category (Food, Fashion, Events, Corporate,
Portfolio Shoots). For example, a sticky sub-navigation or inline anchor links could allow jumping
between categories. Each category renders a responsive image grid. Using React Photo Album is ideal:
it supports Masonry or Columns layouts and is styled via Tailwind. E.g.:
// components/PortfolioGallery.js
import PhotoAlbum from 'react-photo-album';
export default function PortfolioGallery({ items }) {
return (
<section id="portfolio" className="py-24 px-6 bg-graphite">
<h2 className="text-3xl font-semibold text-floralWhite text-center
mb-8">Photography Categories</h2>
3
3
6
{/* Category anchors if desired */}
<div className="text-center mb-8">
{['Food', 'Fashion', 'Events', 'Corporate', 'Portrait'].map(cat => (
<a key={cat} href={`#${cat}`} className="mx-2 textaccentYellow">{cat}</a>
))}
</div>
{/* Masonry grid from CMS data */}
{items.map(category => (
<div id={category.name} key={category.name} className="mb-12">
<h3 className="text-2xl font-medium text-floralWhite
mb-4">{category.name}</h3>
<PhotoAlbum
layout="masonry"
photos={category.photos}
onClick={({ index }) => openLightbox(index)}
/>
</div>
))}
</section>
);
}
The items prop is an array of categories fetched from the CMS, each with name and an array of
photos (with src , width , height , etc.). React Photo Album’s Masonry layout resizes
responsively . We attach an onClick handler to open a lightbox. For the lightbox, we can use Yet
Another React Lightbox (YARL). It integrates smoothly: clicking a photo calls
openLightbox(index) , which triggers a <Lightbox> component (not shown) to display the
image. This pattern is demonstrated in the React Photo Album docs: “click any photo to open it in a
lightbox” (built with yet-another-react-lightbox) .
For hover effects, wrap each image in a <motion.div whileHover={{ scale: 1.05 }} or apply
Tailwind classes like transition-transform transform hover:scale-105 and a subtle
filter blur-sm on image containers. Use the accent color (#FFC50F) as a highlight on hover
overlays or borders. For example:
/* Example Tailwind classes for hover */
<div className="relative overflow-hidden">
<Image src={url} width={w} height={h} alt={title}
className="transition-transform duration-300 hover:scale-105" />
<div className="absolute inset-0 bg-accentYellow opacity-0
hover:opacity-20"></div>
</div>
All portfolio content (image URLs and captions) comes from the CMS, making it fully editable. Use
Next.js data fetching (e.g. getStaticProps ) or real-time fetching (with SWR) as needed to retrieve
CMS content at build or runtime.
13
14
7
Testimonials Section
An auto-playing carousel of client quotes. We can implement this with Framer Motion
( AnimatePresence ) or a simple slider library. For example, one approach is to map over testimonials
and animate their entry/exit using Framer’s <AnimatePresence> with initial , animate , and
exit states (as shown in many Framer Motion carousel tutorials ). A rough structure:
// components/Testimonials.js
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export default function Testimonials({ reviews }) {
const [current, setCurrent] = useState(0);
useEffect(() => {
const interval = setInterval(() => {
setCurrent((i) => (i + 1) % reviews.length);
}, 5000); // auto-rotate every 5s
return () => clearInterval(interval);
}, [reviews.length]);
return (
<section id="testimonials" className="py-24 px-6 bg-floralWhite">
<h2 className="text-3xl font-semibold text-center text-graphite
mb-8">What Clients Say</h2>
<div className="max-w-2xl mx-auto relative">
<AnimatePresence>
{reviews.map((rev, index) => (
index === current && (
<motion.div
key={index}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.8 }}
className="text-center px-4"
>
{rev.image && (
<img src={rev.image} alt={rev.author} className="w-16 h-16
mx-auto rounded-full mb-4" />
)}
<p className="text-lg italic text-graphite
mb-2">“{rev.quote}”</p>
<p className="text-sm font-semibold textaccentYellow">{rev.author}</p>
</motion.div>
)
))}
</AnimatePresence>
</div>
</section>
15
8
);
}
This rotates through testimonials by changing current index. Each quote fades in/out (using
AnimatePresence ). (More complex carousels can use libraries, but Framer Motion provides full
control .) Testimonials data ( reviews ) is loaded from the CMS.
Floating Contact Button & Modal
We add a fixed button at bottom-right (e.g. a mail or chat icon). Using Tailwind:
// components/ContactButton.js
export default function ContactButton({ onClick }) {
return (
<button
onClick={onClick}
className="fixed bottom-4 right-4 bg-accentYellow text-graphite p-4
rounded-full shadow-lg hover:bg-opacity-90"
aria-label="Contact Me"
>
{/* Example icon */}
<svg className="w-6 h-6" fill="currentColor" ...> {/* mail icon path
*/}</svg>
</button>
);
}
This button is always visible. On click, we open a modal dialog for the form. We use Headless UI’s
<Dialog> for accessibility :
// components/ContactModal.js
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
export default function ContactModal({ isOpen, onClose }) {
const [form, setForm] = useState({ name: '', email: '', message: '' });
const [status, setStatus] = useState('');
async function handleSubmit(e) {
e.preventDefault();
// Basic validation
if (!form.name || !form.email) {
setStatus('Please fill in all fields.');
return;
}
const res = await fetch('/api/contact', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(form),
});
15
4
9
if (res.ok) setStatus('Message sent! Thank you.');
else setStatus('Failed to send message.');
}
return (
<Dialog open={isOpen} onClose={onClose} className="relative z-50">
<div className="fixed inset-0 bg-black/50" aria-hidden="true" />
<div className="fixed inset-0 flex items-center justify-center p-4">
<Dialog.Panel className="bg-white rounded-lg max-w-md w-full p-6">
<Dialog.Title className="text-xl font-semibold mb-4">Contact Me</
Dialog.Title>
<form onSubmit={handleSubmit} className="space-y-4">
<input type="text" required placeholder="Name" className="w-full
px-3 py-2 border rounded"
value={form.name} onChange={e => setForm({ ...form, name:
e.target.value })} />
<input type="email" required placeholder="Email" className="wfull px-3 py-2 border rounded"
value={form.email} onChange={e => setForm({ ...form,
email: e.target.value })} />
<textarea required placeholder="Message" rows="4" className="wfull px-3 py-2 border rounded"
value={form.message} onChange={e => setForm({ ...form,
message: e.target.value })} />
<button type="submit" className="w-full bg-accentYellow textgraphite py-2 rounded hover:bg-opacity-90">
Send Message
</button>
</form>
{status && <p className="mt-4 text-sm text-center">{status}</p>}
</Dialog.Panel>
</div>
</Dialog>
);
}
This modal locks focus and closes on backdrop click or ESC (per Headless UI’s Dialog behavior) . The
form uses HTML5 required for basic validation; you could also integrate reCAPTCHA or a library like
React Hook Form for enhanced validation. On submit, we call our Next.js API route (see below). We
show a success/failure message after submission.
API Route: Contact Form
In Next.js /pages/api/contact.js (or /app/api/contact/route.js ), we handle the POST.
Using NodeMailer with SMTP (per Sendlayer tutorial ):
// pages/api/contact.js
import nodemailer from 'nodemailer';
5
6
10
export default async function handler(req, res) {
if (req.method !== 'POST') return res.status(405).end();
const { name, email, message } = req.body;
if (!name || !email || !message) {
return res.status(400).json({ message: 'Missing fields' });
}
try {
// Create SMTP transporter using env vars
const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: +process.env.SMTP_PORT,
auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});
// Send mail
await transporter.sendMail({
from: process.env.FROM_EMAIL,
to: process.env.CONTACT_EMAIL, // e.g. momentcapturers04@gmail.com
subject: `New message from ${name}`,
text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
});
res.status(200).json({ message: 'Sent' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Error sending email' });
}
}
This matches the pattern in the SendLayer guide: using process.env for credentials and
transporter.sendMail() . Ensure SMTP_* , FROM_EMAIL , and CONTACT_EMAIL (set to
momentcapturers04@gmail.com) are defined in .env.local . On success, the frontend shows a
“Thank you” message. This fulfills either emailing or storing the inquiry in the backend as required.
Animations & Interactions
Across sections, we animate as elements scroll into view. Framer Motion’s whileInView hook (or the
useInView hook) is used for fade/slide-ins . For example, wrapping each section in a
<motion.section initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}}
viewport={{once:true}}> for a nice reveal. Hover effects (e.g. image scale/zoom) use either
Tailwind transitions ( transition-transform hover:scale-105 ) or Framer’s
whileHover={{ scale: 1.05 }} . We might add subtle animated backgrounds (CSS keyframe blobs
or SVG animations) behind sections to add motion without using large images. (For instance, animate
an SVG circle blur using CSS.)
Responsive Design
Tailwind’s mobile-first breakpoints ensure the UI adapts from mobile to desktop. We’ll use classes like
sm: , md: , lg: to adjust layouts (e.g. a stacked single column on small screens, two-column on md
screens). Example: <div className="flex flex-col md:flex-row"> for About or Portfolio
items. Text sizes and paddings also adapt (e.g. text-base md:text-lg ). This satisfies “fully
responsive” without custom media queries (Tailwind docs ).
6
3
16
11
Performance & SEO Optimization
Images: All photos use <Image> from next/image . We serve responsive sizes and modern
formats by default . Mark the hero (largest) image with priority .
Code Splitting: Next.js auto-code-splits pages. We keep the page lightweight.
Static Generation: Use getStaticProps (or new fetch with cache: 'force-cache' ) to
fetch CMS data at build time. This yields a static HTML export (good for speed and SEO).
Meta: Titles and meta descriptions as shown above . Add Open Graph og:image (could be
a static shareable photo).
Indexing: robots.txt and sitemap.xml via next-sitemap ensure search engines discover
the site .
Accessibility: Modal dialogs trap focus (Headless UI). All images have alt text from CMS.
Colors have good contrast (Graphite on Floral White, etc). Buttons use aria-label where
needed.
Deployment (Vercel)
Finally, deploy to Vercel: connect the GitHub repo, and Vercel auto-detects Next.js. In the Vercel
dashboard, set the environment variables ( SMTP_ , CONTACT_EMAIL , Sanity project keys, etc) under
“Settings > Environment Variables”. Ensure a build script ( next build ) is set. Add next-sitemap
to postbuild in package.json :
// package.json scripts
{
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"postbuild": "next-sitemap"
}
}
After deployment, Vercel will run npm run build , generate sitemap/robots (to /public ), and serve
the app. You may also configure robots.txt manually under /public/robots.txt if needed (but
next-sitemap can do it automatically ).
File Structure (Summary)
tailwind.config.js: as above (custom colors).
next.config.js: with images.remotePatterns (as above) .
/schemas/ (Sanity studio): about.js , portfolioItem.js , testimonial.js (as shown).
/app or /pages/: single-page route with sections.
Components: Landing.js , About.js , PortfolioGallery.js , Testimonials.js ,
ContactButton.js , ContactModal.js .
/pages/api/contact.js: API route sending email (as above) using nodemailer .
Public/images: optional static images (e.g. favicon, placeholder).
next-sitemap.config.js: for sitemap/robots generation .
.env.local: for secrets (SMTP, CMS keys).
•
2
•
•
• 8
•
9 10
•
9
•
• 7
•
•
•
• 6
•
• 9
•
12
With this setup, the site meets all requirements: a unique, elegant design (no image banners, emphasis
on typography and animated shapes), smooth animations (Framer Motion scroll/hovers ), fully CMSdriven content (editable About, portfolios, testimonials), and a persistent contact button opening a
validated form that sends to momentcapturers04@gmail.com . SEO is handled via Next.js SSR/SSG
and meta tags , and deployment on Vercel handles CI/CD. The code structure above provides a
complete blueprint for implementation.
