import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseTriggerProps = HTMLArkProps<'button'>

export const ToastCloseTrigger = (props: ToastCloseTriggerProps) => {
  const api = useToastItemContext()
  const triggerProps = mergeProps(() => api().closeTriggerProps, props)

  return <ark.button {...triggerProps} />
}
