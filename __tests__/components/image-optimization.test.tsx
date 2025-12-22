/**
 * Property test for image optimization
 * Feature: moment-capturers-portfolio, Property 12: Image Optimization
 * Validates: Requirements 8.5
 */

import fc from 'fast-check'
import { render, screen } from '@testing-library/react'
import Portfolio from '../../components/Portfolio'
import About from '../../components/About'
import { PortfolioItem, AboutData } from '../../lib/sanity'

// Mock the Sanity client
jest.mock('../../lib/sanity', () => ({
  getPortfolioItems: jest.fn(),
  getAboutData: jest.fn(),
  urlFor: jest.fn((source) => ({
    width: (w: number) => ({
      height: (h: number) => ({
        url: () => `https://cdn.sanity.io/images/test/${source.asset?._id || 'default'}-${w}x${h}.jpg`
      })
    })
  })),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  useInView: () => true,
  useReducedMotion: () => false,
}))

// Mock Next.js Image to capture optimization properties
const MockImage = jest.fn(({ src, alt, width, height, sizes, loading, priority, ...props }) => (
  <img 
    src={src} 
    alt={alt} 
    width={width}
    height={height}
    data-sizes={sizes}
    data-loading={loading}
    data-priority={priority}
    {...props} 
  />
))

jest.mock('next/image', () => ({
  __esModule: true,
  default: MockImage,
}))

// Mock react-photo-album
jest.mock('react-photo-album', () => ({
  __esModule: true,
  default: ({ photos, renderPhoto }: any) => (
    <div data-testid="photo-album">
      {photos.map((photo: any, index: number) => (
        <div key={index}>
          {renderPhoto({ photo, imageProps: { src: photo.src, alt: photo.alt, width: photo.width, height: photo.height } })}
        </div>
      ))}
    </div>
  ),
}))

// Mock yet-another-react-lightbox
jest.mock('yet-another-react-lightbox', () => ({
  __esModule: true,
  default: () => null,
}))

// Mock Loading and ErrorBoundary components
jest.mock('../../components/Loading', () => ({
  SkeletonCard: () => <div data-testid="skeleton-card">Loading...</div>,
}))

