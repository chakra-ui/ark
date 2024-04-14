import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useToastContext } from './use-toast-context'

export interface ToastTitleProps extends HTMLArkProps<'div'> {}

export const ToastTitle = (props: ToastTitleProps) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().titleProps, props)

  return <ark.div {...mergedProps} />
}
