import { mergeProps } from '@zag-js/react'
import type { HTMLArkProps } from '../factory'
import { ToastItemProvider } from './toast-item-context'
import { useToastItem, UseToastItemProps } from './use-toast-item'

export type ToastProps = HTMLArkProps<'div'> & UseToastItemProps

export const Toast = (props: ToastProps) => {
  const { toast, ...divProps } = props
  const api = useToastItem({ toast })
  const mergedProps = mergeProps(api.rootProps, divProps)

  return (
    <ToastItemProvider value={api}>
      <div {...mergedProps} />
    </ToastItemProvider>
  )
}
