import { styled, type HTMLStyledProps } from '@/panda/jsx'
import { link, type LinkVariantProps } from '@/panda/recipes'

export type LinkProps = HTMLStyledProps<'a'> & LinkVariantProps

export const Link = (props: LinkProps) => {
  const { variant, ...rest } = props
  return <styled.a className={link({ variant })} {...rest} />
}
