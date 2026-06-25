"use server";

import { revalidateTag } from "next/cache";
import { prisma, cloudinary } from "@workspace/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function checkAdminAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }
}

// Helper to revalidate the web app's cache across process boundaries
async function revalidateWebCache(tag: string) {
  // Revalidate internal cache
  revalidateTag(tag, "default");
  
  // Revalidate web app cache via internal API
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";
  try {
    await fetch(`${webUrl}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidation-secret": process.env.REVALIDATION_SECRET || "",
      },
      body: JSON.stringify({ tag }),
    });
  } catch (error) {
    console.error("Failed to revalidate web cache:", error);
  }
}

/**
 * Step 1: Client calls this to get a signed upload signature.
 * No file data is sent to our server — just auth credentials for Cloudinary.
 */
export async function getUploadSignature(resourceType: "image" | "video") {
  await checkAdminAuth();

  const timestamp = Math.round(Date.now() / 1000);
  const params = {
    folder: "syon_controls/hero",
    timestamp,
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    folder: "syon_controls/hero",
    resourceType,
  };
}

/**
 * Step 2: After the browser uploads directly to Cloudinary, it calls this
 * to save the resulting URL and public_id to our database.
 */
export async function saveHeroSlide(secureUrl: string, publicId: string, type: "image" | "video") {
  await checkAdminAuth();

  const lastSlide = await prisma.heroSlide.findFirst({
    orderBy: { order: "desc" },
  });
  const newOrder = lastSlide ? lastSlide.order + 1 : 0;

  const slide = await prisma.heroSlide.create({
    data: { src: secureUrl, type, order: newOrder },
  });

  await revalidateWebCache("hero-slides");
  return slide;
}

export async function deleteHeroSlide(id: string) {
  await checkAdminAuth();

  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) throw new Error("Slide not found");

  // Extract public_id from Cloudinary URL
  const urlParts = slide.src.split("/");
  const filePart = urlParts[urlParts.length - 1] || "";
  const publicIdWithFolder = "syon_controls/hero/" + filePart.split(".")[0];

  try {
    await cloudinary.uploader.destroy(publicIdWithFolder, {
      resource_type: slide.type === "video" ? "video" : "image",
    });
  } catch (error) {
    console.error("Failed to delete from Cloudinary:", error);
    // Proceed to delete from DB even if Cloudinary delete fails
  }

  await prisma.heroSlide.delete({ where: { id } });
  await revalidateWebCache("hero-slides");
}

export async function invalidateHeroCache() {
  await checkAdminAuth();
  await revalidateWebCache("hero-slides");
}

export async function reorderHeroSlides(orderedIds: string[]) {
  await checkAdminAuth();
  
  // Update order based on index in array
  for (let i = 0; i < orderedIds.length; i++) {
    await prisma.heroSlide.update({
      where: { id: orderedIds[i] },
      data: { order: i }
    });
  }
  await revalidateWebCache("hero-slides");
}
