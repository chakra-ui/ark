import { createContext } from '../context'
import type { UseSplitterReturn } from './use-splitter'

export type SplitterContext = UseSplitterReturn

export const [SplitterProvider, useSplitterContext] =
  createContext<UseSplitterReturn>('SplitterContext')
