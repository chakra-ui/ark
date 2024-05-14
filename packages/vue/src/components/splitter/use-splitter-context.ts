import { createContext } from '../../utils'
import type { UseSplitterReturn } from './use-splitter'

export interface UseSplitterContext extends UseSplitterReturn {}

export const [SplitterProvider, useSplitterContext] =
  createContext<UseSplitterContext>('SplitterContext')
