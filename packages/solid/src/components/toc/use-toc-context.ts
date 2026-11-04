import { createContext } from '../../utils/create-context.ts'
import type { UseTocReturn } from './use-toc.ts'

export interface UseTocContext extends UseTocReturn {}

export const [TocProvider, useTocContext] = createContext<UseTocContext>({
  hookName: 'useTocContext',
  providerName: '<TocProvider />',
})
