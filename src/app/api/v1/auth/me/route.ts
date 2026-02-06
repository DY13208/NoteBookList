import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  return ok({
    id: user!.id,
    name: user!.name,
    username: user!.username,
    email: user!.email,
    phone: user!.phone,
    avatar_url: user!.avatarUrl,
    level: user!.level,
    points: user!.pointsBalance,
  });
}
