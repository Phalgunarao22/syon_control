import { prisma } from "@workspace/db";
import { cacheLife, cacheTag } from "next/cache";
import HeroClient from "./HeroClient";

async function getCachedSlides() {
  "use cache";
  cacheTag("hero-slides");
  cacheLife("max"); // or another built-in profile like 'minutes', 'default'

  if (!process.env.DATABASE_URL) {
    return [];
  }

  return prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      type: true,
      src: true,
    },
  });
}

export default async function Hero() {
  const slides = await getCachedSlides();

  return <HeroClient slides={slides} />;
}
