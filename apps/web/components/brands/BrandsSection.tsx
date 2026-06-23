"use client"

const brands = [
  { id: 1, name: "Apple HomeKit", width: 101, height: 99, src: "/images/logos/Apple_HomeKit_logo.png" },
  { id: 2, name: "Alexa", width: 155, height: 99, src: "/images/logos/Alexa_logo.png" },
  { id: 3, name: "Google Home", width: 176, height: 99, src: "/images/logos/GoogleHome_logo.png" },
]

export default function BrandsSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-center font-sans font-semibold text-[24px] sm:text-[32px] lg:text-[40px] text-white mb-10 sm:mb-14 lg:mb-16 leading-tight tracking-wide">
          Seamless Home Automation Integration{" "}
          <span className="text-[#E5283F]">with Top Brands</span>
        </h2>

        {/* Logo Row */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-24">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                width: Math.round(brand.width * 0.85),
                height: Math.round(brand.height * 0.85),
              }}
            >
              <img
                src={brand.src}
                alt={brand.name}
                className="w-full h-full object-contain transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
