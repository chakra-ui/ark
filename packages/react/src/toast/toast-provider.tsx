import { normalizeProps, useMachine } from '@zag-js/react'
import type { Placement, Service } from '@zag-js/toast'
import * as toast from '@zag-js/toast'
import type { PropsWithChildren, ReactNode } from 'react'
import { createContext } from '../createContext'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'

export type ToastContext = ReturnType<typeof toast['group']['connect']>
export const [Provider, useToast] = createContext<ToastContext>()

export type ToastProviderProps = PropsWithChildren
export const ToastProvider = (props: ToastProviderProps) => {
  const { children } = props

  const [state, send] = useMachine(toast.group.machine({ id: '1' }))
  const api = toast.group.connect(state, send, normalizeProps)

  return <Provider value={api}>{children}</Provider>
}

export type ToastGroupProps = {
  placement: Placement
  children: (toasts: Service[]) => ReactNode
}

export const ToastGroup = (props: ToastGroupProps) => {
  const { children, placement } = props
  console.log({ placement })
  const api = useToast()
  const view = runIfFn(children, api.toastsByPlacement[placement])
  return (
    <ark.div {...api.getGroupProps({ placement })}>
      <>{view}</>
    </ark.div>
  )
}

export type ToastPlacementsProps = {
  children: (placements: Placement[]) => ReactNode
}

export const ToastPlacements = (props: ToastPlacementsProps) => {
  const { children } = props
  const { toastsByPlacement } = useToast()
  const view = runIfFn(children, Object.keys(toastsByPlacement))
  return <>{view}</>
}
