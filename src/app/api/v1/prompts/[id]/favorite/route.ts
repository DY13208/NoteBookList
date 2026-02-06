import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const prompt = await prisma.prompt.findFirst({
    where: { id: params.id, userId: user!.id },
  });
  if (!prompt) return fail("Not found", 404, 404);

  const updated = await prisma.prompt.update({
    where: { id: prompt.id },
    data: { favorite: !prompt.favorite },
  });
  return ok(updated);
}
