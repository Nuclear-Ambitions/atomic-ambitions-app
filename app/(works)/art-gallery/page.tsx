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
        <div className='relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl'>
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

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all'
            aria-label='Previous image'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all'
            aria-label='Next image'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>

          {/* Caption Overlay */}
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6'>
            <p className='text-white text-lg text-center font-medium'>
              {artItems[currentIndex].caption}
            </p>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className='flex justify-center gap-3 mt-8'>
          {artItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-blue-500'
                  : 'w-3 h-3 bg-gray-500 hover:bg-gray-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className='text-center mt-4 text-gray-400'>
          {currentIndex + 1} / {artItems.length}
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
