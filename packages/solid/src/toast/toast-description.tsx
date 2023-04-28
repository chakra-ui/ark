import { ark, type HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastDescriptionProps = HTMLArkProps<'p'>

export const ToastDescription = (props: ToastDescriptionProps) => {
  const toast = useToastItemContext()

  return (
    <ark.p {...toast().descriptionProps} {...props}>
      {toast().description}
    </ark.p>
  )
}
