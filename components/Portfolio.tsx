'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { getPortfolioItems, urlFor, type PortfolioItem } from '@/lib/sanity'
import { SkeletonCard } from './Loading'
import ErrorBoundary from './ErrorBoundary'
import TiltCard from './ui/TiltCard'
import { dummyPortfolioData } from '@/lib/dummyPortfolioData'
import SpotlightCard from './ui/SpotlightCard'
import { MorphingShapesBackground } from './ui/MorphingShape'
import { KineticText } from './ui/TextAnimations'
import ImageReveal, { CurtainReveal } from './ui/ImageRevealAnimations'

interface PortfolioProps {
  items?: PortfolioItem[]
  initialData?: PortfolioItem[] | null
}

const CATEGORIES = ['All', 'Food', 'Fashion', 'Events', 'Corporate', 'Portrait'] as const
type Category = typeof CATEGORIES[number]

function PortfolioContent({ items, initialData }: PortfolioProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()
  
  // Initialize with dummy data if no data provided
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(
    initialData || items || dummyPortfolioData as any
  )
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [lightboxPhotos, setLightboxPhotos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch if we don't have initial data or items
    if (!initialData && !items) {
      fetchPortfolioData()
    }
  }, [initialData, items])

  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getPortfolioItems()
      // Use dummy data if no CMS data available
      setPortfolioItems(data && data.length > 0 ? data : dummyPortfolioData as any)
    } catch (err) {
      console.error('Failed to fetch portfolio data:', err)
      // Fallback to dummy data on error
      setPortfolioItems(dummyPortfolioData as any)
      setError(null) // Don't show error, just use dummy data
    } finally {
      setIsLoading(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        ease: "easeOut"
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: "easeOut"
      }
    }
  }

  // Filter items by category
  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  // Convert to photo album format
  const photos = filteredItems.flatMap(item => 
    item.images?.map((image, imageIndex) => {
      // Check if it's a direct URL (dummy data) or Sanity image
      const imageUrl = typeof image.asset === 'object' && 'url' in image.asset && typeof image.asset.url === 'string'
        ? image.asset.url // Direct URL from dummy data
        : urlFor(image).width(800).height(600).url() // Sanity image
      
      return {
        src: imageUrl,
        width: image.asset?.metadata?.dimensions?.width || 800,
        height: image.asset?.metadata?.dimensions?.height || 600,
        alt: image.alt || `${item.title} - Image ${imageIndex + 1}`,
        title: item.title,
        category: item.category,
        itemId: item._id,
        imageIndex,
      }
    }) || []
  )

  const openLightbox = useCallback((index: number) => {
    setLightboxPhotos(photos)
    setLightboxIndex(index)
  }, [photos])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1)
  }, [])

  const handleCategoryChange = useCallback((category: Category) => {
    setSelectedCategory(category)
  }, [])

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-800 mb-2">Unable to Load Portfolio</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchPortfolioData}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="portfolio"
      ref={ref} 
      className="py-20 bg-white relative overflow-hidden"
      aria-label="Photography Portfolio"
    >
      {/* Morphing background shapes */}
      <MorphingShapesBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <CurtainReveal delay={0.2}>
              <KineticText
                text="Photography Portfolio"
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 drop-shadow-lg bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
              />
            </CurtainReveal>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-graphite/80 max-w-2xl mx-auto font-medium"
            >
              Explore my work across different photography styles
            </motion.p>
          </motion.div>

          {/* Category Navigation */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8"
            role="tablist"
            aria-label="Portfolio categories"
          >
            {CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/50 scale-105'
                    : 'bg-graphite/10 text-graphite hover:bg-graphite/20 hover:scale-105'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-controls={`portfolio-${category.toLowerCase()}`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            variants={itemVariants}
            id={`portfolio-${selectedCategory.toLowerCase()}`}
            role="tabpanel"
            aria-labelledby={`tab-${selectedCategory.toLowerCase()}`}
            className="relative"
          >
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : photos.length > 0 ? (
              <div className="relative">
                {/* Continuous vertical scrolling container */}
                <motion.div
                  animate={{
                    y: [0, -50, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <PhotoAlbum
                layout="masonry"
                photos={photos}
                targetRowHeight={300}
                onClick={({ index }) => openLightbox(index)}
                renderPhoto={({ photo, imageProps }) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6,
                      delay: photos.indexOf(photo) * 0.05
                    }}
                  >
                    <SpotlightCard 
                    className="group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    spotlightColor="rgba(255, 140, 0, 0.2)"
                  >
                    <TiltCard intensity={8}>
                      <div 
                        role="button"
                        tabIndex={0}
                        aria-label={`View ${photo.alt} in lightbox`}
                        onClick={() => openLightbox(photos.indexOf(photo))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openLightbox(photos.indexOf(photo))
                          }
                        }}
                      >
                        <div className="relative overflow-hidden">
                          <Image
                            {...imageProps}
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            className="transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 w-full h-auto"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                          />
                          
                          {/* Enhanced overlay with gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <h3 className="font-bold text-xl mb-2 text-white drop-shadow-lg">
                                {photo.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-full">
                                  {photo.category}
                                </span>
                                <span className="text-white/90 text-sm">Click to view</span>
                              </div>
                            </div>
                          </div>

                          {/* Corner accent */}
                          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </TiltCard>
                  </SpotlightCard>
                  </motion.div>
                )}
              />
                </motion.div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-graphite/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-graphite/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-graphite mb-2">
                  No images found
                </h3>
                <p className="text-graphite/60">
                  {selectedCategory === 'All' 
                    ? 'No portfolio items available at the moment.' 
                    : `No images found in the ${selectedCategory} category.`
                  }
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={closeLightbox}
        slides={lightboxPhotos}
        plugins={[]}
        carousel={{
          finite: true,
        }}
        render={{
          buttonPrev: lightboxPhotos.length <= 1 ? () => null : undefined,
          buttonNext: lightboxPhotos.length <= 1 ? () => null : undefined,
        }}
      />
    </section>
  )
}

export default function Portfolio(props: PortfolioProps) {
  return (
    <ErrorBoundary>
      <PortfolioContent {...props} />
    </ErrorBoundary>
  )
}