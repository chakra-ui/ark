import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastTitleProps = HTMLArkProps<'h3'>

export const ToastTitle = (props: ToastTitleProps) => {
  const toast = useToastItemContext()
  const titleProps = mergeProps(() => toast().titleProps, props)
  return <ark.h3 {...titleProps}>{toast().title}</ark.h3>
}
