'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { AnimatedUnderlineText } from './ui/GradientText'

interface NavigationProps {
  sections?: Array<{
    id: string
    label: string
    href: string
  }>
}

const defaultSections = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export default function Navigation({ sections = defaultSections }: NavigationProps) {
  const { scrollY } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Transform background opacity based on scroll
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(43, 43, 43, 0)', 'rgba(43, 43, 43, 0.95)']
  )

  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(10px)']
  )

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Determine active section
      const sections = document.querySelectorAll('section[id]')
      let current = 'home'

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || 'home'
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    
    if (element) {
      const offset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }

    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: shouldReduceMotion ? (isScrolled ? 'rgba(43, 43, 43, 0.95)' : 'transparent') : backgroundColor,
          backdropFilter: shouldReduceMotion ? (isScrolled ? 'blur(10px)' : 'none') : backdropBlur,
          WebkitBackdropFilter: shouldReduceMotion ? (isScrolled ? 'blur(10px)' : 'none') : backdropBlur,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              className="text-2xl font-bold text-floralWhite hover:text-accentYellow transition-colors duration-300"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              MC
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={section.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(section.href)
                  }}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    activeSection === section.id
                      ? 'text-accentYellow'
                      : 'text-floralWhite hover:text-accentYellow'
                  }`}
                  role="tab"
                  aria-selected={activeSection === section.id}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accentYellow"
                      layoutId="activeSection"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-floralWhite p-2 focus:outline-none focus:ring-2 focus:ring-accentYellow rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <motion.div
                animate={isMobileMenuOpen ? 'open' : 'closed'}
                className="w-6 h-5 flex flex-col justify-between"
              >
                <motion.span
                  className="w-full h-0.5 bg-floralWhite block"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 9 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-floralWhite block"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-floralWhite block"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -9 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        />

        {/* Menu Panel */}
        <motion.div
          className="absolute top-0 right-0 bottom-0 w-64 bg-graphite shadow-2xl"
          initial={{ x: '100%' }}
          animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="flex flex-col p-8 pt-24 gap-6">
            {sections.map((section, index) => (
              <motion.a
                key={section.id}
                href={section.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section.href)
                }}
                className={`text-lg font-medium transition-colors duration-300 ${
                  activeSection === section.id
                    ? 'text-accentYellow'
                    : 'text-floralWhite hover:text-accentYellow'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : 20
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {section.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
