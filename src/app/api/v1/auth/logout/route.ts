import { fail, ok } from "@/lib/response";
import { hashToken, verifyRefreshToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const refreshCookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("refresh_token="));
  const refreshToken = refreshCookie ? decodeURIComponent(refreshCookie.split("=")[1]) : null;

  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      if (payload.type === "refresh") {
        const tokenHash = hashToken(refreshToken);
        await prisma.refreshToken.deleteMany({
          where: { userId: payload.sub, tokenHash },
        });
      }
    } catch {
      return fail("Invalid refresh token", 401, 401);
    }
  }

  const response = ok({ success: true });
  response.cookies.set({
    name: "access_token",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  response.cookies.set({
    name: "refresh_token",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  return response;
}
