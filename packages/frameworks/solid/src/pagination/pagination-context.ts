import { createContext } from '../create-context'
import { type UsePaginationReturn } from './use-pagination'

export interface PaginationContext extends UsePaginationReturn {}

export const [PaginationProvider, usePaginationContext] = createContext<PaginationContext>({
  hookName: 'usePaginationContext',
  providerName: '<PaginationProvider />',
})
