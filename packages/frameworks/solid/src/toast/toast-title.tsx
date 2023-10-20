import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export type ToastTitleProps = HTMLArkProps<'div'>

export const ToastTitle = (props: ToastTitleProps) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().titleProps, props)

  return <ark.div {...mergedProps} />
}
