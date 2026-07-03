import Navbar from "@/components/navbar/Navbar"
import Hero from "@/components/hero/Hero"
import SimplicitySection from "@/components/simplicity/SimplicitySection"
import LuxurySection from "@/components/luxury/LuxurySection"
import RoomsSection from "@/components/rooms/RoomsSection"
import SmartAppSection from "@/components/smart-app/SmartAppSection"
import BrandsSection from "@/components/brands/BrandsSection"
import CTASection from "@/components/cta/CTASection"
import Footer from "@/components/footer/Footer"
import { prisma } from "@workspace/db"
import { cacheLife, cacheTag } from "next/cache"


async function getCategories() {
  "use cache"
  cacheTag("categories")
  cacheLife("max")

  if (!process.env.DATABASE_URL) {
    return []
  }

  return prisma.category.findMany({
    orderBy: { order: "asc" }
  })
}

export default async function Page() {
  const categories = await getCategories()

  return (
    <>
      <Navbar />
      <Hero />
      <SimplicitySection initialCategories={categories} />
      <LuxurySection />
      <RoomsSection />
      <SmartAppSection />
      <BrandsSection />
      <CTASection />
      <Footer />
    </>
  )
}
