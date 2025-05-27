import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputInputBaseProps extends PolymorphicProps {}
export interface PasswordInputInputProps extends HTMLProps<'input'>, PasswordInputInputBaseProps {}

export const PasswordInputInput = forwardRef<HTMLInputElement, PasswordInputInputProps>((props, ref) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(passwordInput.getInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

PasswordInputInput.displayName = 'PasswordInputInput'
