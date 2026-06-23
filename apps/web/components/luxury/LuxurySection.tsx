export default function LuxurySection() {
  const stats = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
      value: "12",
      label: "Years of Experience",
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      value: "45+",
      label: "Luxury Homes",
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      value: "2x",
      label: "Reliable System",
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
      value: "9+",
      label: "Years Excellence",
    },
  ]

  return (
    <section className="w-full flex flex-col">
      {/* Top Image Area */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[700px] flex items-start justify-center pt-10 sm:pt-16 lg:pt-24 bg-neutral-900">
        <img
          src="/images/luxury/luxury-home.gif"
          alt="Luxury Home Automation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Container width ~80% */}
        <div className="relative z-10 w-[80%] mx-auto flex justify-center">
          <h2 className="font-sans font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white text-center tracking-wide leading-tight">
            Transform Your Luxury Home{" "}
            <span className="text-[#E5283F]">with Smart Technology</span>
          </h2>
        </div>
      </div>

      {/* Bottom Stats Banner */}
      <div className="w-full bg-[#E5283F] py-10 sm:py-12 lg:py-16">
        <div className="w-[80%] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-8 h-8 text-white mb-4 sm:mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-in-out transform">
                {stat.icon}
              </div>
              <span className="text-white font-bold text-[24px] sm:text-[32px] lg:text-[36px] leading-none mb-2 sm:mb-3 opacity-95 group-hover:opacity-100 transition-opacity duration-300">
                {stat.value}
              </span>
              <span className="text-white text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] uppercase font-semibold opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
