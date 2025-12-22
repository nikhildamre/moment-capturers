/**
 * Unit tests for Sanity data validation and type checking
 */

import { sampleAbout, samplePortfolioItems, sampleTestimonials } from '../../sanity/sample-data'

describe('Sanity Data Validation', () => {
  describe('About Data Structure', () => {
    it('should have valid about data structure', () => {
      expect(sampleAbout._type).toBe('about')
      expect(sampleAbout.content).toBeDefined()
      expect(typeof sampleAbout.content).toBe('string')
      expect(sampleAbout.content.length).toBeGreaterThan(50)
    })

    it('should have valid skills array', () => {
      expect(Array.isArray(sampleAbout.skills)).toBe(true)
      expect(sampleAbout.skills.length).toBeGreaterThan(0)
      
      sampleAbout.skills.forEach(skill => {
        expect(typeof skill).toBe('string')
        expect(skill.length).toBeGreaterThan(0)
      })
    })

    it('should have valid experience number', () => {
      expect(typeof sampleAbout.experience).toBe('number')
      expect(sampleAbout.experience).toBeGreaterThan(0)
      expect(sampleAbout.experience).toBeLessThan(100)
    })
  })

  describe('Portfolio Items Data Structure', () => {
    it('should have valid portfolio items array', () => {
      expect(Array.isArray(samplePortfolioItems)).toBe(true)
      expect(samplePortfolioItems.length).toBeGreaterThan(0)
    })

    it('should have valid portfolio item structure', () => {
      samplePortfolioItems.forEach(item => {
        expect(item._type).toBe('portfolioItem')
        expect(typeof item.title).toBe('string')
        expect(item.title.length).toBeGreaterThan(0)
        
        expect(item.slug).toBeDefined()
        expect(typeof item.slug.current).toBe('string')
        
        expect(typeof item.category).toBe('string')
        expect(['Food', 'Fashion', 'Events', 'Corporate', 'Portrait']).toContain(item.category)
        
        expect(typeof item.featured).toBe('boolean')
        expect(typeof item.order).toBe('number')
      })
    })

    it('should have valid dates in ISO format', () => {
      samplePortfolioItems.forEach(item => {
        if (item.date) {
          expect(typeof item.date).toBe('string')
          expect(new Date(item.date).toString()).not.toBe('Invalid Date')
        }
      })
    })

    it('should have valid tags arrays', () => {
      samplePortfolioItems.forEach(item => {
        if (item.tags) {
          expect(Array.isArray(item.tags)).toBe(true)
          item.tags.forEach(tag => {
            expect(typeof tag).toBe('string')
            expect(tag.length).toBeGreaterThan(0)
          })
        }
      })
    })
  })

  describe('Testimonials Data Structure', () => {
    it('should have valid testimonials array', () => {
      expect(Array.isArray(sampleTestimonials)).toBe(true)
      expect(sampleTestimonials.length).toBeGreaterThan(0)
    })

    it('should have valid testimonial structure', () => {
      sampleTestimonials.forEach(testimonial => {
        expect(testimonial._type).toBe('testimonial')
        expect(typeof testimonial.author).toBe('string')
        expect(testimonial.author.length).toBeGreaterThan(0)
        
        expect(typeof testimonial.quote).toBe('string')
        expect(testimonial.quote.length).toBeGreaterThan(10)
        
        expect(typeof testimonial.rating).toBe('number')
        expect(testimonial.rating).toBeGreaterThanOrEqual(1)
        expect(testimonial.rating).toBeLessThanOrEqual(5)
        
        expect(typeof testimonial.featured).toBe('boolean')
        expect(typeof testimonial.order).toBe('number')
      })
    })

    it('should have valid project types', () => {
      const validProjectTypes = ['Food', 'Fashion', 'Events', 'Corporate', 'Portrait', 'General']
      
      sampleTestimonials.forEach(testimonial => {
        if (testimonial.projectType) {
          expect(validProjectTypes).toContain(testimonial.projectType)
        }
      })
    })

    it('should have valid dates in ISO format', () => {
      sampleTestimonials.forEach(testimonial => {
        if (testimonial.date) {
          expect(typeof testimonial.date).toBe('string')
          expect(new Date(testimonial.date).toString()).not.toBe('Invalid Date')
        }
      })
    })
  })

  describe('Data Consistency', () => {
    it('should have consistent category values across portfolio and testimonials', () => {
      const portfolioCategories = [...new Set(samplePortfolioItems.map(item => item.category))]
      const testimonialProjectTypes = [...new Set(sampleTestimonials
        .map(t => t.projectType)
        .filter(Boolean)
        .filter(type => type !== 'General')
      )]
      
      testimonialProjectTypes.forEach(type => {
        expect(portfolioCategories).toContain(type)
      })
    })

    it('should have unique IDs across all items', () => {
      const allIds = [
        ...samplePortfolioItems.map(item => item.title),
        ...sampleTestimonials.map(item => item.author)
      ]
      
      const uniqueIds = [...new Set(allIds)]
      expect(uniqueIds.length).toBe(allIds.length)
    })

    it('should have proper order values', () => {
      samplePortfolioItems.forEach(item => {
        expect(item.order).toBeGreaterThanOrEqual(0)
      })
      
      sampleTestimonials.forEach(testimonial => {
        expect(testimonial.order).toBeGreaterThanOrEqual(0)
      })
    })
  })
})