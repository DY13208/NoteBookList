import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const patchSchema = z.object({
  name: z.string().min(1).optional(),
  username: z.string().min(3).optional(),
  avatar_url: z.string().url().optional(),
  settings: z.record(z.any()).optional(),
});

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  return ok({
    id: user!.id,
    name: user!.name,
    username: user!.username,
    email: user!.email,
    phone: user!.phone,
    avatar_url: user!.avatarUrl,
    level: user!.level,
    points: user!.pointsBalance,
    settings: user!.settings ?? {},
  });
}

export async function PATCH(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  if (parsed.data.username && parsed.data.username !== user!.username) {
    const exists = await prisma.user.findUnique({ where: { username: parsed.data.username } });
    if (exists) return fail("Username already exists", 409, 409);
  }

  const updated = await prisma.user.update({
    where: { id: user!.id },
    data: {
      name: parsed.data.name,
      username: parsed.data.username,
      avatarUrl: parsed.data.avatar_url,
      settings: parsed.data.settings ? parsed.data.settings : undefined,
    },
  });

  return ok({
    id: updated.id,
    name: updated.name,
    username: updated.username,
    avatar_url: updated.avatarUrl,
    settings: updated.settings ?? {},
  });
}
