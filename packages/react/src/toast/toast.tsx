import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { splitProps } from '../split-props'
import type { Assign } from '../types'
import { ToastItemProvider } from './toast-item-context'
import { useToastItem, UseToastItemProps } from './use-toast-item'

export type ToastProps = Assign<HTMLArkProps<'div'>, UseToastItemProps>

export const Toast = forwardRef<'div', ToastProps>((props, ref) => {
  const [useToastItemProps, divProps] = splitProps(props, ['toast'])
  const api = useToastItem(useToastItemProps)
  const mergedProps = mergeProps(api.rootProps, divProps)

  return (
    <ToastItemProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
    </ToastItemProvider>
  )
})
