"use client"

import Link from "next/link"

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Applications", href: "#" },
  { label: "Contact", href: "#" },
]

const solutions = [
  { label: "Smart Lighting", href: "#" },
  { label: "Home Security", href: "#" },
  { label: "Climate", href: "#" },
  { label: "Control", href: "#" },
  { label: "Home Theater", href: "#" },
]

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-12 sm:py-14 lg:py-16">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-8">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-5 sm:gap-6 sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/images/syon_controls/SyonControls.jpg"
                alt="Syon Controls"
                className="h-24 w-auto object-contain transition-opacity duration-300 hover:opacity-90"
              />
            </Link>

            {/* Description */}
            <p className="text-[#888888] text-[14px] font-normal leading-[1.75] max-w-[280px] sm:max-w-[320px] lg:max-w-[240px]">
              Redefining luxury living through innovative automation. We create
              intelligent spaces that adapt to your lifestyle, ensuring comfort,
              security, and elegance.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="transition-transform duration-300 hover:scale-110"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                  <line x1="9" y1="11" x2="9" y2="17" />
                  <circle cx="9" cy="7.5" r="0.5" fill="currentColor" />
                  <path d="M13 17v-3.5a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5V17" />
                  <line x1="13" y1="11" x2="13" y2="17" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="transition-transform duration-300 hover:scale-110"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="16.5" cy="7.5" r="0.5" fill="currentColor" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="transition-transform duration-300 hover:scale-110"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                  <path d="M15 11h-3V9a1 1 0 0 1 1-1h2V5h-2a3 3 0 0 0-3 3v3H9v3h1v7h3v-7h2.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <h4 className="text-white font-semibold text-[15px] sm:text-[16px] tracking-wide">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 sm:gap-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#888888] text-[14px] font-normal leading-none transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Solutions */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <h4 className="text-white font-semibold text-[15px] sm:text-[16px] tracking-wide">
              Our Solutions
            </h4>
            <ul className="flex flex-col gap-3 sm:gap-4">
              {solutions.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#888888] text-[14px] font-normal leading-none transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <h4 className="text-white font-semibold text-[15px] sm:text-[16px] tracking-wide">
              Contact Us
            </h4>
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-5 h-5 rounded-full bg-[#E5283F]/20 border border-[#E5283F]/40 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#E5283F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                </div>
                <span className="text-white font-semibold text-[14px] sm:text-[15px]">
                  0891-3188913
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#E5283F]/20 border border-[#E5283F]/40 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#E5283F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                </div>
                <p className="text-[#888888] text-[13px] sm:text-[14px] leading-[1.75]">
                  D.No: 1-113-10/1, 2<sup>nd</sup> Floor,<br />
                  Himasankaram Building,<br />
                  Near Ushodaya Junction,<br />
                  MVP Colony,<br />
                  Visakhapatnam-17
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-14 lg:mt-16 pt-5 sm:pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[#555555] text-[12px] sm:text-[13px] font-normal">
            © 2026 SYON Technologies. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 sm:gap-8">
            <a
              href="#"
              className="text-[#555555] text-[12px] sm:text-[13px] font-normal transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#555555] text-[12px] sm:text-[13px] font-normal transition-colors duration-200 hover:text-white"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
