import { createContext } from '$lib/utils/create-context'
import type { UsePaginationReturn } from './use-pagination.svelte'

export interface UsePaginationContext extends UsePaginationReturn {}

export const [PaginationProvider, usePaginationContext] = createContext<UsePaginationContext>({
  name: 'PaginationContext',
  hookName: 'usePaginationContext',
  providerName: '<PaginationProvider />',
})
