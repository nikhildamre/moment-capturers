'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface PolaroidImage {
  src: string
  alt: string
  title: string
  category?: string
}

interface PolaroidGalleryProps {
  images: PolaroidImage[]
  onImageClick?: (index: number) => void
}

export default function PolaroidGallery({ images, onImageClick }: PolaroidGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Generate random rotations and positions for scattered effect
  const getRandomRotation = (index: number) => {
    const rotations = [-5, -3, -2, 2, 3, 5, -4, 4, -1, 1]
    return rotations[index % rotations.length]
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative group cursor-pointer"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ 
            opacity: 1, 
            scale: 1, 
            rotate: getRandomRotation(index),
          }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.05,
            ease: 'backOut'
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 0,
            zIndex: 10,
            transition: { duration: 0.3 }
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          onClick={() => onImageClick?.(index)}
          style={{
            transformOrigin: 'center center',
          }}
        >
          {/* Polaroid frame */}
          <div className="bg-white p-3 pb-12 shadow-2xl relative">
            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/60 rotate-0 shadow-sm" 
                 style={{ 
                   background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,250,200,0.6) 100%)',
                   backdropFilter: 'blur(2px)'
                 }}
            />
            
            {/* Image container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              
              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-sm">{image.title}</p>
                  {image.category && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                      {image.category}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
            
            {/* Handwritten caption */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <p className="text-gray-700 text-sm font-handwriting" style={{ fontFamily: 'cursive' }}>
                {image.title}
              </p>
            </div>

            {/* Pin/thumbtack decoration (random placement) */}
            {index % 3 === 0 && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-red-600" />
            )}
          </div>

          {/* Shadow effect */}
          <div className="absolute inset-0 bg-black/20 blur-xl -z-10 translate-y-2" />
        </motion.div>
      ))}
    </div>
  )
}
