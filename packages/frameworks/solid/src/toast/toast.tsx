import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export type ToastProps = HTMLArkProps<'li'>

export const Toast = (props: ToastProps) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().rootProps, props)

  return <ark.li {...mergedProps} />
}
