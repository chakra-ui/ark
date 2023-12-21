import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import type { UsePresenceProps } from './use-presence'

export type PresencePropsContext = ComputedRef<UsePresenceProps>

export const [PresencePropsProvider, usePresencePropsContext] =
  createContext<PresencePropsContext>('PresencePropsContext')
