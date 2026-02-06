import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  mood: z.string().min(1),
});

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const moods = await prisma.mood.findMany({
    where: { userId: user!.id },
    orderBy: { createdAt: "desc" },
    take: 30,
  });
  return ok(moods);
}

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const mood = await prisma.mood.create({
    data: { userId: user!.id, mood: parsed.data.mood },
  });
  return ok(mood);
}
