import { ok } from "@/lib/response";
import { getModels } from "@/lib/ai";

export async function GET() {
  return ok(getModels());
}
