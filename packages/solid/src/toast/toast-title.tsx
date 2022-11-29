import { ark, HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastTitleProps = HTMLArkProps<'h3'>

export const ToastTitle = (props: ToastTitleProps) => {
  const toast = useToastItemContext()

  return (
    <ark.h3 {...toast().titleProps} {...props}>
      {toast().title}
    </ark.h3>
  )
}
