import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image_url: z.string().url().optional().nullable(),
  category: z.string().optional(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const item = await prisma.item.findFirst({
    where: { id: params.id, userId: user!.id },
  });
  if (!item) return fail("Not found", 404, 404);
  return ok(item);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const item = await prisma.item.updateMany({
    where: { id: params.id, userId: user!.id },
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      tags: parsed.data.tags,
      imageUrl: parsed.data.image_url ?? undefined,
      category: parsed.data.category,
    },
  });
  return ok(item);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  await prisma.item.deleteMany({
    where: { id: params.id, userId: user!.id },
  });
  return ok({ success: true });
}
