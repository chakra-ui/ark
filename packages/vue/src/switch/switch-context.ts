import { type connect } from '@zag-js/switch'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import type { UseSwitchReturn } from './use-switch'

export const [SwitchProvider, useSwitchContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('SwitchContext')

export type SwitchContext = UnwrapRef<UseSwitchReturn>
