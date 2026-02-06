import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const [notesCount, projectsCount, promptsCount] = await Promise.all([
    prisma.note.count({ where: { userId: user!.id } }),
    prisma.project.count({ where: { userId: user!.id } }),
    prisma.prompt.count({ where: { userId: user!.id } }),
  ]);

  const completionRate = projectsCount === 0 ? 0 : Math.min(100, Math.round((projectsCount / (projectsCount + 2)) * 100));
  const studyHours = Math.round(notesCount * 0.75);

  return ok({
    courses_count: promptsCount,
    completion_rate: completionRate,
    study_hours: studyHours,
  });
}
