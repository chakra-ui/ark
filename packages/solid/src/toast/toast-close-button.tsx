import { ark, HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseButtonProps = HTMLArkProps<'button'>

export const ToastCloseButton = (props: ToastCloseButtonProps) => {
  const toast = useToastItemContext()

  return <ark.button {...toast().closeButtonProps} {...props} />
}
