import { nanoid } from "nanoid";
import { requireUser } from "@/lib/guard";
import { fail, ok } from "@/lib/response";
import { uploadToS3 } from "@/lib/s3";

export async function POST(request: Request) {
  const { user, error } = await requireUser(request);
  if (error) return error;

  const formData = await request.formData().catch(() => null);
  if (!formData) return fail("Invalid form data", 400, 400);

  const file = formData.get("file");
  if (!file || typeof file === "string") return fail("File is required", 400, 400);

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = (file as File).name || "upload";
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${user!.id}/${Date.now()}_${nanoid(8)}_${safeName}`;

  const { url } = await uploadToS3({
    key,
    body: buffer,
    contentType: (file as File).type || "application/octet-stream",
  });

  return ok({ url, key });
}
