import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";
import { encrypt } from "@/lib/crypto";

const schema = z.object({
  provider: z.string().min(1),
  model: z.string().min(1),
  api_key: z.string().min(10),
});

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const cfg = await prisma.aiConfig.findUnique({ where: { userId: user!.id } });
  if (!cfg) return ok({ configured: false });
  return ok({
    configured: true,
    provider: cfg.provider,
    model: cfg.model,
    api_key_masked: "****" + cfg.apiKeyEnc.slice(-4),
  });
}

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const encrypted = encrypt(parsed.data.api_key);
  const cfg = await prisma.aiConfig.upsert({
    where: { userId: user!.id },
    update: {
      provider: parsed.data.provider,
      model: parsed.data.model,
      apiKeyEnc: encrypted,
    },
    create: {
      userId: user!.id,
      provider: parsed.data.provider,
      model: parsed.data.model,
      apiKeyEnc: encrypted,
    },
  });

  return ok({
    configured: true,
    provider: cfg.provider,
    model: cfg.model,
  });
}
