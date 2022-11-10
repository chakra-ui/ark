import { normalizeProps, useMachine } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { PropsWithChildren, useId } from 'react'
import { createContext } from '../createContext'

export type ToastContext = ReturnType<typeof toast['group']['connect']>
export const [ToastContextProvider, useToast] = createContext<ToastContext>()

export type ToastProviderProps = PropsWithChildren
export const ToastProvider = (props: ToastProviderProps) => {
  const { children } = props
  const [state, send] = useMachine(toast.group.machine({ id: useId() }))
  const api = toast.group.connect(state, send, normalizeProps)

  return <ToastContextProvider value={api}>{children}</ToastContextProvider>
}
