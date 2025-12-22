/**
 * Property test for image click interaction
 * Feature: moment-capturers-portfolio, Property 4: Image Click Interaction
 * Validates: Requirements 4.3
 */

import fc from 'fast-check'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Portfolio from '../../components/Portfolio'
import { PortfolioItem } from '../../lib/sanity'

// Mock the Sanity client
jest.mock('../../lib/sanity', () => ({
  getPortfolioItems: jest.fn(),
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
  },
  useInView: () => true,
  useReducedMotion: () => false,
}))

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}))

// Mock react-photo-album to capture click interactions
const mockPhotoAlbumClick = jest.fn()
jest.mock('react-photo-album', () => ({
  __esModule: true,
  default: ({ photos, onClick, renderPhoto }: any) => {
    // Store the onClick handler for testing
    mockPhotoAlbumClick.mockImplementation(onClick)
    
    return (
      <div data-testid="photo-album">
        {photos.map((photo: any, index: number) => (
          <div 
            key={index} 
            data-testid={`photo-${index}`}
            onClick={() => onClick({ index })}
          >
            {renderPhoto({ 
              photo, 
              imageProps: { src: photo.src, alt: photo.alt, width: photo.width, height: photo.height } 
            })}
          </div>
        ))}
      </div>
    )
  },
}))

// Mock yet-another-react-lightbox to capture lightbox state
const mockLightbox = jest.fn()
jest.mock('yet-another-react-lightbox', () => ({
  __esModule: true,
  default: mockLightbox.mockImplementation(({ open, index, slides, close }) => 
    open ? (
      <div 
        data-testid="lightbox" 
        data-index={index} 
        data-slides-count={slides.length}
        data-current-slide-src={slides[index]?.src}
      >
        <button onClick={close} data-testid="lightbox-close">Close</button>
        <div data-testid="lightbox-content">
          Current slide: {index + 1} of {slides.length}
        </div>
      </div>
    ) : null
  ),
}))

// Mock Loading and ErrorBoundary components
jest.mock('../../components/Loading', () => ({
  SkeletonCard: () => <div data-testid="skeleton-card">Loading...</div>,
}))

