import { type connect } from '@zag-js/splitter'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [SplitterProvider, useSplitterContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('SplitterContext')

// TODO: export type SplitterContext = UseSplitterReturn
