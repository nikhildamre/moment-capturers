import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries for fetching data
export const queries = {
  // Get about section content
  about: `*[_type == "about"][0]{
    content,
    profileImage{
      asset->{
        _id,
        url
      },
      alt
    },
    skills,
    experience
  }`,

  // Get all portfolio items
  portfolioItems: `*[_type == "portfolioItem"] | order(order asc, date desc){
    _id,
    title,
    slug,
    category,
    images[]{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt,
      caption
    },
    description,
    client,
    date,
    featured,
    tags,
    order
  }`,

  // Get portfolio items by category
  portfolioByCategory: (category: string) => `*[_type == "portfolioItem" && category == "${category}"] | order(order asc, date desc){
    _id,
    title,
    slug,
    category,
    images[]{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt,
      caption
    },
    description,
    client,
    date,
    featured,
    tags,
    order
  }`,

  // Get featured portfolio items
  featuredPortfolio: `*[_type == "portfolioItem" && featured == true] | order(order asc, date desc){
    _id,
    title,
    slug,
    category,
    images[]{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt,
      caption
    },
    description,
    client,
    date,
    featured,
    tags,
    order
  }`,

  // Get all testimonials
  testimonials: `*[_type == "testimonial"] | order(order asc, date desc){
    _id,
    author,
    quote,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    company,
    position,
    projectType,
    rating,
    date,
    featured,
    order
  }`,

  // Get featured testimonials
  featuredTestimonials: `*[_type == "testimonial" && featured == true] | order(order asc, date desc){
    _id,
    author,
    quote,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    company,
    position,
    projectType,
    rating,
    date,
    featured,
    order
  }`,
}

// Data fetching functions
export async function getAboutData() {
  try {
    return await client.fetch(queries.about)
  } catch (error) {
    console.error('Error fetching about data:', error)
    return null
  }
}

export async function getPortfolioItems() {
  try {
    return await client.fetch(queries.portfolioItems)
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return []
  }
}

export async function getPortfolioByCategory(category: string) {
  try {
    return await client.fetch(queries.portfolioByCategory(category))
  } catch (error) {
    console.error(`Error fetching portfolio items for category ${category}:`, error)
    return []
  }
}

export async function getFeaturedPortfolio() {
  try {
    return await client.fetch(queries.featuredPortfolio)
  } catch (error) {
    console.error('Error fetching featured portfolio items:', error)
    return []
  }
}

export async function getTestimonials() {
  try {
    return await client.fetch(queries.testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getFeaturedTestimonials() {
  try {
    return await client.fetch(queries.featuredTestimonials)
  } catch (error) {
    console.error('Error fetching featured testimonials:', error)
    return []
  }
}

// Type definitions for Sanity data
export interface SanityImage {
  asset: {
    _id: string
    url: string
    metadata?: {
      dimensions: {
        width: number
        height: number
      }
    }
  }
  alt: string
  caption?: string
}

export interface AboutData {
  content: string
  profileImage?: SanityImage
  skills?: string[]
  experience?: number
}

export interface PortfolioItem {
  _id: string
  title: string
  slug: { current: string }
  category: 'Food' | 'Fashion' | 'Events' | 'Corporate' | 'Portrait'
  images: SanityImage[]
  description?: string
  client?: string
  date?: string
  featured: boolean
  tags?: string[]
  order: number
}

export interface Testimonial {
  _id: string
  author: string
  quote: string
  image?: SanityImage
  company?: string
  position?: string
  projectType?: string
  rating: number
  date?: string
  featured: boolean
  order: number
}