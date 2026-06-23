import Navbar from "@/components/navbar/Navbar"
import Hero from "@/components/hero/Hero"
import SimplicitySection from "@/components/simplicity/SimplicitySection"
import LuxurySection from "@/components/luxury/LuxurySection"
import RoomsSection from "@/components/rooms/RoomsSection"
import SmartAppSection from "@/components/smart-app/SmartAppSection"
import BrandsSection from "@/components/brands/BrandsSection"
import CTASection from "@/components/cta/CTASection"
import Footer from "@/components/footer/Footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <SimplicitySection />
      <LuxurySection />
      <RoomsSection />
      <SmartAppSection />
      <BrandsSection />
      <CTASection />
      <Footer />
    </>
  )
}
