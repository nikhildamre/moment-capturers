'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { getAboutData, urlFor, type AboutData } from '@/lib/sanity'
import { SkeletonText, SkeletonImage } from './Loading'
import ErrorBoundary from './ErrorBoundary'
import GradientText from './ui/GradientText'
import { StatsDisplay } from './ui/CounterAnimation'
import { FloatingIcons } from './ui/AnimatedIcon'

interface AboutProps {
  content?: string
  initialData?: AboutData | null
}

function AboutContent({ content, initialData }: AboutProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()
  const [aboutData, setAboutData] = useState<AboutData | null>(initialData || null)
  const [isLoading, setIsLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialData) {
      fetchAboutData()
    }
  }, [initialData])

  const fetchAboutData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getAboutData()
      setAboutData(data)
    } catch (err) {
      console.error('Failed to fetch about data:', err)
      setError('Failed to load content')
    } finally {
      setIsLoading(false)
    }
  }

  // Animation variants that respect reduced motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        ease: "easeOut"
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 50 
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

  const slideVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -30 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: "easeOut"
      }
    }
  }

  const slideRightVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : 30 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: "easeOut"
      }
    }
  }

  // Use provided content or CMS data or fallback
  const displayContent = content || aboutData?.content || getDefaultContent()
  const profileImage = aboutData?.profileImage
  const skills = aboutData?.skills || []
  const experience = aboutData?.experience

  function getDefaultContent(): string {
    return `Welcome to Moment Capturers, where every frame tells a story. I'm Amey Ghadge, a passionate photographer dedicated to capturing the essence of life's most precious moments.

With years of experience in food, fashion, events, corporate, and portrait photography, I bring a unique perspective to every shoot. My approach combines technical expertise with creative vision to deliver images that not only meet but exceed expectations.

Whether you're looking to showcase your culinary creations, capture the elegance of fashion, document special events, create professional corporate imagery, or preserve personal memories through portraits, I'm here to bring your vision to life.`
  }

  if (error) {
    return (
      <section className="py-20 bg-floralWhite">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-800 mb-2">Unable to Load Content</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchAboutData}
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
      id="about"
      ref={ref} 
      className="py-20 bg-gradient-to-br from-floralWhite via-white to-floralWhite relative overflow-hidden"
      aria-label="About Amey Ghadge - Photographer"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-orange-400/10 to-red-500/10 rounded-full blur-2xl" />
      
      {/* Floating Icons */}
      <FloatingIcons />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content Column */}
            <div>
              <GradientText
                as="h2"
                gradient="warm"
                animated={!shouldReduceMotion}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 drop-shadow-lg"
              >
                About Me
              </GradientText>
              
              {isLoading ? (
                <SkeletonText lines={4} className="mb-6" />
              ) : (
                <motion.div 
                  variants={slideVariants}
                  className="prose prose-lg text-graphite/80 leading-relaxed mb-8"
                >
                  {displayContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              )}

              {/* Skills Section */}
              {skills.length > 0 && (
                <motion.div variants={slideVariants} className="mb-6">
                  <h3 className="text-xl font-semibold text-graphite mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-graphite rounded-full text-sm font-semibold border border-orange-500/30 hover:border-orange-500 transition-colors"
                        whileHover={{ scale: 1.05, y: -2 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Experience */}
              {experience && (
                <motion.div variants={slideVariants}>
                  <div className="flex items-center gap-4 text-graphite/70">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{experience}+ Years Experience</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Image/Visual Column */}
            <motion.div 
              variants={slideRightVariants}
              className="relative"
            >
              {isLoading ? (
                <SkeletonImage className="aspect-square rounded-2xl" />
              ) : profileImage ? (
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={urlFor(profileImage).width(600).height(600).url()}
                    alt={profileImage.alt || 'Amey Ghadge - Professional Photographer'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-accentYellow/20 to-graphite/10 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-accentYellow rounded-full mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-graphite" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-graphite mb-2">Amey Ghadge</h3>
                    <p className="text-graphite/70">Professional Photographer</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 pt-16 border-t border-gradient-to-r from-transparent via-orange-500/20 to-transparent"
          >
            <StatsDisplay
              stats={[
                { value: experience || 5, label: 'Years Experience', suffix: '+' },
                { value: 500, label: 'Happy Clients', suffix: '+' },
                { value: 1000, label: 'Projects Done', suffix: '+' },
                { value: 50, label: 'Awards Won', suffix: '+' }
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function About(props: AboutProps) {
  return (
    <ErrorBoundary>
      <AboutContent {...props} />
    </ErrorBoundary>
  )
}