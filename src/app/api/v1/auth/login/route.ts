import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/response";
import { signAccessToken, signRefreshToken, verifyPassword, hashToken } from "@/lib/auth";
import { addDuration } from "@/lib/time";

const schema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return fail("Invalid payload", 400, 400);
  }

  const { identifier, password } = parsed.data;
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { phone: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    return fail("Invalid credentials", 401, 401);
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return fail("Invalid credentials", 401, 401);
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);
  const refreshHash = hashToken(refreshToken);
  const refreshExpiresAt = addDuration(process.env.JWT_REFRESH_EXPIRES_IN || "30d");

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: refreshHash,
      expiresAt: refreshExpiresAt,
    },
  });

  const response = ok({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: process.env.JWT_EXPIRES_IN || "2h",
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      avatar_url: user.avatarUrl,
      level: user.level,
    },
  });

  response.cookies.set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
