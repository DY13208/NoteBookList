import { fail, ok } from "@/lib/response";
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addDuration } from "@/lib/time";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const refreshCookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("refresh_token="));
  const refreshToken = refreshCookie ? decodeURIComponent(refreshCookie.split("=")[1]) : null;

  if (!refreshToken) {
    return fail("Missing refresh token", 401, 401);
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return fail("Invalid refresh token", 401, 401);
  }

  if (payload.type !== "refresh") {
    return fail("Invalid refresh token", 401, 401);
  }

  const tokenHash = hashToken(refreshToken);
  const stored = await prisma.refreshToken.findFirst({
    where: { userId: payload.sub, tokenHash },
  });
  if (!stored || stored.expiresAt < new Date()) {
    return fail("Refresh token expired", 401, 401);
  }

  await prisma.refreshToken.delete({ where: { id: stored.id } });

  const accessToken = signAccessToken(payload.sub);
  const newRefreshToken = signRefreshToken(payload.sub);
  const newHash = hashToken(newRefreshToken);
  await prisma.refreshToken.create({
    data: {
      userId: payload.sub,
      tokenHash: newHash,
      expiresAt: addDuration(process.env.JWT_REFRESH_EXPIRES_IN || "30d"),
    },
  });

  const response = ok({
    access_token: accessToken,
    refresh_token: newRefreshToken,
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
    value: newRefreshToken,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
