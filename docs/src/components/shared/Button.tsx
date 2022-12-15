import { HTMLPandaProps, panda } from '../../../panda/jsx'
import { button, ButtonVariants } from '../../../panda/recipes'

export type ButtonProps = HTMLPandaProps<'button'> & ButtonVariants

export const Button = (props: ButtonProps) => {
  const { variant, size, colorPalette, ...rest } = props
  return <panda.button className={button({ variant, size, colorPalette })} {...rest} />
}
