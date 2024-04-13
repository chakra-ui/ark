import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useToastContext } from './use-toast-context'

export interface ToastCloseTriggerProps extends HTMLArkProps<'button'> {}

export const ToastCloseTrigger = (props: ToastCloseTriggerProps) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().closeTriggerProps, props)

  return <ark.button {...mergedProps} />
}
