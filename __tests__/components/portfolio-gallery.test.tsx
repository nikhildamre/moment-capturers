/**
 * Unit tests for portfolio gallery
 * Feature: moment-capturers-portfolio, Task 6.3
 * Validates: Requirements 4.2, 4.5, 4.6
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
  default: ({ alt, className, ...props }: any) => (
    <img alt={alt} className={className} {...props} />
  ),
}))

// Mock react-photo-album
const mockPhotoAlbum = jest.fn(({ photos, onClick, renderPhoto, layout, targetRowHeight }: {
  photos: any[];
  onClick: (params: { index: number }) => void;
  renderPhoto: (params: { photo: any; imageProps: any }) => React.ReactNode;
  layout: string;
  targetRowHeight: number;
}) => (
  <div 
    data-testid="photo-album"
    data-layout={layout}
    data-target-row-height={targetRowHeight}
  >
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
))

jest.mock('react-photo-album', () => ({
  __esModule: true,
  default: mockPhotoAlbum,
}))

// Mock yet-another-react-lightbox
const mockLightbox = jest.fn(({ open, index, slides, close }: {
  open: boolean;
  index: number;
  slides: any[];
  close: () => void;
}) => 
  open ? (
    <div data-testid="lightbox" data-index={index} data-slides-count={slides.length}>
      <button onClick={close} data-testid="lightbox-close">Close</button>
      Lightbox Content
    </div>
  ) : null
)

jest.mock('yet-another-react-lightbox', () => ({
  __esModule: true,
  default: mockLightbox,
}))

// Mock Loading and ErrorBoundary components
jest.mock('../../components/Loading', () => ({
  SkeletonCard: () => <div data-testid="skeleton-card">Loading...</div>,
}))

jest.mock('../../components/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}))

describe('Portfolio Gallery Unit Tests', () => {
  const mockPortfolioItems: PortfolioItem[] = [
    {
      _id: 'item-1',
      title: 'Food Photography Session',
      slug: { current: 'food-session' },
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
            _id: 'img-3',
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
    mockPhotoAlbum.mockClear()
    mockLightbox.mockClear()
  })

  // Requirement 4.2: Implement React Photo Album masonry grid layout
  describe('Masonry Grid Layout', () => {
    it('should render PhotoAlbum component with masonry layout', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      expect(screen.getByTestId('photo-album')).toBeInTheDocument()
      expect(mockPhotoAlbum).toHaveBeenCalledWith(
        expect.objectContaining({
          layout: 'masonry',
          targetRowHeight: 300,
          photos: expect.any(Array),
          onClick: expect.any(Function),
          renderPhoto: expect.any(Function)
        }),
        expect.any(Object)
      )
    })

    it('should pass correct photo data to PhotoAlbum', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const photoAlbumCall = mockPhotoAlbum.mock.calls[0]
      const { photos } = photoAlbumCall[0]

      expect(photos).toHaveLength(3) // 2 food images + 1 fashion image
      
      // Check first photo
      expect(photos[0]).toMatchObject({
        src: expect.stringContaining('https://'),
        width: 800,
        height: 600,
        alt: 'Delicious food photo 1',
        title: 'Food Photography Session',
        category: 'Food'
      })
    })

    it('should handle empty portfolio items', () => {
      render(<Portfolio items={[]} />)

      expect(screen.getByText('No portfolio items available at the moment.')).toBeInTheDocument()
      expect(mockPhotoAlbum).not.toHaveBeenCalled()
    })
  })

  // Requirement 4.5: Add hover effects with subtle scaling animations
  describe('Hover Effects', () => {
    it('should apply hover effect classes to photo containers', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const photoAlbumCall = mockPhotoAlbum.mock.calls[0]
      const { renderPhoto } = photoAlbumCall[0]
      
      // Render a photo to check hover classes
      const mockPhoto = {
        src: 'test.jpg',
        alt: 'Test photo',
        title: 'Test Title',
        category: 'Food'
      }
      
      const { container } = render(
        renderPhoto({ photo: mockPhoto, imageProps: { src: mockPhoto.src, alt: mockPhoto.alt } })
      )

      const photoContainer = container.querySelector('.group')
      expect(photoContainer).toBeInTheDocument()
      expect(photoContainer).toHaveClass('hover:shadow-xl', 'transition-all', 'duration-300')
    })

    it('should apply scaling transform to images on hover', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const photoAlbumCall = mockPhotoAlbum.mock.calls[0]
      const { renderPhoto } = photoAlbumCall[0]
      
      const mockPhoto = {
        src: 'test.jpg',
        alt: 'Test photo',
        title: 'Test Title',
        category: 'Food'
      }
      
      const { container } = render(
        renderPhoto({ photo: mockPhoto, imageProps: { src: mockPhoto.src, alt: mockPhoto.alt } })
      )

      const image = container.querySelector('img')
      expect(image).toHaveClass('group-hover:scale-105', 'transition-transform', 'duration-300')
    })

    it('should show overlay with project info on hover', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const photoAlbumCall = mockPhotoAlbum.mock.calls[0]
      const { renderPhoto } = photoAlbumCall[0]
      
      const mockPhoto = {
        src: 'test.jpg',
        alt: 'Test photo',
        title: 'Test Project',
        category: 'Fashion'
      }
      
      const { container } = render(
        renderPhoto({ photo: mockPhoto, imageProps: { src: mockPhoto.src, alt: mockPhoto.alt } })
      )

      expect(container.textContent).toContain('Test Project')
      expect(container.textContent).toContain('Fashion')
      
      const overlay = container.querySelector('.group-hover\\:opacity-100')
      expect(overlay).toBeInTheDocument()
    })
  })

  // Requirement 4.6: Set up image lazy loading and performance optimization
  describe('Image Lazy Loading and Performance', () => {
    it('should use Next.js Image component with lazy loading', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const photoAlbumCall = mockPhotoAlbum.mock.calls[0]
      const { renderPhoto } = photoAlbumCall[0]
      
      const mockPhoto = {
        src: 'test.jpg',
        alt: 'Test photo',
        width: 800,
        height: 600,
        title: 'Test Title',
        category: 'Food'
      }
      
      const { container } = render(
        renderPhoto({ photo: mockPhoto, imageProps: { src: mockPhoto.src, alt: mockPhoto.alt, width: mockPhoto.width, height: mockPhoto.height } })
      )

      const image = container.querySelector('img')
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(image).toHaveAttribute('sizes', '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw')
    })

    it('should provide proper image dimensions for layout stability', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const photoAlbumCall = mockPhotoAlbum.mock.calls[0]
      const { photos } = photoAlbumCall[0]

      photos.forEach((photo: any) => {
        expect(photo.width).toBeGreaterThan(0)
        expect(photo.height).toBeGreaterThan(0)
        expect(typeof photo.width).toBe('number')
        expect(typeof photo.height).toBe('number')
      })
    })
  })

  describe('Category Filtering Functionality', () => {
    it('should render all category buttons', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const categories = ['All', 'Food', 'Fashion', 'Events', 'Corporate', 'Portrait']
      categories.forEach(category => {
        expect(screen.getByRole('tab', { name: category })).toBeInTheDocument()
      })
    })

    it('should filter items by selected category', async () => {
      render(<Portfolio items={mockPortfolioItems} />)

      // Initially should show all items (3 photos)
      expect(mockPhotoAlbum).toHaveBeenCalledWith(
        expect.objectContaining({
          photos: expect.arrayContaining([
            expect.objectContaining({ category: 'Food' }),
            expect.objectContaining({ category: 'Fashion' })
          ])
        }),
        expect.any(Object)
      )

      // Click on Food category
      const foodButton = screen.getByRole('tab', { name: 'Food' })
      fireEvent.click(foodButton)

      await waitFor(() => {
        const lastCall = mockPhotoAlbum.mock.calls[mockPhotoAlbum.mock.calls.length - 1]
        const { photos } = lastCall[0]
        
        // Should only show Food category photos (2 photos)
        expect(photos).toHaveLength(2)
        photos.forEach((photo: any) => {
          expect(photo.category).toBe('Food')
        })
      })
    })

    it('should highlight active category button', async () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const fashionButton = screen.getByRole('tab', { name: 'Fashion' })
      fireEvent.click(fashionButton)

      await waitFor(() => {
        expect(fashionButton).toHaveClass('bg-accentYellow')
      })
    })
  })

  describe('Lightbox Integration', () => {
    it('should open lightbox when photo is clicked', async () => {
      render(<Portfolio items={mockPortfolioItems} />)

      // Get the first photo and click it
      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)

      await waitFor(() => {
        expect(screen.getByTestId('lightbox')).toBeInTheDocument()
        expect(mockLightbox).toHaveBeenCalledWith(
          expect.objectContaining({
            open: true,
            index: 0,
            slides: expect.any(Array)
          }),
          expect.any(Object)
        )
      })
    })

    it('should handle keyboard navigation for lightbox', async () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const firstPhoto = screen.getByTestId('photo-0')
      
      // Test Enter key
      fireEvent.keyDown(firstPhoto, { key: 'Enter' })
      
      await waitFor(() => {
        expect(screen.getByTestId('lightbox')).toBeInTheDocument()
      })
    })

    it('should close lightbox when close button is clicked', async () => {
      render(<Portfolio items={mockPortfolioItems} />)

      // Open lightbox
      const firstPhoto = screen.getByTestId('photo-0')
      fireEvent.click(firstPhoto)

      await waitFor(() => {
        expect(screen.getByTestId('lightbox')).toBeInTheDocument()
      })

      // Close lightbox
      const closeButton = screen.getByTestId('lightbox-close')
      fireEvent.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByTestId('lightbox')).not.toBeInTheDocument()
      })
    })
  })

  describe('Loading and Error States', () => {
    it('should show skeleton cards while loading', () => {
      render(<Portfolio />)

      expect(screen.getAllByTestId('skeleton-card')).toHaveLength(6)
    })

    it('should show error state when fetch fails', async () => {
      const mockGetPortfolioItems = require('../../lib/sanity').getPortfolioItems
      mockGetPortfolioItems.mockRejectedValueOnce(new Error('Fetch failed'))

      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByText('Unable to Load Portfolio')).toBeInTheDocument()
        expect(screen.getByText('Failed to load portfolio items')).toBeInTheDocument()
        expect(screen.getByText('Try Again')).toBeInTheDocument()
      })
    })

    it('should retry fetching when try again button is clicked', async () => {
      const mockGetPortfolioItems = require('../../lib/sanity').getPortfolioItems
      mockGetPortfolioItems
        .mockRejectedValueOnce(new Error('Fetch failed'))
        .mockResolvedValueOnce(mockPortfolioItems)

      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByText('Try Again')).toBeInTheDocument()
      })

      const tryAgainButton = screen.getByText('Try Again')
      fireEvent.click(tryAgainButton)

      await waitFor(() => {
        expect(screen.getByText('Photography Portfolio')).toBeInTheDocument()
        expect(screen.queryByText('Unable to Load Portfolio')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      expect(screen.getByRole('region', { name: 'Photography Portfolio' })).toBeInTheDocument()
      expect(screen.getByRole('tablist', { name: 'Portfolio categories' })).toBeInTheDocument()
      
      const categoryButtons = screen.getAllByRole('tab')
      categoryButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-selected')
        expect(button).toHaveAttribute('aria-controls')
      })
    })

    it('should support keyboard navigation for photos', () => {
      render(<Portfolio items={mockPortfolioItems} />)

      const photoAlbumCall = mockPhotoAlbum.mock.calls[0]
      const { renderPhoto } = photoAlbumCall[0]
      
      const mockPhoto = {
        src: 'test.jpg',
        alt: 'Test photo',
        title: 'Test Title',
        category: 'Food'
      }
      
      const { container } = render(
        renderPhoto({ photo: mockPhoto, imageProps: { src: mockPhoto.src, alt: mockPhoto.alt } })
      )

      const photoButton = container.querySelector('[role="button"]')
      expect(photoButton).toHaveAttribute('tabIndex', '0')
      expect(photoButton).toHaveAttribute('aria-label', expect.stringContaining('View'))
    })
  })
})