'use client'

import { motion } from 'framer-motion'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

export default function Loading({ size = 'md', text, fullScreen = false }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-floralWhite/80 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8'

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <motion.div
          className={`${sizeClasses[size]} border-2 border-graphite/20 border-t-accentYellow rounded-full mx-auto`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {text && (
          <motion.p 
            className="mt-4 text-graphite/70 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  )
}

// Skeleton loading components
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-graphite/10 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  )
}

export function SkeletonImage({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`bg-graphite/10 rounded-lg animate-pulse ${className}`}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{
        duration: 1.5,
        repeat: Infinity
      }}
    />
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`p-6 border border-graphite/10 rounded-lg ${className}`}>
      <SkeletonImage className="w-full h-48 mb-4" />
      <SkeletonText lines={2} />
    </div>
  )
}