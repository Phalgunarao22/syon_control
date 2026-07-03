import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@workspace/db";

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "https://syon-control-admins.vercel.app",
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session is updated)
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "ADMIN",
      },
      permissions: {
        type: "string[]",
        required: false,
      },
      forcePasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
    },
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          // Enforce single session: delete all existing sessions for this user
          await prisma.session.deleteMany({
            where: {
              userId: session.userId,
            },
          });
          return { data: session };
        },
      },
    },
  },
});
