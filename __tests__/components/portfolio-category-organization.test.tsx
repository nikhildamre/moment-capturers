/**
 * Property test for portfolio category organization
 * Feature: moment-capturers-portfolio, Property 3: Portfolio Category Organization
 * Validates: Requirements 4.1
 */

import fc from 'fast-check'
import { render, screen, fireEvent } from '@testing-library/react'
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

// Mock react-photo-album
jest.mock('react-photo-album', () => ({
  __esModule: true,
  default: ({ photos, onClick, renderPhoto }: any) => (
    <div data-testid="photo-album">
      {photos.map((photo: any, index: number) => (
        <div key={index} onClick={() => onClick({ index })}>
          {renderPhoto({ photo, imageProps: { src: photo.src, alt: photo.alt } })}
        </div>
      ))}
    </div>
  ),
}))

// Mock yet-another-react-lightbox
jest.mock('yet-another-react-lightbox', () => ({
  __esModule: true,
  default: ({ open, slides }: any) => open ? <div data-testid="lightbox">Lightbox with {slides.length} slides</div> : null,
}))

// Mock Loading component
jest.mock('../../components/Loading', () => ({
  SkeletonCard: () => <div data-testid="skeleton-card">Loading...</div>,
}))

// Mock ErrorBoundary
jest.mock('../../components/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}))

describe('Portfolio Category Organization Property Tests', () => {
  const validCategories = ['Food', 'Fashion', 'Events', 'Corporate', 'Portrait'] as const

  // Feature: moment-capturers-portfolio, Property 3: Portfolio Category Organization
  describe('Category Filtering Logic', () => {
    it('should correctly filter portfolio items by category', () => {
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
                      width: fc.integer({ min: 100, max: 2000 }),
                      height: fc.integer({ min: 100, max: 2000 })
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
          { minLength: 3, maxLength: 15 }
        ),
        fc.constantFrom(...validCategories),
        (portfolioItems: PortfolioItem[], selectedCategory: string) => {
          // For any collection of portfolio items and selected category,
          // filtering should work correctly
          render(<Portfolio items={portfolioItems} />)
          
          // All category buttons should be present
          const allCategories = ['All', ...validCategories]
          allCategories.forEach(category => {
            expect(screen.getByRole('tab', { name: category })).toBeInTheDocument()
          })
          
          // Click on the selected category
          const categoryButton = screen.getByRole('tab', { name: selectedCategory })
          fireEvent.click(categoryButton)
          
          // The selected category button should have the active state
          expect(categoryButton).toHaveClass('bg-accentYellow')
          
          // Count expected items for this category
          const expectedItems = portfolioItems.filter(item => item.category === selectedCategory)
          const totalExpectedPhotos = expectedItems.reduce((sum, item) => sum + item.images.length, 0)
          
          // If there are items in this category, photo album should be present
          if (totalExpectedPhotos > 0) {
            expect(screen.getByTestId('photo-album')).toBeInTheDocument()
          } else {
            // Should show "no images found" message
            expect(screen.getByText(/No images found in the/)).toBeInTheDocument()
          }
          
          return true
        }
      ), { numRuns: 50 })
    })

    it('should show all items when "All" category is selected', () => {
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
                      width: fc.integer({ min: 100, max: 2000 }),
                      height: fc.integer({ min: 100, max: 2000 })
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
          { minLength: 1, maxLength: 10 }
        ),
        (portfolioItems: PortfolioItem[]) => {
          // For any collection of portfolio items, "All" should show everything
          render(<Portfolio items={portfolioItems} />)
          
          // "All" should be selected by default
          const allButton = screen.getByRole('tab', { name: 'All' })
          expect(allButton).toHaveClass('bg-accentYellow')
          
          // Total number of photos should match all images from all items
          const totalPhotos = portfolioItems.reduce((sum, item) => sum + item.images.length, 0)
          
          if (totalPhotos > 0) {
            expect(screen.getByTestId('photo-album')).toBeInTheDocument()
          } else {
            expect(screen.getByText(/No portfolio items available/)).toBeInTheDocument()
          }
          
          return true
        }
      ), { numRuns: 30 })
    })
  })

  describe('Category Distribution Properties', () => {
    it('should handle uneven category distribution correctly', () => {
      fc.assert(fc.property(
        fc.array(
          fc.record({
            _id: fc.string({ minLength: 5, maxLength: 20 }),
            title: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.record({ current: fc.string() }),
            category: fc.oneof(
              fc.constant('Food'),
              fc.constant('Food'),
              fc.constant('Food'),
              fc.constant('Food'),
              fc.constant('Food'),
              fc.constant('Fashion'),
              fc.constant('Fashion'),
              fc.constant('Fashion'),
              fc.constant('Events'),
              fc.constant('Events'),
              fc.constant('Corporate'),
              fc.constant('Portrait')
            ),
            images: fc.array(
              fc.record({
                asset: fc.record({
                  _id: fc.string({ minLength: 10, maxLength: 30 }),
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
              { minLength: 1, maxLength: 4 }
            ),
            description: fc.string(),
            featured: fc.boolean(),
            order: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 5, maxLength: 20 }
        ),
        (portfolioItems: PortfolioItem[]) => {
          // For any uneven distribution of categories, filtering should still work
          render(<Portfolio items={portfolioItems} />)
          
          // Test each category
          validCategories.forEach(category => {
            const categoryButton = screen.getByRole('tab', { name: category })
            fireEvent.click(categoryButton)
            
            // Button should become active
            expect(categoryButton).toHaveClass('bg-accentYellow')
            
            // Count items in this category
            const itemsInCategory = portfolioItems.filter(item => item.category === category)
            const photosInCategory = itemsInCategory.reduce((sum, item) => sum + item.images.length, 0)
            
            if (photosInCategory === 0) {
              // Should show empty state
              expect(screen.getByText(new RegExp(`No images found in the ${category} category`))).toBeInTheDocument()
            } else {
              // Should show photo album
              expect(screen.getByTestId('photo-album')).toBeInTheDocument()
            }
          })
          
          return true
        }
      ), { numRuns: 30 })
    })
  })

  describe('Category State Management', () => {
    it('should maintain category selection state correctly', () => {
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
                      width: fc.integer({ min: 100, max: 2000 }),
                      height: fc.integer({ min: 100, max: 2000 })
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
          { minLength: 2, maxLength: 8 }
        ),
        fc.shuffledSubarray([...validCategories], { minLength: 2, maxLength: 4 }),
        (portfolioItems: PortfolioItem[], categoriesToTest: string[]) => {
          // For any sequence of category selections, state should be maintained correctly
          render(<Portfolio items={portfolioItems} />)
          
          // Test switching between categories
          categoriesToTest.forEach(category => {
            const categoryButton = screen.getByRole('tab', { name: category })
            fireEvent.click(categoryButton)
            
            // Only this category should be active
            const allCategoryButtons = screen.getAllByRole('tab')
            allCategoryButtons.forEach(button => {
              if (button.textContent === category) {
                expect(button).toHaveClass('bg-accentYellow')
              } else {
                expect(button).not.toHaveClass('bg-accentYellow')
              }
            })
          })
          
          return true
        }
      ), { numRuns: 40 })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty categories gracefully', () => {
      fc.assert(fc.property(
        fc.constantFrom(
          [], // Empty array
          [{ // Single item with no images
            _id: 'test-1',
            title: 'Test Item',
            slug: { current: 'test-item' },
            category: 'Food' as const,
            images: [],
            description: 'Test description',
            featured: false,
            order: 1
          }]
        ),
        (portfolioItems: PortfolioItem[]) => {
          // For empty or minimal data, component should handle gracefully
          render(<Portfolio items={portfolioItems} />)
          
          // All category buttons should still be present
          const allCategories = ['All', ...validCategories]
          allCategories.forEach(category => {
            expect(screen.getByRole('tab', { name: category })).toBeInTheDocument()
          })
          
          // Should show appropriate empty state
          if (portfolioItems.length === 0 || portfolioItems.every(item => item.images.length === 0)) {
            expect(screen.getByText(/No portfolio items available|No images found/)).toBeInTheDocument()
          }
          
          return true
        }
      ), { numRuns: 20 })
    })
  })
})