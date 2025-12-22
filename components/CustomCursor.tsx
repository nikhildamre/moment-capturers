'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 30, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', () => setIsVisible(false))
    window.addEventListener('mouseenter', () => setIsVisible(true))

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', () => setIsVisible(false))
      window.removeEventListener('mouseenter', () => setIsVisible(true))
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  // Hide on mobile/touch devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Camera Viewfinder Frame */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Outer Frame */}
        <motion.div
          className="relative"
          animate={{
            scale: isClicking ? 0.85 : isHovering ? 1.3 : 1,
            rotate: isClicking ? 15 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Main Viewfinder Square */}
          <div className="w-12 h-12 relative">
            {/* Corner Brackets */}
            <motion.div
              className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accentYellow"
              animate={{
                opacity: isHovering ? 1 : 0.7,
              }}
            />
            <motion.div
              className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accentYellow"
              animate={{
                opacity: isHovering ? 1 : 0.7,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accentYellow"
              animate={{
                opacity: isHovering ? 1 : 0.7,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accentYellow"
              animate={{
                opacity: isHovering ? 1 : 0.7,
              }}
            />

            {/* Center Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-1 h-1 bg-accentYellow rounded-full"
                animate={{
                  scale: isClicking ? 2 : 1,
                  opacity: isClicking ? 0 : 1,
                }}
              />
            </div>

            {/* Horizontal Line */}
            <motion.div
              className="absolute top-1/2 left-1/4 right-1/4 h-px bg-accentYellow/50"
              animate={{
                scaleX: isHovering ? 1.2 : 1,
              }}
            />
            {/* Vertical Line */}
            <motion.div
              className="absolute left-1/2 top-1/4 bottom-1/4 w-px bg-accentYellow/50"
              animate={{
                scaleY: isHovering ? 1.2 : 1,
              }}
            />
          </div>

          {/* Focus Ring Animation */}
          {isHovering && (
            <motion.div
              className="absolute inset-0 border-2 border-accentYellow rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}

          {/* Click Flash Effect */}
          {isClicking && (
            <motion.div
              className="absolute inset-0 bg-accentYellow rounded-full"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>

        {/* Hover Text */}
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-xs text-accentYellow font-medium whitespace-nowrap bg-graphite/80 px-2 py-1 rounded"
          >
            CLICK
          </motion.div>
        )}
      </motion.div>

      {/* Trail Effect */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-full h-full bg-accentYellow/30 rounded-full blur-sm"
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </>
  )
}
