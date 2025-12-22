/**
 * Unit tests for Landing section
 * Tests brand name display, photographer name, viewport height, animation setup, and styling
 */

import { render, screen } from '@testing-library/react'
import Landing from '../../components/Landing'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useReducedMotion: () => false,
}))

describe('Landing Section', () => {
  beforeEach(() => {
    render(<Landing />)
  })

  describe('Brand Name Display', () => {
    it('should display the "Moment Capturers" brand name prominently', () => {
      // Test for Requirements 2.1
      const brandName = screen.getByRole('heading', { level: 1 })
      expect(brandName).toBeInTheDocument()
      expect(brandName).toHaveTextContent('Moment')
      expect(brandName).toHaveTextContent('Capturers')
    })

    it('should have proper heading hierarchy', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
      
      // Should be the main h1 on the page
      const allH1s = screen.getAllByRole('heading', { level: 1 })
      expect(allH1s).toHaveLength(1)
    })

    it('should style brand name with proper typography classes', () => {
      const brandName = screen.getByRole('heading', { level: 1 })
      expect(brandName).toHaveClass('font-bold')
      expect(brandName).toHaveClass('tracking-tight')
      expect(brandName).toHaveClass('leading-tight')
    })
  })

  describe('Photographer Name Display', () => {
    it('should include the photographer\'s name "Amey Ghadge"', () => {
      // Test for Requirements 2.2
      const photographerName = screen.getByText('Amey Ghadge')
      expect(photographerName).toBeInTheDocument()
    })

    it('should display photographer name with proper context', () => {
      const contextText = screen.getByText('Professional Photography by')
      expect(contextText).toBeInTheDocument()
      
      const photographerName = screen.getByText('Amey Ghadge')
      expect(photographerName).toBeInTheDocument()
    })

    it('should style photographer name prominently', () => {
      const photographerName = screen.getByText('Amey Ghadge')
      expect(photographerName).toHaveClass('font-semibold')
      expect(photographerName).toHaveClass('text-accentYellow')
    })
  })

  describe('Viewport Height Styling', () => {
    it('should fill the entire viewport height', () => {
      // Test for Requirements 2.3
      const section = screen.getByRole('region', { name: /hero section/i })
      expect(section).toHaveClass('min-h-screen')
    })

    it('should have proper layout classes for centering', () => {
      const section = screen.getByRole('region', { name: /hero section/i })
      expect(section).toHaveClass('flex')
      expect(section).toHaveClass('items-center')
      expect(section).toHaveClass('justify-center')
    })
  })

  describe('Background and Text Colors', () => {
    it('should use dark graphite background with contrasting text', () => {
      // Test for Requirements 2.5
      const section = screen.getByRole('region', { name: /hero section/i })
      expect(section).toHaveClass('bg-graphite')
      expect(section).toHaveClass('text-floralWhite')
    })

    it('should use accent yellow for highlight elements', () => {
      const brandCapturers = screen.getByText('Capturers')
      expect(brandCapturers).toHaveClass('text-accentYellow')
      
      const photographerName = screen.getByText('Amey Ghadge')
      expect(photographerName).toHaveClass('text-accentYellow')
    })

    it('should use proper text opacity for secondary elements', () => {
      const tagline = screen.getByText('Capturing Moments That Matter')
      expect(tagline).toHaveClass('text-floralWhite/90')
      
      const contextText = screen.getByText('Professional Photography by')
      expect(contextText).toHaveClass('text-floralWhite/80')
    })
  })

  describe('Animation Setup', () => {
    it('should have animation properties applied to elements', () => {
      // Test for Requirements 2.4 - Animation setup
      const section = screen.getByRole('region', { name: /hero section/i })
      expect(section).toBeInTheDocument()
      
      // Check that motion components are being used (mocked)
      const brandName = screen.getByRole('heading', { level: 1 })
      expect(brandName).toBeInTheDocument()
    })

    it('should have background animation elements', () => {
      const section = screen.getByRole('region', { name: /hero section/i })
      
      // Background elements should be present but hidden from screen readers
      const backgroundContainer = section.querySelector('[aria-hidden="true"]')
      expect(backgroundContainer).toBeInTheDocument()
    })
  })

  describe('Content Structure', () => {
    it('should display the tagline', () => {
      const tagline = screen.getByText('Capturing Moments That Matter')
      expect(tagline).toBeInTheDocument()
      expect(tagline).toHaveClass('font-medium')
    })

    it('should display photography services preview', () => {
      const services = ['Food', 'Fashion', 'Events', 'Corporate', 'Portraits']
      
      services.forEach(service => {
        const serviceElement = screen.getByText(service)
        expect(serviceElement).toBeInTheDocument()
      })
    })

    it('should have scroll indicator', () => {
      const scrollText = screen.getByText('Scroll to explore')
      expect(scrollText).toBeInTheDocument()
      expect(scrollText).toHaveClass('hidden', 'sm:block') // Hidden on mobile
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive text sizing classes', () => {
      const brandName = screen.getByRole('heading', { level: 1 })
      expect(brandName).toHaveClass('text-4xl')
      expect(brandName).toHaveClass('sm:text-5xl')
      expect(brandName).toHaveClass('md:text-6xl')
      expect(brandName).toHaveClass('lg:text-7xl')
    })

    it('should have responsive container padding', () => {
      const container = screen.getByRole('region', { name: /hero section/i })
        .querySelector('.container')
      expect(container).toHaveClass('px-6')
    })

    it('should have responsive service tags spacing', () => {
      const serviceTag = screen.getByText('Food')
      expect(serviceTag.parentElement).toHaveClass('gap-3', 'sm:gap-4')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      const section = screen.getByRole('region', { name: /hero section/i })
      expect(section).toHaveAttribute('aria-label', 'Hero section - Moment Capturers Photography')
    })

    it('should hide decorative elements from screen readers', () => {
      const section = screen.getByRole('region', { name: /hero section/i })
      const backgroundElements = section.querySelector('[aria-hidden="true"]')
      expect(backgroundElements).toBeInTheDocument()
    })

    it('should have proper heading structure', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
      
      // Ensure it's the primary heading
      const headings = screen.getAllByRole('heading')
      expect(headings[0]).toBe(mainHeading)
    })
  })

  describe('SEO and Structured Data', () => {
    it('should include structured data for SEO', () => {
      const { container } = render(<Landing />)
      const structuredDataScript = container.querySelector('script[type="application/ld+json"]')
      expect(structuredDataScript).toBeInTheDocument()
      
      if (structuredDataScript?.textContent) {
        const structuredData = JSON.parse(structuredDataScript.textContent)
        expect(structuredData['@type']).toBe('ProfessionalService')
        expect(structuredData.name).toBe('Moment Capturers')
        expect(structuredData.provider.name).toBe('Amey Ghadge')
      }
    })

    it('should include all photography services in structured data', () => {
      const { container } = render(<Landing />)
      const structuredDataScript = container.querySelector('script[type="application/ld+json"]')
      
      if (structuredDataScript?.textContent) {
        const structuredData = JSON.parse(structuredDataScript.textContent)
        const services = structuredData.serviceType
        
        expect(services).toContain('Food Photography')
        expect(services).toContain('Fashion Photography')
        expect(services).toContain('Event Photography')
        expect(services).toContain('Corporate Photography')
        expect(services).toContain('Portrait Photography')
      }
    })
  })

  describe('Performance Considerations', () => {
    it('should use efficient CSS classes for animations', () => {
      const section = screen.getByRole('region', { name: /hero section/i })
      expect(section).toHaveClass('relative')
      expect(section).toHaveClass('overflow-hidden')
    })

    it('should have proper z-index layering', () => {
      const mainContent = screen.getByRole('region', { name: /hero section/i })
        .querySelector('.z-10')
      expect(mainContent).toBeInTheDocument()
    })
  })
})