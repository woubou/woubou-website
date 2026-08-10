export async function readApiResponse<T>(response: Response): Promise<T | null> {
  const body = await response.text();
  if (!body.trim()) return null;

  try {
    return JSON.parse(body) as T;
  } catch {
    return null;
  }
}

export function apiErrorMessage(
  response: Response,
  payload: { error?: string } | null,
  fallback: string
) {
  if (payload?.error) return payload.error;
  if (response.status >= 500 || !payload) {
    return 'Le service API est indisponible. Arrêtez puis relancez le projet avec « npm run dev ».';
  }
  return fallback;
}
