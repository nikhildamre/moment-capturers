'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactModal from './ContactModal'

export default function ContactButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="contact">
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-24 bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        aria-label="Open contact form"
      >
        <svg 
          className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
      </motion.button>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}