import { createContext } from '../../utils/create-context'
import type { UsePresenceReturn } from './use-presence.svelte'

export interface UsePresenceContext extends UsePresenceReturn {}

export const [PresenceProvider, usePresenceContext] = createContext<UsePresenceContext>({
  key: 'PresenceContext',
})
