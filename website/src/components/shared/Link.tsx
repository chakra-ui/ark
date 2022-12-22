import { HTMLPandaProps, panda } from '@/panda/jsx'
import { link, LinkVariants } from '@/panda/recipes'

export type LinkProps = HTMLPandaProps<'a'> & LinkVariants

export const Link = (props: LinkProps) => {
  const { variant, ...rest } = props
  // @ts-expect-error typings are wrong
  return <panda.a className={link({ variant })} {...rest} />
}
