import { NextResponse } from "next/server";

export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export function ok<T>(data: T, message = "ok") {
  return NextResponse.json({ code: 0, message, data } satisfies ApiResponse<T>);
}

export function fail(message: string, code = 400, status = 400) {
  return NextResponse.json({ code, message, data: null }, { status });
}
