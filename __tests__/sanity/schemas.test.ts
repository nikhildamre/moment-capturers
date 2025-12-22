/**
 * Unit tests for Sanity CMS schema validation
 * Tests that schema definitions include all required fields and proper validation
 */

import aboutSchema from '../../schemas/about'
import portfolioItemSchema from '../../schemas/portfolioItem'
import testimonialSchema from '../../schemas/testimonial'

describe('Sanity Schema Validation', () => {
  describe('About Schema', () => {
    it('should have correct schema name and type', () => {
      expect(aboutSchema.name).toBe('about')
      expect(aboutSchema.type).toBe('document')
      expect(aboutSchema.title).toBe('About Section')
    })

    it('should include all required fields', () => {
      const fieldNames = aboutSchema.fields.map((field: any) => field.name)
      
      expect(fieldNames).toContain('content')
      expect(fieldNames).toContain('profileImage')
      expect(fieldNames).toContain('skills')
      expect(fieldNames).toContain('experience')
    })

    it('should have proper field types', () => {
      const fields = aboutSchema.fields
      
      const contentField = fields.find((f: any) => f.name === 'content')
      expect(contentField?.type).toBe('text')
      
      const profileImageField = fields.find((f: any) => f.name === 'profileImage')
      expect(profileImageField?.type).toBe('image')
      
      const skillsField = fields.find((f: any) => f.name === 'skills')
      expect(skillsField?.type).toBe('array')
      
      const experienceField = fields.find((f: any) => f.name === 'experience')
      expect(experienceField?.type).toBe('number')
    })

    it('should have validation rules for content field', () => {
      const contentField = aboutSchema.fields.find((f: any) => f.name === 'content')
      expect(contentField?.validation).toBeDefined()
    })
  })

  describe('Portfolio Item Schema', () => {
    it('should have correct schema name and type', () => {
      expect(portfolioItemSchema.name).toBe('portfolioItem')
      expect(portfolioItemSchema.type).toBe('document')
      expect(portfolioItemSchema.title).toBe('Portfolio Item')
    })

    it('should include all required fields', () => {
      const fieldNames = portfolioItemSchema.fields.map((field: any) => field.name)
      
      expect(fieldNames).toContain('title')
      expect(fieldNames).toContain('slug')
      expect(fieldNames).toContain('category')
      expect(fieldNames).toContain('images')
      expect(fieldNames).toContain('description')
      expect(fieldNames).toContain('client')
      expect(fieldNames).toContain('date')
      expect(fieldNames).toContain('featured')
      expect(fieldNames).toContain('tags')
      expect(fieldNames).toContain('order')
    })

    it('should have proper field types', () => {
      const fields = portfolioItemSchema.fields
      
      const titleField = fields.find((f: any) => f.name === 'title')
      expect(titleField?.type).toBe('string')
      
      const slugField = fields.find((f: any) => f.name === 'slug')
      expect(slugField?.type).toBe('slug')
      
      const categoryField = fields.find((f: any) => f.name === 'category')
      expect(categoryField?.type).toBe('string')
      
      const imagesField = fields.find((f: any) => f.name === 'images')
      expect(imagesField?.type).toBe('array')
      
      const featuredField = fields.find((f: any) => f.name === 'featured')
      expect(featuredField?.type).toBe('boolean')
    })

    it('should have category options defined', () => {
      const categoryField = portfolioItemSchema.fields.find((f: any) => f.name === 'category')
      expect(categoryField?.options?.list).toBeDefined()
      
      const categoryValues = categoryField?.options?.list?.map((item: any) => item.value)
      expect(categoryValues).toContain('Food')
      expect(categoryValues).toContain('Fashion')
      expect(categoryValues).toContain('Events')
      expect(categoryValues).toContain('Corporate')
      expect(categoryValues).toContain('Portrait')
    })

    it('should have validation rules for required fields', () => {
      const titleField = portfolioItemSchema.fields.find((f: any) => f.name === 'title')
      expect(titleField?.validation).toBeDefined()
      
      const slugField = portfolioItemSchema.fields.find((f: any) => f.name === 'slug')
      expect(slugField?.validation).toBeDefined()
      
      const categoryField = portfolioItemSchema.fields.find((f: any) => f.name === 'category')
      expect(categoryField?.validation).toBeDefined()
      
      const imagesField = portfolioItemSchema.fields.find((f: any) => f.name === 'images')
      expect(imagesField?.validation).toBeDefined()
    })

    it('should have orderings defined', () => {
      expect(portfolioItemSchema.orderings).toBeDefined()
      expect(portfolioItemSchema.orderings.length).toBeGreaterThan(0)
      
      const orderingNames = portfolioItemSchema.orderings.map((o: any) => o.name)
      expect(orderingNames).toContain('orderAsc')
      expect(orderingNames).toContain('dateDesc')
      expect(orderingNames).toContain('categoryAsc')
    })
  })

  describe('Testimonial Schema', () => {
    it('should have correct schema name and type', () => {
      expect(testimonialSchema.name).toBe('testimonial')
      expect(testimonialSchema.type).toBe('document')
      expect(testimonialSchema.title).toBe('Testimonial')
    })

    it('should include all required fields', () => {
      const fieldNames = testimonialSchema.fields.map((field: any) => field.name)
      
      expect(fieldNames).toContain('author')
      expect(fieldNames).toContain('quote')
      expect(fieldNames).toContain('image')
      expect(fieldNames).toContain('company')
      expect(fieldNames).toContain('position')
      expect(fieldNames).toContain('projectType')
      expect(fieldNames).toContain('rating')
      expect(fieldNames).toContain('date')
      expect(fieldNames).toContain('featured')
      expect(fieldNames).toContain('order')
    })

    it('should have proper field types', () => {
      const fields = testimonialSchema.fields
      
      const authorField = fields.find((f: any) => f.name === 'author')
      expect(authorField?.type).toBe('string')
      
      const quoteField = fields.find((f: any) => f.name === 'quote')
      expect(quoteField?.type).toBe('text')
      
      const imageField = fields.find((f: any) => f.name === 'image')
      expect(imageField?.type).toBe('image')
      
      const ratingField = fields.find((f: any) => f.name === 'rating')
      expect(ratingField?.type).toBe('number')
      
      const featuredField = fields.find((f: any) => f.name === 'featured')
      expect(featuredField?.type).toBe('boolean')
    })

    it('should have rating options defined', () => {
      const ratingField = testimonialSchema.fields.find((f: any) => f.name === 'rating')
      expect(ratingField?.options?.list).toBeDefined()
      
      const ratingValues = ratingField?.options?.list?.map((item: any) => item.value)
      expect(ratingValues).toContain(1)
      expect(ratingValues).toContain(2)
      expect(ratingValues).toContain(3)
      expect(ratingValues).toContain(4)
      expect(ratingValues).toContain(5)
    })

    it('should have validation rules for required fields', () => {
      const authorField = testimonialSchema.fields.find((f: any) => f.name === 'author')
      expect(authorField?.validation).toBeDefined()
      
      const quoteField = testimonialSchema.fields.find((f: any) => f.name === 'quote')
      expect(quoteField?.validation).toBeDefined()
      
      const ratingField = testimonialSchema.fields.find((f: any) => f.name === 'rating')
      expect(ratingField?.validation).toBeDefined()
    })

    it('should have orderings defined', () => {
      expect(testimonialSchema.orderings).toBeDefined()
      expect(testimonialSchema.orderings.length).toBeGreaterThan(0)
      
      const orderingNames = testimonialSchema.orderings.map((o: any) => o.name)
      expect(orderingNames).toContain('orderAsc')
      expect(orderingNames).toContain('dateDesc')
      expect(orderingNames).toContain('ratingDesc')
    })
  })
})