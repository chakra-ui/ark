export const splitProps = <P extends object, K extends keyof P>(props: P, keys: Array<K>) =>
  keys.reduce<[Pick<P, K>, Omit<P, K>]>(
    (prev, key) => {
      const [target, source] = prev
      const { [key]: value, ...rest } = source
      return [{ ...target, [key]: value }, rest as Omit<P, K>]
    },
    [{} as Pick<P, K>, props],
  )
