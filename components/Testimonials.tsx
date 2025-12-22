'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import GradientText from './ui/GradientText'
import { CircularSoundWave } from './ui/SoundWave'

interface Testimonial {
  _id: string
  author: string
  quote: string
  image?: {
    asset: {
      url: string
    }
    alt: string
  }
  order: number
}

interface TestimonialsProps {
  reviews?: Testimonial[]
}

export default function Testimonials({ reviews = [] }: TestimonialsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)

  // Mock data for demonstration
  const mockReviews: Testimonial[] = [
    {
      _id: '1',
      author: 'Sarah Johnson',
      quote: 'Amey captured our wedding day perfectly. Every moment was beautifully preserved, and the attention to detail was incredible. We couldn\'t be happier with the results!',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
        alt: 'Sarah Johnson'
      },
      order: 1
    },
    {
      _id: '2',
      author: 'Michael Chen',
      quote: 'The corporate headshots Amey took for our team were outstanding. Professional, creative, and delivered exactly what we needed for our company rebrand.',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
        alt: 'Michael Chen'
      },
      order: 2
    },
    {
      _id: '3',
      author: 'Emma Rodriguez',
      quote: 'Amazing food photography! Amey made our restaurant\'s dishes look absolutely stunning. The photos have significantly improved our social media engagement.',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
        alt: 'Emma Rodriguez'
      },
      order: 3
    }
  ]

  const testimonials = reviews.length > 0 ? reviews : mockReviews

  useEffect(() => {
    if (testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-gradient-to-br from-graphite via-[#1a1a1a] to-graphite text-floralWhite relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-16">
            <CircularSoundWave className="hidden md:block" />
            <GradientText
              as="h2"
              gradient="warm"
              animated={!shouldReduceMotion}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold drop-shadow-2xl"
            >
              What Clients Say
            </GradientText>
            <CircularSoundWave className="hidden md:block" />
          </div>

          <div className="relative min-h-[350px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                index === current && (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    {testimonial.image && (
                      <motion.div 
                        className="mb-8 relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-xl opacity-50" />
                        <Image
                          src={testimonial.image.asset.url}
                          alt={testimonial.image.alt}
                          width={100}
                          height={100}
                          className="rounded-full object-cover border-4 border-orange-500/50 relative z-10"
                          unoptimized
                        />
                      </motion.div>
                    )}
                    
                    <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl text-center px-4">
                      <span className="text-orange-500 text-4xl">"</span>
                      {testimonial.quote}
                      <span className="text-orange-500 text-4xl">"</span>
                    </blockquote>
                    
                    <cite className="text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text font-bold text-xl">
                      {testimonial.author}
                    </cite>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-3 mt-12">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrent(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'w-12 h-3 bg-gradient-to-r from-orange-500 to-yellow-500' 
                    : 'w-3 h-3 bg-floralWhite/30 hover:bg-floralWhite/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}