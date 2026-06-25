"use client";

import { useState, useRef } from "react";
import { getUploadSignature, saveHeroSlide, deleteHeroSlide, invalidateHeroCache, reorderHeroSlides } from "./actions";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Upload, Trash2, RefreshCw, Image as ImageIcon, Video, ChevronLeft, ChevronRight, Maximize } from "lucide-react";

export function HeroClient({ initialSlides }: { initialSlides: any[] }) {
  const [slides, setSlides] = useState(initialSlides);
  const [isUploading, setIsUploading] = useState(false);
  const [isInvalidating, setIsInvalidating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;   // 5MB
  const MAX_VIDEO_SIZE = 20 * 1024 * 1024;  // 20MB

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      setError("Please select a valid image or video file.");
      return;
    }
    if (isImage && file.size > MAX_IMAGE_SIZE) {
      setError("Image file size must be less than 5MB.");
      return;
    }
    if (isVideo && file.size > MAX_VIDEO_SIZE) {
      setError("Video file size must be less than 20MB.");
      return;
    }

    // Reject portrait/vertical media — hero is a wide landscape banner
    const objectUrl = URL.createObjectURL(file);
    try {
      if (isImage) {
        const dims = await new Promise<{ w: number; h: number }>((res, rej) => {
          const img = new window.Image();
          img.onload = () => res({ w: img.naturalWidth, h: img.naturalHeight });
          img.onerror = rej;
          img.src = objectUrl;
        });
        if (dims.h > dims.w) {
          setError(`Portrait images are not allowed. Your image is ${dims.w}×${dims.h}px — please use a landscape (wider than tall) image.`);
          return;
        }
      } else {
        const dims = await new Promise<{ w: number; h: number }>((res, rej) => {
          const vid = document.createElement("video");
          vid.onloadedmetadata = () => res({ w: vid.videoWidth, h: vid.videoHeight });
          vid.onerror = rej;
          vid.src = objectUrl;
        });
        if (dims.h > dims.w) {
          setError(`Portrait videos are not allowed. Your video is ${dims.w}×${dims.h}px — please use a landscape (wider than tall) video.`);
          return;
        }
      }
    } finally {
      URL.revokeObjectURL(objectUrl);
    }

    setIsUploading(true);
    setUploadProgress(0);


    try {
      // Step 1: Get a signed upload token from our server (no file sent)
      const sig = await getUploadSignature(isVideo ? "video" : "image");

      // Step 2: Upload file directly from the browser to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", sig.apiKey);
      formData.append("timestamp", String(sig.timestamp));
      formData.append("signature", sig.signature);
      formData.append("folder", sig.folder);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/${sig.resourceType}/upload`;

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
        }
      };

      const cloudinaryResult: any = await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
          else reject(new Error("Cloudinary upload failed: " + xhr.responseText));
        };
        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.open("POST", uploadUrl);
        xhr.send(formData);
      });

      // Step 3: Tell our server to save the resulting URL to DB (no file data)
      const newSlide = await saveHeroSlide(
        cloudinaryResult.secure_url,
        cloudinaryResult.public_id,
        isVideo ? "video" : "image"
      );

      setSlides((prev: any[]) => [...prev, newSlide]);
    } catch (err: any) {
      setError(err.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    
    try {
      await deleteHeroSlide(id);
      setSlides(slides.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete slide");
    }
  };

  const handleInvalidate = async () => {
    setIsInvalidating(true);
    try {
      await invalidateHeroCache();
      alert("Frontend cache successfully invalidated!");
    } catch (err: any) {
      alert(err.message || "Failed to invalidate cache");
    } finally {
      setIsInvalidating(false);
    }
  };

  const moveSlide = async (index: number, direction: -1 | 1) => {
    const newSlides = [...slides];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;
    
    // Swap
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;
    
    // Optimistic update
    setSlides(newSlides);
    
    try {
      await reorderHeroSlides(newSlides.map(s => s.id));
    } catch (err: any) {
      alert("Failed to reorder: " + err.message);
      // Revert on failure
      setSlides(slides);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            accept="image/*,video/*" 
            className="hidden" 
          />
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            disabled={isUploading}
            className="bg-violet-600 hover:bg-violet-700 text-white min-w-[160px]"
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                {uploadProgress > 0 ? `Uploading ${uploadProgress}%` : "Preparing..."}
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload New Slide
              </>
            )}
          </Button>
          {error && <span className="text-red-500 text-sm font-medium">{error}</span>}
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleInvalidate} 
          disabled={isInvalidating}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isInvalidating ? 'animate-spin' : ''}`} />
          Invalidate Web Cache
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {slides.map((slide, index) => (
          <Card key={slide.id} className="overflow-hidden group relative border-neutral-200 hover:border-violet-500 transition-colors">
            <div className="aspect-video relative bg-neutral-100 flex items-center justify-center">
              {slide.type === "video" ? (
                <>
                  <video 
                    src={slide.src} 
                    className="object-cover w-full h-full"
                    muted 
                    loop 
                    playsInline 
                  />
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium flex items-center gap-1">
                    <Video className="w-3 h-3" /> Video
                  </div>
                </>
              ) : (
                <>
                  <img src={slide.src} alt="Hero Slide" className="object-cover w-full h-full" />
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> Image
                  </div>
                </>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="icon"
                    className="h-8 w-8"
                    disabled={index === 0}
                    onClick={() => moveSlide(index, -1)}
                    title="Move Left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="h-8"
                    onClick={() => window.open(slide.src, "_blank")}
                  >
                    <Maximize className="w-4 h-4 mr-2" />
                    View Full
                  </Button>

                  <Button 
                    variant="secondary" 
                    size="icon"
                    className="h-8 w-8"
                    disabled={index === slides.length - 1}
                    onClick={() => moveSlide(index, 1)}
                    title="Move Right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(slide.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {slides.length === 0 && (
          <div className="col-span-full py-12 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
            No slides uploaded yet. Click the button above to add your first hero slide.
          </div>
        )}
      </div>
    </div>
  );
}
