import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const task = await prisma.pointTask.findFirst({ where: { kind: "share_progress" } });
  if (!task) return fail("Task not found", 404, 404);

  await prisma.pointTaskState.upsert({
    where: { userId_taskId: { userId: user!.id, taskId: task.id } },
    update: { status: "done", progress: 100 },
    create: { userId: user!.id, taskId: task.id, status: "done", progress: 100 },
  });

  return ok({ success: true, task_id: task.id });
}
