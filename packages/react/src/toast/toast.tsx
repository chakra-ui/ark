import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { HTMLArkProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { ToastItemProvider } from './toast-item-context'
import { useToastItem, UseToastItemProps } from './use-toast-item'

export type ToastProps = Assign<HTMLArkProps<'div'>, UseToastItemProps>

export const Toast = forwardRef<'div', ToastProps>((props, ref) => {
  const [useToastItemProps, divProps] = splitProps(props, ['toast'])
  const api = useToastItem(useToastItemProps)
  const mergedProps = mergeProps(api.rootProps, divProps)

  return (
    <ToastItemProvider value={api}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error TODO ask tim */}
      <div {...mergedProps} ref={ref} />
    </ToastItemProvider>
  )
})
