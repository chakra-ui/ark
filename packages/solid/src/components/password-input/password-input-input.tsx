import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputInputBaseProps extends PolymorphicProps<'input'> {}
export interface PasswordInputInputProps extends HTMLProps<'input'>, PasswordInputInputBaseProps {}

export const PasswordInputInput = (props: PasswordInputInputProps) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(() => passwordInput().getInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
}
