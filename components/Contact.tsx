'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import AnimatedButton from './ui/AnimatedButton'
import GradientText from './ui/GradientText'
import MagneticButton from './ui/MagneticButton'

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const { ref, isInView } = useInViewAnimation({ threshold: 0.2 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: '📷', 
      url: 'https://www.instagram.com/moment._.capturers/', 
      color: '#E4405F',
      logo: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      icon: '💼', 
      url: 'https://www.linkedin.com/in/amey-ghadge-a93a91230/', 
      color: '#0A66C2',
      logo: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
  ]

  return (
    <section 
      id="contact"
      ref={ref}
      className="relative py-32 bg-gradient-to-br from-[#1a1a1a] via-graphite to-[#1a1a1a] overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,197,15,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
          animate={shouldReduceMotion ? {} : {
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Floating Shapes */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border-4 border-accentYellow/20 rounded-full"
        animate={shouldReduceMotion ? {} : {
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-24 h-24 bg-accentYellow/10 rounded-lg"
        animate={shouldReduceMotion ? {} : {
          y: [0, 20, 0],
          rotate: [0, -90, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <GradientText 
              as="h2" 
              gradient="warm"
              animated={!shouldReduceMotion}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            >
              Let's Create Together
            </GradientText>
            <p className="text-xl md:text-2xl text-floralWhite/80 max-w-2xl mx-auto font-light">
              Have a project in mind? Let's discuss how we can capture your vision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <motion.input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-floralWhite/20 text-floralWhite px-0 py-3 focus:border-accentYellow focus:outline-none transition-colors duration-300 peer"
                    placeholder=" "
                    whileFocus={{ scale: 1.01 }}
                  />
                  <label className="absolute left-0 top-3 text-floralWhite/60 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-accentYellow peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm">
                    Your Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <motion.input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-floralWhite/20 text-floralWhite px-0 py-3 focus:border-accentYellow focus:outline-none transition-colors duration-300 peer"
                    placeholder=" "
                    whileFocus={{ scale: 1.01 }}
                  />
                  <label className="absolute left-0 top-3 text-floralWhite/60 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-accentYellow peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm">
                    Email Address
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <motion.textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full bg-transparent border-b-2 border-floralWhite/20 text-floralWhite px-0 py-3 focus:border-accentYellow focus:outline-none transition-colors duration-300 resize-none peer"
                    placeholder=" "
                    whileFocus={{ scale: 1.01 }}
                  />
                  <label className="absolute left-0 top-3 text-floralWhite/60 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-accentYellow peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm">
                    Your Message
                  </label>
                </div>

                {/* Submit Button */}
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </AnimatedButton>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-center"
                  >
                    ✓ Message sent successfully!
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-center"
                  >
                    ✗ Failed to send message. Please try again.
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div variants={fadeInUp} className="space-y-8">
              {/* Contact Details */}
              <div className="glass-dark rounded-2xl p-8">
                <h3 className="text-2xl font-display font-semibold text-accentYellow mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-4 text-floralWhite/80">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="font-medium text-floralWhite">Email</p>
                      <a href="mailto:momentcapturers04@gmail.com" className="hover:text-accentYellow transition-colors">
                        momentcapturers04@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-medium text-floralWhite">Location</p>
                      <p>Amey Ghadge</p>
                      <p>81/301 Royal Orchid, Pantnagar</p>
                      <p>Ghatkopar East, Mumbai</p>
                      <p>India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <p className="font-medium text-floralWhite">Availability</p>
                      <p>Mon - Sat, 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-dark rounded-2xl p-8">
                <h3 className="text-2xl font-display font-semibold text-accentYellow mb-6">
                  Follow Me
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((social, index) => (
                    <MagneticButton
                      key={social.name}
                      strength={0.2}
                      className="w-full"
                    >
                      <motion.a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-floralWhite/5 hover:bg-floralWhite/10 transition-all duration-300 group w-full"
                        style={{ borderLeft: `3px solid ${social.color}` }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-floralWhite/80 group-hover:scale-110 transition-transform" style={{ color: social.color }}>
                          {social.logo}
                        </span>
                        <span className="text-floralWhite/80 group-hover:text-accentYellow transition-colors font-medium">
                          {social.name}
                        </span>
                      </motion.a>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
