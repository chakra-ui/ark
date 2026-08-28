import { createContext } from '../../utils/create-context.ts'
import type { UseSplitterReturn } from './use-splitter.ts'

export interface UseSplitterContext extends UseSplitterReturn {}

export const [SplitterProvider, useSplitterContext] = createContext<UseSplitterContext>({
  hookName: 'useSplitterContext',
  providerName: '<SplitterProvider />',
})
