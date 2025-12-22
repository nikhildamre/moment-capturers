'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import GradientText from './ui/GradientText'
import AnimatedButton from './ui/AnimatedButton'
import { staggerContainer, fadeInUp, scaleIn } from '@/lib/animations'
import FloatingElement, { RotatingElement, PulsingElement } from './ui/FloatingElement'
import TextReveal from './ui/TextReveal'
import ScrollReveal from './ui/ScrollReveal'
import { BorderBeam } from './ui/BeamEffect'
import CreativeBackground from './ui/CreativeBackground'
import { CurtainReveal } from './ui/ImageRevealAnimations'

export default function Landing() {
  const shouldReduceMotion = useReducedMotion()
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()

  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '50%'])
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const contentScale = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePortfolioClick = () => {
    const portfolioSection = document.getElementById('portfolio')
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-graphite"
      aria-label="Hero section - Moment Capturers Photography"
    >
      {/* Creative Animated Background */}
      <CreativeBackground />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-[1]" aria-hidden="true">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accentYellow/20 rounded-full blur-3xl"
          style={{ y: shouldReduceMotion ? 0 : backgroundY }}
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-floralWhite/10 rounded-full blur-3xl"
          style={{ y: shouldReduceMotion ? 0 : backgroundY }}
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />

        {/* Floating Geometric Shapes */}
        <FloatingElement duration={6} yOffset={20} className="absolute top-20 right-20">
          <RotatingElement duration={6}>
            <div className="w-20 h-20 border-2 border-accentYellow/30 rounded-lg" />
          </RotatingElement>
        </FloatingElement>
        
        <FloatingElement duration={8} yOffset={15} delay={0.5} className="absolute bottom-32 left-16">
          <RotatingElement duration={8} reverse>
            <div 
              className="w-16 h-16 border-2 border-floralWhite/20"
              style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
            />
          </RotatingElement>
        </FloatingElement>

        <FloatingElement duration={7} yOffset={25} xOffset={10} className="absolute top-1/2 right-10">
          <div className="w-12 h-12 bg-accentYellow/20 rounded-full" />
        </FloatingElement>

        <FloatingElement duration={9} yOffset={18} xOffset={-8} delay={1} className="absolute top-1/3 left-10">
          <RotatingElement duration={12}>
            <svg className="w-16 h-16 text-floralWhite/20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} points="9 22 9 12 15 12 15 22" />
            </svg>
          </RotatingElement>
        </FloatingElement>

        <FloatingElement duration={11} yOffset={22} xOffset={12} delay={2} className="absolute bottom-1/4 right-1/3">
          <PulsingElement scale={1.15} duration={3}>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-yellow-500/30 rounded-lg rotate-45" />
          </PulsingElement>
        </FloatingElement>
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 text-center z-10 relative"
        style={{
          opacity: shouldReduceMotion ? 1 : contentOpacity,
          scale: shouldReduceMotion ? 1 : contentScale
        }}
      >
        <CurtainReveal delay={0.3}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="max-w-5xl mx-auto"
          >
          {/* Main Brand Title */}
          <motion.div variants={scaleIn} className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
              <span className="block text-floralWhite mb-2">Moment</span>
              <GradientText 
                as="span" 
                gradient="warm" 
                animated={!shouldReduceMotion}
                className="block"
              >
                Capturers
              </GradientText>
            </h1>
          </motion.div>
          
          {/* Tagline */}
          <TextReveal
            text="Capturing Moments That Matter"
            className="text-xl sm:text-2xl md:text-3xl mb-8 text-floralWhite/90 font-light max-w-3xl mx-auto leading-relaxed"
            delay={0.5}
          />
          
          {/* Photographer Name */}
          <motion.div 
            variants={fadeInUp}
            className="mb-12"
          >
            <p className="text-base sm:text-lg text-floralWhite/70 mb-2 font-light">
              Professional Photography by
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-accentYellow">
              Amey Ghadge
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={handlePortfolioClick}
              ariaLabel="View portfolio"
            >
              View Portfolio
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={handleContactClick}
              ariaLabel="Get in touch"
            >
              Get in Touch
            </AnimatedButton>
          </motion.div>

          {/* Services Preview */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-base"
          >
            {['Food', 'Fashion', 'Events', 'Corporate', 'Portraits'].map((service, index) => (
              <ScrollReveal
                key={service}
                direction="up"
                delay={0.8 + index * 0.1}
              >
                <motion.div
                  className="relative group"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <BorderBeam
                    className="px-5 py-2.5 glass-dark rounded-full text-floralWhite font-medium border border-floralWhite/20 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                    color="rgba(255, 140, 0, 0.5)"
                    duration={4 + index}
                  >
                    <span className="relative z-10 group-hover:text-orange-400 transition-colors">
                      {service}
                    </span>
                  </BorderBeam>
                </motion.div>
              </ScrollReveal>
            ))}
          </motion.div>
        </motion.div>
        </CurtainReveal>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center text-floralWhite/60 cursor-pointer"
          onClick={handlePortfolioClick}
        >
          <span className="text-sm mb-2 hidden sm:block font-light">Scroll to explore</span>
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Moment Capturers",
            "description": "Professional photography services specializing in food, fashion, events, corporate, and portrait photography",
            "provider": {
              "@type": "Person",
              "name": "Amey Ghadge",
              "jobTitle": "Professional Photographer"
            },
            "serviceType": [
              "Food Photography",
              "Fashion Photography", 
              "Event Photography",
              "Corporate Photography",
              "Portrait Photography"
            ],
            "areaServed": "India"
          })
        }}
      />
    </section>
  )
}