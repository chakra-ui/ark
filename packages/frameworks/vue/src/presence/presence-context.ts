import { createContext } from '../context'
import type { UsePresenceReturn } from './use-presence'

export interface PresenceContext extends UsePresenceReturn {}

export const [PresenceProvider, usePresenceContext] =
  createContext<PresenceContext>('PresenceContext')
