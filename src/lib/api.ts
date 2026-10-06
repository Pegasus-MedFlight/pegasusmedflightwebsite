/**
 * Thin client for the Pegasus MedFlight backend (skylinq-backend).
 *
 * Base URL comes from `VITE_API_BASE_URL` (no trailing slash), falling back
 * to the production deployment. The backend must list this site's origin in
 * its `CORS_ORIGINS` env var.
 */
export const API_BASE_URL = (
  (import.meta.env.VITE_API_BASE_URL as string | undefined) || "https://skylinq-backend-main.vercel.app"
).replace(/\/+$/, "");

export type FieldError = { field: string; message: string };

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: FieldError[];
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly fieldErrors: FieldError[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiPost<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new ApiError("Could not reach Pegasus operations. Check your connection and try again.", 0);
  }

  let json: ApiEnvelope<T> | null = null;
  try {
    json = (await res.json()) as ApiEnvelope<T>;
  } catch {
    /* non-JSON error page */
  }

  if (!res.ok || !json?.success) {
    const fallback =
      res.status === 429
        ? "Too many submissions from this network. Please try again later."
        : "Something went wrong on our side. Please try again.";
    throw new ApiError(json?.message || fallback, res.status, json?.errors ?? []);
  }

  return json.data as T;
}
