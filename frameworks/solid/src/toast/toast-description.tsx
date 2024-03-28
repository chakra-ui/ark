import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastDescriptionProps extends HTMLArkProps<'div'> {}

export const ToastDescription = (props: ToastDescriptionProps) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().descriptionProps, props)

  return <ark.div {...mergedProps} />
}
