import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F5EE' },
    { media: '(prefers-color-scheme: dark)', color: '#2B2B2B' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://momentcapturers.com'),
  title: {
    default: 'Moment Capturers | Amey Ghadge Photography',
    template: '%s | Moment Capturers',
  },
  description: 'Professional photography services by Amey Ghadge. Specializing in food, fashion, events, corporate, and portrait photography. Capturing moments that matter with artistic vision and technical excellence.',
  keywords: [
    'photography', 'photographer', 'Amey Ghadge', 'Moment Capturers',
    'food photography', 'fashion photography', 'event photography', 
    'corporate photography', 'portrait photography', 'professional photographer',
    'commercial photography', 'lifestyle photography', 'product photography',
    'wedding photography', 'headshots', 'brand photography'
  ],
  authors: [{ name: 'Amey Ghadge', url: 'https://momentcapturers.com' }],
  creator: 'Amey Ghadge',
  publisher: 'Moment Capturers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Moment Capturers | Amey Ghadge Photography',
    description: 'Professional photography services by Amey Ghadge. Capturing moments that matter with artistic vision and technical excellence.',
    siteName: 'Moment Capturers',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Moment Capturers Photography Portfolio',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moment Capturers | Amey Ghadge Photography',
    description: 'Professional photography services by Amey Ghadge. Capturing moments that matter.',
    images: ['/og-image.jpg'],
    creator: '@momentcapturers',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#FFC50F' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
    yandex: process.env.YANDEX_VERIFICATION_CODE,
    yahoo: process.env.YAHOO_VERIFICATION_CODE,
  },
  alternates: {
    canonical: '/',
  },
  category: 'photography',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance hints */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <CustomCursor />
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accentYellow text-graphite px-4 py-2 rounded-md font-medium z-50 transition-all duration-200"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <div id="main-content" role="main">
          {children}
        </div>
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Amey Ghadge",
              "jobTitle": "Professional Photographer",
              "description": "Professional photographer specializing in food, fashion, events, corporate, and portrait photography",
              "url": process.env.SITE_URL || "https://momentcapturers.com",
              "image": `${process.env.SITE_URL || "https://momentcapturers.com"}/og-image.jpg`,
              "sameAs": [
                "https://instagram.com/momentcapturers",
                "https://facebook.com/momentcapturers"
              ],
              "knowsAbout": [
                "Food Photography",
                "Fashion Photography", 
                "Event Photography",
                "Corporate Photography",
                "Portrait Photography"
              ],
              "serviceArea": {
                "@type": "Place",
                "name": "India"
              },
              "offers": {
                "@type": "Offer",
                "description": "Professional photography services"
              }
            })
          }}
        />
      </body>
    </html>
  )
}