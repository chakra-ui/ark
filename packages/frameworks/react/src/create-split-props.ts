type EnsureKeys<ExpectedKeys extends (keyof Target)[], Target> =
  Exclude<ExpectedKeys[number], keyof Target> extends never
    ? unknown
    : `Missing required keys: ${Exclude<ExpectedKeys[number], keyof Target>}`

export const createSplitProps =
  <Target>() =>
  <Keys extends (keyof Target)[], Props extends Target = Target>(
    props: Props,
    keys: Keys & EnsureKeys<Keys, Target>,
  ) =>
    (keys as string[]).reduce<[Target, Omit<Props, Extract<(typeof keys)[number], string>>]>(
      (previousValue, currentValue) => {
        const [target, source] = previousValue
        const key = currentValue as keyof Target & keyof typeof source
        if (source[key] !== undefined) {
          target[key] = source[key]
        }
        delete source[key]
        return [target, source]
      },
      [{} as Target, { ...props }],
    )
