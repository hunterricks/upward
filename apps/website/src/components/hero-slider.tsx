"use client"

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getHeroSlides, urlFor } from '../lib/sanity'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

interface HeroSlide {
  _id: string
  number: string
  title: string
  subtitle: string
  description: string
  image: any
  order: number
}

export function HeroSlider() {
  const [mounted, setMounted] = useState(false)
  const [swiper, setSwiper] = useState<any>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const fetchSlides = async () => {
      try {
        console.log('Fetching slides...')
        const data = await getHeroSlides()
        console.log('Fetched slides:', data)
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data)
        } else {
          console.log('No slides found in response:', data)
        }
      } catch (error) {
        console.error('Error fetching slides:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSlides()
  }, [])

  console.log('Current state:', { mounted, loading, slidesLength: slides.length })

  if (!mounted || loading) {
    return (
      <div className="relative h-screen bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl">Loading...</div>
        </div>
      </div>
    )
  }

  if (slides.length === 0) {
    console.log('No slides available')
    return (
      <div className="relative h-screen bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl">No slides available</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectFade, Autoplay, Navigation]}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="relative h-full">
              <div className="absolute inset-0">
                <img 
                  src={urlFor(slide.image).url()}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative h-full flex items-center">
                <div className="container">
                  <div className="max-w-3xl">
                    <div className="text-lg md:text-xl mb-4 text-white/80">
                      {slide.number}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-white/80 mb-6">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg md:text-xl text-white/60">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide Numbers */}
      <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 z-20 flex items-center space-x-8">
        {slides.map((slide, index) => (
          <button
            key={slide._id}
            onClick={() => swiper?.slideTo(index)}
            className={`text-white transition-all duration-300 flex items-center ${
              index === activeIndex ? 'opacity-100 text-xl' : 'opacity-50 text-base hover:opacity-75'
            }`}
          >
            {slide.number}. {slide.title}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={() => swiper?.slidePrev()}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button 
        onClick={() => swiper?.slideNext()}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
