import { redirect } from "next/navigation";
import { prisma } from "@workspace/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProductClient } from "./product-client";

export default async function ProductsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    redirect("/"); // Block access to unauthorized
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex-1 p-8 pt-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Products Management</h2>
        <p className="text-neutral-500 mt-1">Manage all products in the catalog.</p>
      </div>

      <ProductClient initialProducts={products} categories={categories} />
    </div>
  );
}
