import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";
import { getPagination } from "@/lib/pagination";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
  due_at: z.string().datetime().optional(),
});

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  const url = new URL(request.url);
  const { page, pageSize, skip } = getPagination(url.searchParams);

  const [items, total] = await Promise.all([
    prisma.project.findMany({
      where: { userId: user!.id },
      orderBy: { updatedAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.project.count({ where: { userId: user!.id } }),
  ]);

  return ok({ items, page, page_size: pageSize, total });
}

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const project = await prisma.project.create({
    data: {
      userId: user!.id,
      title: parsed.data.title,
      description: parsed.data.description,
      status: parsed.data.status ?? "active",
      progress: parsed.data.progress ?? 0,
      dueAt: parsed.data.due_at ? new Date(parsed.data.due_at) : undefined,
    },
  });
  return ok(project);
}
