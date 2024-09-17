let jsonResponseCache: unknown = undefined;

export async function getJsonResponse(response: Response) {
  if (jsonResponseCache === undefined) {
    jsonResponseCache = await response.json();
  }

  return jsonResponseCache;
}

export function clearCurrentJsonResponse() {
  jsonResponseCache = undefined;
}
