import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
  due_at: z.string().datetime().optional().nullable(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const project = await prisma.project.findFirst({
    where: { id: params.id, userId: user!.id },
    include: { tasks: true, resources: true },
  });
  if (!project) return fail("Not found", 404, 404);
  return ok(project);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const project = await prisma.project.updateMany({
    where: { id: params.id, userId: user!.id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      status: parsed.data.status,
      progress: parsed.data.progress,
      dueAt: parsed.data.due_at ? new Date(parsed.data.due_at) : undefined,
    },
  });
  return ok(project);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  await prisma.project.deleteMany({
    where: { id: params.id, userId: user!.id },
  });
  return ok({ success: true });
}
