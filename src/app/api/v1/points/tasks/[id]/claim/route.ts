import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const task = await prisma.pointTask.findUnique({ where: { id: params.id } });
  if (!task) return fail("Not found", 404, 404);

  const state = await prisma.pointTaskState.findUnique({
    where: { userId_taskId: { userId: user!.id, taskId: task.id } },
  });
  if (!state) {
    return fail("Task not completed", 400, 400);
  }
  if (state.status === "claimed") {
    return fail("Task already claimed", 409, 409);
  }
  if (state.status !== "done") {
    return fail("Task not completed", 400, 400);
  }

  await prisma.$transaction([
    prisma.pointTaskState.update({
      where: { userId_taskId: { userId: user!.id, taskId: task.id } },
      data: { status: "claimed" },
    }),
    prisma.pointTransaction.create({
      data: {
        userId: user!.id,
        amount: task.reward,
        type: "task_claim",
        meta: { taskId: task.id },
      },
    }),
    prisma.user.update({
      where: { id: user!.id },
      data: { pointsBalance: { increment: task.reward } },
    }),
  ]);

  return ok({ success: true, reward: task.reward });
}
