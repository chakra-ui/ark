import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface PasswordInputLabelProps extends HTMLProps<'label'>, PasswordInputLabelBaseProps {}

export const PasswordInputLabel = (props: PasswordInputLabelProps) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(() => passwordInput().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
