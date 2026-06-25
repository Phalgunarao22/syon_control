"use server";

import { revalidateTag } from "next/cache";
import { prisma, cloudinary } from "@workspace/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function checkAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    throw new Error("Unauthorized");
  }
}

// Helper to revalidate the web app's cache
async function revalidateWebCache(tag: string) {
  revalidateTag(tag, "default");
  
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

export async function getProductUploadSignature() {
  await checkAuth();

  const timestamp = Math.round(Date.now() / 1000);
  const params = {
    folder: "syon_controls/products",
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
    folder: "syon_controls/products",
  };
}

export async function createProduct(data: { name: string, description: string, images: string[], categoryId: string, rating: number }) {
  await checkAuth();

  const product = await prisma.product.create({
    data,
    include: { category: true }
  });

  await revalidateWebCache("products");
  return product;
}

export async function updateProduct(id: string, data: { name: string, description: string, images: string[], categoryId: string, rating: number }) {
  await checkAuth();

  const product = await prisma.product.update({
    where: { id },
    data,
    include: { category: true }
  });

  await revalidateWebCache("products");
  return product;
}

export async function deleteProduct(id: string) {
  await checkAuth();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error("Product not found");

  // Attempt to delete images from Cloudinary
  for (const url of product.images) {
    try {
      const urlParts = url.split("/");
      const filePart = urlParts[urlParts.length - 1] || "";
      const publicIdWithFolder = "syon_controls/products/" + filePart.split(".")[0];
      await cloudinary.uploader.destroy(publicIdWithFolder);
    } catch (error) {
      console.error("Failed to delete from Cloudinary:", error);
    }
  }

  await prisma.product.delete({ where: { id } });
  await revalidateWebCache("products");
}
