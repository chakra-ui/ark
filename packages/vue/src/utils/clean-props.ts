export const cleanProps = <T extends object>(obj: T): { [K in keyof T]: T[K] } => {
  const result: Partial<T> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key as keyof T] = value
    }
  }
  return result as { [K in keyof T]: T[K] }
}
