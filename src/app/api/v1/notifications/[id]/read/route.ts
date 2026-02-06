import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  await prisma.notification.updateMany({
    where: { id: params.id, userId: user!.id },
    data: { read: true },
  });
  return ok({ success: true });
}
