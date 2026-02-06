import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const achievement = await prisma.achievement.findUnique({ where: { id: params.id } });
  if (!achievement) return fail("Not found", 404, 404);

  const state = await prisma.userAchievement.findUnique({
    where: { userId_achievementId: { userId: user!.id, achievementId: achievement.id } },
  });

  return ok({
    id: achievement.id,
    title: achievement.title,
    desc: achievement.desc,
    rarity: achievement.rarity,
    image_url: achievement.imageUrl,
    unlocked: state?.unlocked ?? false,
    progress: state?.progress ?? 0,
  });
}
