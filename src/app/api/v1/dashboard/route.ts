import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const [recentNotes, tasks] = await Promise.all([
    prisma.note.findMany({
      where: { userId: user!.id },
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, updatedAt: true },
    }),
    prisma.projectTask.findMany({
      where: { project: { userId: user!.id } },
      orderBy: { updatedAt: "desc" },
      take: 3,
      select: { id: true, title: true, status: true, dueAt: true },
    }),
  ]);

  return ok({
    greeting: "Good morning",
    user: {
      id: user!.id,
      name: user!.name,
      avatar_url: user!.avatarUrl,
    },
    weekly_insight: {
      progress_percent: 100,
      title: "Weekly Insight",
      description: "Keep the streak going!",
    },
    today_focus: tasks.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      due_at: task.dueAt,
    })),
    recent_notes: recentNotes.map((note) => ({
      id: note.id,
      title: note.title,
      updated_at: note.updatedAt,
    })),
  });
}
