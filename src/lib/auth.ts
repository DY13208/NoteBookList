import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "./prisma";

type JwtPayload = {
  sub: string;
  type: "access" | "refresh";
};

const accessSecret = process.env.JWT_SECRET || "dev_secret";
const refreshSecret = process.env.JWT_REFRESH_SECRET || "dev_refresh_secret";
const accessExpiresIn = process.env.JWT_EXPIRES_IN || "2h";
const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "30d";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAccessToken(userId: string) {
  return jwt.sign({ sub: userId, type: "access" } satisfies JwtPayload, accessSecret, {
    expiresIn: accessExpiresIn,
  });
}

export function signRefreshToken(userId: string) {
  return jwt.sign({ sub: userId, type: "refresh" } satisfies JwtPayload, refreshSecret, {
    expiresIn: refreshExpiresIn,
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshSecret) as JwtPayload;
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function getCookieValue(cookieHeader: string | null, key: string) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${key}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(key.length + 1));
}

export function getTokenFromRequest(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  const cookieHeader = request.headers.get("cookie");
  return getCookieValue(cookieHeader, "access_token");
}

export async function getAuthUser(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  try {
    const payload = verifyAccessToken(token);
    if (payload.type !== "access") return null;
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    return user;
  } catch {
    return null;
  }
}
