import { mergeProps } from '@zag-js/react'
import { type Placement, type Service } from '@zag-js/toast'
import { forwardRef, type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useToast } from './toast-provider'

export interface ToastGroupProps
  extends Assign<
    HTMLArkProps<'div'>,
    {
      placement: Placement
      children?: ReactNode | ((toasts: Service[]) => ReactNode)
    }
  > {}

export const ToastGroup = forwardRef<HTMLDivElement, ToastGroupProps>((props, ref) => {
  const { children, placement, ...divProps } = props
  const api = useToast()
  const mergedProps = mergeProps(api.getGroupProps({ placement }), divProps)
  const view = runIfFn(children, api.toastsByPlacement[placement] ?? [])

  return (
    <ark.div {...mergedProps} ref={ref}>
      <>{view}</>
    </ark.div>
  )
})

ToastGroup.displayName = 'ToastGroup'
