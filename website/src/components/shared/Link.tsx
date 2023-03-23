import { panda, type HTMLPandaProps } from '@/panda/jsx'
import { link, type LinkVariants } from '@/panda/recipes'

export type LinkProps = HTMLPandaProps<'a'> & LinkVariants

export const Link = (props: LinkProps) => {
  const { variant, ...rest } = props
  return <panda.a className={link({ variant })} {...rest} />
}
