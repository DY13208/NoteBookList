import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";
import { getPagination } from "@/lib/pagination";

const schema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  folder_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cover_image_url: z.string().url().optional(),
  content_blocks: z.array(z.any()).optional(),
});

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const url = new URL(request.url);
  const { page, pageSize, skip } = getPagination(url.searchParams);
  const folderId = url.searchParams.get("folder_id");
  const tag = url.searchParams.get("tag");
  const bookmarked = url.searchParams.get("bookmarked");
  const q = url.searchParams.get("q");

  const where: Record<string, unknown> = { userId: user!.id };
  if (folderId) where.folderId = folderId;
  if (tag) where.tags = { has: tag };
  if (bookmarked === "true") where.bookmarked = true;
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { subtitle: { contains: q, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.note.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.note.count({ where }),
  ]);

  return ok({
    items,
    page,
    page_size: pageSize,
    total,
  });
}

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const note = await prisma.note.create({
    data: {
      userId: user!.id,
      title: parsed.data.title,
      subtitle: parsed.data.subtitle,
      folderId: parsed.data.folder_id,
      tags: parsed.data.tags ?? [],
      coverImageUrl: parsed.data.cover_image_url,
      content: parsed.data.content_blocks ?? [],
    },
  });
  return ok(note);
}
