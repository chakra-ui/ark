import { createContext } from '../context'
import type { UsePresenceProps } from './use-presence'

export type PresencePropsContext = UsePresenceProps

export const [PresencePropsProvider, usePresencePropsContext] =
  createContext<PresencePropsContext>('PresencePropsContext')
