import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  folder_id: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  cover_image_url: z.string().url().optional().nullable(),
  content_blocks: z.array(z.any()).optional(),
  bookmarked: z.boolean().optional(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const note = await prisma.note.findFirst({
    where: { id: params.id, userId: user!.id },
  });
  if (!note) return fail("Not found", 404, 404);
  return ok(note);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const note = await prisma.note.updateMany({
    where: { id: params.id, userId: user!.id },
    data: {
      title: parsed.data.title,
      subtitle: parsed.data.subtitle,
      folderId: parsed.data.folder_id === null ? null : parsed.data.folder_id,
      tags: parsed.data.tags,
      coverImageUrl: parsed.data.cover_image_url === null ? null : parsed.data.cover_image_url,
      content: parsed.data.content_blocks,
      bookmarked: parsed.data.bookmarked,
    },
  });
  return ok(note);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  await prisma.note.deleteMany({
    where: { id: params.id, userId: user!.id },
  });
  return ok({ success: true });
}
