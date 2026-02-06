import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  notifications: z.boolean().optional(),
  privacy_mode: z.boolean().optional(),
  ai_persona: z.string().optional(),
});

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  return ok(user!.settings ?? {});
}

export async function PATCH(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const settings = { ...(user!.settings ?? {}), ...parsed.data };
  const updated = await prisma.user.update({
    where: { id: user!.id },
    data: { settings },
  });
  return ok(updated.settings ?? {});
}
