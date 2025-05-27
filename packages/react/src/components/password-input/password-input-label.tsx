import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputLabelBaseProps extends PolymorphicProps {}
export interface PasswordInputLabelProps extends HTMLProps<'label'>, PasswordInputLabelBaseProps {}

export const PasswordInputLabel = forwardRef<HTMLLabelElement, PasswordInputLabelProps>((props, ref) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(passwordInput.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

PasswordInputLabel.displayName = 'PasswordInputLabel'
