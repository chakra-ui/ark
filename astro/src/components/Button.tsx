import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { cx } from '../../panda/css'
import { Stack } from '../../panda/jsx'
import { button, ButtonValue } from '../../panda/recipes'

export type ButtonProps = ButtonValue & { children?: JSX.Element }

export const Button = (props: ButtonProps) => {
  const [styleProps, buttonProps] = splitProps(props, ['variant', 'size'])
  return <button class={cx(button(styleProps))} {...buttonProps} />
}

export const ButtonGroup = () => {
  return (
    <Stack direction="row">
      <Button size="sm">Button</Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
    </Stack>
  )
}
