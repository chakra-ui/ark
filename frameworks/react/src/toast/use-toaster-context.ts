import type { Machine, StateMachine } from '@zag-js/core'
import * as toast from '@zag-js/toast'
import { createContext } from '../create-context'

export interface UseToasterContext {
  api: toast.GroupApi
  placement: toast.Placement
  service: Machine<
    toast.GroupMachineContext<toast.GenericOptions>,
    StateMachine.StateSchema,
    StateMachine.AnyEventObject
  >
}

export const [ToasterProvider, useToasterContext] = createContext<UseToasterContext>({
  name: 'ToasterContext',
  hookName: 'useToasterContext',
  providerName: '<ToasterProvider />',
})
