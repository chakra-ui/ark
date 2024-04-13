import { createContext } from '~/utils/create-context'
import type { UsePresenceReturn } from './use-presence'

export interface UsePresenceContext extends UsePresenceReturn {}

export const [PresenceProvider, usePresenceContext] = createContext<UsePresenceContext>({
  hookName: 'usePresenceContext',
  providerName: '<PresenceProvider />',
})
