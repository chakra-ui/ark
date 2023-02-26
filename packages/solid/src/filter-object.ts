import { BooleanAttributes } from './constants'
import { isEmpty } from './is-empty'
import { isFunction } from './is-function'

type Entry<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

export const filterObject = <T extends object>(
  obj: T,
  fn: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean,
) => Object.fromEntries((Object.entries(obj) as Entry<T>[]).filter(fn)) as Partial<T>

export const filterEmptyValues = <T extends object>(obj: T) =>
  filterObject(obj, ([, v]) => !isEmpty(v))

export const filterFunctionValues = <T extends object>(obj: T) =>
  filterObject(obj, ([, v]) => !isFunction(v))

export const filterBooleanAttributeValues = <T extends object>(obj: T) =>
  filterObject(obj, ([k, v]) => !(BooleanAttributes.has(k as string) && !v))
