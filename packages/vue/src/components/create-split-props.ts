type EnsureKeys<ExpectedKeys extends (keyof Target)[], Target> = keyof Target extends ExpectedKeys[number]
  ? unknown
  : `Missing required keys: ${Exclude<keyof Target, ExpectedKeys[number]> & string}`

export const createSplitProps =
  <Target>() =>
  <Keys extends (keyof Target)[], Props extends Target = Target>(
    props: Props,
    keys: Keys & EnsureKeys<Keys, Target>,
  ): [Target, Omit<Props, Extract<Keys[number], string>>] => {
    const target = {} as Target
    const rest = { ...props }
    const list = keys as (keyof Target & keyof typeof rest)[]
    for (let i = 0; i < list.length; i++) {
      const key = list[i]
      const value = rest[key]
      if (value !== undefined) target[key] = value
      delete rest[key]
    }
    return [target, rest]
  }
