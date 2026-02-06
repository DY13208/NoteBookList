import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/response";

export async function GET(request: Request, { params }: { params: { share_id: string } }) {
  const share = await prisma.achievementShare.findUnique({
    where: { id: params.share_id },
    include: { achievement: true, user: true },
  });
  if (!share) return fail("Not found", 404, 404);

  return ok({
    id: share.id,
    user: {
      id: share.user.id,
      name: share.user.name,
      avatar_url: share.user.avatarUrl,
    },
    achievement: {
      id: share.achievement.id,
      title: share.achievement.title,
      desc: share.achievement.desc,
      rarity: share.achievement.rarity,
      image_url: share.achievement.imageUrl,
    },
    created_at: share.createdAt,
  });
}
