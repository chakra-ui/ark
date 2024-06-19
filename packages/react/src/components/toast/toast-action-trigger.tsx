import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastActionTriggerBaseProps extends PolymorphicProps {}
export interface ToastActionTriggerProps extends HTMLProps<'button'>, ToastActionTriggerBaseProps {}

export const ToastActionTrigger = forwardRef<HTMLButtonElement, ToastActionTriggerProps>(
  (props, ref) => {
    const toast = useToastContext()
    const mergedProps = mergeProps(toast.getActionTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ToastActionTrigger.displayName = 'ToastActionTrigger'
