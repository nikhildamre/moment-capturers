# Implementation Plan: Moment Capturers Portfolio

## Overview

This implementation plan breaks down the Moment Capturers portfolio website into discrete coding tasks. Each task builds incrementally on previous work, starting with project setup and core infrastructure, then implementing individual components, and finally integrating everything together. The plan includes both implementation tasks and testing tasks to ensure correctness and reliability.

## Tasks

- [ ] 1. Project Setup and Configuration
  - Create Next.js 14 project with App Router
  - Configure Tailwind CSS with custom brand colors
  - Set up TypeScript configuration
  - Install and configure required dependencies (Framer Motion, Headless UI, React Photo Album, YARL, Sanity client, NodeMailer)
  - Configure next.config.js for image optimization and Sanity CDN
  - Set up environment variables structure
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

- [x] 1.1 Set up testing framework
  - Configure Jest with React Testing Library
  - Install and configure @fast-check/jest for property-based testing
  - Set up test environment and utilities
  - _Requirements: Testing Strategy_

- [x] 2. Sanity CMS Setup and Schema Definition
  - Initialize Sanity project and studio
  - Create About document schema with biography text field
  - Create Portfolio Item schema with title, slug, category, images, and description
  - Create Testimonial schema with author, quote, optional image, and order
  - Configure Sanity client for data fetching
  - Set up development and production environments
  - _Requirements: 7.1, 7.2, 7.3, 11.3_

- [x] 2.1 Write unit tests for CMS schema validation
  - Test that schema definitions include all required fields
  - Test data type validation for each schema
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 3. Core Layout and Root Configuration
  - Create app/layout.js with metadata configuration
  - Set up global CSS with Tailwind imports
  - Configure SEO meta tags, Open Graph data, and favicon
  - Implement root HTML structure with proper accessibility attributes
  - Set up font loading and typography system
  - _Requirements: 8.1, 8.3, 11.1, 11.2_

- [x] 3.1 Write property test for SEO meta tags
  - **Property 11: SEO Meta Tags**
  - **Validates: Requirements 8.3**

- [x] 3.2 Write unit tests for layout configuration
  - Test meta tag presence and content
  - Test font loading configuration
  - Test accessibility attributes
  - _Requirements: 8.3_

- [x] 4. Landing Section Implementation
  - Create Landing component with full viewport height
  - Implement brand name "Moment Capturers" display
  - Add photographer name "Amey Ghadge" with proper typography
  - Apply graphite background with contrasting text colors
  - Implement Framer Motion animations for logo and title elements
  - Add responsive design for mobile and desktop
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4.1 Write unit tests for Landing section
  - Test brand name and photographer name display
  - Test viewport height styling
  - Test background and text color classes
  - Test animation setup
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 5. About Section Implementation
  - Create About component with two-column desktop layout
  - Implement CMS data integration for biography content
  - Add responsive single-column layout for mobile
  - Implement scroll-triggered fade-in animation
  - Apply brand colors for consistent styling
  - Handle loading states and error cases for CMS data
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 5.1 Write property test for CMS data integration
  - **Property 2: CMS Data Integration**
  - **Validates: Requirements 3.1, 4.4, 5.1, 5.5, 7.4**

- [x] 5.2 Write property test for scroll animation setup
  - **Property 14: Scroll Animation Setup**
  - **Validates: Requirements 10.1**

- [x] 5.3 Write unit tests for About section
  - Test responsive layout classes
  - Test brand color usage
  - Test error handling for missing CMS data
  - _Requirements: 3.2, 3.3, 3.4_

- [x] 6. Portfolio Gallery Implementation
  - Create Portfolio component with category organization
  - Implement React Photo Album masonry grid layout
  - Integrate with Sanity CMS for portfolio item data
  - Add category filtering/navigation (Food, Fashion, Events, Corporate, Portrait)
  - Implement Next.js Image optimization for all portfolio images
  - Add hover effects with subtle scaling animations
  - Set up image lazy loading and performance optimization
  - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.6_

