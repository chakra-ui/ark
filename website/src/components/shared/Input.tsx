import { styled, type HTMLStyledProps } from '@/panda/jsx'
import { input, type InputVariantProps } from '@/panda/recipes'

export type InputProps = Omit<HTMLStyledProps<'input'>, 'size'> & InputVariantProps

export const Input = (props: InputProps) => {
  const { variant = 'outline', size = 'md', ...rest } = props
  return <styled.input className={input({ variant, size })} {...rest} />
}
