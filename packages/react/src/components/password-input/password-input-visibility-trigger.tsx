'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'
import type { VisibilityTriggerState } from '@zag-js/password-input'

export interface PasswordInputVisibilityTriggerState extends VisibilityTriggerState {}

export interface PasswordInputVisibilityTriggerBaseProps extends PolymorphicProps<PasswordInputVisibilityTriggerState> {}
export interface PasswordInputVisibilityTriggerProps
  extends HTMLProps<'button'>, PasswordInputVisibilityTriggerBaseProps {}

export const PasswordInputVisibilityTrigger = forwardRef<HTMLButtonElement, PasswordInputVisibilityTriggerProps>(
  (props, ref) => {
    const passwordInput = usePasswordInputContext()
    const mergedProps = mergeProps(passwordInput.getVisibilityTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} state={passwordInput.getVisibilityTriggerState()} />
  },
)

PasswordInputVisibilityTrigger.displayName = 'PasswordInputVisibilityTrigger'
