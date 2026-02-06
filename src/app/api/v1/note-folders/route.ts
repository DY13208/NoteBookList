import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  name: z.string().min(1),
  color: z.string().optional(),
});

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  const folders = await prisma.noteFolder.findMany({
    where: { userId: user!.id },
    orderBy: { createdAt: "desc" },
  });
  return ok(folders);
}

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const folder = await prisma.noteFolder.create({
    data: {
      userId: user!.id,
      name: parsed.data.name,
      color: parsed.data.color,
    },
  });
  return ok(folder);
}
