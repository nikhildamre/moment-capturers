/**
 * Unit tests for lightbox integration
 * Feature: moment-capturers-portfolio, Task 7.2
 * Validates: Requirements 4.3
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
        <div 
          key={index} 
          data-testid={`photo-${index}`}
          onClick={() => onClick({ index })}
        >
          {renderPhoto({ photo, imageProps: { src: photo.src, alt: photo.alt } })}
        </div>
      ))}
    </div>
  ),
}))

// Mock yet-another-react-lightbox with detailed tracking
const mockLightboxRender = jest.fn()
jest.mock('yet-another-react-lightbox', () => ({
  __esModule: true,
  default: ({ open, index, slides, close, carousel, render, plugins }: any) => {
    mockLightboxRender({ open, index, slides, close, carousel, render, plugins })
    
    return open ? (
      <div 
        data-testid="lightbox" 
        data-open={open}
        data-index={index}
        data-slides-count={slides.length}
        data-carousel-finite={carousel?.finite}
      >
        <button onClick={close} data-testid="lightbox-close" aria-label="Close lightbox">
          Close
        </button>
        <div data-testid="lightbox-image">
          <img src={slides[index]?.src} alt={slides[index]?.alt} />
        </div>
        {slides.length > 1 && (
          <>
            {render?.buttonPrev !== undefined && render.buttonPrev() !== null && (
              <button data-testid="lightbox-prev" aria-label="Previous image">
                Previous
              </button>
            )}
            {render?.buttonNext !== undefined && render.buttonNext() !== null && (
              <button data-testid="lightbox-next" aria-label="Next image">
                Next
              </button>
            )}
          </>
        )}
      </div>
    ) : null
  },
}))

// Mock Loading and ErrorBoundary components
jest.mock('../../components/Loading', () => ({
  SkeletonCard: () => <div data-testid="skeleton-card">Loading...</div>,
}))

jest.mock('../../components/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}))

describe('Lightbox Integration Unit Tests', () => {
  const mockPortfolioItems: PortfolioItem[] = [
    {
      _id: 'item-1',
      title: 'Food Photography',
      slug: { current: 'food-photography' },
      category: 'Food',
      images: [
        {
          asset: {
            _id: 'img-1',
            url: 'https://example.com/food1.jpg',
            metadata: {
              dimensions: { width: 800, height: 600 }
            }
          },
          alt: 'Delicious food photo 1'
        },
        {
          asset: {
            _id: 'img-2',
            url: 'https://example.com/food2.jpg',
            metadata: {
              dimensions: { width: 1200, height: 800 }
            }
          },
          alt: 'Delicious food photo 2'
        },
        {
          asset: {
            _id: 'img-3',
            url: 'https://example.com/food3.jpg',
            metadata: {
              dimensions: { width: 1000, height: 750 }
            }
          },
          alt: 'Delicious food photo 3'
        }
      ],
      description: 'Food photography session',
      featured: true,
      order: 1
    },
    {
      _id: 'item-2',
      title: 'Fashion Shoot',
      slug: { current: 'fashion-shoot' },
      category: 'Fashion',
      images: [
        {
          asset: {
            _id: 'img-4',
            url: 'https://example.com/fashion1.jpg',
            metadata: {
              dimensions: { width: 600, height: 900 }
            }
          },
          alt: 'Fashion photo 1'
        }
      ],
      description: 'Fashion photography session',
      featured: false,
      order: 2
    }
  ]

  beforeEach(() => {
    mockLightboxRender.mockClear()
  })

  // Requirement 4.3: Lightbox component integration
  describe('Lightbox Component Integration', () => {
    it('should integrate Yet Another React Lightbox component', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      // Click first image
      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)

      // Lightbox should be rendered
      expect(screen.getByTestId('lightbox')).toBeInTheDocument()
      
      // Verify YARL was called with correct props
      expect(mockLightboxRender).toHaveBeenCalledWith(
        expect.objectContaining({
          open: true,
          index: 0,
          slides: expect.any(Array),
          close: expect.any(Function),
          carousel: expect.objectContaining({ finite: true }),
          plugins: expect.any(Array)
        })
      )
    })

    it('should pass correct slide data to lightbox', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      // Click second image
      const secondPhoto = screen.getByTestId('photo-1')
      fireEvent.click(secondPhoto)

      // Verify lightbox received correct slides
      const lastCall = mockLightboxRender.mock.calls[mockLightboxRender.mock.calls.length - 1][0]
      expect(lastCall.slides).toHaveLength(4) // 3 food + 1 fashion images
      expect(lastCall.index).toBe(1)
      
      // Verify slide structure
      lastCall.slides.forEach((slide: any) => {
        expect(slide).toHaveProperty('src')
        expect(slide).toHaveProperty('alt')
        expect(slide).toHaveProperty('width')
        expect(slide).toHaveProperty('height')
      })
    })

    it('should configure lightbox with finite carousel', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)

      const lightbox = screen.getByTestId('lightbox')
      expect(lightbox).toHaveAttribute('data-carousel-finite', 'true')
    })
  })

  // Requirement 4.3: Click handlers for portfolio images
  describe('Click Handler Implementation', () => {
    it('should open lightbox with correct image index on click', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      // Test clicking different images
      const testIndices = [0, 2, 3]
      
      testIndices.forEach(index => {
        const photo = screen.getByTestId(`photo-${index}`)
        fireEvent.click(photo)

        const lightbox = screen.getByTestId('lightbox')
        expect(lightbox).toHaveAttribute('data-index', index.toString())

        // Close lightbox for next test
        const closeButton = screen.getByTestId('lightbox-close')
        fireEvent.click(closeButton)
      })
    })

    it('should handle rapid successive clicks correctly', async () => {
      render(<Portfolio items={mockPortfolioItems} />)

      // Click multiple images rapidly
      const photo1 = screen.getByTestId('photo-0')
      const photo2 = screen.getByTestId('photo-1')
      const photo3 = screen.getByTestId('photo-2')

      fireEvent.click(photo1)
      fireEvent.click(photo2)
      fireEvent.click(photo3)

      await waitFor(() => {
        const lightbox = screen.getByTestId('lightbox')
        // Should show the last clicked image
        expect(lightbox).toHaveAttribute('data-index', '2')
      })
    })
  })

  // Requirement 4.3: Keyboard navigation support
  describe('Keyboard Navigation', () => {
    it('should open lightbox on Enter key press', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.keyDown(firstPhoto, { key: 'Enter' })

      expect(screen.getByTestId('lightbox')).toBeInTheDocument()
    })

    it('should open lightbox on Space key press', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.keyDown(firstPhoto, { key: ' ' })

      expect(screen.getByTestId('lightbox')).toBeInTheDocument()
    })

    it('should not open lightbox on other key presses', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      
      // Test various keys that should not trigger lightbox
      const nonTriggerKeys = ['a', 'Escape', 'Tab', 'ArrowDown']
      
      nonTriggerKeys.forEach(key => {
        fireEvent.keyDown(firstPhoto, { key })
        expect(screen.queryByTestId('lightbox')).not.toBeInTheDocument()
      })
    })
  })

  // Requirement 4.3: Proper navigation and controls
  describe('Navigation Controls', () => {
    it('should hide navigation buttons for single image', () => {
      const singleImageItem: PortfolioItem[] = [{
        _id: 'single-item',
        title: 'Single Image',
        slug: { current: 'single-image' },
        category: 'Food',
        images: [{
          asset: {
            _id: 'single-img',
            url: 'https://example.com/single.jpg',
            metadata: {
              dimensions: { width: 800, height: 600 }
            }
          },
          alt: 'Single image'
        }],
        description: 'Single image item',
        featured: false,
        order: 1
      }]

      render(<Portfolio items={singleImageItem} />)

      const photo = screen.getByTestId('photo-0')
      fireEvent.click(photo)

      // Navigation buttons should not be present for single image
      expect(screen.queryByTestId('lightbox-prev')).not.toBeInTheDocument()
      expect(screen.queryByTestId('lightbox-next')).not.toBeInTheDocument()
    })

    it('should show navigation buttons for multiple images', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)

      // Navigation buttons should be present for multiple images
      expect(screen.getByTestId('lightbox-prev')).toBeInTheDocument()
      expect(screen.getByTestId('lightbox-next')).toBeInTheDocument()
    })
  })

  // Requirement 4.3: Accessibility compliance
  describe('Accessibility Compliance', () => {
    it('should have proper ARIA labels on lightbox controls', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)

      // Close button should have aria-label
      const closeButton = screen.getByTestId('lightbox-close')
      expect(closeButton).toHaveAttribute('aria-label', 'Close lightbox')

      // Navigation buttons should have aria-labels
      const prevButton = screen.getByTestId('lightbox-prev')
      const nextButton = screen.getByTestId('lightbox-next')
      
      expect(prevButton).toHaveAttribute('aria-label', 'Previous image')
      expect(nextButton).toHaveAttribute('aria-label', 'Next image')
    })

    it('should have proper role and tabIndex on clickable images', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      const clickableElement = firstPhoto.querySelector('[role="button"]')
      
      expect(clickableElement).toBeInTheDocument()
      expect(clickableElement).toHaveAttribute('tabIndex', '0')
      expect(clickableElement).toHaveAttribute('aria-label')
    })
  })

  // Requirement 4.3: Handle image loading states and errors
  describe('Image Loading and Error Handling', () => {
    it('should display current image in lightbox', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const secondPhoto = screen.getByTestId('photo-1')
      fireEvent.click(secondPhoto)

      const lightboxImage = screen.getByTestId('lightbox-image').querySelector('img')
      expect(lightboxImage).toBeInTheDocument()
      expect(lightboxImage).toHaveAttribute('src')
      expect(lightboxImage).toHaveAttribute('alt')
    })

    it('should handle lightbox close action', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      // Open lightbox
      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)
      expect(screen.getByTestId('lightbox')).toBeInTheDocument()

      // Close lightbox
      const closeButton = screen.getByTestId('lightbox-close')
      fireEvent.click(closeButton)

      // Lightbox should be closed
      expect(screen.queryByTestId('lightbox')).not.toBeInTheDocument()
    })

    it('should maintain lightbox state across category changes', async () => {
      render(<Portfolio items={mockPortfolioItems} />)

      // Open lightbox
      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)
      expect(screen.getByTestId('lightbox')).toBeInTheDocument()

      // Close lightbox
      const closeButton = screen.getByTestId('lightbox-close')
      fireEvent.click(closeButton)

      // Change category
      const fashionButton = screen.getByRole('tab', { name: 'Fashion' })
      fireEvent.click(fashionButton)

      await waitFor(() => {
        // Should be able to open lightbox again with filtered images
        const filteredPhoto = screen.getByTestId('photo-0')
        fireEvent.click(filteredPhoto)
        
        const lightbox = screen.getByTestId('lightbox')
        expect(lightbox).toBeInTheDocument()
        // Should only have 1 slide (Fashion category has 1 image)
        expect(lightbox).toHaveAttribute('data-slides-count', '1')
      })
    })
  })

  describe('Lightbox Configuration', () => {
    it('should configure lightbox with empty plugins array', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)

      const lastCall = mockLightboxRender.mock.calls[mockLightboxRender.mock.calls.length - 1][0]
      expect(lastCall.plugins).toEqual([])
    })

    it('should provide close callback function', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)

      const lastCall = mockLightboxRender.mock.calls[mockLightboxRender.mock.calls.length - 1][0]
      expect(typeof lastCall.close).toBe('function')
    })
  })
})
