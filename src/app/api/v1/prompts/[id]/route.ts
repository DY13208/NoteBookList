import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  title: z.string().min(1).optional(),
  category: z.string().optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  favorite: z.boolean().optional(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const prompt = await prisma.prompt.findFirst({
    where: { id: params.id, userId: user!.id },
  });
  if (!prompt) return fail("Not found", 404, 404);
  return ok(prompt);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const prompt = await prisma.prompt.updateMany({
    where: { id: params.id, userId: user!.id },
    data: parsed.data,
  });
  return ok(prompt);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  await prisma.prompt.deleteMany({
    where: { id: params.id, userId: user!.id },
  });
  return ok({ success: true });
}
