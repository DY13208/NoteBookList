import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  tag: z.string().min(1),
});

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const item = await prisma.item.findFirst({
    where: { id: params.id, userId: user!.id },
  });
  if (!item) return fail("Not found", 404, 404);

  const tags = item.tags.includes(parsed.data.tag)
    ? item.tags
    : [...item.tags, parsed.data.tag];

  const updated = await prisma.item.update({
    where: { id: item.id },
    data: { tags },
  });
  return ok(updated);
}
