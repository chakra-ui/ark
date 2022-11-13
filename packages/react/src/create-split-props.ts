export const createSplitProps =
  <Target>() =>
  <Keys extends (keyof Target)[], Props extends Target = Target>(
    props: Props,
    keys: Keys & ([keyof Target] extends [Keys[number]] ? unknown : never),
  ) =>
    (keys as string[]).reduce<[Target, Omit<Props, Extract<typeof keys[number], string>>]>(
      (previousValue, currentValue) => {
        const [target, source] = previousValue
        const key = currentValue as keyof Target & keyof typeof source
        target[key] = source[key]
        delete source[key]
        return [target, source]
      },
      [{} as Target, { ...props }],
    )
