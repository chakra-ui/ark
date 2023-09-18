import { createContext } from '../create-context'
import { type UsePaginationReturn } from './use-pagination'

export type PaginationContext = UsePaginationReturn

export const [PaginationProvider, usePaginationContext] = createContext<PaginationContext>({
  name: 'PaginationContext',
  hookName: 'usePaginationContext',
  providerName: '<PaginationProvider />',
})
