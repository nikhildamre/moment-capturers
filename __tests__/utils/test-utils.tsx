import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock data generators for testing
export const mockPortfolioItem = {
  _id: 'test-1',
  title: 'Test Portfolio Item',
  slug: 'test-portfolio-item',
  category: 'Food' as const,
  images: [
    {
      asset: {
        url: 'https://example.com/test-image.jpg',
        metadata: {
          dimensions: { width: 800, height: 600 }
        }
      },
      alt: 'Test image'
    }
  ],
  description: 'Test description'
}

export const mockTestimonial = {
  _id: 'test-testimonial-1',
  author: 'Test Author',
  quote: 'This is a test testimonial quote.',
  image: {
    asset: { url: 'https://example.com/test-avatar.jpg' },
    alt: 'Test Author'
  },
  order: 1
}

// Property-based testing utilities
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const generateRandomEmail = (): string => {
  const username = generateRandomString(8)
  const domain = generateRandomString(6)
  return `${username}@${domain}.com`
}