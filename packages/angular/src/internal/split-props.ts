export function splitProps<T extends Record<string, unknown>, K extends keyof T>(
  source: T,
  keys: readonly K[],
): [Pick<T, K>, Omit<T, K>] {
  const picked = {} as Pick<T, K>
  const rest = { ...source } as Record<string, unknown>
  for (const key of keys) {
    if (Object.hasOwn(source, key)) {
      picked[key] = source[key]
      delete rest[key as string]
    }
  }
  return [picked, rest as Omit<T, K>]
}
