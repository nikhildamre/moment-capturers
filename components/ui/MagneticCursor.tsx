'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, input, textarea, [role="button"]')
      setIsPointer(!!isClickable)
    }

    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-8 h-8 border-2 border-orange-500 rounded-full"
          animate={{
            scale: isPointer ? 1.5 : 1,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      
      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-2 h-2 bg-orange-500 rounded-full"
          animate={{
            scale: isPointer ? 2 : 1,
            opacity: isHidden ? 0 : 0.5,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  )
}
