'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function AnimatedCounter({ 
  value, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, { 
    stiffness: 50, 
    damping: 30,
    duration: duration * 1000 
  })

  const display = useTransform(spring, (current) => 
    Math.floor(current).toLocaleString()
  )

  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [display])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [isInView, value, spring, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span>{displayValue}</span>
      {suffix}
    </span>
  )
}

export function CircularProgress({ 
  value, 
  max = 100, 
  size = 120,
  strokeWidth = 8,
  color = '#FF8C00',
  label = ''
}: {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, { stiffness: 50, damping: 30 })
  const percentage = useTransform(spring, (current) => 
    Math.floor((current / max) * 100)
  )

  const [percentageValue, setPercentageValue] = useState(0)

  useEffect(() => {
    const unsubscribe = percentage.on('change', (latest) => {
      setPercentageValue(latest)
    })
    return unsubscribe
  }, [percentage])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [isInView, value, spring, hasAnimated, max])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = useTransform(
    spring,
    (current) => circumference - (current / max) * circumference
  )

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 140, 0, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-orange-500">
          {percentageValue}%
        </span>
        {label && <span className="text-sm text-gray-600">{label}</span>}
      </div>
    </div>
  )
}
