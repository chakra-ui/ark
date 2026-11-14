import { omit } from 'solid-js'

// ponytail: Solid 2 dropped splitProps; `omit` covers the rest, the picked side reads through so it stays reactive
export function splitProps<T extends Record<PropertyKey, any>, K extends (keyof T)[]>(
  props: T,
  keys: K,
): [Pick<T, K[number]>, Omit<T, K[number]>] {
  const own = (key: PropertyKey) => keys.includes(key as keyof T) && key in props
  const picked = new Proxy({} as Pick<T, K[number]>, {
    get: (_, key) => (keys.includes(key as keyof T) ? props[key as keyof T] : undefined),
    has: (_, key) => own(key),
    ownKeys: () => keys.filter(own) as (string | symbol)[],
    getOwnPropertyDescriptor: (_, key) =>
      own(key) ? { enumerable: true, configurable: true, get: () => props[key as keyof T] } : undefined,
  })
  return [picked, omit(props, ...keys) as unknown as Omit<T, K[number]>]
}
