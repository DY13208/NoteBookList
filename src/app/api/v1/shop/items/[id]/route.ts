import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { error } = await requireUser(request);
  if (error) return error;

  const item = await prisma.shopItem.findUnique({ where: { id: params.id } });
  if (!item) return fail("Not found", 404, 404);
  return ok(item);
}
