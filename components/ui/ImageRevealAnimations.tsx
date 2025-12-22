'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type RevealType = 'curtain' | 'circular' | 'diagonal' | 'puzzle' | 'mosaic'

interface ImageRevealProps {
  children: ReactNode
  type?: RevealType
  delay?: number
}

export default function ImageReveal({ children, type = 'curtain', delay = 0 }: ImageRevealProps) {
  const variants = {
    curtain: {
      hidden: { clipPath: 'inset(0 100% 0 0)' },
      visible: { 
        clipPath: 'inset(0 0% 0 0)',
        transition: { duration: 0.8, delay, ease: 'easeInOut' }
      }
    },
    circular: {
      hidden: { clipPath: 'circle(0% at 50% 50%)' },
      visible: { 
        clipPath: 'circle(150% at 50% 50%)',
        transition: { duration: 1, delay, ease: 'easeInOut' }
      }
    },
    diagonal: {
      hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      visible: { 
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: { duration: 0.8, delay, ease: 'easeInOut' }
      }
    },
    puzzle: {
      hidden: { scale: 0, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { duration: 0.6, delay, ease: 'backOut' }
      }
    },
    mosaic: {
      hidden: { scale: 1.2, opacity: 0, filter: 'blur(20px)' },
      visible: { 
        scale: 1, 
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.8, delay, ease: 'easeOut' }
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants[type]}
    >
      {children}
    </motion.div>
  )
}

export function CurtainReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <ImageReveal type="curtain" delay={delay}>{children}</ImageReveal>
}

export function CircularReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <ImageReveal type="circular" delay={delay}>{children}</ImageReveal>
}

export function DiagonalReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <ImageReveal type="diagonal" delay={delay}>{children}</ImageReveal>
}

export function PuzzleReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <ImageReveal type="puzzle" delay={delay}>{children}</ImageReveal>
}

export function MosaicReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <ImageReveal type="mosaic" delay={delay}>{children}</ImageReveal>
}
