import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { Placement, Service } from '@zag-js/toast'
import type { ReactNode } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../split-props'
import { useToast } from './toast-provider'

export type ToastGroupProps = Assign<
  HTMLArkProps<'div'>,
  {
    placement: Placement
    children: (toasts: Service[]) => ReactNode | ((toasts: Service[]) => ReactNode)
  }
>

export const ToastGroup = forwardRef<'div', ToastGroupProps>((props, ref) => {
  const { children, placement, ...divProps } = props
  const { toastsByPlacement, getGroupProps } = useToast()
  const mergedProps = mergeProps(getGroupProps({ placement }), divProps)
  const view = runIfFn(children, toastsByPlacement[placement])

  return (
    <ark.div {...mergedProps} ref={ref}>
      <>{view}</>
    </ark.div>
  )
})
