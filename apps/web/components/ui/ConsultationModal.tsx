"use client"

import { useEffect, useRef, useState } from "react"

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

const SERVICES = [
  "Whole Home Automation",
  "Smart Lighting",
  "Home Security",
  "Climate Control",
  "Home Theater",
  "Energy Management",
]

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    service: "Whole Home Automation",
    phone: "",
    vision: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Escape key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      // Focus first input after animation
      setTimeout(() => firstInputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setErrors({})
      setSubmitted(false)
    }
  }, [isOpen])

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === backdropRef.current) onClose()
  }

  function validate() {
    const next: Record<string, string> = {}
    if (!formData.name.trim()) next.name = "Full name is required."
    if (!formData.phone.trim()) next.phone = "Phone number is required."
    if (!formData.vision.trim()) next.vision = "Please share your vision."
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto
        bg-black/80 backdrop-blur-sm
        transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-modal="true"
      role="dialog"
      aria-label="Consultation Modal"
    >
      <div
        className={`relative w-full max-w-[920px] my-auto
          bg-[#0C0C0C] rounded-[16px] sm:rounded-[24px]
          transition-all duration-300 ease-in-out
          ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full border border-white/10 bg-white/5
            flex items-center justify-center text-white/60
            hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
          {/* ─── LEFT SIDE ─── */}
          <div className="p-6 sm:p-8 lg:p-12 flex flex-col gap-6 sm:gap-8 justify-center">
            {/* Small title */}
            <p className="text-[#E5283F] text-xs font-bold tracking-[0.2em] uppercase">
              READY TO START
            </p>

            {/* Heading with underline effect */}
            <div>
              <h2 className="font-sans font-semibold text-white text-[28px] sm:text-[38px] lg:text-[44px] leading-[1.15]">
                Let&apos;s Build
              </h2>
              <div className="relative inline-block">
                <h2 className="font-sans font-semibold text-white text-[28px] sm:text-[38px] lg:text-[44px] leading-[1.15]">
                  Your Legacy
                </h2>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-5 mt-4">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#E5283F]/15 border border-[#E5283F]/30
                  flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#E5283F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                </div>
                <p className="text-white text-[13px] sm:text-[14px] font-normal leading-relaxed break-words">
                  0891-3188913 | 99858 41899 | 9392000999
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#E5283F]/15 border border-[#E5283F]/30
                  flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#E5283F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a
                  href="mailto:sales@syoncontrols.com"
                  className="text-white text-[14px] font-normal leading-relaxed hover:text-[#E5283F] transition-colors duration-200"
                >
                  sales@syoncontrols.com
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#E5283F]/15 border border-[#E5283F]/30
                  flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#E5283F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                </div>
                <p className="text-white text-[14px] font-normal leading-relaxed">
                  D.No: 1-113-10/1, 2<sup>nd</sup> Floor,<br />
                  Himasankaram Building,<br />
                  Near Ushodaya Junction,<br />
                  MVP Colony,<br />
                  Visakhapatnam-17
                </p>
              </div>
            </div>
          </div>

          {/* ─── RIGHT SIDE: Form Card ─── */}
          <div className="p-4 sm:p-4 lg:p-6 flex items-center">
            <div className="w-full bg-[#18191B] rounded-[20px] p-6 lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
                  <div className="w-16 h-16 rounded-full bg-[#E5283F]/10 border border-[#E5283F]/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#E5283F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">Request Sent!</h3>
                    <p className="text-[#888888] text-sm leading-relaxed">
                      Thank you! Our team will get in touch with you shortly to begin your consultation.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-[#E5283F] text-white font-semibold rounded-full text-sm hover:brightness-110 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Row: Name + Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#888888] text-[11px] font-semibold tracking-[0.12em] uppercase">
                        Full Name
                      </label>
                      <input
                        ref={firstInputRef}
                        type="text"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((p) => ({ ...p, name: e.target.value }))
                          if (errors.name) setErrors((p) => ({ ...p, name: "" }))
                        }}
                        className={`w-full bg-[#0C0C0C] text-white text-[14px] placeholder-[#444]
                          rounded-[10px] px-4 py-3 border outline-none transition-all duration-200
                          focus:border-[#E5283F]/50
                          ${errors.name ? "border-[#E5283F]/70" : "border-white/8"}`}
                      />
                      {errors.name && (
                        <span className="text-[#E5283F] text-[11px]">{errors.name}</span>
                      )}
                    </div>

                    {/* Service Needed */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#888888] text-[11px] font-semibold tracking-[0.12em] uppercase">
                        Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                        className="w-full bg-[#0C0C0C] text-white text-[14px]
                          rounded-[10px] px-4 py-3 border border-white/8 outline-none
                          focus:border-[#E5283F]/50 transition-all duration-200 cursor-pointer
                          appearance-none"
                      >
                        {SERVICES.map((s) => (
                          <option key={s} value={s} className="bg-[#0C0C0C]">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888888] text-[11px] font-semibold tracking-[0.12em] uppercase">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                        if (errors.phone) setErrors((p) => ({ ...p, phone: "" }))
                      }}
                      className={`w-full bg-[#0C0C0C] text-white text-[14px] placeholder-[#444]
                        rounded-[10px] px-4 py-3 border outline-none transition-all duration-200
                        focus:border-[#E5283F]/50
                        ${errors.phone ? "border-[#E5283F]/70" : "border-white/8"}`}
                    />
                    {errors.phone && (
                      <span className="text-[#E5283F] text-[11px]">{errors.phone}</span>
                    )}
                  </div>

                  {/* Vision */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888888] text-[11px] font-semibold tracking-[0.12em] uppercase">
                      Your Vision
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your property and goals"
                      value={formData.vision}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, vision: e.target.value }))
                        if (errors.vision) setErrors((p) => ({ ...p, vision: "" }))
                      }}
                      className={`w-full bg-[#0C0C0C] text-white text-[14px] placeholder-[#444]
                        rounded-[10px] px-4 py-3 border outline-none transition-all duration-200
                        focus:border-[#E5283F]/50 resize-none
                        ${errors.vision ? "border-[#E5283F]/70" : "border-white/8"}`}
                    />
                    {errors.vision && (
                      <span className="text-[#E5283F] text-[11px]">{errors.vision}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#E5283F] text-white font-semibold text-[15px] rounded-[10px]
                      hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]
                      transition-all duration-200 shadow-lg shadow-[#E5283F]/20 mt-1"
                  >
                    Begin Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
