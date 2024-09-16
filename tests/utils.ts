export function getRandomElement<T>(arr: Array<T>) {
  if (arr.length === 0) return undefined;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function createJsonResponse<T>(body: T, options: ResponseInit = {}) {
  if (!options.status) options.status = 200;
  if (!options.statusText) options.statusText = "ok";
  if (!options.headers) options.headers = {};

  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  const response = new Response(JSON.stringify(body), options);

  return response;
}
