import { type Assign } from '@polymorphic-factory/solid'
import { mergeProps } from '@zag-js/solid'
import { type Placement, type Service } from '@zag-js/toast'
import { splitProps, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useToast } from './toast-provider'

type ToastGroupParams = {
  placement: Placement
  label?: string
}
export type ToastGroupProps = Assign<
  HTMLArkProps<'div'>,
  ToastGroupParams & {
    children: JSX.Element | ((toasts: Service[]) => JSX.Element)
  }
>

export const ToastGroup = (props: ToastGroupProps) => {
  const [childrenProps, localProps] = splitProps(props, ['children'])

  const [groupParams, restProps] = createSplitProps<ToastGroupParams>()(localProps, [
    'placement',
    'label',
  ])

  const toast = useToast()

  const getChildren = () =>
    runIfFn(childrenProps.children, toast().toastsByPlacement[groupParams.placement] ?? [])

  const groupProps = mergeProps(() => toast().getGroupProps(groupParams), restProps)

  return <ark.div {...groupProps}>{getChildren()}</ark.div>
}
