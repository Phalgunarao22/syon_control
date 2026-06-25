/**
 * Seed script: creates the SUPER_ADMIN user with a bcrypt-hashed password
 * using better-auth's own hashing so it works correctly at login.
 *
 * Usage:
 *   pnpm --filter @workspace/db seed
 *
 * Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD in packages/db/.env
 * (or pass them as env vars) before running.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

// better-auth's own hasher — same algorithm used internally at sign-in
import { hashPassword } from "better-auth/crypto";

async function main() {
  const email = "sachindra@sisyaclass.com";
  const password = "1234567890";
  const name = "Sachindra";

  if (!email || !password) {
    console.error(
      "❌  Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD in packages/db/.env"
    );
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("❌  DATABASE_URL is not set");
    process.exit(1);
  }

  const adapter = new PrismaNeonHttp(process.env.DATABASE_URL, {
    arrayMode: false,
    fullResults: true,
  });

  const prisma = new PrismaClient({ adapter });

  // Check if super admin already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`ℹ️   User ${email} already exists (role: ${existing.role}). Skipping.`);
    await prisma.$disconnect();
    return;
  }

  // Hash with the same algorithm better-auth uses internally (scrypt)
  const hashedPassword = await hashPassword(password);

  // Create the user and their credential account (HTTP mode doesn't support transactions,
  // but this is safe — we already verified the user doesn't exist above)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      emailVerified: true,
      role: "SUPER_ADMIN",
      permissions: ["full_access"],
    },
  });

  await prisma.account.create({
    data: {
      accountId: user.id,
      providerId: "credential",
      userId: user.id,
      password: hashedPassword,
    },
  });

  console.log(`✅  Super admin created:`);
  console.log(`    Email:  ${user.email}`);
  console.log(`    Name:   ${user.name}`);
  console.log(`    Role:   ${user.role}`);
  console.log(`    ID:     ${user.id}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
