export const createSplitProps =
  <T, K = keyof T>() =>
  <U extends K[]>(
    props: T,
    keys: U & ([K] extends [U[number]] ? unknown : never), // <-- replaced "Invalid" with never
  ) =>
    keys.reduce(
      (prev, key) => {
        const [target, source] = prev
        const { [key]: value, ...rest } = source
        return [{ ...target, [key]: value }, rest]
      },
      [{}, props],
    )
