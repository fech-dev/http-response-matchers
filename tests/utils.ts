export function getRandomElement<T>(arr: Array<T>) {
  if (arr.length === 0) return undefined;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
