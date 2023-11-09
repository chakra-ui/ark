import { createContext } from '../context'
import type { UsePresenceReturn } from './use-presence'

export type PresenceContext = UsePresenceReturn

export const [PresenceProvider, usePresenceContext] =
  createContext<PresenceContext>('PresenceContext')
