/**
 * Unit tests for Sanity client configuration and data fetching functions
 */

import { client, queries } from '../../lib/sanity'

// Mock the Sanity client
jest.mock('@sanity/client', () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(),
  })),
}))

jest.mock('@sanity/image-url', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    image: jest.fn(() => ({
      url: jest.fn(() => 'https://example.com/image.jpg'),
    })),
  })),
}))

describe('Sanity Client Configuration', () => {
  it('should have client instance defined', () => {
    expect(client).toBeDefined()
  })

  it('should have all required queries defined', () => {
    expect(queries.about).toBeDefined()
    expect(queries.portfolioItems).toBeDefined()
    expect(queries.portfolioByCategory).toBeDefined()
    expect(queries.featuredPortfolio).toBeDefined()
    expect(queries.testimonials).toBeDefined()
    expect(queries.featuredTestimonials).toBeDefined()
  })

  describe('GROQ Queries', () => {
    it('should have valid about query structure', () => {
      expect(queries.about).toContain('*[_type == "about"]')
      expect(queries.about).toContain('content')
      expect(queries.about).toContain('profileImage')
      expect(queries.about).toContain('skills')
      expect(queries.about).toContain('experience')
    })

    it('should have valid portfolio items query structure', () => {
      expect(queries.portfolioItems).toContain('*[_type == "portfolioItem"]')
      expect(queries.portfolioItems).toContain('order(order asc, date desc)')
      expect(queries.portfolioItems).toContain('title')
      expect(queries.portfolioItems).toContain('category')
      expect(queries.portfolioItems).toContain('images')
    })

    it('should have valid testimonials query structure', () => {
      expect(queries.testimonials).toContain('*[_type == "testimonial"]')
      expect(queries.testimonials).toContain('order(order asc, date desc)')
      expect(queries.testimonials).toContain('author')
      expect(queries.testimonials).toContain('quote')
      expect(queries.testimonials).toContain('rating')
    })

    it('should generate category-specific query correctly', () => {
      const categoryQuery = queries.portfolioByCategory('Food')
      expect(categoryQuery).toContain('*[_type == "portfolioItem" && category == "Food"]')
      expect(categoryQuery).toContain('order(order asc, date desc)')
    })

    it('should have featured items queries', () => {
      expect(queries.featuredPortfolio).toContain('featured == true')
      expect(queries.featuredTestimonials).toContain('featured == true')
    })
  })

  describe('Query Field Coverage', () => {
    it('should include all portfolio item fields', () => {
      const query = queries.portfolioItems
      const requiredFields = [
        '_id', 'title', 'slug', 'category', 'images', 
        'description', 'client', 'date', 'featured', 'tags', 'order'
      ]
      
      requiredFields.forEach(field => {
        expect(query).toContain(field)
      })
    })

    it('should include image metadata in portfolio queries', () => {
      const query = queries.portfolioItems
      expect(query).toContain('metadata{')
      expect(query).toContain('dimensions{')
      expect(query).toContain('width')
      expect(query).toContain('height')
    })

    it('should include all testimonial fields', () => {
      const query = queries.testimonials
      const requiredFields = [
        '_id', 'author', 'quote', 'image', 'company', 
        'position', 'projectType', 'rating', 'date', 'featured', 'order'
      ]
      
      requiredFields.forEach(field => {
        expect(query).toContain(field)
      })
    })
  })
})