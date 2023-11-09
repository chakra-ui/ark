import { createContext } from '../create-context'
import type { UsePresenceReturn } from './use-presence'

export interface PresenceContext extends UsePresenceReturn {}

export const [PresenceProvider, usePresenceContext] = createContext<PresenceContext>({
  name: 'PresenceContext',
  hookName: 'usePresenceContext',
  providerName: '<PresenceProvider />',
})
