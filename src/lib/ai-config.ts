import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/crypto";
import { AiProvider } from "@/lib/ai";

export async function getAiConfig(userId: string) {
  const cfg = await prisma.aiConfig.findUnique({ where: { userId } });
  if (!cfg) return null;
  return {
    provider: cfg.provider as AiProvider,
    model: cfg.model,
    apiKey: decrypt(cfg.apiKeyEnc),
  };
}
