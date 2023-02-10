import { createContext } from '../create-context'
import type { UseSplitterReturn } from './use-splitter'

export type SplitterContext = UseSplitterReturn

export const [SplitterProvider, useSplitterContext] = createContext<SplitterContext>({
  name: 'SplitterContext',
  hookName: 'useSplitterContext',
  providerName: '<SplitterProvider />',
})
