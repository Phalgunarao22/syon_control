// @ts-nocheck

import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { v2 as cloudinary } from "cloudinary";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaNeonHttp(
  process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy",
  { arrayMode: false, fullResults: true }
);

// single instance of prisma client -> prevent multiple instances in development
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// redis connection
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://dummy.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "dummy",
});

// resend for sending emails
export const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

// cloudinary for storing images and videos
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export * from "@prisma/client";
