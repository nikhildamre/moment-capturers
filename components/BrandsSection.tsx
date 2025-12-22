'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { KineticText } from './ui/TextAnimations'
import AnimatedCounter from './ui/AnimatedCounter'

export default function BrandsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()

  const brands = [
    { name: 'Marriott', logo: '🏨' },
    { name: 'Zomato', logo: '🍽️' },
    { name: 'Nike', logo: '👟' },
    { name: 'Adidas', logo: '⚽' },
    { name: 'Starbucks', logo: '☕' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Google', logo: '🔍' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Netflix', logo: '🎬' },
    { name: 'Spotify', logo: '🎵' },
    { name: 'Tesla', logo: '⚡' },
    { name: 'Microsoft', logo: '💻' },
  ]

  // Duplicate for infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands]

  const stats = [
    { value: 50, suffix: '+', label: 'Happy Clients' },
    { value: 200, suffix: '+', label: 'Projects Completed' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' },
    { value: 5, suffix: '+', label: 'Years Experience' },
  ]

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,140,0,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <KineticText
            text="Trusted by Leading Brands"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
          />
          <p className="text-lg md:text-xl text-graphite/80 max-w-2xl mx-auto">
            Proud to have worked with amazing brands and businesses
          </p>
        </motion.div>

        {/* Infinite Scrolling Logos */}
        <div className="relative mb-16">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-12 py-8"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-40 h-40 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 group hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -10 }}
                  initial={{ opacity: 0.6, filter: 'grayscale(100%)' }}
                  whileInView={{ opacity: 1, filter: 'grayscale(0%)' }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-5xl group-hover:scale-110 transition-transform">
                    {brand.logo}
                  </span>
                  <span className="text-sm font-semibold text-graphite group-hover:text-orange-500 transition-colors">
                    {brand.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <div className="text-sm md:text-base text-graphite/70 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
