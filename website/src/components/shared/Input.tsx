import { HTMLPandaProps, panda } from '@/panda/jsx'
import { input, InputVariants } from '@/panda/recipes'

export type InputProps = Omit<HTMLPandaProps<'input'>, 'size'> & InputVariants

export const Input = (props: InputProps) => {
  const { variant = 'outline', size = 'md', ...rest } = props
  return <panda.input className={input({ variant, size })} {...rest} />
}
