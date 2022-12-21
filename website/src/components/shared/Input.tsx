import { HTMLPandaProps, panda } from '../../../panda/jsx'
import { input, InputVariants } from '../../../panda/recipes'

export type InputProps = HTMLPandaProps<'input'> & InputVariants

export const Input = (props: InputProps) => {
  const { variant = 'outline', size = 'md', ...rest } = props
  // @ts-expect-error typings are wrong
  return <panda.input className={input({ variant, size })} {...rest} />
}
