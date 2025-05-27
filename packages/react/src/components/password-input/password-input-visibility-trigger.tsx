import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'

export interface PasswordInputVisibilityTriggerBaseProps extends PolymorphicProps {}
export interface PasswordInputVisibilityTriggerProps
  extends HTMLProps<'button'>,
    PasswordInputVisibilityTriggerBaseProps {}

export const PasswordInputVisibilityTrigger = forwardRef<HTMLButtonElement, PasswordInputVisibilityTriggerProps>(
  (props, ref) => {
    const passwordInput = usePasswordInputContext()
    const mergedProps = mergeProps(passwordInput.getVisibilityTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PasswordInputVisibilityTrigger.displayName = 'PasswordInputVisibilityTrigger'
