"use client"

export default function RoomsSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-center font-sans font-semibold text-[28px] sm:text-[34px] lg:text-[40px] text-white mb-10 sm:mb-12 lg:mb-16 tracking-wide leading-tight">
          Designed for <span className="text-[#E5283F]">Every Room.</span>
        </h2>

        {/* Grid: 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[615fr_536fr] gap-5 sm:gap-6 lg:gap-8 items-start max-w-[1183px] mx-auto">
          {/* Card 1: Lounge & Entertaining */}
          <div className="relative group rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer aspect-[615/418] w-full flex flex-col justify-end p-5 sm:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-black/50">
            <img src="/images/rooms/room1.jpg" alt="Lounge & Entertaining" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-white text-[18px] sm:text-[23px] font-bold tracking-wide leading-none">
                Lounge &amp; Entertaining
              </h3>
              <p className="text-white/80 text-[14px] sm:text-[17px] font-normal mt-2 sm:mt-3 leading-relaxed">
                One touch sets the scene for cocktails, cinema, or relaxation.
              </p>
            </div>
          </div>

          {/* Right Column: Stacked Cards */}
          <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8 w-full">
            {/* Card 2: Private Suites */}
            <div className="relative group rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer aspect-[536/196] w-full flex flex-col justify-end p-5 sm:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-black/50">
              <img src="/images/rooms/room2.jpg" alt="Private Suites" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-white text-[18px] sm:text-[23px] font-bold tracking-wide leading-none">
                  Private Suites
                </h3>
                <p className="text-white/80 text-[14px] sm:text-[17px] font-normal mt-2 sm:mt-3 leading-relaxed">
                  Personalized wake-up &amp; sleep rituals.
                </p>
              </div>
            </div>

            {/* Card 3: Perimeter Shield */}
            <div className="relative group rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-900 cursor-pointer aspect-[536/196] w-full flex flex-col justify-end p-5 sm:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-[#0091FF]/20">
              <img src="/images/rooms/room3.jpg" alt="Perimeter Shield" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-white text-[18px] sm:text-[23px] font-bold tracking-wide leading-none">
                  Perimeter Shield
                </h3>
                <p className="text-white/80 text-[14px] sm:text-[17px] font-normal mt-2 sm:mt-3 leading-relaxed">
                  Intelligent security that never sleeps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
