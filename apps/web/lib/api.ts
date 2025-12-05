// apps/web/lib/api.ts

export interface HeaderData {
  name?: string;
  version?: string;
  status?: string;
}

// You can move this to env later
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

/**
 * Generic helper for calling your Go backend.
 * Works in Server Components and Route Handlers.
 */
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    // ensure we don't cache in dev; tweak later for prod
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    // You can throw or return fallback; throwing is better for debugging
    throw new Error(`API error ${res.status} for ${url}`);
  }

  return res.json() as Promise<T>;
}

/**
 * Specific API method for your /site-version endpoint.
 */
export async function getHeaderData(): Promise<HeaderData> {
  return apiFetch<HeaderData>("/version");
}
