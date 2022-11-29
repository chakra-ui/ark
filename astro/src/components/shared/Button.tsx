import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { panda } from '../../../panda/jsx'
import { button, ButtonVariants } from '../../../panda/recipes'
import type { JSXStyleProperties } from '../../../panda/types'

export type ButtonProps = ButtonVariants & { children?: JSX.Element } & JSXStyleProperties

export const Button = (props: ButtonProps) => {
  const [recipeProps, buttonProps] = splitProps(props, ['variant', 'size', 'colorPalette'])
  return <panda.button class={button(recipeProps)} {...buttonProps} />
}
