import { mergeProps } from '@zag-js/react'
import { type Placement, type Service } from '@zag-js/toast'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useToast } from './toast-provider'

export type ToastGroupProps = Assign<
  ComponentPropsWithoutRef<typeof ark.div>,
  {
    placement: Placement
    children: ReactNode | ((toasts: Service[]) => ReactNode)
  }
>

export const ToastGroup = forwardRef<HTMLDivElement, ToastGroupProps>((props, ref) => {
  const { children, placement, ...divProps } = props
  const { toastsByPlacement, getGroupProps } = useToast()
  const mergedProps = mergeProps(getGroupProps({ placement }), divProps)
  const view = runIfFn(children, toastsByPlacement[placement] ?? [])

  return (
    <ark.div {...mergedProps} ref={ref}>
      <>{view}</>
    </ark.div>
  )
})

ToastGroup.displayName = 'ToastGroup'
