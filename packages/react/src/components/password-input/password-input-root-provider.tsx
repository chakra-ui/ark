'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UsePasswordInputReturn } from './use-password-input.ts'
import { PasswordInputProvider } from './use-password-input-context.ts'
import type { RootState } from '@zag-js/password-input'

interface RootProviderProps {
  value: UsePasswordInputReturn
}

export interface PasswordInputRootProviderState extends RootState {}

export interface PasswordInputRootProviderBaseProps
  extends RootProviderProps, PolymorphicProps<PasswordInputRootProviderState> {}
export interface PasswordInputRootProviderProps extends HTMLProps<'div'>, PasswordInputRootProviderBaseProps {}

export const PasswordInputRootProvider = forwardRef<HTMLDivElement, PasswordInputRootProviderProps>((props, ref) => {
  const { value: passwordInput, ...localProps } = props
  const mergedProps = mergeProps(passwordInput.getRootProps(), localProps)

  return (
    <PasswordInputProvider value={passwordInput}>
      <ark.div {...mergedProps} ref={ref} state={passwordInput.getRootState()} />
    </PasswordInputProvider>
  )
})

PasswordInputRootProvider.displayName = 'PasswordInputRootProvider'
