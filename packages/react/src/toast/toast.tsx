import { mergeProps } from '@zag-js/react'
import type { HTMLArkProps } from '../factory'
import { ToastItemProvider } from './toast-item-context'
import { useToastItem, UseToastItemProps } from './use-toast-item'

export type ToastProps = HTMLArkProps<'div'> & UseToastItemProps

export const Toast = (props: ToastProps) => {
  const { actor, ...divProps } = props
  const api = useToastItem({ actor })
  const mergedProps = mergeProps(api.rootProps, divProps)

  return (
    <ToastItemProvider value={api}>
      <div {...mergedProps} />
    </ToastItemProvider>
  )
}
