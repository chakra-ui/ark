import type { Accessor } from 'solid-js'

export type Assign<T, U> = Omit<T, keyof U> & U
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type CollectionItem = string | object
export type MaybeAccessor<T> = Accessor<T> | T
