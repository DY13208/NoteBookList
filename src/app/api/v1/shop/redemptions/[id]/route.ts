import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const redemption = await prisma.redemption.findFirst({
    where: { id: params.id, userId: user!.id },
    include: { item: true },
  });
  if (!redemption) return fail("Not found", 404, 404);
  return ok(redemption);
}
