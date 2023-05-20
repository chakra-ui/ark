import { propTraps } from './prop-trap'

export function filterProps<T extends object>(props: T, predicate: (key: keyof T) => boolean): T {
  return new Proxy(
    {
      get(property: string | number | symbol) {
        return property in props && predicate(property as keyof T)
          ? props[property as keyof T]
          : undefined
      },
      has(property: string | number | symbol) {
        return property in props && predicate(property as keyof T)
      },
      keys() {
        return Object.keys(props).filter(predicate as (key: string) => boolean)
      },
    },
    propTraps,
  ) as unknown as T
}

export function mapProps(
  props: Record<string, unknown>,
  mapper: (key: string, value: unknown) => unknown,
): Record<string, unknown> {
  return Object.fromEntries(Object.entries(props).map(([key, value]) => [key, mapper(key, value)]))
}
