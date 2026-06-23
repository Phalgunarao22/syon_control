"use client"

import { useState, useEffect, useRef } from "react"

const cards = [
  {
    id: 1,
    title: "Smart Lighting",
  },
  {
    id: 2,
    title: "Climate Control",
  },
  {
    id: 3,
    title: "Security Systems",
  },
  {
    id: 4,
    title: "Home Theater",
  },
  {
    id: 5,
    title: "Smart Shades",
  },
  {
    id: 6,
    title: "Audio Systems",
  },
  {
    id: 7,
    title: "Energy Management",
  },
  {
    id: 8,
    title: "Network & WiFi",
  },
]

// Duplicate the first 4 cards at the end for seamless infinite sliding
const extendedCards = [...cards, ...cards.slice(0, 4)]

export default function SimplicitySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const play = () => {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => prev + 1)
      }, 1000)
    }

    if (currentIndex === cards.length) {
      // Instantly reset to 0 without transition
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
      }, 500) // matches transition duration (500ms)
      return () => clearTimeout(timer)
    } else {
      play()
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex])

  return (
    <section className="w-full bg-black py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Section */}
        <div className="max-w-[729px] mb-10 sm:mb-14 lg:mb-16">
          <h2 className="font-sans font-semibold text-[28px] sm:text-[34px] lg:text-[40px] leading-tight lg:leading-[71.13px] tracking-[0.03em] text-white">
            Unrivaled <span className="text-[#E5283F]">Simplicity.</span>
          </h2>
          <p className="text-[#888888] text-base sm:text-lg mt-2 leading-relaxed tracking-wide">
            We obsess over the details so you don&apos;t have to. Our systems are designed to be powerful yet invisible.
          </p>
        </div>

        {/* Slider Viewport Container */}
        <div className="relative w-full overflow-hidden [--slider-gap:16px] [--cards-visible:1] sm:[--slider-gap:24px] sm:[--cards-visible:2] lg:[--slider-gap:32px] lg:[--cards-visible:4]">
          <div
            className="flex gap-4 sm:gap-6 lg:gap-8 transition-transform ease-in-out"
            style={{
              transitionDuration: isTransitioning ? "500ms" : "0ms",
              transform: `translateX(calc(-1 * ${currentIndex} * (100% + var(--slider-gap)) / var(--cards-visible)))`,
            }}
          >
            {extendedCards.map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                className="flex flex-col rounded-[24px] overflow-hidden aspect-[4/5] bg-[#18191B] cursor-pointer border border-white/5 shrink-0 w-full sm:w-[calc((50%-12px))] lg:w-[calc((25%-24px))] group"
              >
                {/* Image Container */}
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src="/images/unrivaled/unrivaled.png"
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-85" />
                </div>

                {/* Bottom Bar for Title */}
                <div className="bg-[#121314] py-4 px-6 border-t border-white/5 transition-colors duration-300 group-hover:bg-[#1a1b1c]">
                  <h3 className="text-[#E5283F] font-sans font-semibold text-base sm:text-lg tracking-wide">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
