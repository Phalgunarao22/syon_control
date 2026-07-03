import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { prisma } from "@workspace/db"
import { cacheLife, cacheTag } from "next/cache"
import { ProductContent } from "./ProductContent"


async function getCachedCategories() {
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

async function getCachedProducts() {
  "use cache"
  cacheTag("products")
  cacheLife("max")

  if (!process.env.DATABASE_URL) {
    return []
  }

  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true }
  })
}

export default async function ProductsPage() {
  const categories = await getCachedCategories()
  const products = await getCachedProducts()

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-8 mt-[86px]">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-neutral-400 mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white">Products</span>
        </div>

        <ProductContent initialCategories={categories} initialProducts={products} />
      </main>

      <Footer />
    </div>
  )
}
