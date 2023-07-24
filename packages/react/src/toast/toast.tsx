import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { splitPresenceProps } from '../presence'
import type { Assign } from '../types'
import { ToastItemProvider } from './toast-item-context'
import { ToastPresence, type ToastPresenceProps } from './toast-presence'
import { useToastItem, type UseToastItemProps } from './use-toast-item'

export type ToastProps = Assign<HTMLArkProps<'div'>, UseToastItemProps> &
  Omit<ToastPresenceProps, 'children'>

export const Toast = forwardRef<'div', ToastProps>((props, ref) => {
  const [presenceProps, toastProps] = splitPresenceProps(props)
  const [useToastItemProps] = createSplitProps<UseToastItemProps>()(props, ['toast'])

  const api = useToastItem(useToastItemProps)

  return (
    <ToastItemProvider value={api}>
      <ToastPresence {...presenceProps}>
        <InnerToast ref={ref} {...toastProps} />
      </ToastPresence>
    </ToastItemProvider>
  )
})

const InnerToast = forwardRef<'div', Assign<HTMLArkProps<'div'>, UseToastItemProps>>(
  (props, ref) => {
    const [useToastItemProps, { children, ...divProps }] = createSplitProps<UseToastItemProps>()(
      props,
      ['toast'],
    )
    const api = useToastItem(useToastItemProps)

    const mergedProps = mergeProps(api.rootProps, divProps)
    const customToast = api.render()
    return (
      <ark.div {...mergedProps} ref={ref}>
        {customToast || children}
      </ark.div>
    )
  },
)
