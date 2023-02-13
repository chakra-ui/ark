type Entry<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

export const filterObject = <T extends object>(
  obj: T,
  fn: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean,
) => Object.fromEntries((Object.entries(obj) as Entry<T>[]).filter(fn)) as Partial<T>
