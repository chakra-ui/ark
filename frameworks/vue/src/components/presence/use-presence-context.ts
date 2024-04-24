import { createContext } from '../../utils'
import type { UsePresenceReturn } from './use-presence'

export interface UsePresenceContext extends UsePresenceReturn {}

export const [PresenceProvider, usePresenceContext] =
  createContext<UsePresenceContext>('PresenceContext')
