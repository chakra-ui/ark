import { createContext } from '../../utils/create-context'
import type { UseTocReturn } from './use-toc.svelte'

export interface UseTocContext extends UseTocReturn {}
export const [TocProvider, useTocContext, TocContextId] = createContext<UseTocContext>({
  name: 'TocContext',
  hookName: 'useTocContext',
  providerName: '<TocProvider />',
})
