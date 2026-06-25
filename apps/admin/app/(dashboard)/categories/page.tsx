import { redirect } from "next/navigation";
import { prisma } from "@workspace/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CategoryClient } from "./category-client";
// Force recompile

export default async function CategoriesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    redirect("/"); // Block access to unauthorized
  }

  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="flex-1 p-8 pt-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Categories Management</h2>
        <p className="text-neutral-500 mt-1">Manage the product categories displayed on the website.</p>
      </div>

      <CategoryClient initialCategories={categories} />
    </div>
  );
}
