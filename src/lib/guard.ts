import { getAuthUser } from "./auth";
import { fail } from "./response";

export async function requireUser(request: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    return { user: null, error: fail("请登录账号", 401, 401) };
  }
  return { user, error: null };
}
