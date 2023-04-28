import { normalizeProps, useMachine } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { useId, type PropsWithChildren } from 'react'
import { createContext } from '../create-context'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

type GroupPublicContext = Parameters<(typeof toast)['group']['machine']>[0]

export type ToastContext = ReturnType<(typeof toast)['group']['connect']>
export const [ToastContextProvider, useToast] = createContext<ToastContext>()

export type ToastProviderProps = PropsWithChildren & Optional<GroupPublicContext, 'id'>

export const ToastProvider = (props: ToastProviderProps) => {
  const { children, ...restProps } = props
  const getRootNode = useEnvironmentContext()
  const context = { id: useId(), getRootNode, ...restProps }
  const [state, send] = useMachine(toast.group.machine(context))
  const api = toast.group.connect(state, send, normalizeProps)

  return <ToastContextProvider value={api}>{children}</ToastContextProvider>
}
