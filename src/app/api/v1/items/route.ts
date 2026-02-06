import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";
import { getPagination } from "@/lib/pagination";

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image_url: z.string().url().optional(),
  category: z.string().optional(),
});

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  const url = new URL(request.url);
  const { page, pageSize, skip } = getPagination(url.searchParams);
  const tag = url.searchParams.get("tag");
  const category = url.searchParams.get("category");

  const where: Record<string, unknown> = { userId: user!.id };
  if (tag) where.tags = { has: tag };
  if (category) where.category = category;

  const [items, total] = await Promise.all([
    prisma.item.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.item.count({ where }),
  ]);

  return ok({ items, page, page_size: pageSize, total });
}

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const item = await prisma.item.create({
    data: {
      userId: user!.id,
      name: parsed.data.name,
      description: parsed.data.description,
      tags: parsed.data.tags ?? [],
      imageUrl: parsed.data.image_url,
      category: parsed.data.category,
    },
  });
  return ok(item);
}
