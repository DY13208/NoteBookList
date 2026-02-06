import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";
import { getAiConfig } from "@/lib/ai-config";
import { runOpenAIChat } from "@/lib/ai";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const project = await prisma.project.findFirst({
    where: { id: params.id, userId: user!.id },
    include: { tasks: true },
  });
  if (!project) return fail("Not found", 404, 404);

  const cfg = await getAiConfig(user!.id);
  if (!cfg) return fail("AI key not configured", 412, 412);

  const taskList = project.tasks.map((task) => `- ${task.title} (${task.status})`).join("\n");
  const result = await runOpenAIChat({
    apiKey: cfg.apiKey,
    model: cfg.model,
    messages: [
      { role: "system", content: "Generate next steps for the project in Chinese." },
      {
        role: "user",
        content: `项目：${project.title}\n描述：${project.description || ""}\n当前任务：\n${taskList}`,
      },
    ],
  });
  return ok({ steps: result });
}
