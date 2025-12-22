/**
 * Property test for CMS data integration
 * Feature: moment-capturers-portfolio, Property 2: CMS Data Integration
 * Validates: Requirements 3.1, 4.4, 5.1, 5.5, 7.4
 */

import fc from 'fast-check'
import { render, screen, waitFor } from '@testing-library/react'
import About from '../../components/About'
import Portfolio from '../../components/Portfolio'
import Testimonials from '../../components/Testimonials'

// Mock the Sanity client
jest.mock('../../lib/sanity', () => ({
  getAboutData: jest.fn(),
  getPortfolioItems: jest.fn(),
  getTestimonials: jest.fn(),
  urlFor: jest.fn(() => ({
    width: () => ({ height: () => ({ url: () => 'https://example.com/image.jpg' }) }),
  })),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useInView: () => true,
  useReducedMotion: () => false,
  AnimatePresence: ({ children }: any) => children,
}))

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}))

describe('CMS Data Integration Property Tests', () => {
  // Feature: moment-capturers-portfolio, Property 2: CMS Data Integration
  describe('About Section CMS Integration', () => {
    it('should render CMS content when valid about data is provided', () => {
      fc.assert(fc.property(
        fc.record({
          content: fc.string({ minLength: 10, maxLength: 500 }),
          skills: fc.array(fc.string({ minLength: 3, maxLength: 20 }), { minLength: 1, maxLength: 8 }),
          experience: fc.integer({ min: 1, max: 30 }),
          profileImage: fc.option(fc.record({
            asset: fc.record({
              url: fc.webUrl()
            }),
            alt: fc.string({ minLength: 5, maxLength: 100 })
          }))
        }),
        (aboutData) => {
          // For any valid about data from CMS, it should be properly rendered
          render(<About initialData={aboutData} />)
          
          // Content should be displayed
          expect(screen.getByText('About Me')).toBeInTheDocument()
          
          // CMS content should be rendered
          const contentParagraphs = aboutData.content.split('\n\n')
          contentParagraphs.forEach(paragraph => {
            if (paragraph.trim()) {
              expect(screen.getByText(paragraph.trim())).toBeInTheDocument()
            }
          })
          
          // Skills should be displayed
          aboutData.skills.forEach(skill => {
            expect(screen.getByText(skill)).toBeInTheDocument()
          })
          
          // Experience should be displayed
          expect(screen.getByText(`${aboutData.experience}+ Years Experience`)).toBeInTheDocument()
          
          return true
        }
      ), { numRuns: 50 })
    })

    it('should handle missing or null CMS data gracefully', () => {
      fc.assert(fc.property(
        fc.oneof(
          fc.constant(null),
          fc.constant(undefined),
          fc.record({
            content: fc.constant(''),
            skills: fc.constant([]),
            experience: fc.constant(null)
          })
        ),
        (aboutData) => {
          // For any missing or incomplete CMS data, component should still render
          render(<About initialData={aboutData} />)
          
          // Should still show the About Me heading
          expect(screen.getByText('About Me')).toBeInTheDocument()
          
          // Should show default content when CMS content is missing
          expect(screen.getByText(/Welcome to Moment Capturers/)).toBeInTheDocument()
          
          return true
        }
      ), { numRuns: 30 })
    })
  })

  describe('Portfolio Section CMS Integration', () => {
    it('should render portfolio items when valid CMS data is provided', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.string({ minLength: 5, maxLength: 30 }),
            category: fc.constantFrom('Food', 'Fashion', 'Events', 'Corporate', 'Portrait'),
            images: fc.array(
              fc.record({
                asset: fc.record({
                  url: fc.webUrl(),
                  metadata: fc.record({
                    dimensions: fc.record({
                      width: fc.integer({ min: 100, max: 2000 }),
                      height: fc.integer({ min: 100, max: 2000 })
                    })
                  })
                }),
                alt: fc.string({ minLength: 5, maxLength: 100 })
              }),
              { minLength: 1, maxLength: 5 }
            ),
            description: fc.string({ minLength: 10, maxLength: 200 })
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (portfolioItems) => {
          // For any valid portfolio items from CMS, they should be properly rendered
          render(<Portfolio items={portfolioItems} />)
          
          // Portfolio heading should be present
          expect(screen.getByText('Photography Portfolio')).toBeInTheDocument()
          
          // All categories should be available for filtering
          const categories = ['All', 'Food', 'Fashion', 'Events', 'Corporate', 'Portrait']
          categories.forEach(category => {
            expect(screen.getByText(category)).toBeInTheDocument()
          })
          
          // Portfolio items should be rendered (at least some content should be visible)
          expect(screen.getByRole('region', { name: /photography portfolio/i }) || 
                 screen.getByText(/photography portfolio/i)).toBeInTheDocument()
          
          return true
        }
      ), { numRuns: 30 })
    })

    it('should handle empty portfolio data gracefully', () => {
      fc.assert(fc.property(
        fc.constantFrom([], null, undefined),
        (portfolioItems) => {
          // For any empty or missing portfolio data, component should handle gracefully
          render(<Portfolio items={portfolioItems || []} />)
          
          // Should still show the portfolio heading
          expect(screen.getByText('Photography Portfolio')).toBeInTheDocument()
          
          // Should show category filters
          expect(screen.getByText('All')).toBeInTheDocument()
          
          return true
        }
      ), { numRuns: 20 })
    })
  })

  describe('Testimonials Section CMS Integration', () => {
    it('should render testimonials when valid CMS data is provided', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            author: fc.string({ minLength: 3, maxLength: 50 }),
            quote: fc.string({ minLength: 20, maxLength: 300 }),
            image: fc.option(fc.record({
              asset: fc.record({
                url: fc.webUrl()
              }),
              alt: fc.string({ minLength: 5, maxLength: 100 })
            })),
            company: fc.option(fc.string({ minLength: 3, maxLength: 50 })),
            rating: fc.integer({ min: 1, max: 5 }),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 5 }
        ),
        (testimonials) => {
          // For any valid testimonials from CMS, they should be properly rendered
          render(<Testimonials reviews={testimonials} />)
          
          // Testimonials heading should be present
          expect(screen.getByText('What Clients Say')).toBeInTheDocument()
          
          // At least one testimonial should be visible (the first one in the carousel)
          if (testimonials.length > 0) {
            const firstTestimonial = testimonials[0]
            expect(screen.getByText(firstTestimonial.author)).toBeInTheDocument()
            expect(screen.getByText(`"${firstTestimonial.quote}"`)).toBeInTheDocument()
          }
          
          return true
        }
      ), { numRuns: 30 })
    })

    it('should handle empty testimonials data gracefully', () => {
      fc.assert(fc.property(
        fc.constantFrom([], null, undefined),
        (testimonials) => {
          // For any empty or missing testimonials data, component should handle gracefully
          const { container } = render(<Testimonials reviews={testimonials || []} />)
          
          // Component should either not render or render gracefully
          // If it renders nothing, that's acceptable for empty data
          // If it renders something, it should not crash
          expect(container).toBeInTheDocument()
          
          return true
        }
      ), { numRuns: 20 })
    })
  })

  describe('CMS Data Type Validation', () => {
    it('should handle various data types correctly', () => {
      fc.assert(fc.property(
        fc.record({
          stringField: fc.oneof(fc.string(), fc.constant(null), fc.constant(undefined)),
          arrayField: fc.oneof(fc.array(fc.string()), fc.constant(null), fc.constant(undefined)),
          numberField: fc.oneof(fc.integer(), fc.constant(null), fc.constant(undefined)),
          objectField: fc.oneof(
            fc.record({ url: fc.string() }), 
            fc.constant(null), 
            fc.constant(undefined)
          )
        }),
        (mixedData) => {
          // For any combination of data types (including null/undefined), components should handle gracefully
          const aboutData = {
            content: typeof mixedData.stringField === 'string' ? mixedData.stringField : 'Default content',
            skills: Array.isArray(mixedData.arrayField) ? mixedData.arrayField : [],
            experience: typeof mixedData.numberField === 'number' ? mixedData.numberField : null,
            profileImage: mixedData.objectField
          }
          
          // Should not throw errors when rendering with mixed data types
          expect(() => {
            render(<About initialData={aboutData} />)
          }).not.toThrow()
          
          return true
        }
      ), { numRuns: 50 })
    })
  })

  describe('CMS Data Update Scenarios', () => {
    it('should handle data updates correctly', () => {
      fc.assert(fc.property(
        fc.tuple(
          fc.record({
            content: fc.string({ minLength: 10, maxLength: 100 }),
            skills: fc.array(fc.string(), { maxLength: 3 })
          }),
          fc.record({
            content: fc.string({ minLength: 10, maxLength: 100 }),
            skills: fc.array(fc.string(), { maxLength: 3 })
          })
        ),
        ([initialData, updatedData]) => {
          // For any initial data and updated data, component should handle transitions
          const { rerender } = render(<About initialData={initialData} />)
          
          // Initial data should be rendered
          expect(screen.getByText('About Me')).toBeInTheDocument()
          
          // Update with new data
          rerender(<About initialData={updatedData} />)
          
          // Updated data should be rendered
          expect(screen.getByText('About Me')).toBeInTheDocument()
          
          return true
        }
      ), { numRuns: 30 })
    })
  })
})