'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputIndicatorBaseProps extends PolymorphicProps {
  /**
   * The fallback content to display when the password is not visible.
   */
  fallback?: React.ReactNode
}
export interface PasswordInputIndicatorProps extends HTMLProps<'span'>, PasswordInputIndicatorBaseProps {}

export const PasswordInputIndicator = forwardRef<HTMLSpanElement, PasswordInputIndicatorProps>((props, ref) => {
  const passwordInput = usePasswordInputContext()
  const { fallback, children, ...rest } = props
  const mergedProps = mergeProps(passwordInput.getIndicatorProps(), rest)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {passwordInput.visible ? children : fallback}
    </ark.span>
  )
})

PasswordInputIndicator.displayName = 'PasswordInputIndicator'
