import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export type ToastCloseTriggerProps = HTMLArkProps<'button'>

export const ToastCloseTrigger = (props: ToastCloseTriggerProps) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().closeTriggerProps, props)

  return <ark.button {...mergedProps} />
}
