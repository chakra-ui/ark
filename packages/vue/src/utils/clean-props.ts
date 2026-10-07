const ARIA_PROP_REGEX = /^aria[A-Z]/

const toAriaAttribute = (key: string) => `aria-${key.slice(4).toLowerCase()}`

export const cleanProps = <T extends object>(obj: T): { [K in keyof T]: T[K] } => {
  const result: Partial<T> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      const resolvedKey = ARIA_PROP_REGEX.test(key) ? toAriaAttribute(key) : key
      result[resolvedKey as keyof T] = value
    }
  }
  return result as { [K in keyof T]: T[K] }
}
