import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function POST(
  request: Request,
  { params }: { params: { id: string; task_id: string } },
) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const task = await prisma.projectTask.findFirst({
    where: { id: params.task_id, projectId: params.id, project: { userId: user!.id } },
  });
  if (!task) return fail("Not found", 404, 404);

  const status = task.status === "done" ? "todo" : "done";
  const updated = await prisma.projectTask.update({
    where: { id: task.id },
    data: { status },
  });
  return ok(updated);
}
