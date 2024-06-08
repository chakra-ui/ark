import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastActionTriggerProps extends HTMLArkProps<'button'> {}

export const ToastActionTrigger = (props: ToastActionTriggerProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getActionTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
