'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputControlBaseProps extends PolymorphicProps {}
export interface PasswordInputControlProps extends HTMLProps<'div'>, PasswordInputControlBaseProps {}

export const PasswordInputControl = ({ ref, ...props }: PasswordInputControlProps) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(passwordInput.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

PasswordInputControl.displayName = 'PasswordInputControl'
