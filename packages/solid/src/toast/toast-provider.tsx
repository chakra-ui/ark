import { normalizeProps, useMachine } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import { createMemo, createUniqueId, mergeProps, type JSX } from 'solid-js'
import { createContext } from '../create-context'
import { createSplitProps } from '../create-split-props'
import type { Optional } from '../types'

type GroupPublicContext = Parameters<typeof toast['group']['machine']>[0]
type ToastProviderParams = { children: JSX.Element }

export type ToastContext = () => ReturnType<typeof toast['group']['connect']>
export type ToastProviderProps = Optional<GroupPublicContext, 'id'> & ToastProviderParams

export const [ToastContextProvider, useToast] = createContext<ToastContext>()

export const ToastProvider = (props: ToastProviderProps) => {
  const [toastProviderParams, machineProps] = createSplitProps<ToastProviderParams>()(props, [
    'children',
  ])
  const context = mergeProps({ id: createUniqueId() }, machineProps)
  const [state, send] = useMachine(toast.group.machine(context))
  const api = createMemo(() => toast.group.connect(state, send, normalizeProps))

  return <ToastContextProvider value={api}>{toastProviderParams.children}</ToastContextProvider>
}
