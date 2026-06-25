"use client";

import { useState, useRef } from "react";
import { getProductUploadSignature, createProduct, deleteProduct, updateProduct } from "./actions";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@workspace/ui/components/dialog";
import { Plus, Trash2, Edit2, Loader2, Star, CheckCircle2, Image as ImageIcon } from "lucide-react";

export function ProductClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [rating, setRating] = useState("5");
  const [images, setImages] = useState<string[]>([]); // URLs of currently uploaded images
  
  const [error, setError] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setEditingProduct(null);
    setName("");
    setDescription("");
    setCategoryId("");
    setRating("5");
    setImages([]);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openAddModal = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setCategoryId(product.categoryId);
    setRating(String(product.rating));
    setImages([...product.images]);
    setError("");
    setIsDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError("");

    try {
      const sig = await getProductUploadSignature();
      const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;
      
      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", sig.apiKey);
        formData.append("timestamp", String(sig.timestamp));
        formData.append("signature", sig.signature);
        formData.append("folder", sig.folder);

        const res = await fetch(uploadUrl, { method: "POST", body: formData });
        if (!res.ok) throw new Error(`Failed to upload image ${file.name}`);
        
        const result = await res.json();
        newUrls.push(result.secure_url);
      }

      setImages((prev) => [...prev, ...newUrls]);
    } catch (err: any) {
      setError(err.message || "Failed to upload images");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const setPrimaryThumbnail = (index: number) => {
    const newImages = [...images];
    const [selected] = newImages.splice(index, 1);
    if (selected) newImages.unshift(selected);
    setImages(newImages);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required");
    if (!description.trim()) return setError("Description is required");
    if (!categoryId) return setError("Category is required");
    if (images.length === 0) return setError("At least one product image is required");

    setIsUploading(true);
    setError("");

    try {
      const data = {
        name: name.trim(),
        description: description.trim(),
        categoryId,
        rating: parseFloat(rating) || 5,
        images,
      };

      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, data);
        setProducts(products.map(p => p.id === updated.id ? updated : p));
      } else {
        const created = await createProduct(data);
        setProducts([created, ...products]);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button onClick={openAddModal} className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group relative border-neutral-200 hover:border-violet-500 transition-colors flex flex-col">
            <div className="aspect-square relative bg-neutral-100 flex items-center justify-center overflow-hidden">
              {product.images.length > 0 ? (
                <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
              ) : (
                <ImageIcon className="w-12 h-12 text-neutral-300" />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                <Button variant="secondary" size="sm" onClick={() => openEditModal(product)} className="w-24">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)} className="w-24">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-neutral-100 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-neutral-900 line-clamp-1" title={product.name}>{product.name}</h3>
                <div className="flex items-center text-amber-500 text-sm font-medium ml-2 shrink-0">
                  <Star className="w-3 h-3 fill-amber-500 mr-1" />
                  {product.rating}
                </div>
              </div>
              <p className="text-sm text-neutral-500 mb-2">{product.category?.name}</p>
              <p className="text-sm text-neutral-400 line-clamp-2 mt-auto">{product.description}</p>
            </div>
          </Card>
        ))}
        {products.length === 0 && (
          <div className="col-span-full py-12 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
            No products found. Click the button above to add your first product.
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Wireless Noise-Cancelling Headphones" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  disabled={isUploading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={categoryId} onValueChange={(val) => setCategoryId(val || "")} disabled={isUploading}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input 
                  id="rating" 
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)} 
                  disabled={isUploading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Detailed description of the product..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                disabled={isUploading}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Product Images</Label>
                <div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    ref={fileInputRef} 
                    onChange={handleFileUpload}
                    className="hidden" 
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    Upload Images
                  </Button>
                </div>
              </div>

              {images.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                  {images.map((url, i) => (
                    <div key={url} className={`relative group aspect-square rounded-md overflow-hidden border-2 ${i === 0 ? 'border-violet-500' : 'border-transparent'}`}>
                      <img src={url} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                      
                      {i === 0 && (
                        <div className="absolute top-1 left-1 bg-violet-500 text-white rounded-full p-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        {i !== 0 && (
                          <Button type="button" variant="secondary" size="sm" className="h-6 text-[10px] px-2" onClick={() => setPrimaryThumbnail(i)}>
                            Set Primary
                          </Button>
                        )}
                        <Button type="button" variant="destructive" size="icon" className="h-6 w-6" onClick={() => removeImage(i)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed rounded-md text-center text-neutral-500 bg-neutral-50">
                  No images uploaded. The first image will be used as the primary thumbnail.
                </div>
              )}
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading} className="bg-violet-600 hover:bg-violet-700 text-white min-w-[120px]">
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
