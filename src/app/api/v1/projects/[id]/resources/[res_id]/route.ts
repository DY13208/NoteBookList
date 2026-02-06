import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; res_id: string } },
) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  await prisma.projectResource.deleteMany({
    where: { id: params.res_id, projectId: params.id, project: { userId: user!.id } },
  });
  return ok({ success: true });
}
