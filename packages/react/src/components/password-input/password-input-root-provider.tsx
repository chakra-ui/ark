import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UsePasswordInputReturn } from './use-password-input'
import { PasswordInputProvider } from './use-password-input-context'

interface RootProviderProps {
  value: UsePasswordInputReturn
}

export interface PasswordInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface PasswordInputRootProviderProps extends HTMLProps<'div'>, PasswordInputRootProviderBaseProps {}

export const PasswordInputRootProvider = forwardRef<HTMLDivElement, PasswordInputRootProviderProps>((props, ref) => {
  const { value: passwordInput, ...localProps } = props
  const mergedProps = mergeProps(passwordInput.getRootProps(), localProps)

  return (
    <PasswordInputProvider value={passwordInput}>
      <ark.div {...mergedProps} ref={ref} />
    </PasswordInputProvider>
  )
})

PasswordInputRootProvider.displayName = 'PasswordInputRootProvider'
