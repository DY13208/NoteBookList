import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";
import { getAiConfig } from "@/lib/ai-config";
import { runOpenAIChat } from "@/lib/ai";

function extractText(content: unknown) {
  if (!Array.isArray(content)) return "";
  return content
    .map((block) => {
      if (typeof block?.text === "string") return block.text;
      if (typeof block?.code === "string") return block.code;
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const note = await prisma.note.findFirst({
    where: { id: params.id, userId: user!.id },
  });
  if (!note) return fail("Not found", 404, 404);

  const cfg = await getAiConfig(user!.id);
  if (!cfg) return fail("AI key not configured", 412, 412);

  const text = extractText(note.content);
  const result = await runOpenAIChat({
    apiKey: cfg.apiKey,
    model: cfg.model,
    messages: [
      { role: "system", content: "Extract key takeaways as bullet points in Chinese." },
      { role: "user", content: text || note.title },
    ],
  });

  return ok({ highlights: result });
}
