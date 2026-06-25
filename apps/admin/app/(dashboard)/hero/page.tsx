import { redirect } from "next/navigation";
import { prisma } from "@workspace/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { HeroClient } from "./hero-client";

export default async function HeroPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/"); // Block access to non-super admins
  }

  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="flex-1 p-8 pt-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Hero Content Management</h2>
        <p className="text-neutral-500 mt-1">Manage the image and video slides displayed on the main website's hero section.</p>
      </div>

      <HeroClient initialSlides={slides} />
    </div>
  );
}
