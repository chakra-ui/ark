import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { panda } from '../../../panda/jsx'
import { link, LinkVariants } from '../../../panda/recipes'
import type { JSXStyleProperties } from '../../../panda/types'
export type LinkProps = LinkVariants & { children?: JSX.Element } & JSXStyleProperties

export const Link = (props: LinkProps) => {
  const [recipeProps, linkProps] = splitProps(props, ['variant'])
  return <panda.a class={link(recipeProps)} {...linkProps} />
}
