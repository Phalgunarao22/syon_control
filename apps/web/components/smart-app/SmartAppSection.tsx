"use client"

export default function SmartAppSection() {
  const features = [
    {
      id: 1,
      title: "All-in-One Smart Control",
      description: "Manage all your smart home devices from a single app.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5283F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Schedules & Automation",
      description: "Create routines and automate everyday tasks.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5283F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Real-Time Monitoring",
      description: "Stay informed with live device status and updates.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5283F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Energy Usage Insights",
      description: "Track and optimize your home's energy consumption.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5283F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="w-full bg-black py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Content Column */}
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start w-full">
            {/* Header */}
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <h2 className="font-sans font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.25] lg:leading-[50px] text-[#E5283F] mt-1">
                SYON Smart Life App

              </h2>
              <h3 className="font-sans font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.25] lg:leading-[50px] text-white">
                One App for Full Home Control
              </h3>
            </div>

            {/* Features List */}
            <div className="space-y-6 sm:space-y-8 w-full text-left">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-4 sm:gap-5 group cursor-pointer">
                  <div className="p-2.5 sm:p-3 bg-neutral-900 border border-white/5 rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:border-[#E5283F]/30 group-hover:bg-neutral-800/80 shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-[18px] sm:text-[21px] lg:text-[23px] font-bold tracking-wide transition-colors duration-300 text-[#E5283F] leading-tight" style={{ color: "#E5283F" }}>
                      {feature.title}
                    </h4>
                    <p className="text-white/80 text-[14px] sm:text-[16px] lg:text-[17px] font-normal mt-1.5 sm:mt-2 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Column */}
          <div className="flex flex-col items-center lg:items-end justify-center w-full gap-6 sm:gap-8">
            {/* Phone Container */}
            <div className="relative w-[210px] h-[434px] sm:w-[264px] sm:h-[551px] overflow-hidden group">
              <img
                src="/images/smart-app/android.png"
                alt="SYON Smart Life App"
                className="absolute inset-0 w-full h-full object-cover scale-[1.20] transition-transform duration-500"
              />
            </div>

            {/* Badges Container */}
            <div className="flex items-center justify-center mt-2 relative group cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105">
              <img
                src="/images/smart-app/googleplay&appstore.png"
                alt="Get it on Google Play and App Store"
                className="h-[48px] w-auto object-contain block"
              />
              <div className="absolute inset-0 flex">
                <a
                  href="https://play.google.com/store/apps/details?id=com.tuya.smartlife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                  aria-label="Get it on Google Play"
                  onClick={(e) => {
                    if (typeof window !== 'undefined') {
                      const ua = navigator.userAgent;
                      if (/iPad|iPhone|iPod/.test(ua)) {
                        e.preventDefault();
                        window.open("https://apps.apple.com/in/app/smartlife-smart-living/id1115101477", "_blank");
                      }
                    }
                  }}
                />
                <a
                  href="https://apps.apple.com/in/app/smartlife-smart-living/id1115101477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                  aria-label="Download on the App Store"
                  onClick={(e) => {
                    if (typeof window !== 'undefined') {
                      const ua = navigator.userAgent;
                      if (/android/i.test(ua)) {
                        e.preventDefault();
                        window.open("https://play.google.com/store/apps/details?id=com.tuya.smartlife", "_blank");
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
