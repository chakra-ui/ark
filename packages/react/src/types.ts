/* eslint-disable @typescript-eslint/no-explicit-any */

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never
export type Assign<T, U> = DistributiveOmit<T, keyof U> & U
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type CollectionItem = string | object
