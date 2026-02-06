import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";
import { getPagination } from "@/lib/pagination";

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const url = new URL(request.url);
  const { page, pageSize, skip } = getPagination(url.searchParams);
  const [items, total] = await Promise.all([
    prisma.pointTransaction.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.pointTransaction.count({ where: { userId: user!.id } }),
  ]);

  return ok({ items, page, page_size: pageSize, total });
}
