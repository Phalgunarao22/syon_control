"use client"

import { useState } from "react"
import { ProductGrid } from "./ProductGrid"

interface Category {
  id: string
  name: string
  order: number
  createdAt: Date
  updatedAt: Date
}

interface Product {
  id: string
  name: string
  description: string | null
  rating: number
  images: string[]
  categoryId: string
  createdAt: Date
  updatedAt: Date
  category: Category
}

export function ProductContent({
  initialCategories,
  initialProducts,
}: {
  initialCategories: Category[]
  initialProducts: Product[]
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState<string>("Best match")

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleResetCategories = () => {
    setSelectedCategories([])
  }

  // Filter products by selected categories
  const filteredProducts =
    selectedCategories.length === 0
      ? initialProducts
      : initialProducts.filter((product) =>
          selectedCategories.includes(product.categoryId)
        )

  // Sort products (if sort state changes, we can sort them)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "Price: low to high") {
      // Assuming price is not in the schema since it's not in the grid, but if it is we'd sort.
      // Since there's no price field, we keep order or sort by name/createdAt.
      return 0
    }
    if (selectedSort === "Price: high to low") {
      return 0
    }
    if (selectedSort === "Name") {
      return a.name.localeCompare(b.name)
    }
    if (selectedSort === "Most popular") {
      return b.rating - a.rating
    }
    // "Best match" (default order, which is desc by createdAt from initialProducts)
    return 0
  })

  return (
    <div className="flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full md:w-[312px] flex-shrink-0 space-y-12">
        {/* Sort By Section */}
        <div className="w-full md:w-[278px]">
          <div className="flex items-center justify-between mb-6 h-[24px]">
            <h2 className="text-[#ff1a1a] font-medium text-lg">Sort By</h2>
            <button
              onClick={() => setSelectedSort("Best match")}
              className="text-xs text-neutral-300 hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="space-y-[12px]">
            {["Best match", "Price: low to high", "Price: high to low", "Name", "Most popular"].map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setSelectedSort(option)}
              >
                <div className="w-5 h-5 rounded-sm bg-white flex items-center justify-center shrink-0">
                  {selectedSort === option && (
                    <div className="w-3 h-3 bg-black rounded-sm" />
                  )}
                </div>
                <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="w-full md:w-[312px]">
          <div className="flex items-center justify-between mb-6 h-[24px]">
            <h2 className="text-[#ff1a1a] font-medium text-lg">Categories</h2>
            <button
              onClick={handleResetCategories}
              className="text-xs text-neutral-300 hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="space-y-[12px]">
            {initialCategories.length > 0 ? (
              initialCategories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  <div className="w-5 h-5 rounded-sm bg-white flex items-center justify-center shrink-0">
                    {selectedCategories.includes(category.id) && (
                      <div className="w-3 h-3 bg-black rounded-sm" />
                    )}
                  </div>
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {category.name}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-sm text-neutral-500">No categories found.</p>
            )}
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <ProductGrid products={sortedProducts} />
    </div>
  )
}
