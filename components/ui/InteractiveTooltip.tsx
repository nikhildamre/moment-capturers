'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string | ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function InteractiveTooltip({ 
  children, 
  content, 
  position = 'top' 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: position === 'top' ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: position === 'top' ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${positions[position]} z-50 pointer-events-none`}
          >
            <div className="bg-graphite text-white px-3 py-2 rounded-lg shadow-xl text-sm whitespace-nowrap">
              {content}
              {/* Arrow */}
              <div 
                className="absolute w-2 h-2 bg-graphite transform rotate-45"
                style={{
                  [position === 'top' ? 'bottom' : position === 'bottom' ? 'top' : position === 'left' ? 'right' : 'left']: '-4px',
                  [position === 'top' || position === 'bottom' ? 'left' : 'top']: '50%',
                  transform: 'translateX(-50%) rotate(45deg)'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
