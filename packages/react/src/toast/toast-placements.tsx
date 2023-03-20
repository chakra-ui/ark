import { type Placement } from '@zag-js/toast'
import { type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { useToast } from './toast-provider'

export type ToastPlacementsProps = {
  children: (placements: Placement[]) => ReactNode
}

export const ToastPlacements = (props: ToastPlacementsProps) => {
  const { children } = props
  const { toastsByPlacement } = useToast()
  const view = runIfFn(children, Object.keys(toastsByPlacement) as Placement[])

  return <>{view}</>
}
