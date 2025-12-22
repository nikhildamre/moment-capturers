'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CounterAnimationProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function CounterAnimation({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = ''
}: CounterAnimationProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  )
}

/**
 * Stats display with animated counters
 */
interface StatsDisplayProps {
  stats: Array<{
    value: number
    label: string
    suffix?: string
    prefix?: string
  }>
  className?: string
}

export function StatsDisplay({ stats, className = '' }: StatsDisplayProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            <CounterAnimation
              end={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
            />
          </div>
          <div className="text-sm md:text-base text-graphite/80 font-medium group-hover:text-graphite transition-colors">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
