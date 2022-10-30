/**
 * Assign property types from right to left.
 * Handy for overriding e.g. `onChange` from an HTMLElement with your own type
 */
export type Assign<Target, Source> = Omit<Target, keyof Source> & Source

export type SplitProps<T, K extends (readonly (keyof T)[])[]> = [
  ...{
    [P in keyof K]: P extends `${number}`
      ? Pick<T, Extract<K[P], readonly (keyof T)[]>[number]>
      : never
  },
  Omit<T, K[number][number]>,
]

export function splitProps<T, K extends [readonly (keyof T)[], ...(readonly (keyof T)[])[]]>(
  props: T,
  ...keySelections: K
) {
  const rest = { ...props }
  const groups = keySelections.map((keys) => {
    return keys.reduce((previousValue, key) => {
      if (!(key in rest)) {
        return previousValue
      }
      previousValue[key] = rest[key]
      delete rest[key]
      return previousValue
    }, {} as T)
  })
  return [...groups, rest] as unknown as SplitProps<T, K>
}
