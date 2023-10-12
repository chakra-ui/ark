import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export type ToastDescriptionProps = HTMLArkProps<'div'>

export const ToastDescription = (props: ToastDescriptionProps) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().descriptionProps, props)

  return <ark.div {...mergedProps}>{api().description}</ark.div>
}
