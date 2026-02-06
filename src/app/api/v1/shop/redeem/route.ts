import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";

const schema = z.object({
  item_id: z.string().min(1),
});

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return fail("Invalid payload", 400, 400);

  const item = await prisma.shopItem.findUnique({ where: { id: parsed.data.item_id } });
  if (!item) return fail("Not found", 404, 404);
  if (user!.pointsBalance < item.price) return fail("Insufficient points", 400, 400);

  const redemption = await prisma.$transaction(async (tx) => {
    const redemptionRecord = await tx.redemption.create({
      data: {
        userId: user!.id,
        itemId: item.id,
        status: "success",
      },
    });
    await tx.user.update({
      where: { id: user!.id },
      data: { pointsBalance: { decrement: item.price } },
    });
    await tx.pointTransaction.create({
      data: {
        userId: user!.id,
        amount: -item.price,
        type: "redeem",
        meta: { shopItemId: item.id },
      },
    });
    await tx.item.create({
      data: {
        userId: user!.id,
        name: item.title,
        description: item.description ?? "",
        tags: item.category ? [item.category] : [],
        imageUrl: item.imageUrl,
        category: item.category,
        owned: true,
      },
    });
    return redemptionRecord;
  });

  return ok({ redemption_id: redemption.id });
}
