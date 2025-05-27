import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputControlBaseProps extends PolymorphicProps<'div'> {}
export interface PasswordInputControlProps extends HTMLProps<'div'>, PasswordInputControlBaseProps {}

export const PasswordInputControl = (props: PasswordInputControlProps) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(() => passwordInput().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
