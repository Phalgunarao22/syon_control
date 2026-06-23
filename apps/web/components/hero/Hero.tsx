"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useModal } from "@/components/ui/ModalProvider"

const slides = [
  { id: 1, type: "image", src: "/images/hero/heroBg.jpg" },
  { id: 2, type: "image", src: "/images/hero/heroBg.jpg" },
  { id: 3, type: "image", src: "/images/hero/heroBg.jpg" },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { openModal } = useModal()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full min-h-[460px] lg:h-[600px] flex items-center justify-center overflow-hidden mt-[86px]">
      {/* Background Carousel */}
      <div className="absolute inset-0 w-full h-full z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            {slide.type === "image" ? (
              <Image
                src={slide.src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-[1448px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start justify-between h-full py-14 lg:py-24">

        {/* Left Content */}
        <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 items-center lg:items-start text-center lg:text-left">

          {/* Animated Heading Graphic */}
          <div className="relative w-[220px] h-[162px] sm:w-[281.86px] sm:h-[207.97px] flex flex-col justify-between text-[#E5283F] font-bold text-[30px] sm:text-[38px] leading-none tracking-widest uppercase">
            {/* CONNECT */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#E5283F] rounded-full shrink-0" />
              <span className="z-10 bg-transparent relative">CONNECT</span>
            </div>

            {/* COMFORT */}
            <div className="flex items-center pl-8">
              <span className="z-10 bg-transparent relative">COMFORT</span>
            </div>

            {/* CONTROL */}
            <div className="flex items-center gap-3">
              <span className="z-10 bg-transparent relative">CONTROL</span>
              <div className="w-2 h-2 bg-[#E5283F] rounded-full shrink-0" />
            </div>

            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 282 208" fill="none">
              <path d="M 230 20 C 280 20, 280 104, 210 104" stroke="#E5283F" strokeWidth="3" strokeLinecap="round" />
              <path d="M 25 104 C -20 104, -20 188, 10 188" stroke="#E5283F" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* Description */}
          <p className="w-full max-w-[90vw] lg:w-[587px] text-white font-semibold text-[15px] sm:text-[17px] leading-[26px] tracking-[0.03em] font-sans">
            SYON Technologies delivers bespoke luxury automation that integrates seamlessly into your life. Control your world with a touch.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            {/* Primary Button */}
            <button
              onClick={openModal}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-[#E5283F] text-white font-semibold text-[16px] sm:text-[18.15px] rounded-full border border-[#E5283F] hover:bg-transparent hover:text-[#E5283F] transition-colors duration-300 min-h-[48px]"
            >
              Book Excellence <span className="ml-2">→</span>
            </button>

            {/* Secondary Button */}
            <button
              onClick={openModal}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 sm:w-[151px] sm:h-[45px] bg-black text-white font-semibold text-sm rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 group min-h-[48px]"
            >
              <svg className="w-3 h-3 mr-2 fill-white group-hover:fill-black transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Explore Tech
            </button>
          </div>
        </div>

        {/* Right spacer */}
        <div className="hidden lg:flex w-1/2 justify-end items-center" />
      </div>
    </section>
  )
}
