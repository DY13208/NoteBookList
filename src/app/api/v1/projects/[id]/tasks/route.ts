import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  title: z.string().min(1),
  status: z.string().optional(),
  due_at: z.string().datetime().optional(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const tasks = await prisma.projectTask.findMany({
    where: { projectId: params.id, project: { userId: user!.id } },
    orderBy: { updatedAt: "desc" },
  });
  return ok(tasks);
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

  const task = await prisma.projectTask.create({
    data: {
      projectId: params.id,
      title: parsed.data.title,
      status: parsed.data.status ?? "todo",
      dueAt: parsed.data.due_at ? new Date(parsed.data.due_at) : undefined,
    },
  });
  return ok(task);
}
