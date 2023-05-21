import { type connect } from '@zag-js/splitter'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import type { UseSplitterReturn } from './use-splitter'

export const [SplitterProvider, useSplitterContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('SplitterContext')

export type SplitterContext = UnwrapRef<UseSplitterReturn>
