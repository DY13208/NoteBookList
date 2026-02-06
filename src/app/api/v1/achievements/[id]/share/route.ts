import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const achievement = await prisma.achievement.findUnique({ where: { id: params.id } });
  if (!achievement) return fail("Not found", 404, 404);

  const share = await prisma.achievementShare.create({
    data: { userId: user!.id, achievementId: achievement.id },
  });
  return ok({ share_id: share.id });
}
