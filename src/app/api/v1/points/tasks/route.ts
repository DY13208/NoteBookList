import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const tasks = await prisma.pointTask.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
  const states = await prisma.pointTaskState.findMany({
    where: { userId: user!.id },
  });

  const stateMap = new Map(states.map((s) => [s.taskId, s]));
  const items = tasks.map((task) => {
    const state = stateMap.get(task.id);
    return {
      id: task.id,
      title: task.title,
      reward: task.reward,
      kind: task.kind,
      status: state?.status ?? "todo",
      progress: state?.progress ?? 0,
    };
  });

  return ok({ items });
}
