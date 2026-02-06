import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  title: z.string().min(1).optional(),
  status: z.string().optional(),
  due_at: z.string().datetime().optional().nullable(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; task_id: string } },
) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const task = await prisma.projectTask.updateMany({
    where: { id: params.task_id, projectId: params.id, project: { userId: user!.id } },
    data: {
      title: parsed.data.title,
      status: parsed.data.status,
      dueAt: parsed.data.due_at ? new Date(parsed.data.due_at) : undefined,
    },
  });
  return ok(task);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; task_id: string } },
) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  await prisma.projectTask.deleteMany({
    where: { id: params.task_id, projectId: params.id, project: { userId: user!.id } },
  });
  return ok({ success: true });
}