jest.mock('../../components/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}))

describe('Image Click Interaction Property Tests', () => {
  const validCategories = ['Food', 'Fashion', 'Events', 'Corporate', 'Portrait'] as const

  beforeEach(() => {
    mockPhotoAlbumClick.mockClear()
    mockLightbox.mockClear()
  })

  // Feature: moment-capturers-portfolio, Property 4: Image Click Interaction
  describe('Lightbox Trigger Functionality', () => {
    it('should open lightbox when any image is clicked', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom(...validCategories),
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
              { minLength: 1, maxLength: 4 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 8 }
        ),
        fc.integer({ min: 0, max: 10 }), // Random image index to click
        (portfolioItems, clickIndex) => {
          // For any collection of portfolio items and any image click,
          // the lightbox should open with the correct image
          render(<Portfolio items={portfolioItems} />)
          
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 0) {
            // Adjust click index to be within bounds
            const actualClickIndex = clickIndex % totalImages
            
            // Find the photo element to click
            const photoElement = screen.getByTestId(`photo-${actualClickIndex}`)
            expect(photoElement).toBeInTheDocument()
            
            // Click the image
            fireEvent.click(photoElement)
            
            // Lightbox should open
            expect(screen.getByTestId('lightbox')).toBeInTheDocument()
            
            // Lightbox should show the correct image index
            const lightbox = screen.getByTestId('lightbox')
            expect(lightbox).toHaveAttribute('data-index', actualClickIndex.toString())
            
            // Lightbox should have the correct number of slides
            expect(lightbox).toHaveAttribute('data-slides-count', totalImages.toString())
            
            // Should display current slide information
            expect(screen.getByTestId('lightbox-content')).toHaveTextContent(
              `Current slide: ${actualClickIndex + 1} of ${totalImages}`
            )
          }
          
          return true
        }
      ), { numRuns: 40 })
    })

    it('should handle keyboard interactions for image clicks', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom(...validCategories),
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
              { minLength: 1, maxLength: 3 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 5 }
        ),
        fc.constantFrom('Enter', ' '), // Test both Enter and Space keys
        (portfolioItems, keyToPress) => {
          // For any portfolio items and keyboard interaction,
          // the lightbox should open correctly
          render(<Portfolio items={portfolioItems} />)
          
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 0) {
            // Get the first photo element
            const photoElement = screen.getByTestId('photo-0')
            
            // Simulate keyboard interaction
            fireEvent.keyDown(photoElement, { key: keyToPress })
            
            // Lightbox should open
            expect(screen.getByTestId('lightbox')).toBeInTheDocument()
            
            // Should show the first image (index 0)
            const lightbox = screen.getByTestId('lightbox')
            expect(lightbox).toHaveAttribute('data-index', '0')
          }
          
          return true
        }
      ), { numRuns: 30 })
    })
  })

  describe('Lightbox State Management', () => {
    it('should maintain correct lightbox state across different image clicks', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom(...validCategories),
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
              { minLength: 2, maxLength: 5 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 2, maxLength: 6 }
        ),
        fc.array(fc.integer({ min: 0, max: 20 }), { minLength: 2, maxLength: 4 }), // Multiple clicks
        (portfolioItems, clickSequence) => {
          // For any portfolio items and sequence of clicks,
          // lightbox state should be managed correctly
          render(<Portfolio items={portfolioItems} />)
          
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 1) {
            // Test sequence of clicks
            clickSequence.forEach((clickIndex, sequenceIndex) => {
              const actualClickIndex = clickIndex % totalImages
              
              // Click the image
              const photoElement = screen.getByTestId(`photo-${actualClickIndex}`)
              fireEvent.click(photoElement)
              
              // Lightbox should be open
              expect(screen.getByTestId('lightbox')).toBeInTheDocument()
              
              // Should show correct image
              const lightbox = screen.getByTestId('lightbox')
              expect(lightbox).toHaveAttribute('data-index', actualClickIndex.toString())
              
              // Close lightbox for next iteration (except last)
              if (sequenceIndex < clickSequence.length - 1) {
                const closeButton = screen.getByTestId('lightbox-close')
                fireEvent.click(closeButton)
                expect(screen.queryByTestId('lightbox')).not.toBeInTheDocument()
              }
            })
          }
          
          return true
        }
      ), { numRuns: 25 })
    })

    it('should close lightbox when close action is triggered', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom(...validCategories),
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
              { minLength: 1, maxLength: 3 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 4 }
        ),
        (portfolioItems) => {
          // For any portfolio items, lightbox should close properly
          render(<Portfolio items={portfolioItems} />)
          
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 0) {
            // Open lightbox
            const photoElement = screen.getByTestId('photo-0')
            fireEvent.click(photoElement)
            
            // Verify lightbox is open
            expect(screen.getByTestId('lightbox')).toBeInTheDocument()
            
            // Close lightbox
            const closeButton = screen.getByTestId('lightbox-close')
            fireEvent.click(closeButton)
            
            // Verify lightbox is closed
            expect(screen.queryByTestId('lightbox')).not.toBeInTheDocument()
          }
          
          return true
        }
      ), { numRuns: 30 })
    })
  })

  describe('Category Filtering and Lightbox Integration', () => {
    it('should maintain correct lightbox functionality after category changes', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom(...validCategories),
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
              { minLength: 1, maxLength: 3 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 3, maxLength: 10 }
        ),
        fc.constantFrom(...validCategories),
        (portfolioItems, selectedCategory) => {
          // For any portfolio items and category selection,
          // lightbox should work correctly with filtered images
          render(<Portfolio items={portfolioItems} />)
          
          // Change to specific category
          const categoryButton = screen.getByRole('tab', { name: selectedCategory })
          fireEvent.click(categoryButton)
          
          // Count images in selected category
          const filteredItems = portfolioItems.filter(item => item.category === selectedCategory)
          const filteredImageCount = filteredItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (filteredImageCount > 0) {
            // Click first image in filtered view
            const photoElement = screen.getByTestId('photo-0')
            fireEvent.click(photoElement)
            
            // Lightbox should open
            expect(screen.getByTestId('lightbox')).toBeInTheDocument()
            
            // Should have correct number of slides (only filtered images)
            const lightbox = screen.getByTestId('lightbox')
            expect(lightbox).toHaveAttribute('data-slides-count', filteredImageCount.toString())
          }
          
          return true
        }
      ), { numRuns: 35 })
    })
  })

  describe('Accessibility and User Experience', () => {
    it('should provide proper accessibility attributes for image interactions', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.constantFrom(...validCategories),
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
              { minLength: 1, maxLength: 2 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 5 }
        ),
        (portfolioItems) => {
          // For any portfolio items, accessibility should be maintained
          render(<Portfolio items={portfolioItems} />)
          
          const totalImages = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalImages > 0) {
            // Check that images have proper accessibility attributes
            const photoElement = screen.getByTestId('photo-0')
            
            // Should have role="button" for clickable elements
            expect(photoElement.querySelector('[role="button"]')).toBeInTheDocument()
            
            // Should have tabIndex for keyboard navigation
            expect(photoElement.querySelector('[tabIndex="0"]')).toBeInTheDocument()
            
            // Should have aria-label describing the action
            const clickableElement = photoElement.querySelector('[aria-label]')
            expect(clickableElement).toBeInTheDocument()
            expect(clickableElement?.getAttribute('aria-label')).toMatch(/view.*lightbox/i)
          }
          
          return true
        }
      ), { numRuns: 25 })
    })
  })
})