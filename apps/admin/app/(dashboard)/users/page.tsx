import { redirect } from "next/navigation";
import { prisma } from "@workspace/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UsersClient } from "./users-client";

export default async function UsersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/"); // Block access to non-super admins
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      forcePasswordChange: true,
      sessions: true,
    },
  });

  return (
    <div className="flex-1 p-8 pt-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Admin Management</h2>
        <p className="text-neutral-500 mt-1">Manage administrators and their roles within the portal.</p>
      </div>

      <UsersClient initialUsers={users} currentUserId={session.user.id} />
    </div>
  );
}
