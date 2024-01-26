import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export interface ToastTitleProps extends HTMLArkProps<'div'> {}

export const ToastTitle: ArkComponent<'div'> = (props) => {
  const api = useToastContext()
  const mergedProps = mergeProps(() => api().titleProps, props)

  return <ark.div {...mergedProps} />
}
