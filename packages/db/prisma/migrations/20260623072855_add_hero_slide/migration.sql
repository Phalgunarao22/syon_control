-- CreateTable
CREATE TABLE "hero_slide" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'image',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hero_slide_pkey" PRIMARY KEY ("id")
);
