import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  await prisma.notification.updateMany({
    where: { userId: user!.id, read: false },
    data: { read: true },
  });
  return ok({ success: true });
}
