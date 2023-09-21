import { type Placement } from '@zag-js/toast'
import { type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { useToast } from './toast-provider'

export interface ToastPlacementsProps {
  children: (placements: Placement[]) => ReactNode
}

export const ToastPlacements = (props: ToastPlacementsProps) => {
  const { children } = props
  const api = useToast()
  const view = runIfFn(children, Object.keys(api.toastsByPlacement) as Placement[])

  return <>{view}</>
}
