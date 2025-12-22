/**
 * Sample data for Moment Capturers Portfolio
 * This file contains sample content that can be imported into Sanity
 */

export const sampleAbout = {
  _type: 'about',
  content: `Welcome to Moment Capturers, where every frame tells a story. I'm Amey Ghadge, a passionate photographer dedicated to capturing the essence of life's most precious moments.

With years of experience in food, fashion, events, corporate, and portrait photography, I bring a unique perspective to every shoot. My approach combines technical expertise with creative vision to deliver images that not only meet but exceed expectations.

Whether you're looking to showcase your culinary creations, capture the elegance of fashion, document special events, create professional corporate imagery, or preserve personal memories through portraits, I'm here to bring your vision to life.

My work is driven by a commitment to excellence and a deep understanding of how powerful imagery can transform brands, tell stories, and create lasting memories. Every project is an opportunity to create something extraordinary.`,
  skills: [
    'Food Photography',
    'Fashion Photography', 
    'Event Photography',
    'Corporate Photography',
    'Portrait Photography',
    'Product Photography',
    'Lifestyle Photography',
    'Commercial Photography'
  ],
  experience: 8
}

export const samplePortfolioItems = [
  {
    _type: 'portfolioItem',
    title: 'Gourmet Restaurant Collection',
    slug: { current: 'gourmet-restaurant-collection' },
    category: 'Food',
    description: 'A comprehensive food photography project for a high-end restaurant, showcasing their signature dishes with artistic flair and attention to detail.',
    client: 'The Golden Spoon Restaurant',
    date: '2024-01-15',
    featured: true,
    tags: ['fine dining', 'restaurant', 'culinary arts', 'commercial'],
    order: 1
  },
  {
    _type: 'portfolioItem',
    title: 'Spring Fashion Editorial',
    slug: { current: 'spring-fashion-editorial' },
    category: 'Fashion',
    description: 'Contemporary fashion shoot featuring spring collection with natural lighting and urban backdrops.',
    client: 'Vogue Style Magazine',
    date: '2024-02-20',
    featured: true,
    tags: ['editorial', 'fashion', 'spring collection', 'urban'],
    order: 2
  },
  {
    _type: 'portfolioItem',
    title: 'Corporate Leadership Portraits',
    slug: { current: 'corporate-leadership-portraits' },
    category: 'Corporate',
    description: 'Professional headshots and team photography for a Fortune 500 company\'s annual report and website.',
    client: 'TechCorp Industries',
    date: '2024-03-10',
    featured: false,
    tags: ['corporate', 'headshots', 'professional', 'business'],
    order: 3
  },
  {
    _type: 'portfolioItem',
    title: 'Wedding Celebration',
    slug: { current: 'wedding-celebration' },
    category: 'Events',
    description: 'Capturing the joy and emotion of a beautiful wedding celebration with candid moments and artistic compositions.',
    client: 'Sarah & Michael Johnson',
    date: '2024-04-05',
    featured: true,
    tags: ['wedding', 'celebration', 'candid', 'emotion'],
    order: 4
  },
  {
    _type: 'portfolioItem',
    title: 'Artist Portrait Series',
    slug: { current: 'artist-portrait-series' },
    category: 'Portrait',
    description: 'Intimate portrait session capturing the personality and creative spirit of local artists in their studios.',
    client: 'Local Arts Council',
    date: '2024-05-12',
    featured: false,
    tags: ['portrait', 'artist', 'creative', 'studio'],
    order: 5
  }
]

export const sampleTestimonials = [
  {
    _type: 'testimonial',
    author: 'Sarah Johnson',
    quote: 'Amey captured our wedding day perfectly. Every moment was beautifully preserved, and the attention to detail was incredible. We couldn\'t be happier with the results!',
    company: 'Private Client',
    position: 'Bride',
    projectType: 'Events',
    rating: 5,
    date: '2024-04-10',
    featured: true,
    order: 1
  },
  {
    _type: 'testimonial',
    author: 'Michael Chen',
    quote: 'The corporate headshots Amey took for our team were outstanding. Professional, creative, and delivered exactly what we needed for our company rebrand.',
    company: 'TechCorp Industries',
    position: 'CEO',
    projectType: 'Corporate',
    rating: 5,
    date: '2024-03-15',
    featured: true,
    order: 2
  },
  {
    _type: 'testimonial',
    author: 'Emma Rodriguez',
    quote: 'Amazing food photography! Amey made our restaurant\'s dishes look absolutely stunning. The photos have significantly improved our social media engagement.',
    company: 'The Golden Spoon Restaurant',
    position: 'Marketing Director',
    projectType: 'Food',
    rating: 5,
    date: '2024-01-20',
    featured: true,
    order: 3
  },
  {
    _type: 'testimonial',
    author: 'David Kim',
    quote: 'Working with Amey on our fashion editorial was a dream. The creative vision and technical skill resulted in images that exceeded our expectations.',
    company: 'Vogue Style Magazine',
    position: 'Creative Director',
    projectType: 'Fashion',
    rating: 5,
    date: '2024-02-25',
    featured: false,
    order: 4
  },
  {
    _type: 'testimonial',
    author: 'Lisa Thompson',
    quote: 'The portrait session was comfortable and fun. Amey has a gift for bringing out the best in people and creating images that truly capture personality.',
    company: 'Local Arts Council',
    position: 'Program Coordinator',
    projectType: 'Portrait',
    rating: 5,
    date: '2024-05-18',
    featured: false,
    order: 5
  }
]