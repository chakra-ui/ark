import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { panda, Stack } from '../../panda/jsx'
import { button, ButtonValue } from '../../panda/recipes'
import type { JSXStyleProperties } from '../../panda/types'

export type ButtonProps = ButtonValue & { children?: JSX.Element } & JSXStyleProperties

export const Button = (props: ButtonProps) => {
  const [recipeProps, buttonProps] = splitProps(props, ['variant', 'size', 'palette'])
  return <panda.button class={button(recipeProps)} {...buttonProps} />
}

export const ButtonGroup = () => {
  return (
    <Stack direction="row">
      <Button size="sm" palette="purple" color="blue.600">
        Button
      </Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
    </Stack>
  )
}
