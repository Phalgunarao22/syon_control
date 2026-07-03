"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useModal } from "@/components/ui/ModalProvider"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Connect", href: "#" },
  { label: "Products", href: "/products" }
] as const

function SyonLogo() {
  return (
    <Link href="/" className="flex items-center group" aria-label="Syon Controls Home">
      <img
        src="/images/syon_controls/SyonControls.jpg"
        alt="Syon Controls"
        className="h-20 sm:h-20 w-auto object-contain transition-opacity duration-300 hover:opacity-90"
      />
    </Link>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openModal } = useModal()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-black transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-black/40" : ""
        }`}
    >
      <div className="mx-auto max-w-[1440px] h-[86px] flex items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <SyonLogo />

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white text-sm font-medium tracking-wide relative
                after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0
                after:bg-[#E63050] after:transition-all after:duration-300
                hover:after:w-full hover:text-[#E63050] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          {/* Get a Quote Button */}
          <button
            onClick={openModal}
            className="ml-4 inline-flex items-center justify-center px-7 py-2.5
              bg-[#E63050] text-white text-sm font-semibold rounded-full
              border border-[#E63050]
              hover:bg-transparent hover:text-[#E63050]
              transition-all duration-300 ease-in-out"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="flex flex-col items-center justify-center gap-[5px]">
            <span
              className={`block h-[2px] w-6 bg-white rounded-full transition-all duration-300 ease-in-out ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
            />
            <span
              className={`block h-[2px] w-6 bg-white rounded-full transition-all duration-300 ease-in-out ${mobileOpen ? "opacity-0 scale-0" : ""
                }`}
            />
            <span
              className={`block h-[2px] w-6 bg-white rounded-full transition-all duration-300 ease-in-out ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-[86px] bg-black/95 backdrop-blur-sm
          transition-all duration-400 ease-in-out ${mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`flex flex-col items-center pt-12 gap-8 transition-transform duration-400 ease-in-out ${mobileOpen ? "translate-y-0" : "-translate-y-6"
            }`}
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white text-lg font-medium tracking-wide
                hover:text-[#E63050] transition-colors duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => { openModal(); setMobileOpen(false) }}
            className="mt-4 inline-flex items-center justify-center px-10 py-3
              bg-[#E63050] text-white text-base font-semibold rounded-full
              border border-[#E63050]
              hover:bg-transparent hover:text-[#E63050]
              transition-all duration-300 ease-in-out"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </nav>
  )
}
