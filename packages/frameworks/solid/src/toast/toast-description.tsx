import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastDescriptionProps = HTMLArkProps<'p'>

export const ToastDescription = (props: ToastDescriptionProps) => {
  const api = useToastItemContext()
  const descriptionProps = mergeProps(() => api().descriptionProps, props)

  return <ark.p {...descriptionProps}>{api().description}</ark.p>
}
