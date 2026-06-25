"use server";

import { prisma } from "@workspace/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createAdmin(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  
  if (!name || !email || !role) {
    throw new Error("Missing required fields");
  }

  // Use auth.api.signUpEmail on the server without passing headers so it doesn't set cookies
  const response = await auth.api.signUpEmail({
    body: {
      email,
      password: "password", // Default password
      name,
      role,
      forcePasswordChange: true,
    },
  });

  if (!response?.user) {
    throw new Error("Failed to create user");
  }

  revalidatePath("/users");
  return { success: true };
}

export async function deleteAdmin(userId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user.id === userId) {
    throw new Error("Cannot delete yourself");
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/users");
  return { success: true };
}

export async function revokeAdminSession(sessionId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  // Prevent revoking your own current session accidentally from the dashboard
  if (session.session.id === sessionId) {
    throw new Error("Cannot revoke your current session from here.");
  }

  await prisma.session.delete({
    where: { id: sessionId },
  });

  revalidatePath("/users/sessions");
  return { success: true };
}
