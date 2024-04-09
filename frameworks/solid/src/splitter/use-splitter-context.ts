import { createContext } from '../create-context'
import { type UseSplitterReturn } from './use-splitter'

export interface UseSplitterContext extends UseSplitterReturn {}

export const [SplitterProvider, useSplitterContext] = createContext<UseSplitterContext>({
  hookName: 'useSplitterContext',
  providerName: '<SplitterProvider />',
})
