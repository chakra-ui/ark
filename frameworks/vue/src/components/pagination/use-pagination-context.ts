import { createContext } from '../../utils'
import type { UsePaginationReturn } from './use-pagination'

export interface UsePaginationContext extends UsePaginationReturn {}

export const [PaginationProvider, usePaginationContext] =
  createContext<UsePaginationContext>('PaginationContext')
