import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseTriggerProps = HTMLArkProps<'button'>

export const ToastCloseTrigger = forwardRef<'button'>((props, ref) => {
  const { closeTriggerProps } = useToastItemContext()
  const mergedProps = mergeProps(closeTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
