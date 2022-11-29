import type { Placement } from '@zag-js/toast'
import { children, type JSX } from 'solid-js'
import { runIfFn } from '../run-if-fn'
import { useToast } from './toast-provider'

export type ToastPlacementsProps = {
  children: (placements: Placement[]) => JSX.Element
}

export const ToastPlacements = (props: ToastPlacementsProps) => {
  const toast = useToast()
  const view = () =>
    children(() => runIfFn(props.children, Object.keys(toast().toastsByPlacement) as Placement[]))

  return <>{view}</>
}
