import { requireUser } from "@/lib/guard";
import { ok } from "@/lib/response";

export async function GET(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  return ok({
    plan_name: "专业学习者",
    storage_used_gb: 4.2,
    storage_limit_gb: 10,
    user_level: user!.level,
  });
}
