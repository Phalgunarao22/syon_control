"use client"

import { useState, useEffect } from "react"
import { Star, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@workspace/ui/components/dialog"

export function ProductGrid({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (selectedProduct) {
      setCurrentImageIndex(0)
    }
  }, [selectedProduct])

  const nextImage = () => {
    if (!selectedProduct) return
    setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length)
  }

  const prevImage = () => {
    if (!selectedProduct) return
    setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length)
  }

  return (
    <>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? products.map((product) => (
          <div 
            key={product.id} 
            className="border border-neutral-800 rounded-2xl overflow-hidden bg-black flex flex-col hover:border-neutral-600 transition-colors p-4 group cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="aspect-square bg-black mb-4 flex items-center justify-center rounded-xl overflow-hidden relative">
               <div className="absolute inset-0 bg-neutral-900/50"></div>
               {product.images && product.images.length > 0 ? (
                 <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover z-10" />
               ) : (
                 <span className="text-neutral-500 text-sm z-10 flex flex-col items-center gap-2">
                   <ImageIcon className="w-8 h-8 opacity-50" />
                   Image Placeholder
                 </span>
               )}
            </div>
            <div className="flex flex-col gap-2 px-1 pb-2">
              <h3 className="text-[#ff1a1a] text-sm font-medium line-clamp-1">{product.name}</h3>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? 'fill-white text-white' : 'fill-transparent text-neutral-600'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-neutral-500 bg-neutral-900/20 rounded-xl border border-dashed border-neutral-800">
            No products found.
          </div>
        )}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-[90vw] md:max-w-[80vw] w-full bg-[#0a0a0a] border border-neutral-800 text-white p-6 md:p-10 rounded-2xl">
          {selectedProduct && (
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              <div className="w-full md:w-1/2">
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <div className="relative aspect-square w-full bg-black rounded-xl overflow-hidden border border-neutral-800 group/slider">
                    <img 
                      src={selectedProduct.images[currentImageIndex]} 
                      alt={`${selectedProduct.name} ${currentImageIndex + 1}`} 
                      className="w-full h-full object-cover transition-opacity duration-300" 
                    />
                    
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/slider:opacity-100"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/slider:opacity-100"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProduct.images.map((_: any, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-6 bg-[#ff1a1a]' : 'w-2 bg-white/50 hover:bg-white/80'}`} 
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="aspect-square bg-neutral-900/50 rounded-xl flex items-center justify-center border border-neutral-800">
                    <ImageIcon className="w-16 h-16 text-neutral-500" />
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col py-2">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl md:text-4xl font-bold text-[#ff1a1a] leading-tight">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="flex items-center gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.round(selectedProduct.rating) ? 'fill-white text-white' : 'fill-transparent text-neutral-600'}`} />
                  ))}
                  <span className="text-base text-neutral-400 ml-3">({selectedProduct.rating} Rating)</span>
                </div>

                <div className="flex-1">
                  <h4 className="text-xl font-medium text-white mb-4">Product Description</h4>
                  <DialogDescription className="text-neutral-300 text-lg leading-relaxed whitespace-pre-wrap max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                    {selectedProduct.description || "No description available."}
                  </DialogDescription>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