- [x] 6.1 Write property test for portfolio category organization
  - **Property 3: Portfolio Category Organization**
  - **Validates: Requirements 4.1**

- [x] 6.2 Write property test for image optimization
  - **Property 12: Image Optimization**
  - **Validates: Requirements 8.5**

- [x] 6.3 Write unit tests for portfolio gallery
  - Test masonry grid component rendering
  - Test Next.js Image component usage
  - Test hover effect classes
  - Test category filtering functionality
  - _Requirements: 4.2, 4.5, 4.6_

- [x] 7. Lightbox Integration
  - Integrate Yet Another React Lightbox (YARL)
  - Implement click handlers for portfolio images
  - Configure lightbox with proper navigation and controls
  - Add keyboard navigation support
  - Ensure accessibility compliance for lightbox
  - Handle image loading states and errors
  - _Requirements: 4.3, 11.7_

- [x] 7.1 Write property test for image click interaction
  - **Property 4: Image Click Interaction**
  - **Validates: Requirements 4.3**

- [x] 7.2 Write unit tests for lightbox integration
  - Test lightbox component integration
  - Test keyboard navigation
  - Test accessibility attributes
  - _Requirements: 4.3_

- [ ] 8. Testimonials Carousel Implementation
  - Create Testimonials component with auto-rotation
  - Implement CMS integration for testimonial data
  - Add 5-second auto-rotation timer with pause on hover
  - Implement smooth transitions with Framer Motion AnimatePresence
  - Handle optional client photos gracefully
  - Add manual navigation controls
  - Implement responsive design for mobile and desktop
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 8.1 Write property test for testimonial carousel timing
  - **Property 5: Testimonial Carousel Timing**
  - **Validates: Requirements 5.2**

- [ ] 8.2 Write property test for testimonial data rendering
  - **Property 6: Testimonial Data Rendering**
  - **Validates: Requirements 5.3**

- [ ] 8.3 Write unit tests for testimonials carousel
  - Test animation transitions
  - Test manual navigation controls
  - Test responsive design classes
  - _Requirements: 5.4_

- [ ] 9. Contact System Implementation
  - Create ContactButton component with fixed bottom-right positioning
  - Create ContactModal component using Headless UI Dialog
  - Implement form with name, email, and message fields
  - Add form validation for required fields and email format
  - Implement modal accessibility with focus management
  - Add backdrop click and escape key dismissal
  - Style with brand colors and responsive design
  - _Requirements: 6.1, 6.2, 6.3, 6.7_

- [ ] 9.1 Write property test for contact modal interaction
  - **Property 7: Contact Modal Interaction**
  - **Validates: Requirements 6.2**

- [ ] 9.2 Write property test for modal dismissal
  - **Property 10: Modal Dismissal**
  - **Validates: Requirements 6.7**

- [ ] 9.3 Write unit tests for contact system
  - Test contact button positioning
  - Test form field presence
  - Test accessibility attributes
  - _Requirements: 6.1, 6.3_

- [ ] 10. Contact API Route Implementation
  - Create app/api/contact/route.js API endpoint
  - Implement form validation on server side
  - Set up NodeMailer with SMTP configuration
  - Add email sending functionality to momentcapturers04@gmail.com
  - Implement proper error handling and status codes
  - Add request rate limiting and security measures
  - Configure environment variables for email credentials
  - _Requirements: 6.4, 6.5, 11.8, 12.2, 12.4_

- [ ] 10.1 Write property test for form validation
  - **Property 8: Form Validation**
  - **Validates: Requirements 6.4**

- [ ] 10.2 Write property test for email sending
  - **Property 9: Email Sending**
  - **Validates: Requirements 6.5, 6.6**

