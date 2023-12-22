import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import type { UsePresenceProps } from './use-presence'

export interface PresencePropsContext extends UsePresenceProps {}

export const [PresencePropsProvider, usePresencePropsContext] =
  createContext<ComputedRef<PresencePropsContext>>('PresencePropsContext')
