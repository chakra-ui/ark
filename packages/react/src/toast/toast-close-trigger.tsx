import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseTriggerProps = HtmlArkProps<'button'>

export const ToastCloseTrigger = forwardRef<HTMLButtonElement, ToastCloseTriggerProps>(
  (props, ref) => {
    const { closeTriggerProps } = useToastItemContext()
    const mergedProps = mergeProps(closeTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ToastCloseTrigger.displayName = 'ToastCloseTrigger'
