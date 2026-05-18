import { createContext } from '../../utils/create-context.ts'
import type { UsePresenceReturn } from './use-presence.svelte.ts'

export interface UsePresenceContext extends UsePresenceReturn {}

export const [PresenceProvider, usePresenceContext] = createContext<UsePresenceContext>({
  name: 'PresenceContext',
})
