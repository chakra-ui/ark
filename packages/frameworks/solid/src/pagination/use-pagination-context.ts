import { createContext } from '../create-context'
import { type UsePaginationReturn } from './use-pagination'

export interface UsePaginationContext extends UsePaginationReturn {}

export const [PaginationProvider, usePaginationContext] = createContext<UsePaginationContext>({
  hookName: 'usePaginationContext',
  providerName: '<PaginationProvider />',
})