jest.mock('../../components/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}))

describe('Image Optimization Property Tests', () => {
  beforeEach(() => {
    MockImage.mockClear()
  })

  // Feature: moment-capturers-portfolio, Property 12: Image Optimization
  describe('Next.js Image Component Usage', () => {
    it('should use Next.js Image component with proper optimization attributes', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom('Food', 'Fashion', 'Events', 'Corporate', 'Portrait'),
            images: fc.array(
              fc.record({
                asset: fc.record({
                  _id: fc.string({ minLength: 10, maxLength: 30 }),
                  url: fc.webUrl(),
                  metadata: fc.record({
                    dimensions: fc.record({
                      width: fc.integer({ min: 400, max: 3000 }),
                      height: fc.integer({ min: 300, max: 2000 })
                    })
                  })
                }),
                alt: fc.string({ minLength: 5, maxLength: 100 })
              }),
              { minLength: 1, maxLength: 4 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 8 }
        ),
        (portfolioItems) => {
          // For any collection of portfolio items, images should be optimized
          render(<Portfolio items={portfolioItems} />)
          
          // Count total images
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 0) {
            // Next.js Image component should be used
            expect(MockImage).toHaveBeenCalled()
            
            // Check each call to MockImage for optimization properties
            MockImage.mock.calls.forEach((call) => {
              const [props] = call
              
              // Should have proper src URL (optimized through Sanity)
              expect(props.src).toMatch(/https:\/\/cdn\.sanity\.io\/images/)
              
              // Should have alt text for accessibility
              expect(props.alt).toBeDefined()
              expect(typeof props.alt).toBe('string')
              expect(props.alt.length).toBeGreaterThan(0)
              
              // Should have width and height for layout stability
              expect(props.width).toBeDefined()
              expect(props.height).toBeDefined()
              expect(typeof props.width).toBe('number')
              expect(typeof props.height).toBe('number')
              
              // Should have responsive sizes attribute
              expect(props.sizes).toBeDefined()
              expect(props.sizes).toMatch(/\(max-width:.*\).*vw/)
              
              // Should use lazy loading by default
              expect(props.loading).toBe('lazy')
              
              // Should not have priority loading for portfolio images (not hero images)
              expect(props.priority).toBeFalsy()
            })
          }
          
          return true
        }
      ), { numRuns: 30 })
    })

    it('should generate optimized image URLs through Sanity CDN', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom('Food', 'Fashion', 'Events', 'Corporate', 'Portrait'),
            images: fc.array(
              fc.record({
                asset: fc.record({
                  _id: fc.string({ minLength: 10, maxLength: 30 }),
                  url: fc.webUrl(),
                  metadata: fc.record({
                    dimensions: fc.record({
                      width: fc.integer({ min: 400, max: 3000 }),
                      height: fc.integer({ min: 300, max: 2000 })
                    })
                  })
                }),
                alt: fc.string({ minLength: 5, maxLength: 100 })
              }),
              { minLength: 1, maxLength: 3 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 5 }
        ),
        (portfolioItems) => {
          // For any portfolio items, Sanity CDN should generate optimized URLs
          render(<Portfolio items={portfolioItems} />)
          
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 0) {
            // Check that optimized URLs are generated
            MockImage.mock.calls.forEach((call) => {
              const [props] = call
              
              // URL should be from Sanity CDN with optimization parameters
              expect(props.src).toMatch(/https:\/\/cdn\.sanity\.io\/images/)
              expect(props.src).toMatch(/-\d+x\d+\.jpg$/) // Should have dimensions in URL
            })
          }
          
          return true
        }
      ), { numRuns: 25 })
    })
  })

  describe('About Section Image Optimization', () => {
    it('should optimize profile images in About section', () => {
      fc.assert(fc.property(
        fc.record({
          content: fc.string({ minLength: 10, maxLength: 200 }),
          skills: fc.array(fc.string(), { maxLength: 5 }),
          experience: fc.integer({ min: 1, max: 20 }),
          profileImage: fc.record({
            asset: fc.record({
              _id: fc.string({ minLength: 10, maxLength: 30 }),
              url: fc.webUrl()
            }),
            alt: fc.string({ minLength: 5, maxLength: 100 })
          })
        }),
        (aboutData) => {
          // For any about data with profile image, it should be optimized
          render(<About initialData={aboutData} />)
          
          // Next.js Image should be used for profile image
          expect(MockImage).toHaveBeenCalled()
          
          // Find the profile image call
          const profileImageCall = MockImage.mock.calls.find(call => 
            call[0].alt === aboutData.profileImage.alt
          )
          
          if (profileImageCall) {
            const [props] = profileImageCall
            
            // Should have optimized Sanity CDN URL
            expect(props.src).toMatch(/https:\/\/cdn\.sanity\.io\/images/)
            
            // Should have proper dimensions
            expect(props.width).toBeDefined()
            expect(props.height).toBeDefined()
            
            // Should have alt text
            expect(props.alt).toBe(aboutData.profileImage.alt)
            
            // Profile image might have priority loading (above fold)
            // This is acceptable for hero/profile images
          }
          
          return true
        }
      ), { numRuns: 20 })
    })
  })

  describe('Responsive Image Sizing', () => {
    it('should provide appropriate responsive sizes for different viewport widths', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom('Food', 'Fashion', 'Events', 'Corporate', 'Portrait'),
            images: fc.array(
              fc.record({
                asset: fc.record({
                  _id: fc.string({ minLength: 10, maxLength: 30 }),
                  url: fc.webUrl(),
                  metadata: fc.record({
                    dimensions: fc.record({
                      width: fc.integer({ min: 800, max: 2400 }),
                      height: fc.integer({ min: 600, max: 1800 })
                    })
                  })
                }),
                alt: fc.string({ minLength: 5, maxLength: 100 })
              }),
              { minLength: 1, maxLength: 2 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 6 }
        ),
        (portfolioItems) => {
          // For any portfolio items, responsive sizing should be appropriate
          render(<Portfolio items={portfolioItems} />)
          
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 0) {
            MockImage.mock.calls.forEach((call) => {
              const [props] = call
              
              // Should have responsive sizes that make sense for portfolio layout
              expect(props.sizes).toBeDefined()
              
              // Should include mobile, tablet, and desktop breakpoints
              const sizes = props.sizes
              expect(sizes).toMatch(/max-width.*640px.*100vw/) // Mobile: full width
              expect(sizes).toMatch(/max-width.*1024px.*50vw/) // Tablet: half width
              expect(sizes).toMatch(/33vw/) // Desktop: third width (masonry grid)
            })
          }
          
          return true
        }
      ), { numRuns: 25 })
    })
  })

  describe('Image Loading Performance', () => {
    it('should use lazy loading for non-critical images', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom('Food', 'Fashion', 'Events', 'Corporate', 'Portrait'),
            images: fc.array(
              fc.record({
                asset: fc.record({
                  _id: fc.string({ minLength: 10, maxLength: 30 }),
                  url: fc.webUrl(),
                  metadata: fc.record({
                    dimensions: fc.record({
                      width: fc.integer({ min: 400, max: 2000 }),
                      height: fc.integer({ min: 300, max: 1500 })
                    })
                  })
                }),
                alt: fc.string({ minLength: 5, maxLength: 100 })
              }),
              { minLength: 2, maxLength: 6 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 3, maxLength: 10 }
        ),
        (portfolioItems) => {
          // For any large collection of portfolio items, lazy loading should be used
          render(<Portfolio items={portfolioItems} />)
          
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 0) {
            // Most images should use lazy loading
            const lazyLoadingCalls = MockImage.mock.calls.filter(call => 
              call[0].loading === 'lazy'
            )
            
            // At least 80% of images should be lazy loaded (portfolio images are below fold)
            const lazyLoadingRatio = lazyLoadingCalls.length / MockImage.mock.calls.length
            expect(lazyLoadingRatio).toBeGreaterThanOrEqual(0.8)
          }
          
          return true
        }
      ), { numRuns: 20 })
    })
  })

  describe('Image Dimension Handling', () => {
    it('should handle various image aspect ratios correctly', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom('Food', 'Fashion', 'Events', 'Corporate', 'Portrait'),
            images: fc.array(
              fc.record({
                asset: fc.record({
                  _id: fc.string({ minLength: 10, maxLength: 30 }),
                  url: fc.webUrl(),
                  metadata: fc.record({
                    dimensions: fc.record({
                      width: fc.integer({ min: 200, max: 4000 }),
                      height: fc.integer({ min: 200, max: 4000 })
                    })
                  })
                }),
                alt: fc.string({ minLength: 5, maxLength: 100 })
              }),
              { minLength: 1, maxLength: 3 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 5 }
        ),
        (portfolioItems) => {
          // For any variety of image dimensions, optimization should work correctly
          render(<Portfolio items={portfolioItems} />)
          
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 0) {
            MockImage.mock.calls.forEach((call) => {
              const [props] = call
              
              // Width and height should be positive numbers
              expect(props.width).toBeGreaterThan(0)
              expect(props.height).toBeGreaterThan(0)
              
              // Aspect ratio should be preserved (within reasonable bounds)
              const aspectRatio = props.width / props.height
              expect(aspectRatio).toBeGreaterThan(0.1) // Very tall images
              expect(aspectRatio).toBeLessThan(10) // Very wide images
            })
          }
          
          return true
        }
      ), { numRuns: 30 })
    })
  })
})