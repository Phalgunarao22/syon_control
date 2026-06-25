"use client";

import { useState, useRef } from "react";
import { getUploadSignature, createCategory, deleteCategory, updateCategory } from "./actions";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@workspace/ui/components/dialog";
import { Plus, Trash2, Image as ImageIcon, Loader2, Edit2 } from "lucide-react";

export function CategoryClient({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAddModal = () => {
    setEditingCategory(null);
    setName("");
    setError("");
    setIsDialogOpen(true);
  };

  const openEditModal = (category: any) => {
    setEditingCategory(category);
    setName(category.name);
    setError("");
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    const file = fileInputRef.current?.files?.[0];
    
    if (!editingCategory && !file) {
      setError("Please select an image for the new category.");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      let uploadedUrl: string | undefined = undefined;

      if (file) {
        // 1. Get Cloudinary signed URL
        const sig = await getUploadSignature();

        // 2. Upload file to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", sig.apiKey);
        formData.append("timestamp", String(sig.timestamp));
        formData.append("signature", sig.signature);
        formData.append("folder", sig.folder);

        const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;
        const res = await fetch(uploadUrl, { method: "POST", body: formData });
        
        if (!res.ok) {
          throw new Error("Failed to upload image to Cloudinary.");
        }
        
        const cloudinaryResult = await res.json();
        uploadedUrl = cloudinaryResult.secure_url;
      }

      // 3. Save to database
      if (editingCategory) {
        const updatedCategory = await updateCategory(editingCategory.id, name.trim(), uploadedUrl);
        setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
      } else {
        const newCategory = await createCategory(name.trim(), uploadedUrl!);
        setCategories([...categories, newCategory]);
      }
      
      setIsDialogOpen(false);
      setName("");
      setEditingCategory(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
    } catch (err: any) {
      setError(err.message || "Failed to save category");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? All related products will also be deleted!")) return;
    
    try {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete category");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button onClick={openAddModal} className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden group relative border-neutral-200 hover:border-violet-500 transition-colors">
            <div className="aspect-video relative bg-neutral-100 flex items-center justify-center">
              <img src={category.image} alt={category.name} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                <Button variant="secondary" size="sm" onClick={() => openEditModal(category)} className="w-24">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)} className="w-24">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-neutral-100">
              <h3 className="font-semibold text-neutral-900">{category.name}</h3>
            </div>
          </Card>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full py-12 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
            No categories yet. Click the button above to add one.
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Unrivaled Simplicity" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                disabled={isUploading}
              />
            </div>
            <div className="space-y-2">
              <Label>Category Image {editingCategory && <span className="text-neutral-400 text-xs font-normal ml-2">(Leave empty to keep current image)</span>}</Label>
              <Input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                disabled={isUploading} 
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading} className="bg-violet-600 hover:bg-violet-700 text-white min-w-[100px]">
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
