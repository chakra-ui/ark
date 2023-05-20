/* eslint-disable @typescript-eslint/no-explicit-any */

type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never

export type Assign<T, U> = Pretty<DistributiveOmit<T, keyof U> & U>

export type Optional<T, K extends keyof T> = Pretty<Pick<Partial<T>, K> & Omit<T, K>>

export {}
