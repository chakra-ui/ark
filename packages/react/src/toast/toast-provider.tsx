import { normalizeProps, useMachine } from '@zag-js/react'
import type { Placement, Service } from '@zag-js/toast'
import * as toast from '@zag-js/toast'
import type { PropsWithChildren, ReactNode } from 'react'
import { createContext } from '../createContext'
import { runIfFn } from '../run-if-fn'

export type ToastContext = ReturnType<typeof toast['group']['connect']>
export const [Provider, useToast] = createContext<ToastContext>()

export type ToastProviderProps = PropsWithChildren<{
  render: (toasts: Service[]) => ReactNode
}>

export const ToastProvider = (props: ToastProviderProps) => {
  const { render, children } = props

  const [state, send] = useMachine(toast.group.machine({ id: '1' }))
  const api = toast.group.connect(state, send, normalizeProps)

  return (
    <Provider value={api}>
      {Object.entries(api.toastsByPlacement).map((toastGroup) => {
        // don't ask ... https://github.com/microsoft/TypeScript/issues/38520
        const [placement, toasts] = toastGroup as [Placement, Service[]]
        const view = runIfFn(render, toasts)
        return (
          <div key={placement} {...api.getGroupProps({ placement })}>
            {view}
          </div>
        )
      })}
      {children}
    </Provider>
  )
}
