import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; tag: string } },
) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const item = await prisma.item.findFirst({
    where: { id: params.id, userId: user!.id },
  });
  if (!item) return fail("Not found", 404, 404);

  const updated = await prisma.item.update({
    where: { id: item.id },
    data: { tags: item.tags.filter((tag) => tag !== params.tag) },
  });
  return ok(updated);
}
