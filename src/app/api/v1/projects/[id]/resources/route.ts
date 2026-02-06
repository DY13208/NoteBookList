import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  title: z.string().min(1),
  type: z.string().optional(),
  url: z.string().url(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const resources = await prisma.projectResource.findMany({
    where: { projectId: params.id, project: { userId: user!.id } },
    orderBy: { createdAt: "desc" },
  });
  return ok(resources);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const project = await prisma.project.findFirst({
    where: { id: params.id, userId: user!.id },
  });
  if (!project) return fail("Not found", 404, 404);

  const resource = await prisma.projectResource.create({
    data: {
      projectId: params.id,
      title: parsed.data.title,
      type: parsed.data.type,
      url: parsed.data.url,
    },
  });
  return ok(resource);
}
