import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { useId, type PropsWithChildren } from 'react'
import { createContext } from '../create-context'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

type GroupContext = Parameters<(typeof toast)['group']['machine']>[0]

interface ToastContext extends toast.GroupApi<PropTypes> {}

const [ToastContextProvider, useToast] = createContext<ToastContext>()

export interface ToastProviderProps extends PropsWithChildren, Optional<GroupContext, 'id'> {}

export const ToastProvider = (props: ToastProviderProps) => {
  const { children, ...restProps } = props

  const context: GroupContext = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...restProps,
  }

  const [state, send] = useMachine(toast.group.machine(context))
  const api = toast.group.connect(state, send, normalizeProps)

  return <ToastContextProvider value={api}>{children}</ToastContextProvider>
}

export { useToast }
