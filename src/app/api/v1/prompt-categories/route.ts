import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const categories = await prisma.prompt.findMany({
    where: { userId: user!.id },
    distinct: ["category"],
    select: { category: true },
  });
  const list = categories.map((c) => c.category).filter(Boolean) as string[];
  return ok(list);
}
