import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/response";
import { hashPassword, signAccessToken, signRefreshToken, hashToken } from "@/lib/auth";
import { addDuration } from "@/lib/time";

const schema = z.object({
  name: z.string().min(1),
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(6).optional(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return fail("Invalid payload", 400, 400);
  }

  const { name, username, email, phone, password } = parsed.data;
  if (!email && !phone) {
    return fail("Email or phone required", 400, 400);
  }

  if (email) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return fail("Email already registered", 409, 409);
  }

  if (phone) {
    const exists = await prisma.user.findUnique({ where: { phone } });
    if (exists) return fail("Phone already registered", 409, 409);
  }

  const derivedUsername = username || (email ? email.split("@")[0] : `user_${Date.now()}`);
  const usernameExists = await prisma.user.findUnique({ where: { username: derivedUsername } });
  if (usernameExists) {
    return fail("Username already exists", 409, 409);
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      username: derivedUsername,
      email,
      phone,
      passwordHash,
    },
  });

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
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
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
