import { splitProps } from 'solid-js'

type EnsureKeys<ExpectedKeys extends (keyof Target)[], Target> =
  Exclude<ExpectedKeys[number], keyof Target> extends never
    ? unknown
    : `Missing required keys: ${Exclude<ExpectedKeys[number], keyof Target>}`

export const createSplitProps =
  <Target extends Record<never, never>>() =>
  <Keys extends (keyof Target)[], Props extends Target = Target>(
    props: Props,
    keys: Keys & EnsureKeys<Keys, Target>,
  ) =>
    splitProps(props, keys)
