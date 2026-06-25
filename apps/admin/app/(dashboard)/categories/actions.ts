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

export async function getUploadSignature() {
  await checkAuth();

  const timestamp = Math.round(Date.now() / 1000);
  const params = {
    folder: "syon_controls/categories",
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
    folder: "syon_controls/categories",
  };
}

export async function createCategory(name: string, imageUrl: string) {
  await checkAuth();

  const lastCategory = await prisma.category.findFirst({
    orderBy: { order: "desc" },
  });
  const newOrder = lastCategory ? lastCategory.order + 1 : 0;

  const category = await prisma.category.create({
    data: { name, image: imageUrl, order: newOrder },
  });

  await revalidateWebCache("categories");
  return category;
}

export async function deleteCategory(id: string) {
  await checkAuth();

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new Error("Category not found");

  const urlParts = category.image.split("/");
  const filePart = urlParts[urlParts.length - 1] || "";
  const publicIdWithFolder = "syon_controls/categories/" + filePart.split(".")[0];

  try {
    await cloudinary.uploader.destroy(publicIdWithFolder);
  } catch (error) {
    console.error("Failed to delete from Cloudinary:", error);
  }

  await prisma.category.delete({ where: { id } });
  await revalidateWebCache("categories");
}

export async function reorderCategories(orderedIds: string[]) {
  await checkAuth();
  
  for (let i = 0; i < orderedIds.length; i++) {
    await prisma.category.update({
      where: { id: orderedIds[i] },
      data: { order: i }
    });
  }
  await revalidateWebCache("categories");
}

export async function updateCategory(id: string, name: string, imageUrl?: string) {
  await checkAuth();

  const data: any = { name };
  if (imageUrl) {
    data.image = imageUrl;
  }

  const category = await prisma.category.update({
    where: { id },
    data,
  });

  await revalidateWebCache("categories");
  return category;
}
