export const createSplitProps =
  <T, K = keyof T, S extends T = T>() =>
  <U extends K[]>(props: S, keys: U & ([K] extends [U[number]] ? unknown : never)): [T, any] => {
    // return type
    return keys.reduce<[T, any]>( // TODO any
      (prev, key) => {
        const [target, source] = prev
        const { [key as string]: value, ...rest } = source
        return [{ ...target, [key as string]: value }, rest]
      },
      [{} as T, props],
    )
  }
