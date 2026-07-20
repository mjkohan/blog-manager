import { API_BASE_URL } from "./constants";

/**
 * Error thrown by the api-client for any non-2xx response (or a transport
 * failure). Carries the HTTP status and, when the body is JSON with a `message`
 * field (DummyJSON's convention), that message.
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestOptions extends Omit<RequestInit, "body" | "method"> {
  /** Bearer token to send in the Authorization header. */
  token?: string;
}

async function request<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
  { token, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const finalHeaders = new Headers(headers);
  if (body !== undefined) finalHeaders.set("Content-Type", "application/json");
  if (token) finalHeaders.set("Authorization", `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (cause) {
    throw new ApiError(cause instanceof Error ? cause.message : "Network request failed", 0);
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data: unknown = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      isJson && data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return data as T;
}

/**
 * Typed fetch wrapper — the single network choke point for DummyJSON.
 * Never call `fetch` to the API directly from features/components; go through
 * these so error normalization (`ApiError`) and base-URL handling stay in one place.
 */
export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, undefined, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, body, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};
