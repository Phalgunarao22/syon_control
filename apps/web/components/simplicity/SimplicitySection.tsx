"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

const defaultCards = [
  { id: 1, title: "Smart Lighting", image: "/images/unrivaled/unrivaled.png" },
  { id: 2, title: "Climate Control", image: "/images/unrivaled/unrivaled.png" },
  { id: 3, title: "Security Systems", image: "/images/unrivaled/unrivaled.png" },
  { id: 4, title: "Home Theater", image: "/images/unrivaled/unrivaled.png" },
  { id: 5, title: "Smart Shades", image: "/images/unrivaled/unrivaled.png" },
  { id: 6, title: "Audio Systems", image: "/images/unrivaled/unrivaled.png" },
  { id: 7, title: "Energy Management", image: "/images/unrivaled/unrivaled.png" },
  { id: 8, title: "Network & WiFi", image: "/images/unrivaled/unrivaled.png" },
]

export default function SimplicitySection({ initialCategories = [] }: { initialCategories?: any[] }) {
  const cards = initialCategories.length > 0 
    ? initialCategories.map(c => ({ id: c.id, title: c.name, image: c.image }))
    : defaultCards

  // Duplicate the first 4 cards at the end for seamless infinite sliding
  const extendedCards = [...cards, ...cards.slice(0, 4)]

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
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      play()
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, cards.length])

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
              <Link
                href="/products"
                key={`${card.id}-${idx}`}
                className="flex flex-col rounded-[24px] overflow-hidden aspect-[4/5] bg-[#18191B] cursor-pointer border border-white/5 shrink-0 w-full sm:w-[calc((50%-12px))] lg:w-[calc((25%-24px))] group"
              >
                {/* Image Container */}
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={card.image}
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
