'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function FloatingActionButtons() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { 
      icon: '📧', 
      label: 'Email', 
      color: '#FF8C00',
      action: () => window.location.href = 'mailto:momentcapturers04@gmail.com'
    },
    { 
      icon: '📷', 
      label: 'Instagram', 
      color: '#E4405F',
      action: () => window.open('https://www.instagram.com/moment._.capturers/', '_blank')
    },
    { 
      icon: '💼', 
      label: 'LinkedIn', 
      color: '#0A66C2',
      action: () => window.open('https://www.linkedin.com/in/amey-ghadge-a93a91230/', '_blank')
    },
    { 
      icon: '📱', 
      label: 'WhatsApp', 
      color: '#25D366',
      action: () => window.open('https://wa.me/919876543210', '_blank')
    },
  ]

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div className="flex flex-col gap-3 mb-3">
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ scale: 0, opacity: 0, x: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0, opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={action.action}
                className="flex items-center gap-3 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
                style={{ backgroundColor: action.color }}
                whileHover={{ scale: 1.1, x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-white font-medium whitespace-nowrap">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg flex items-center justify-center text-white text-2xl"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? '✕' : '✨'}
      </motion.button>
    </div>
  )
}
