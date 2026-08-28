import { createContext } from '../../utils/create-context'
import type { UseTocReturn } from './use-toc'

export interface UseTocContext extends UseTocReturn {}

export const [TocProvider, useTocContext] = createContext<UseTocContext>({
  name: 'TocContext',
  hookName: 'useTocContext',
  providerName: '<TocProvider />',
})
