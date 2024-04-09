import { createContext } from '../context'
import type { UseSplitterReturn } from './use-splitter'

export interface SplitterContext extends UseSplitterReturn {}

export const [SplitterProvider, useSplitterContext] =
  createContext<UseSplitterReturn>('SplitterContext')
