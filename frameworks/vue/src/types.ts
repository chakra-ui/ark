/**
 * Type to make properties optional and preserve their type
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type EmitFn<T> = <K extends keyof T>(
  event: K,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ...args: T[K] extends any[] ? T[K] : never
) => void

export type CollectionItem = string | object
