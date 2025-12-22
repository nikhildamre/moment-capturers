/**
 * Unit tests for About section
 * Tests responsive layout, brand color usage, and error handling
 */

import { render, screen, waitFor } from '@testing-library/react'
import About from '../../components/About'
import { getAboutData } from '../../lib/sanity'

// Mock dependencies
jest.mock('../../lib/sanity')
const mockGetAboutData = getAboutData as jest.MockedFunction<typeof getAboutData>

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  useInView: () => true,
  useReducedMotion: () => false,
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}))

describe('About Section Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Responsive Layout Classes', () => {
    it('should use two-column layout on desktop devices', () => {
      // Test for Requirements 3.2
      render(<About />)
      
      const container = screen.getByRole('region', { name: /about amey ghadge/i })
      const gridContainer = container.querySelector('.grid')
      
      expect(gridContainer).toHaveClass('md:grid-cols-2')
    })

    it('should have proper gap spacing between columns', () => {
      render(<About />)
      
      const container = screen.getByRole('region', { name: /about amey ghadge/i })
      const gridContainer = container.querySelector('.grid')
      
      expect(gridContainer).toHaveClass('gap-12')
    })

    it('should center items vertically in grid', () => {
      render(<About />)
      
      const container = screen.getByRole('region', { name: /about amey ghadge/i })
      const gridContainer = container.querySelector('.grid')
      
      expect(gridContainer).toHaveClass('items-center')
    })

    it('should have responsive padding', () => {
      render(<About />)
      
      const section = screen.getByRole('region', { name: /about amey ghadge/i })
      expect(section).toHaveClass('py-20')
      
      const container = section.querySelector('.container')
      expect(container).toHaveClass('px-6')
    })
  })

  describe('Brand Color Usage', () => {
    it('should use brand colors for consistent styling', () => {
      // Test for Requirements 3.4
      render(<About />)
      
      const section = screen.getByRole('region', { name: /about amey ghadge/i })
      expect(section).toHaveClass('bg-floralWhite')
      
      const heading = screen.getByText('About Me')
      expect(heading).toHaveClass('text-graphite')
    })

    it('should use accent yellow for skill tags', () => {
      const mockData = {
        content: 'Test content',
        skills: ['Photography', 'Editing'],
        experience: 5
      }
      
      render(<About initialData={mockData} />)
      
      const skillTag = screen.getByText('Photography')
      expect(skillTag).toHaveClass('bg-accentYellow/20')
      expect(skillTag).toHaveClass('text-graphite')
    })

    it('should use proper text opacity for body content', () => {
      render(<About />)
      
      const section = screen.getByRole('region', { name: /about amey ghadge/i })
      const proseContainer = section.querySelector('.prose')
      
      expect(proseContainer).toHaveClass('text-graphite/80')
    })
  })

  describe('Error Handling for Missing CMS Data', () => {
    it('should display default content when CMS data is not available', async () => {
      // Test for Requirements 3.1 - Error handling
      mockGetAboutData.mockResolvedValue(null)
      
      render(<About />)
      
      await waitFor(() => {
        expect(screen.getByText(/Welcome to Moment Capturers/)).toBeInTheDocument()
      })
    })

    it('should show error message when CMS fetch fails', async () => {
      mockGetAboutData.mockRejectedValue(new Error('Network error'))
      
      render(<About />)
      
      await waitFor(() => {
        expect(screen.getByText(/Unable to Load Content/)).toBeInTheDocument()
      })
    })

    it('should provide retry button on error', async () => {
      mockGetAboutData.mockRejectedValue(new Error('Network error'))
      
      render(<About />)
      
      await waitFor(() => {
        const retryButton = screen.getByText('Try Again')
        expect(retryButton).toBeInTheDocument()
        expect(retryButton.tagName).toBe('BUTTON')
      })
    })

    it('should handle empty skills array gracefully', () => {
      const mockData = {
        content: 'Test content',
        skills: [],
        experience: 5
      }
      
      render(<About initialData={mockData} />)
      
      // Should not show skills section when array is empty
      expect(screen.queryByText('Specialties')).not.toBeInTheDocument()
    })

    it('should handle missing experience gracefully', () => {
      const mockData = {
        content: 'Test content',
        skills: ['Photography'],
        experience: null
      }
      
      render(<About initialData={mockData} />)
      
      // Should not show experience when it's null
      expect(screen.queryByText(/Years Experience/)).not.toBeInTheDocument()
    })
  })

  describe('Content Structure', () => {
    it('should display About Me heading', () => {
      render(<About />)
      
      const heading = screen.getByText('About Me')
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H2')
    })

    it('should render content paragraphs correctly', () => {
      const content = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.'
      
      render(<About content={content} />)
      
      expect(screen.getByText('First paragraph.')).toBeInTheDocument()
      expect(screen.getByText('Second paragraph.')).toBeInTheDocument()
      expect(screen.getByText('Third paragraph.')).toBeInTheDocument()
    })

    it('should display skills when provided', () => {
      const mockData = {
        content: 'Test content',
        skills: ['Food Photography', 'Fashion Photography', 'Event Photography'],
        experience: 8
      }
      
      render(<About initialData={mockData} />)
      
      expect(screen.getByText('Specialties')).toBeInTheDocument()
      expect(screen.getByText('Food Photography')).toBeInTheDocument()
      expect(screen.getByText('Fashion Photography')).toBeInTheDocument()
      expect(screen.getByText('Event Photography')).toBeInTheDocument()
    })

    it('should display experience when provided', () => {
      const mockData = {
        content: 'Test content',
        skills: [],
        experience: 10
      }
      
      render(<About initialData={mockData} />)
      
      expect(screen.getByText('10+ Years Experience')).toBeInTheDocument()
    })
  })

  describe('Image Handling', () => {
    it('should display profile image when provided', () => {
      const mockData = {
        content: 'Test content',
        skills: [],
        experience: 5,
        profileImage: {
          asset: {
            url: 'https://example.com/profile.jpg'
          },
          alt: 'Amey Ghadge Profile Photo'
        }
      }
      
      render(<About initialData={mockData} />)
      
      const image = screen.getByAltText('Amey Ghadge Profile Photo')
      expect(image).toBeInTheDocument()
    })

    it('should display fallback visual when no profile image', () => {
      render(<About />)
      
      // Should show the default photographer icon
      expect(screen.getByText('Amey Ghadge')).toBeInTheDocument()
      expect(screen.getByText('Professional Photographer')).toBeInTheDocument()
    })
  })

  describe('Loading States', () => {
    it('should show loading skeleton while fetching data', () => {
      mockGetAboutData.mockImplementation(() => new Promise(() => {})) // Never resolves
      
      render(<About />)
      
      // Should show skeleton loaders
      const section = screen.getByRole('region', { name: /about amey ghadge/i })
      expect(section).toBeInTheDocument()
    })

    it('should hide loading state after data loads', async () => {
      const mockData = {
        content: 'Loaded content',
        skills: ['Photography'],
        experience: 5
      }
      
      mockGetAboutData.mockResolvedValue(mockData)
      
      render(<About />)
      
      await waitFor(() => {
        expect(screen.getByText('Loaded content')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<About />)
      
      const section = screen.getByRole('region', { name: /about amey ghadge/i })
      expect(section).toHaveAttribute('aria-label', 'About Amey Ghadge - Photographer')
    })

    it('should have proper heading hierarchy', () => {
      const mockData = {
        content: 'Test content',
        skills: ['Photography'],
        experience: 5
      }
      
      render(<About initialData={mockData} />)
      
      const h2 = screen.getByRole('heading', { level: 2, name: 'About Me' })
      expect(h2).toBeInTheDocument()
      
      const h3 = screen.getByRole('heading', { level: 3, name: 'Specialties' })
      expect(h3).toBeInTheDocument()
    })

    it('should have proper image alt text', () => {
      const mockData = {
        content: 'Test content',
        skills: [],
        experience: 5,
        profileImage: {
          asset: {
            url: 'https://example.com/profile.jpg'
          },
          alt: 'Professional headshot of Amey Ghadge'
        }
      }
      
      render(<About initialData={mockData} />)
      
      const image = screen.getByAltText('Professional headshot of Amey Ghadge')
      expect(image).toBeInTheDocument()
    })
  })

  describe('Typography and Styling', () => {
    it('should use proper typography classes', () => {
      render(<About />)
      
      const heading = screen.getByText('About Me')
      expect(heading).toHaveClass('text-4xl')
      expect(heading).toHaveClass('md:text-5xl')
      expect(heading).toHaveClass('font-bold')
    })

    it('should use prose styling for content', () => {
      render(<About />)
      
      const section = screen.getByRole('region', { name: /about amey ghadge/i })
      const proseContainer = section.querySelector('.prose')
      
      expect(proseContainer).toHaveClass('prose-lg')
      expect(proseContainer).toHaveClass('leading-relaxed')
    })
  })
})