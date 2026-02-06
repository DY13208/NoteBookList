export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = path.startsWith("/api/") ? path : `/api/v1${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });
  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;
  if (!res.ok || !json) {
    throw new Error(json?.message || "Request failed");
  }
  if (json.code !== 0) {
    throw new Error(json.message || "Request failed");
  }
  return json.data;
}
