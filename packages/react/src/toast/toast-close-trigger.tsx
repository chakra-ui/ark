import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseTriggerProps = HTMLArkProps<'button'>

export const ToastCloseTrigger = forwardRef<HTMLButtonElement, ToastCloseTriggerProps>(
  (props, ref) => {
    const { closeTriggerProps } = useToastItemContext()
    const mergedProps = mergeProps(closeTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ToastCloseTrigger.displayName = 'ToastCloseTrigger'
