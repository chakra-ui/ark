import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ToastItemProvider } from './toast-item-context'
import { useToastItem, type UseToastItemProps } from './use-toast-item'

export type ToastProps = Assign<HTMLArkProps<'div'>, UseToastItemProps>

export const Toast = (props: ToastProps) => {
  const [toastParams, localProps] = createSplitProps<UseToastItemProps>()(props, ['toast'])

  const api = useToastItem(toastParams)
  const rootProps = mergeProps(() => api().rootProps, localProps)

  return (
    <ToastItemProvider value={api}>
      <ark.div {...rootProps} />
    </ToastItemProvider>
  )
}
