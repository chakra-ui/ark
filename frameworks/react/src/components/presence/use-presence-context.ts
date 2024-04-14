import { createContext } from '../../utils/create-context'
import type { UsePresenceReturn } from './use-presence'

export interface UsePresenceContext extends UsePresenceReturn {}

export const [PresenceProvider, usePresenceContext] = createContext<UsePresenceContext>({
  name: 'PresenceContext',
  hookName: 'usePresenceContext',
  providerName: '<PresenceProvider />',
})
