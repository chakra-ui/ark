import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastActionTriggerProps extends HTMLArkProps<'button'> {}

export const ToastActionTrigger = forwardRef<HTMLButtonElement, ToastActionTriggerProps>(
  (props, ref) => {
    const toast = useToastContext()
    const mergedProps = mergeProps(toast.getActionTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ToastActionTrigger.displayName = 'ToastActionTrigger'
