import { z } from "zod";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";
import { getAiConfig } from "@/lib/ai-config";
import { runOpenAIChat } from "@/lib/ai";

const schema = z.object({
  text: z.string().min(1),
});

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const cfg = await getAiConfig(user!.id);
  if (!cfg) return fail("AI key not configured", 412, 412);

  const quiz = await runOpenAIChat({
    apiKey: cfg.apiKey,
    model: cfg.model,
    messages: [
      {
        role: "system",
        content: "Generate 3 quiz questions with answers in Chinese. Format as Q/A pairs.",
      },
      { role: "user", content: parsed.data.text },
    ],
  });
  return ok({ quiz });
}
