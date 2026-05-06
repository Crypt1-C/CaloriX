type HttpMethod = 'GET' | 'POST' | 'DELETE';

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

function getBaseUrl() {
  // Prefer explicit base URL for deployment; in dev we use Vite proxy (empty base).
  return (import.meta as any).env?.VITE_API_BASE_URL?.toString?.() || '';
}

export function getAuthToken() {
  return localStorage.getItem('calorix_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('calorix_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('calorix_token');
}

export async function api<T>(
  path: string,
  opts: {
    method?: HttpMethod;
    body?: unknown;
    auth?: boolean;
  } = {}
): Promise<T> {
  const method = opts.method ?? 'GET';
  const headers: Record<string, string> = {};

  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';

  if (opts.auth) {
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${getBaseUrl()}${path}`, {
    method,
    headers,
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => '');

  if (!res.ok) {
    const msg =
      (payload as any)?.message ||
      (typeof payload === 'string' && payload) ||
      `Request failed (${res.status})`;
    throw new ApiError(msg, res.status, payload);
  }

  return payload as T;
}

