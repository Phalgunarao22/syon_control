"use client"

import { useModal } from "@/components/ui/ModalProvider"

export default function CTASection() {
  const { openModal } = useModal()

  return (
    <section className="w-full bg-black py-16 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center justify-center">
        {/* CTA Card */}
        <div
          className="w-full max-w-[809px] rounded-[28px] sm:rounded-[41px] flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 py-12 sm:py-14 lg:py-16 text-center gap-5 sm:gap-6"
          style={{ backgroundColor: "#18191B" }}
        >
          {/* Heading */}
          <h2
            className="font-sans font-semibold text-white text-[32px] sm:text-[46px] lg:text-[60.38px] leading-tight sm:leading-[60px] lg:leading-[70px]"
          >
            Ready to evolve{" "}
            <span className="block text-[#E5283F]">your space?</span>
          </h2>

          {/* Description */}
          <p
            className="font-sans font-semibold w-full max-w-[587px] text-[14px] sm:text-[16px] lg:text-[17px]"
            style={{ color: "#555252", lineHeight: "1.6" }}
          >
            From small boutique apartments to sprawling country estates, SYON
            brings intelligence to every square foot.
          </p>

          {/* CTA Button */}
          <button
            onClick={openModal}
            className="mt-1 sm:mt-2 px-8 py-4 rounded-full font-sans font-semibold text-white text-base transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-95 shadow-lg shadow-[#E5283F]/20 min-h-[52px] min-w-[180px]"
            style={{ backgroundColor: "#E5283F" }}
          >
            Book your Demo
          </button>
        </div>
      </div>
    </section>
  )
}
