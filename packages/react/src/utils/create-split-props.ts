type EnsureKeys<ExpectedKeys extends (keyof Target)[], Target> = keyof Target extends ExpectedKeys[number]
  ? unknown
  : `Missing required keys: ${Exclude<keyof Target, ExpectedKeys[number]> & string}`

export const createSplitProps =
  <Target>() =>
  <Keys extends (keyof Target)[], Props extends Target = Target>(props: Props, keys: Keys & EnsureKeys<Keys, Target>) =>
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