- [ ] 10.3 Write property test for environment variable usage
  - **Property 17: Environment Variable Usage**
  - **Validates: Requirements 12.2**

- [ ] 10.4 Write property test for API error handling
  - **Property 18: API Error Handling**
  - **Validates: Requirements 12.4**

- [ ] 10.5 Write unit tests for contact API
  - Test email validation logic
  - Test error response formats
  - Test rate limiting functionality
  - _Requirements: 6.4, 12.4_

- [ ] 11. Main Page Integration and Layout
  - Create app/page.js as single-page application entry point
  - Integrate all components (Landing, About, Portfolio, Testimonials)
  - Implement smooth scrolling between sections
  - Add scroll-triggered animations for section reveals
  - Ensure proper component ordering and spacing
  - Test responsive behavior across all sections
  - _Requirements: 1.1, 1.2, 10.1_

- [ ] 11.1 Write property test for brand color consistency
  - **Property 1: Brand Color Consistency**
  - **Validates: Requirements 1.4**

- [ ] 11.2 Write property test for responsive design
  - **Property 13: Responsive Design**
  - **Validates: Requirements 9.1, 9.5**

- [ ] 11.3 Write unit tests for main page integration
  - Test all sections are present
  - Test no traditional navigation bar exists
  - Test component ordering
  - _Requirements: 1.1, 1.3_

- [ ] 12. Animation and Interaction Polish
  - Implement hover effects for all interactive elements
  - Add scroll-triggered animations with Framer Motion whileInView
  - Ensure animations respect prefers-reduced-motion accessibility setting
  - Optimize animation performance with GPU acceleration
  - Add loading states and skeleton screens
  - Test animation behavior across different devices
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 12.1 Write property test for interactive hover states
  - **Property 15: Interactive Hover States**
  - **Validates: Requirements 10.2**

- [ ] 12.2 Write property test for accessibility animation compliance
  - **Property 16: Accessibility Animation Compliance**
  - **Validates: Requirements 10.4**

- [ ] 12.3 Write unit tests for animation implementation
  - Test Framer Motion component usage
  - Test prefers-reduced-motion handling
  - Test loading state implementations
  - _Requirements: 10.3, 10.4_

- [ ] 13. SEO and Performance Optimization
  - Configure next-sitemap for sitemap.xml and robots.txt generation
  - Implement proper meta tags and structured data
  - Optimize images with priority loading for hero image
  - Set up static site generation (SSG) for optimal performance
  - Configure Core Web Vitals optimization
  - Add performance monitoring and error tracking
  - _Requirements: 8.1, 8.2, 8.4, 8.6, 8.7_

- [ ] 13.1 Write unit tests for SEO implementation
  - Test sitemap and robots.txt generation
  - Test hero image priority loading
  - Test static generation configuration
  - _Requirements: 8.4, 8.6_

- [ ] 14. Final Integration and Testing
  - Ensure all tests pass (unit and property-based)
  - Test complete user flows end-to-end
  - Verify CMS integration works with real data
  - Test contact form email delivery
  - Validate responsive design on multiple devices
  - Check accessibility compliance with screen readers
  - Perform performance audit with Lighthouse
  - _Requirements: All requirements validation_

- [ ] 14.1 Run comprehensive property-based test suite
  - Execute all 18 correctness properties with 100+ iterations each
  - Validate all requirements are covered by passing tests
  - _Requirements: All testable requirements_

- [ ] 15. Deployment Configuration
  - Set up Vercel deployment configuration
  - Configure environment variables in Vercel dashboard
  - Set up automatic deployment from Git repository
  - Configure custom domain and SSL
  - Test production deployment and functionality
  - Set up monitoring and error tracking
  - _Requirements: 12.1, 12.3, 12.5_

## Notes

- Each task references specific requirements for traceability
- Property-based tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Integration happens incrementally to catch issues early
- All sensitive configuration uses environment variables
- The implementation follows mobile-first responsive design principles