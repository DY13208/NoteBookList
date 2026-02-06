import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const [achievements, userAchievements] = await Promise.all([
    prisma.achievement.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.userAchievement.findMany({ where: { userId: user!.id } }),
  ]);

  const stateMap = new Map(userAchievements.map((ua) => [ua.achievementId, ua]));
  const items = achievements.map((ach) => {
    const state = stateMap.get(ach.id);
    return {
      id: ach.id,
      title: ach.title,
      desc: ach.desc,
      rarity: ach.rarity,
      image_url: ach.imageUrl,
      unlocked: state?.unlocked ?? false,
      progress: state?.progress ?? 0,
      unlocked_at: state?.unlockedAt ?? null,
    };
  });

  return ok({ items });
}
