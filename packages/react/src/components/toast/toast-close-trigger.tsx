import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastCloseTriggerProps extends HTMLArkProps<'button'> {}

export const ToastCloseTrigger = forwardRef<HTMLButtonElement, ToastCloseTriggerProps>(
  (props, ref) => {
    const toast = useToastContext()
    const mergedProps = mergeProps(toast.getCloseTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ToastCloseTrigger.displayName = 'ToastCloseTrigger'
