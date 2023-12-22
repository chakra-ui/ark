import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import type { UsePresenceProps } from './use-presence'

export interface PresencePropsContext extends ComputedRef<UsePresenceProps> {}

export const [PresencePropsProvider, usePresencePropsContext] =
  createContext<PresencePropsContext>('PresencePropsContext')
