'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'

interface ArtItem {
  src: string
  caption: string
}

const artItems: ArtItem[] = [
  {
    src: 'https://cdn.worldofnuclear.com/static/images/art/flux-hex-sphere.webp',
    caption: 'Flux Hexa-Sphere',
  },
  {
    src: 'https://cdn.worldofnuclear.com/static/images/art/flux-blossom.webp',
    caption: 'Flux Blossom',
  },
  {
    src: 'https://cdn.worldofnuclear.com/static/images/art/flux-under-water.webp',
    caption: 'Underwater Flux',
  },
  {
    src: 'https://cdn.worldofnuclear.com/static/images/art/flux-ocean.webp',
    caption: 'Flux Ocean',
  },
  {
    src: 'https://cdn.worldofnuclear.com/static/images/art/flux-radar.webp',
    caption: 'Flux Radar',
  },
  {
    src: 'https://cdn.worldofnuclear.com/static/images/art/flux-galaxy.webp',
    caption: 'Flux Galaxy',
  },
]

export default function ArtGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % artItems.length)
        setIsTransitioning(false)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 500)
  }

  const goToPrevious = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? artItems.length - 1 : prevIndex - 1
      )
      setIsTransitioning(false)
    }, 500)
  }

  const goToNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % artItems.length)
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-8'>
      <div className='max-w-6xl w-full'>
        <h1 className='text-4xl md:text-5xl font-bold text-center mb-12 text-white'>
          Atomic Art
        </h1>

        {/* Carousel Container */}
        <div className='relative w-7/8 mx-auto aspect-square bg-black rounded-lg overflow-hidden shadow-2xl'>
          {/* Image */}
          <div
            className={`transition-opacity duration-500 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image
              src={artItems[currentIndex].src}
              alt={artItems[currentIndex].caption}
              fill
              className='object-contain'
              priority
              unoptimized
            />
          </div>

          {/* Caption Overlay */}
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6'>
            <p className='text-white text-lg text-center font-medium'>
              {artItems[currentIndex].caption}
            </p>
          </div>
        </div>

        {/* Link to Home */}
        <div className='flex justify-end mt-6'>
          <a
            href='/'
            className='text-blue-400 hover:text-blue-300 transition-colors text-lg font-medium flex items-center gap-2'
          >
            This way to Atomic Ambitions{' '}
            <Icon icon='ph:arrow-right' width={24} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className='mt-12 text-center text-gray-500'>
        <p>2025 Nuclear Ambitions LLC</p>
      </footer>
    </div>
  )
}
