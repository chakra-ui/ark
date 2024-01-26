import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export interface ToastDescriptionProps extends HTMLArkProps<'div'> {}

export const ToastDescription: ArkComponent<'div'> = (props: ToastDescriptionProps) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().descriptionProps, props)

  return <ark.div {...mergedProps} />
}
