import { type Placement } from '@zag-js/toast'
import { createMemo, type Accessor, type JSX } from 'solid-js'
import { runIfFn } from '../run-if-fn'
import { useToast } from './toast-provider'

export type ToastPlacementsProps = {
  children: (placements: Accessor<Placement[]>) => JSX.Element
}

export const ToastPlacements = (props: ToastPlacementsProps) => {
  const toast = useToast()
  const placements = createMemo(() => Object.keys(toast().toastsByPlacement) as Placement[])

  const getChildren = () => runIfFn(props.children, placements)
  return <>{getChildren()}</>
}
