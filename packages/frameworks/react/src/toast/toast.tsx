import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { ToastItemProvider } from './toast-item-context'
import { useToastItem, type UseToastItemProps } from './use-toast-item'

export interface ToastProps extends Assign<HTMLArkProps<'div'>, UseToastItemProps> {}

export const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const [useToastItemProps, { children, ...divProps }] = createSplitProps<UseToastItemProps>()(
    props,
    ['toast'],
  )
  const api = useToastItem(useToastItemProps)
  const mergedProps = mergeProps(api.rootProps, divProps)
  const customToast = api.render()

  return (
    <ToastItemProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {customToast || children}
      </ark.div>
    </ToastItemProvider>
  )
})

Toast.displayName = 'Toast'
