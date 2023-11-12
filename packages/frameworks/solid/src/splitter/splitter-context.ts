import { createContext } from '../create-context'
import { type UseSplitterReturn } from './use-splitter'

export interface SplitterContext extends UseSplitterReturn {}

export const [SplitterProvider, useSplitterContext] = createContext<SplitterContext>({
  hookName: 'useSplitterContext',
  providerName: '<SplitterProvider />',
})
