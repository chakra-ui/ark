import { panda, type HTMLPandaProps } from '@/panda/jsx'
import { link, type LinkVariantProps } from '@/panda/recipes'

export type LinkProps = HTMLPandaProps<'a'> & LinkVariantProps

export const Link = (props: LinkProps) => {
  const { variant, ...rest } = props
  return <panda.a className={link({ variant })} {...rest} />
}
