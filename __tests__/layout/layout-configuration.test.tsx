/**
 * Unit tests for layout configuration
 * Tests meta tag presence, font loading, and accessibility attributes
 */

import { render, screen } from '@testing-library/react'
import RootLayout, { metadata, viewport } from '../../app/layout'

// Mock Next.js font
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'font-inter',
    variable: '--font-inter',
  }),
}))

describe('Layout Configuration', () => {
  describe('Metadata Configuration', () => {
    it('should have proper title configuration', () => {
      expect(metadata.title).toBeDefined()
      
      if (typeof metadata.title === 'object' && metadata.title !== null) {
        expect(metadata.title.default).toBe('Moment Capturers | Amey Ghadge Photography')
        expect(metadata.title.template).toBe('%s | Moment Capturers')
      }
    })

    it('should have comprehensive description', () => {
      expect(metadata.description).toBeDefined()
      expect(typeof metadata.description).toBe('string')
      expect(metadata.description.length).toBeGreaterThan(50)
      expect(metadata.description).toContain('Amey Ghadge')
      expect(metadata.description).toContain('photography')
    })

    it('should have photography-related keywords', () => {
      expect(metadata.keywords).toBeDefined()
      expect(Array.isArray(metadata.keywords)).toBe(true)
      
      const keywords = metadata.keywords as string[]
      expect(keywords).toContain('photography')
      expect(keywords).toContain('photographer')
      expect(keywords).toContain('Amey Ghadge')
      expect(keywords).toContain('Moment Capturers')
    })

    it('should have proper author information', () => {
      expect(metadata.authors).toBeDefined()
      expect(Array.isArray(metadata.authors)).toBe(true)
      
      const authors = metadata.authors as any[]
      expect(authors[0]).toHaveProperty('name', 'Amey Ghadge')
      expect(authors[0]).toHaveProperty('url')
    })

    it('should have Open Graph configuration', () => {
      expect(metadata.openGraph).toBeDefined()
      
      const og = metadata.openGraph as any
      expect(og.type).toBe('website')
      expect(og.locale).toBe('en_US')
      expect(og.title).toContain('Moment Capturers')
      expect(og.description).toBeDefined()
      expect(og.siteName).toBe('Moment Capturers')
      expect(og.images).toBeDefined()
      expect(Array.isArray(og.images)).toBe(true)
    })

    it('should have Twitter Card configuration', () => {
      expect(metadata.twitter).toBeDefined()
      
      const twitter = metadata.twitter as any
      expect(twitter.card).toBe('summary_large_image')
      expect(twitter.title).toContain('Moment Capturers')
      expect(twitter.description).toBeDefined()
      expect(twitter.images).toBeDefined()
    })

    it('should have robots configuration', () => {
      expect(metadata.robots).toBeDefined()
      
      const robots = metadata.robots as any
      expect(robots.index).toBe(true)
      expect(robots.follow).toBe(true)
      expect(robots.googleBot).toBeDefined()
    })

    it('should have icon configuration', () => {
      expect(metadata.icons).toBeDefined()
      
      const icons = metadata.icons as any
      expect(icons.icon).toBeDefined()
      expect(icons.apple).toBeDefined()
      expect(Array.isArray(icons.icon)).toBe(true)
      expect(Array.isArray(icons.apple)).toBe(true)
    })
  })

  describe('Viewport Configuration', () => {
    it('should have proper viewport settings', () => {
      expect(viewport).toBeDefined()
      expect(viewport.width).toBe('device-width')
      expect(viewport.initialScale).toBe(1)
      expect(viewport.maximumScale).toBe(5)
      expect(viewport.userScalable).toBe(true)
    })

    it('should have theme color configuration', () => {
      expect(viewport.themeColor).toBeDefined()
      expect(Array.isArray(viewport.themeColor)).toBe(true)
      
      const themeColors = viewport.themeColor as any[]
      expect(themeColors.length).toBeGreaterThan(0)
      
      themeColors.forEach(theme => {
        expect(theme).toHaveProperty('media')
        expect(theme).toHaveProperty('color')
      })
    })
  })

  describe('Layout Component', () => {
    it('should render children correctly', () => {
      render(
        <RootLayout>
          <div data-testid="test-content">Test Content</div>
        </RootLayout>
      )
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should have proper HTML structure', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const html = container.querySelector('html')
      expect(html).toHaveAttribute('lang', 'en')
      expect(html).toHaveClass('--font-inter')
    })

    it('should include skip to main content link', () => {
      render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink).toBeInTheDocument()
      expect(skipLink).toHaveAttribute('href', '#main-content')
    })

    it('should have main content wrapper with proper attributes', () => {
      render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
      expect(mainContent).toHaveAttribute('id', 'main-content')
    })

    it('should include structured data script', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const structuredDataScript = container.querySelector('script[type="application/ld+json"]')
      expect(structuredDataScript).toBeInTheDocument()
      
      const scriptContent = structuredDataScript?.textContent
      expect(scriptContent).toBeDefined()
      
      if (scriptContent) {
        const structuredData = JSON.parse(scriptContent)
        expect(structuredData['@context']).toBe('https://schema.org')
        expect(structuredData['@type']).toBe('Person')
        expect(structuredData.name).toBe('Amey Ghadge')
        expect(structuredData.jobTitle).toBe('Professional Photographer')
      }
    })
  })

  describe('Font Loading Configuration', () => {
    it('should have Inter font configured', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const body = container.querySelector('body')
      expect(body).toHaveClass('font-inter')
      expect(body).toHaveClass('antialiased')
    })

    it('should have font preload link in head', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const preloadLink = container.querySelector('link[rel="preload"][as="font"]')
      expect(preloadLink).toBeInTheDocument()
      expect(preloadLink).toHaveAttribute('href', '/fonts/inter-var.woff2')
      expect(preloadLink).toHaveAttribute('type', 'font/woff2')
      expect(preloadLink).toHaveAttribute('crossorigin', 'anonymous')
    })
  })

  describe('Performance Optimization', () => {
    it('should have preconnect links for external domains', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const preconnectLinks = container.querySelectorAll('link[rel="preconnect"]')
      expect(preconnectLinks.length).toBeGreaterThan(0)
      
      const hrefs = Array.from(preconnectLinks).map(link => link.getAttribute('href'))
      expect(hrefs).toContain('https://fonts.googleapis.com')
      expect(hrefs).toContain('https://fonts.gstatic.com')
      expect(hrefs).toContain('https://cdn.sanity.io')
    })

    it('should have DNS prefetch for analytics', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const dnsPrefetch = container.querySelector('link[rel="dns-prefetch"]')
      expect(dnsPrefetch).toBeInTheDocument()
      expect(dnsPrefetch).toHaveAttribute('href', 'https://www.google-analytics.com')
    })
  })

  describe('Security Headers', () => {
    it('should have security-related meta tags', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const contentTypeOptions = container.querySelector('meta[http-equiv="X-Content-Type-Options"]')
      expect(contentTypeOptions).toBeInTheDocument()
      expect(contentTypeOptions).toHaveAttribute('content', 'nosniff')
      
      const referrerPolicy = container.querySelector('meta[http-equiv="Referrer-Policy"]')
      expect(referrerPolicy).toBeInTheDocument()
      expect(referrerPolicy).toHaveAttribute('content', 'strict-origin-when-cross-origin')
    })
  })

  describe('Accessibility Features', () => {
    it('should have skip link with proper styling classes', () => {
      render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink).toHaveClass('sr-only')
      expect(skipLink).toHaveClass('focus:not-sr-only')
      expect(skipLink).toHaveClass('focus:absolute')
    })

    it('should have proper ARIA roles', () => {
      render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
    })
  })
})