import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";
import { getPagination } from "@/lib/pagination";

const schema = z.object({
  title: z.string().min(1),
  category: z.string().optional(),
  content: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const url = new URL(request.url);
  const { page, pageSize, skip } = getPagination(url.searchParams);
  const category = url.searchParams.get("category");
  const favorite = url.searchParams.get("favorite");
  const q = url.searchParams.get("q");

  const where: Record<string, unknown> = { userId: user!.id };
  if (category) where.category = category;
  if (favorite === "true") where.favorite = true;
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.prompt.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.prompt.count({ where }),
  ]);

  return ok({ items, page, page_size: pageSize, total });
}

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const prompt = await prisma.prompt.create({
    data: {
      userId: user!.id,
      title: parsed.data.title,
      category: parsed.data.category,
      content: parsed.data.content,
      tags: parsed.data.tags ?? [],
    },
  });
  return ok(prompt);
}
