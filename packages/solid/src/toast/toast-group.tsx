import type { Assign } from '@polymorphic-factory/solid'
import type { Placement, Service } from '@zag-js/toast'
import { children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useToast } from './toast-provider'

type ToastGroupParams = {
  placement: Placement
  children: JSX.Element | ((toasts: Service[]) => JSX.Element)
}
export type ToastGroupProps = Assign<HTMLArkProps<'div'>, ToastGroupParams>

export const ToastGroup = (props: ToastGroupProps) => {
  const [toastGroupParams, divProps] = createSplitProps<ToastGroupParams>()(props, [
    'placement',
    'children',
  ])
  const toast = useToast()
  const view = () =>
    children(() =>
      runIfFn(
        toastGroupParams.children,
        toast().toastsByPlacement[toastGroupParams.placement] ?? [],
      ),
    )

  return (
    <ark.div {...toast().getGroupProps({ placement: toastGroupParams.placement })} {...divProps}>
      <>{view}</>
    </ark.div>
  )
}
