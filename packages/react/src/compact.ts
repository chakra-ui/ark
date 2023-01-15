export const isObject = (v: unknown): v is Record<string, unknown> =>
  !(v == null || typeof v !== 'object' || Array.isArray(v))

export function compact<T extends Record<string, unknown> | undefined>(obj: T): T {
  if (obj === undefined) return obj
  return Object.fromEntries(
    Object.entries(obj)
      // remove undefined values
      .filter(([, value]) => value !== undefined)
      // recursively compact nested objects
      .map(([key, value]) => [key, isObject(value) ? compact(value) : value]),
  ) as T
}
