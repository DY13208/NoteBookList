import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const note = await prisma.note.findFirst({
    where: { id: params.id, userId: user!.id },
  });
  if (!note) return fail("Not found", 404, 404);

  const updated = await prisma.note.update({
    where: { id: note.id },
    data: { bookmarked: !note.bookmarked },
  });
  return ok(updated);
}
