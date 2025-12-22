'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ReactNode } from 'react'

interface InfiniteScrollGalleryProps {
  images: Array<{
    src: string
    alt: string
    title: string
  }>
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
}

export default function InfiniteScrollGallery({ 
  images, 
  speed = 30,
  direction = 'left',
  pauseOnHover = true 
}: InfiniteScrollGalleryProps) {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images]

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
      >
        {duplicatedImages.map((image, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-80 h-64 relative rounded-xl overflow-hidden shadow-lg group"
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg">{image.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function MultiRowInfiniteGallery({ 
  images, 
  rows = 2 
}: { 
  images: Array<{ src: string; alt: string; title: string }>
  rows?: number 
}) {
  const imagesPerRow = Math.ceil(images.length / rows)
  const imageRows = Array.from({ length: rows }, (_, i) => 
    images.slice(i * imagesPerRow, (i + 1) * imagesPerRow)
  )

  return (
    <div className="space-y-6">
      {imageRows.map((rowImages, index) => (
        <InfiniteScrollGallery
          key={index}
          images={rowImages}
          speed={30 + index * 5}
          direction={index % 2 === 0 ? 'left' : 'right'}
        />
      ))}
    </div>
  )
}
