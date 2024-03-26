import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export interface ToastTitleProps extends HTMLArkProps<'div'> {}

export const ToastTitle = (props: ToastTitleProps) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().titleProps, props)

  return <ark.div {...mergedProps} />
}
